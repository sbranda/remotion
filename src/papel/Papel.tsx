// Curiosidad matemática: doblar un papel 42 veces llegaría a la Luna.
// Estilo "cuaderno": hoja rayada con margen rojo, letra manuscrita y garabatos.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MANUSCRITA, SANS } from "../fuente";
import { FIRMA } from "../salud/pop";
import { DISTANCIA_LUNA_KM, FPS, HITOS, PAGINAS, PaginaId, capas, grosor } from "./datos";

const K = {
  papel: "#fdfbf3",
  renglon: "#bcd4ee",
  margen: "#f08a8a",
  tinta: "#1f3a68",
  lapiz: "#3a3a3a",
  rojo: "#e04848",
  verde: "#2f9e5b",
  amarillo: "#ffe066",
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = (t: number) => 1 - Math.pow(1 - t, 3);

const usePop = (desde: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: 11, stiffness: 150, mass: 0.7 } });
};

const Pop: React.FC<{ desde: number; children: React.ReactNode; giro?: number; style?: React.CSSProperties }> = ({ desde, children, giro = 0, style }) => {
  const frame = useCurrentFrame();
  const p = usePop(desde);
  if (frame < desde) return null;
  return <div style={{ transform: `scale(${p}) rotate(${giro}deg)`, ...style }}>{children}</div>;
};

/** Texto manuscrito que "se escribe" de izquierda a derecha */
const Escribe: React.FC<{ desde: number; children: React.ReactNode; size?: number; color?: string; dur?: number }> = ({ desde, children, size = 110, color = K.tinta, dur = 20 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 100], clamp);
  return (
    <div
      style={{
        fontFamily: MANUSCRITA,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.05,
        color,
        textAlign: "center",
        clipPath: `inset(0 ${100 - p}% 0 0)`,
        textWrap: "balance",
      }}
    >
      {children}
    </div>
  );
};

const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({ children, size = 46, color = K.lapiz, peso = 600 }) => (
  <div style={{ fontFamily: SANS, fontWeight: peso, fontSize: size, lineHeight: 1.35, color, textAlign: "center", textWrap: "balance" }}>{children}</div>
);

/** Resaltado con fibrón amarillo */
const Fibron: React.FC<{ children: React.ReactNode; desde: number; color?: string }> = ({ children, desde, color = K.amarillo }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 12], [0, 100], clamp);
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${p}% 70%`,
        backgroundPosition: "0 85%",
        padding: "0 8px",
      }}
    >
      {children}
    </span>
  );
};

const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 80 }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}>{e}</span>
);

/** Recuadro de "nota pegada" */
const Nota: React.FC<{ children: React.ReactNode; color?: string; giro?: number; ancho?: number }> = ({ children, color = "#fff3a6", giro = -2, ancho = 880 }) => (
  <div style={{ width: ancho, background: color, padding: "24px 32px", transform: `rotate(${giro}deg)`, boxShadow: "6px 10px 20px rgba(0,0,0,0.12)" }}>{children}</div>
);

const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 36, centro = false }) => (
  <AbsoluteFill
    style={{
      top: 200,
      bottom: 500,
      left: 150,
      right: 60,
      width: "auto",
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: centro ? "center" : "flex-start",
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Hoja de cuaderno: renglones celestes y margen rojo */
const Cuaderno: React.FC = () => (
  <AbsoluteFill
    style={{
      background: K.papel,
      backgroundImage: `linear-gradient(90deg, transparent 118px, ${K.margen} 118px, ${K.margen} 122px, transparent 122px), repeating-linear-gradient(180deg, transparent 0 62px, ${K.renglon} 62px 64px)`,
    }}
  />
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Pop desde={0}>
      <Emoji e="📄" size={140} />
    </Pop>
    <Escribe desde={5} size={96} dur={30}>
      ¿Cuántas veces tenés que doblar un papel para llegar a la Luna? 🌕
    </Escribe>
    <div style={{ display: "flex", gap: 30 }}>
      {["¿1.000?", "¿1 millón?"].map((t, i) => (
        <Pop key={t} desde={70 + i * 15} giro={i ? 4 : -4}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 80, color: K.rojo, border: `5px solid ${K.rojo}`, borderRadius: 30, padding: "0 30px" }}>{t}</div>
        </Pop>
      ))}
    </div>
  </Pagina>
);

// ─── 2. La hoja ─────────────────────────────────────────────────────────────
const Hoja: React.FC = () => (
  <Pagina gap={40} centro>
    <Escribe desde={0} size={100}>
      Una hoja común es <Fibron desde={30}>finita</Fibron>
    </Escribe>
    <Pop desde={40}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 600, height: 6, background: K.tinta, borderRadius: 3 }} />
        <div style={{ fontFamily: MANUSCRITA, fontSize: 90, color: K.rojo }}>0,1 mm</div>
      </div>
    </Pop>
    <Pop desde={90}>
      <Texto size={52}>Más o menos como un pelo 💇</Texto>
    </Pop>
  </Pagina>
);

// ─── 3. Cada doblez duplica ─────────────────────────────────────────────────
const Pila: React.FC<{ n: number; ancho?: number }> = ({ n, ancho = 360 }) => {
  const c = Math.pow(2, n);
  const alto = Math.min(16, 220 / c);
  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: Math.min(4, alto / 3), alignItems: "center", height: 260, justifyContent: "flex-start" }}>
      {Array.from({ length: c }).map((_, i) => (
        <div key={i} style={{ width: ancho, height: alto, background: "#fff", border: `2px solid ${K.tinta}`, borderRadius: 3 }} />
      ))}
    </div>
  );
};

const Duplica: React.FC = () => {
  const frame = useCurrentFrame();
  const pasos = [0, 1, 2, 3, 4];
  const n = Math.max(0, Math.min(4, Math.floor((frame - 40) / 70) + 1));
  return (
    <Pagina gap={30}>
      <Escribe desde={0} size={96}>
        Cada doblez <Fibron desde={25}>duplica</Fibron> las capas
      </Escribe>
      <Pila n={frame < 40 ? 0 : n} />
      <div style={{ display: "flex", gap: 22 }}>
        {pasos.map((p) => (
          <div
            key={p}
            style={{
              fontFamily: MANUSCRITA,
              fontSize: 64,
              color: p === n ? K.rojo : K.tinta,
              opacity: frame >= 40 + (p - 1) * 70 || p === 0 ? 1 : 0.2,
              transform: `scale(${p === n ? 1.25 : 1})`,
              width: 140,
              textAlign: "center",
            }}
          >
            {capas(p)}
          </div>
        ))}
      </div>
      <Pop desde={330}>
        <Texto size={44}>1 → 2 → 4 → 8 → 16 … ¡y no para!</Texto>
      </Pop>
    </Pagina>
  );
};

// ─── 4. La escalada: del cuaderno al espacio ────────────────────────────────
/** Frame (dentro de la página) en que se llega a cada doblez: avanza rápido y se frena en los hitos */
const CRONO = (() => {
  const t: number[] = [0];
  let f = 30;
  for (let n = 1; n <= 42; n++) {
    t[n] = f;
    f += HITOS.some((h) => h.n === n) ? 70 : 11;
  }
  return t;
})();

const dobleces = (frame: number) => {
  let n = 0;
  for (let k = 1; k <= 42; k++) if (frame >= CRONO[k]) n = k;
  return n;
};

const Escalada: React.FC = () => {
  const frame = useCurrentFrame();
  const n = dobleces(frame);
  const hito = [...HITOS].reverse().find((h) => n >= h.n && frame - CRONO[h.n] < 70);
  // fondo: cuaderno → cielo → azul profundo → espacio
  const cielo = interpolate(n, [14, 20], [0, 1], clamp);
  const espacio = interpolate(n, [27, 31], [0, 1], clamp);
  const oscuro = espacio > 0.5;
  const tinta = oscuro ? "#ffffff" : K.tinta;
  const lunaP = interpolate(frame, [CRONO[42] - 5, CRONO[42] + 30], [0, 1], { ...clamp, easing: suave });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #4aa3ff 0%, #bfe3ff 100%)", opacity: cielo }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #000014 0%, #0b1a4a 100%)", opacity: espacio }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: (i * 263) % 1080, top: (i * 431) % 1920, width: 4, height: 4, borderRadius: 2, background: "#fff", opacity: 0.4 + ((i * 7) % 6) / 10 }} />
        ))}
      </AbsoluteFill>
      {/* la Luna llega desde arriba */}
      <div
        style={{
          position: "absolute",
          left: 690,
          top: -400 + 520 * lunaP,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fffbe6 0%, #e8e1c3 55%, #b9b190 100%)",
          boxShadow: "0 0 80px rgba(255,250,220,0.6)",
          opacity: lunaP,
        }}
      />
      <Pagina gap={20} centro>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: tinta, letterSpacing: 4, textTransform: "uppercase", opacity: 0.8 }}>Dobleces</div>
        <div style={{ fontFamily: MANUSCRITA, fontSize: 260, fontWeight: 700, color: oscuro ? "#ffe066" : K.rojo, lineHeight: 0.9 }}>{n}</div>
        <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 700, color: tinta, opacity: 0.8 }}>Grosor</div>
        <div style={{ fontFamily: SANS, fontSize: 88, fontWeight: 800, color: tinta, fontVariantNumeric: "tabular-nums" }}>{grosor(n)}</div>
        <div style={{ height: 230, display: "flex", alignItems: "center" }}>
          {hito && (
            <Pop key={hito.n} desde={CRONO[hito.n]} giro={-3}>
              <Nota ancho={820} color={hito.n === 42 ? "#ffe066" : "#fff3a6"}>
                <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                  <Emoji e={hito.emoji} size={90} />
                  <div style={{ fontFamily: MANUSCRITA, fontSize: 68, color: K.tinta, lineHeight: 1 }}>{hito.texto}</div>
                </div>
              </Nota>
            </Pop>
          )}
        </div>
      </Pagina>
    </AbsoluteFill>
  );
};

// ─── 5. La Luna ─────────────────────────────────────────────────────────────
const Luna: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, #000014 0%, #0b1a4a 100%)" }}>
    <Pagina gap={36} centro>
      <Pop desde={0}>
        <Emoji e="🌕" size={150} />
      </Pop>
      <Pop desde={15}>
        <div style={{ fontFamily: MANUSCRITA, fontSize: 96, color: "#ffe066", textAlign: "center", lineHeight: 1 }}>42 dobleces = {grosor(42)}</div>
      </Pop>
      <Pop desde={70}>
        <Texto size={50} color="#ffffff">
          La Luna está a unos {DISTANCIA_LUNA_KM.toLocaleString("es-AR")} km
        </Texto>
      </Pop>
      <Pop desde={140} giro={-4}>
        <div style={{ fontFamily: MANUSCRITA, fontSize: 110, color: "#ffffff" }}>¡Y te pasás! 🤯</div>
      </Pop>
    </Pagina>
  </AbsoluteFill>
);

// ─── 6. En la vida real ─────────────────────────────────────────────────────
const Realidad: React.FC = () => (
  <Pagina gap={34} centro>
    <Escribe desde={0} size={96}>
      Pero en la vida real…
    </Escribe>
    <Pop desde={40}>
      <Nota>
        <Texto size={46} color={K.tinta}>
          A los <b style={{ color: K.rojo }}>7 u 8 dobleces</b> el papel queda como un cubito duro y ya no se dobla 🧱
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={150}>
      <Nota color="#cdeffd" giro={2}>
        <Texto size={40} color={K.tinta}>
          El récord es de <b>12 dobleces</b>: lo logró una estudiante, Britney Gallivan, en 2002, con un papel de más de 1 km de largo 🏆
        </Texto>
      </Nota>
    </Pop>
  </Pagina>
);

// ─── 7. La idea ─────────────────────────────────────────────────────────────
const Idea: React.FC = () => (
  <Pagina gap={34} centro>
    <Pop desde={0}>
      <Emoji e="💡" size={130} />
    </Pop>
    <Escribe desde={10} size={88}>
      Duplicar muchas veces hace crecer todo <Fibron desde={45}>muchísimo</Fibron>
    </Escribe>
    <Pop desde={100}>
      <Texto size={44}>
        Se llama <b style={{ color: K.rojo }}>crecimiento exponencial</b> 📈
      </Texto>
    </Pop>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Escribe desde={0} size={100}>
      ¿Lo sabías? 🤔
    </Escribe>
    <Pop desde={25}>
      <Texto size={46}>Mandáselo a alguien que no lo crea 📲</Texto>
    </Pop>
  </Pagina>
);

// ─── Marco ──────────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  hoja: Hoja,
  duplica: Duplica,
  escalada: Escalada,
  luna: Luna,
  realidad: Realidad,
  idea: Idea,
  cierre: Cierre,
};

/** Cambio de página: la hoja nueva entra deslizándose como al pasar de página */
const PasarHoja: React.FC<{ dur: number; primera: boolean; children: React.ReactNode }> = ({ dur, primera, children }) => {
  const frame = useCurrentFrame();
  const p = primera ? 1 : interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 8, dur], [1, 0], clamp);
  return <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1080}px) rotate(${(1 - p) * 6}deg)`, opacity: sale }}>{children}</AbsoluteFill>;
};

const Firma: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: K.tinta, background: "rgba(255,255,255,0.85)", border: `3px solid ${K.tinta}`, borderRadius: 999, padding: "8px 30px", transform: "rotate(-2deg)" }}>
      {FIRMA}
    </div>
  </div>
);

export const Papel: React.FC = () => {
  let desde = 0;
  const secuencias = PAGINAS.map((p, i) => {
    const dur = p.seg * FPS;
    const Escena = ESCENAS[p.id];
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <PasarHoja dur={dur} primera={i === 0}>
          <Cuaderno />
          <Escena />
        </PasarHoja>
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill style={{ background: "#e9e4d4" }}>
      {secuencias}
      <Firma />
      {/* Música original: scripts/musica_reel.py --paginas 5,8,14,30,10,10,8,5 --transponer 5 --bpm 104 --estilo energico */}
      <Html5Audio src={staticFile("audio/papel-musica.mp3")} volume={0.8} />
    </AbsoluteFill>
  );
};

// Reel homenaje e informativo sobre Jesús de Miguel. Estilo sobrio: fondo oscuro con los
// colores del CD Tenerife (azul y blanco), crespón negro, entradas lentas y sin destellos.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SANS } from "../fuente";
import { FIRMA } from "../salud/pop";
import {
  ACTUALIZADO,
  CARRERA,
  CRONOLOGIA,
  FPS,
  FUENTES,
  HOMENAJES,
  HOSPITAL,
  JUGADOR,
  NO_SE_SABE,
  PAGINAS,
  PaginaId,
  RCP,
  SE_SABE,
} from "./datos";

const S = {
  fondo: "#0a0f1a",
  fondo2: "#10223f",
  azul: "#2f6fd6",
  celeste: "#8fb8ff",
  blanco: "#ffffff",
  gris: "#a7b3c6",
  linea: "rgba(255,255,255,0.14)",
  panel: "rgba(255,255,255,0.06)",
  rojo: "#e2574c",
  verde: "#46c08a",
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** Aparece despacio, subiendo un poco */
const Entra: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; dur?: number }> = ({ desde, children, style, dur = 24 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 1], { ...clamp, easing: suave });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)`, ...style }}>{children}</div>;
};

const Titulo: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 84 }) => (
  <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.1, color: S.blanco, textAlign: "center", letterSpacing: -1, textWrap: "balance" }}>
    {children}
  </div>
);

const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({ children, size = 42, color = S.blanco, peso = 600 }) => (
  <div style={{ fontFamily: SANS, fontWeight: peso, fontSize: size, lineHeight: 1.35, color, textAlign: "center", textWrap: "balance" }}>{children}</div>
);

const Rotulo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, letterSpacing: 8, color: S.celeste, textTransform: "uppercase", textAlign: "center" }}>{children}</div>
);

const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; acento?: string }> = ({ children, style, acento = S.azul }) => (
  <div style={{ background: S.panel, border: `2px solid ${S.linea}`, borderLeft: `8px solid ${acento}`, borderRadius: 20, ...style }}>{children}</div>
);

const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 60 }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}>{e}</span>
);

const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 36, centro = false }) => (
  <AbsoluteFill
    style={{
      top: 210,
      bottom: 500,
      left: 70,
      right: 70,
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

/** Crespón negro con borde blanco */
const Crespon: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg width={size} height={size * 1.35} viewBox="0 0 100 135">
    <path d="M50 20 C30 -6 6 22 34 54 L14 128 L34 132 L50 78 L66 132 L86 128 L66 54 C94 22 70 -6 50 20 Z" fill="#000" stroke={S.blanco} strokeWidth={3} strokeLinejoin="round" />
  </svg>
);

// ─── 1. Portada ─────────────────────────────────────────────────────────────
const Portada: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0} dur={30}>
      <Crespon />
    </Entra>
    <Entra desde={20} dur={30}>
      <Titulo size={110}>{JUGADOR.nombre}</Titulo>
    </Entra>
    <Entra desde={45} dur={30}>
      <Texto size={52} color={S.celeste} peso={700}>
        {JUGADOR.anios}
      </Texto>
    </Entra>
    <Entra desde={70} dur={30}>
      <Texto size={40} color={S.gris}>
        {JUGADOR.posicion} del {JUGADOR.club}
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 2. Qué pasó: cronología ────────────────────────────────────────────────
const QuePaso: React.FC = () => {
  const frame = useCurrentFrame();
  const linea = interpolate(frame, [40, 600], [0, 1], clamp);
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Rotulo>Qué pasó</Rotulo>
      </Entra>
      <div style={{ position: "relative", width: 920, display: "flex", flexDirection: "column", gap: 26, paddingLeft: 60 }}>
        <div style={{ position: "absolute", left: 18, top: 20, width: 6, height: `${linea * 100}%`, background: S.azul, borderRadius: 3 }} />
        {CRONOLOGIA.map((c, i) => (
          <Entra key={c.cuando} desde={40 + i * 150}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: -55, top: 18, width: 26, height: 26, borderRadius: 13, background: S.blanco, border: `6px solid ${S.azul}` }} />
              <Panel style={{ padding: "18px 26px" }}>
                <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: S.celeste, letterSpacing: 2, textTransform: "uppercase" }}>{c.cuando}</div>
                <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 600, color: S.blanco, lineHeight: 1.3 }}>{c.texto}</div>
              </Panel>
            </div>
          </Entra>
        ))}
      </div>
    </Pagina>
  );
};

// ─── 3. En el hospital ──────────────────────────────────────────────────────
const Hospital: React.FC = () => (
  <Pagina gap={30}>
    <Entra desde={0}>
      <Rotulo>En el hospital</Rotulo>
    </Entra>
    {HOSPITAL.map((h, i) => (
      <Entra key={h.texto} desde={30 + i * 90}>
        <Panel style={{ width: 920, padding: "20px 28px" }}>
          <div style={{ fontFamily: SANS, fontSize: 46, fontWeight: 700, color: S.blanco }}>{h.texto}</div>
          {h.detalle && <div style={{ fontFamily: SANS, fontSize: 30, color: S.gris, marginTop: 4 }}>{h.detalle}</div>}
        </Panel>
      </Entra>
    ))}
    <Entra desde={330} dur={40}>
      <Panel acento="#000" style={{ width: 920, padding: "26px 28px", background: "rgba(0,0,0,0.45)" }}>
        <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: S.celeste, letterSpacing: 2, textTransform: "uppercase" }}>Martes 3 de noviembre</div>
        <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 800, color: S.blanco, lineHeight: 1.25 }}>
          El club comunica su fallecimiento. Tenía {JUGADOR.edad} años.
        </div>
      </Panel>
    </Entra>
  </Pagina>
);

// ─── 4. Quién era ───────────────────────────────────────────────────────────
const QuienEra: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Rotulo>Quién era</Rotulo>
      </Entra>
      <Entra desde={20}>
        <Titulo size={74}>Un goleador que encontró su lugar en Tenerife</Titulo>
      </Entra>
      <Entra desde={60}>
        <Texto size={38} color={S.gris}>
          {JUGADOR.nombreCompleto} · nació el {JUGADOR.nacimiento}
        </Texto>
      </Entra>
      <div style={{ display: "flex", gap: 20 }}>
        {CARRERA.map((c, i) => {
          const desde = 140 + i * 90;
          const n = Math.round(interpolate(frame, [desde, desde + 40], [0, c.valor], { ...clamp, easing: suave }));
          return (
            <Entra key={c.texto} desde={desde}>
              <Panel style={{ width: 293, height: 250, padding: 18, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontFamily: SANS, fontSize: 96, fontWeight: 800, color: S.blanco, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 600, color: S.gris, marginTop: 10, lineHeight: 1.2 }}>{c.texto}</div>
              </Panel>
            </Entra>
          );
        })}
      </div>
      <Entra desde={460}>
        <Texto size={40}>
          Llegó al Tenerife en julio de 2025 y sus goles ayudaron al equipo a <b style={{ color: S.celeste }}>volver a Segunda</b>.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Lo que se sabe y lo que no ──────────────────────────────────────────
const Columna: React.FC<{ titulo: string; items: string[]; color: string; desde: number; marca: string }> = ({ titulo, items, color, desde, marca }) => (
  <Entra desde={desde}>
    <Panel acento={color} style={{ width: 920, padding: "20px 28px" }}>
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color, marginBottom: 10 }}>{titulo}</div>
      {items.map((t, i) => (
        <Entra key={t} desde={desde + 30 + i * 45}>
          <div style={{ display: "flex", gap: 16, fontFamily: SANS, fontSize: 38, fontWeight: 600, color: S.blanco, lineHeight: 1.35, padding: "4px 0" }}>
            <span style={{ color }}>{marca}</span>
            <span>{t}</span>
          </div>
        </Entra>
      ))}
    </Panel>
  </Entra>
);

const SeSabe: React.FC = () => (
  <Pagina gap={30}>
    <Entra desde={0}>
      <Rotulo>Lo que se sabe y lo que no</Rotulo>
    </Entra>
    <Columna titulo="Se sabe" items={SE_SABE} color={S.verde} desde={25} marca="✓" />
    <Columna titulo="Todavía no se sabe" items={NO_SE_SABE} color={S.rojo} desde={300} marca="?" />
    <Entra desde={560}>
      <Texto size={34} color={S.gris}>
        Hay que esperar la información oficial.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 6. Homenajes ───────────────────────────────────────────────────────────
const Homenajes: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Rotulo>El fútbol lo despide</Rotulo>
    </Entra>
    {HOMENAJES.map((h, i) => (
      <Entra key={h.texto} desde={30 + i * 150}>
        <Panel style={{ width: 920, padding: "18px 26px", display: "flex", alignItems: "center", gap: 22 }}>
          <Emoji e={h.emoji} size={64} />
          <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 600, color: S.blanco, lineHeight: 1.3 }}>{h.texto}</div>
        </Panel>
      </Entra>
    ))}
  </Pagina>
);

// ─── 7. Qué hacer ante un colapso ───────────────────────────────────────────
const Rcp: React.FC = () => {
  const frame = useCurrentFrame();
  // compresiones: unas 100 a 120 por minuto ≈ 2 por segundo
  const compresion = frame > 300 && frame < 620 ? Math.abs(Math.sin((frame * Math.PI * 2) / 30)) : 0;
  return (
    <Pagina gap={26}>
      <Entra desde={0}>
        <Rotulo>Por qué importa saber RCP</Rotulo>
      </Entra>
      <Entra desde={20}>
        <Titulo size={66}>Si alguien se desploma y no respira normalmente:</Titulo>
      </Entra>
      {RCP.map((r, i) => (
        <Entra key={r.n} desde={90 + i * 150}>
          <Panel acento={S.celeste} style={{ width: 920, padding: "18px 26px", display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                background: S.blanco,
                color: S.fondo,
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: r.n === 2 ? `scale(${1 + 0.15 * compresion})` : undefined,
              }}
            >
              {r.n}
            </div>
            <Emoji e={r.emoji} size={64} />
            <div style={{ fontFamily: SANS }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: S.blanco }}>{r.titulo}</div>
              <div style={{ fontSize: 32, fontWeight: 600, color: S.gris, lineHeight: 1.3 }}>{r.texto}</div>
            </div>
          </Panel>
        </Entra>
      ))}
      <Entra desde={640}>
        <Texto size={44} peso={800} color={S.celeste}>
          Cada minuto cuenta. Aprendé RCP.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0} dur={30}>
      <Crespon size={120} />
    </Entra>
    <Entra desde={15} dur={30}>
      <Titulo size={96}>Descansá en paz, Jesús</Titulo>
    </Entra>
    <Entra desde={50} dur={30}>
      <Texto size={40} color={S.gris}>
        Un abrazo a su familia, a sus compañeros y a toda la afición blanquiazul 💙🤍
      </Texto>
    </Entra>
    <Entra desde={120} dur={30}>
      <Texto size={26} color={S.gris} peso={400}>
        Datos publicados hasta el {ACTUALIZADO}. Fuentes: {FUENTES.join(" · ")}
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Marco ──────────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  portada: Portada,
  quePaso: QuePaso,
  hospital: Hospital,
  quienEra: QuienEra,
  seSabe: SeSabe,
  homenajes: Homenajes,
  rcp: Rcp,
  cierre: Cierre,
};

const Fondo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${S.fondo2} 0%, ${S.fondo} 55%)` }}>
      {/* franja azul y blanca muy tenue, que se mueve despacio */}
      <div
        style={{
          position: "absolute",
          left: -300,
          top: 1500 + Math.sin(frame / 120) * 30,
          width: 1700,
          height: 120,
          transform: "rotate(-8deg)",
          background: `linear-gradient(90deg, transparent, ${S.azul}33, ${S.blanco}22, ${S.azul}33, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Fundido lento entre páginas */
const Fundido: React.FC<{ dur: number; primera: boolean; children: React.ReactNode }> = ({ dur, primera, children }) => {
  const frame = useCurrentFrame();
  const entra = primera ? interpolate(frame, [0, 20], [0, 1], clamp) : interpolate(frame, [0, 18], [0, 1], clamp);
  const sale = interpolate(frame, [dur - 15, dur], [1, 0], clamp);
  return <AbsoluteFill style={{ opacity: Math.min(entra, sale) }}>{children}</AbsoluteFill>;
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.15)" }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 3, background: S.blanco }} />
    </div>
  );
};

const Firma: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 36, color: S.gris, border: `2px solid ${S.linea}`, borderRadius: 999, padding: "8px 30px" }}>{FIRMA}</div>
  </div>
);

export const JesusDeMiguel: React.FC = () => {
  let desde = 0;
  const secuencias = PAGINAS.map((p, i) => {
    const dur = p.seg * FPS;
    const Escena = ESCENAS[p.id];
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <Fundido dur={dur} primera={i === 0}>
          <Escena />
        </Fundido>
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill>
      <Fondo />
      {secuencias}
      <Progreso total={desde} />
      <Firma />
      {/* Música original suave y en tono menor (scripts/musica_reel.py --menor) */}
      <Html5Audio src={staticFile("audio/tenerife-musica.mp3")} volume={0.8} />
    </AbsoluteFill>
  );
};

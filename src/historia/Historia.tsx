// "Ladrillo a ladrillo": historia ilustrada de 5 minutos con varios personajes.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MANUSCRITA, SANS } from "../fuente";
import { Personaje } from "../salud/personajes";
import { FIRMA } from "../salud/pop";
import { ELENCO, ESCENAS, Escena, EnEscena, FPS } from "./datos";
import { Fondo, PISO } from "./escenarios";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = (t: number) => 1 - Math.pow(1 - t, 3);
const ALTO = 1.373; // alto del personaje respecto de su ancho

const Emoji: React.FC<{ e: string; size?: number; style?: React.CSSProperties }> = ({ e, size = 80, style }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif", ...style }}>{e}</span>
);

// ─── Personaje en escena ────────────────────────────────────────────────────
const Actor: React.FC<{ a: EnEscena; i: number }> = ({ a, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - a.desde, fps, config: { damping: 14, stiffness: 110 } });
  if (frame < a.desde) return null;
  const datos = ELENCO[a.quien] as { tipo: Parameters<typeof Personaje>[0]["tipo"]; piel?: string; pelo?: string; ropa?: string };
  const expr = a.exprLuego && frame >= a.exprLuego.desde ? a.exprLuego.expr : a.expr ?? "feliz";
  return (
    <div style={{ position: "absolute", left: a.x - a.size / 2, top: PISO - a.size * ALTO, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 80}px)` }}>
      <Personaje tipo={datos.tipo} piel={datos.piel} pelo={datos.pelo} ropa={datos.ropa} expresion={expr} size={a.size} saluda={a.saluda} fase={i * 29} />
    </div>
  );
};

// ─── Globo de diálogo ───────────────────────────────────────────────────────
const Globo: React.FC<{ a: EnEscena; texto: string; desde: number; hasta?: number }> = ({ a, texto, desde, hasta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < desde || (hasta !== undefined && frame >= hasta)) return null;
  const p = spring({ frame: frame - desde, fps, config: { damping: 12, stiffness: 160 } });
  const sale = hasta !== undefined ? interpolate(frame, [hasta - 8, hasta], [1, 0], clamp) : 1;
  const ancho = 560;
  const cx = Math.max(ancho / 2 + 30, Math.min(1080 - ancho / 2 - 30, a.x));
  const abajo = PISO - a.size * ALTO - 20;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - ancho / 2,
        top: abajo,
        width: ancho,
        transform: `translateY(-100%) scale(${p})`,
        transformOrigin: `${a.x - (cx - ancho / 2)}px 100%`,
        opacity: sale,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "5px solid #2b2d42",
          borderRadius: 40,
          padding: "20px 28px",
          fontFamily: SANS,
          fontSize: 38,
          fontWeight: 800,
          color: "#2b2d42",
          textAlign: "center",
          lineHeight: 1.2,
          boxShadow: "6px 6px 0 rgba(43,45,66,0.25)",
        }}
      >
        {texto}
      </div>
      <svg width={60} height={40} style={{ position: "absolute", left: Math.max(30, Math.min(ancho - 90, a.x - (cx - ancho / 2) - 30)), bottom: -34 }}>
        <path d="M4 0 L56 0 L20 38 Z" fill="#ffffff" stroke="#2b2d42" strokeWidth={5} strokeLinejoin="round" />
        <rect x={6} y={-6} width={48} height={10} fill="#ffffff" />
      </svg>
    </div>
  );
};

// ─── Narración ──────────────────────────────────────────────────────────────
const PASO_NARRACION = 140;

const Narracion: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  if (!e.narracion.length) return null;
  const op = interpolate(frame, [5, 20], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", top: 200, left: 60, right: 60, opacity: op }}>
      {e.rotulo && (
        <div
          style={{
            display: "inline-block",
            fontFamily: MANUSCRITA,
            fontSize: 54,
            color: "#ffffff",
            background: "#e76f51",
            borderRadius: 16,
            padding: "0 22px",
            marginBottom: 12,
            transform: "rotate(-2deg)",
          }}
        >
          {e.rotulo}
        </div>
      )}
      <div style={{ background: "rgba(255,253,246,0.94)", borderRadius: 30, padding: "22px 30px", boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}>
        {e.narracion.map((t, i) => {
          const d = 15 + i * PASO_NARRACION;
          const p = interpolate(frame, [d, d + 18], [0, 1], { ...clamp, easing: suave });
          const actual = i === e.narracion.length - 1 || frame < 15 + (i + 1) * PASO_NARRACION;
          return (
            <div
              key={i}
              style={{
                fontFamily: SANS,
                fontSize: 40,
                fontWeight: 700,
                lineHeight: 1.3,
                color: "#2b2d42",
                opacity: p * (actual ? 1 : 0.55),
                transform: `translateY(${(1 - p) * 14}px)`,
                marginTop: i ? 8 : 0,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Detalles extra de cada escena ──────────────────────────────────────────
const Extra: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  switch (e.extra) {
    case "ladrillos": {
      const n = Math.min(12, Math.floor(interpolate(frame, [60, 400], [0, 12], clamp)));
      return (
        <div style={{ position: "absolute", left: 560, top: PISO - 160, width: 180, display: "flex", flexWrap: "wrap-reverse", gap: 4 }}>
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} style={{ width: 56, height: 34, background: "#d9774a", border: "3px solid #a24f2c", borderRadius: 4 }} />
          ))}
        </div>
      );
    }
    case "costura":
      return (
        <div style={{ position: "absolute", left: 470, top: PISO - 300, transform: `translateY(${Math.sin(frame / 3) * 3}px)` }}>
          <Emoji e="🧵" size={110} />
          <Emoji e="🪡" size={80} style={{ marginLeft: -20, display: "inline-block", transform: `rotate(${Math.sin(frame / 4) * 15}deg)` }} />
        </div>
      );
    case "pizarron":
      return (
        <div style={{ position: "absolute", left: 440, top: 1100, width: 400, height: 150, background: "#2f5d50", border: "10px solid #8d6e4a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 56, color: "#ffffff" }}>7 × 8 = 56 ✔</div>
        </div>
      );
    case "libros": {
      const formulas = ["∑", "π", "💉", "🧪", "📖", "🩺"];
      return (
        <>
          <div style={{ position: "absolute", left: 640, top: PISO - 330 }}>
            <Emoji e="📚" size={120} />
          </div>
          {formulas.map((f, i) => {
            const t = ((frame + i * 40) % 240) / 240;
            return (
              <div key={f} style={{ position: "absolute", left: 300 + i * 90, top: 1000 - t * 260, opacity: Math.sin(t * Math.PI), fontFamily: SANS, fontSize: 60, fontWeight: 800, color: "#5b3a8c" }}>
                {f}
              </div>
            );
          })}
        </>
      );
    }
    case "birrete":
      return (
        <>
          <div style={{ position: "absolute", left: 480, top: PISO - 330 * ALTO - 40, transform: `rotate(-10deg) translateY(${Math.sin(frame / 10) * 4}px)` }}>
            <Emoji e="🎓" size={110} />
          </div>
          {Array.from({ length: 40 }).map((_, i) => {
            const y = ((frame * (4 + (i % 4)) + i * 97) % 1500) + 450;
            const x = (i * 131) % 1080 + Math.sin(frame / 15 + i) * 20;
            return <div key={i} style={{ position: "absolute", left: x, top: y, width: 16, height: 26, background: ["#e76f51", "#2a9d8f", "#f4a261", "#8b6cff", "#74acdf"][i % 5], transform: `rotate(${frame * 6 + i * 40}deg)`, opacity: 0.9 }} />;
          })}
        </>
      );
    case "herramientas":
      return (
        <div style={{ position: "absolute", left: e.id === "trabajo" ? 640 : 860, top: PISO - 140, display: "flex", gap: 6 }}>
          <Emoji e="🔧" size={70} />
          <Emoji e="⚡" size={70} style={{ opacity: 0.5 + 0.5 * Math.abs(Math.sin(frame / 6)) }} />
          <Emoji e="💡" size={70} />
        </div>
      );
    default:
      return null;
  }
};

// ─── Escenas especiales: título, reflexión y cierre ─────────────────────────
const Titulo: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame, [10, 90], [0, 10], clamp));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 600 }}>
      <div style={{ background: "rgba(255,253,246,0.95)", borderRadius: 40, padding: "40px 50px", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20, height: 40 }}>
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} style={{ width: 60, height: 36, background: "#d9774a", border: "3px solid #a24f2c", borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ fontFamily: MANUSCRITA, fontSize: 150, color: "#b23a48", lineHeight: 0.95, opacity: interpolate(frame, [20, 40], [0, 1], clamp) }}>Ladrillo a ladrillo</div>
        <div style={{ fontFamily: SANS, fontSize: 52, fontWeight: 800, color: "#2b2d42", marginTop: 14, opacity: interpolate(frame, [50, 70], [0, 1], clamp) }}>La historia de Lucía</div>
        <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 500, color: "#6b6f86", marginTop: 14, opacity: interpolate(frame, [80, 100], [0, 1], clamp) }}>
          Historia ficticia, inspirada en muchas historias reales
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Reflexion: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  const pilares = ["👨‍👩‍👧‍👦 Familia", "🏫 Escuela pública", "👩‍🏫 Una maestra", "🎓 Una beca", "💪 Trabajo"];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 520, gap: 30, padding: "0 70px 520px" }}>
      {e.narracion.map((t, i) => (
        <div
          key={i}
          style={{
            fontFamily: i === 0 ? MANUSCRITA : SANS,
            fontSize: i === 0 ? 120 : 46,
            fontWeight: i === 0 ? 700 : 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            opacity: interpolate(frame, [15 + i * 110, 40 + i * 110], [0, 1], clamp),
          }}
        >
          {t}
        </div>
      ))}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, width: 960 }}>
        {pilares.map((p, i) => (
          <div
            key={p}
            style={{
              fontFamily: SANS,
              fontSize: 36,
              fontWeight: 800,
              color: "#2b2d42",
              background: "rgba(255,253,246,0.92)",
              borderRadius: 999,
              padding: "12px 26px",
              opacity: interpolate(frame, [260 + i * 25, 280 + i * 25], [0, 1], clamp),
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 34, padding: "0 70px 560px" }}>
      <div style={{ fontFamily: SANS, fontSize: 76, fontWeight: 800, color: "#ffffff", textAlign: "center", lineHeight: 1.15, textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        ¿Conocés una historia así?
      </div>
      <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 700, color: "#ffe6a8", textAlign: "center", opacity: interpolate(frame, [20, 40], [0, 1], clamp) }}>
        Contala en los comentarios 💬
      </div>
      <div style={{ display: "flex", gap: 24, opacity: interpolate(frame, [50, 70], [0, 1], clamp) }}>
        {[
          { e: "🔖", t: "Guardalo", c: "#2a9d8f" },
          { e: "📲", t: "Compartilo", c: "#e76f51" },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: "#ffffff", borderRadius: 999, padding: "14px 32px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={44} />
            {b.t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Escena genérica ────────────────────────────────────────────────────────
const VistaEscena: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  const dur = e.seg * FPS;
  const negro = interpolate(frame, [0, 14, dur - 14, dur], [1, 0, 0, 1], clamp);
  return (
    <AbsoluteFill>
      <Fondo escenario={e.escenario} />
      {e.id === "titulo" ? (
        <Titulo />
      ) : e.id === "reflexion" ? (
        <Reflexion e={e} />
      ) : e.id === "cierre" ? (
        <Cierre />
      ) : (
        <>
          <Extra e={e} />
          {e.personajes.map((a, i) => (
            <Actor key={a.quien + i} a={a} i={i} />
          ))}
          {(e.dialogos ?? []).map((d, i) => (
            <Globo key={i} a={e.personajes[d.quien]} texto={d.texto} desde={d.desde} hasta={d.hasta} />
          ))}
          <Narracion e={e} />
        </>
      )}
      <AbsoluteFill style={{ background: "#000", opacity: negro, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.5)" }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 4, background: "#e76f51" }} />
    </div>
  );
};

export const Historia: React.FC = () => {
  let desde = 0;
  const secuencias = ESCENAS.map((e, i) => {
    const dur = e.seg * FPS;
    const seq = (
      <Sequence key={e.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${e.id}`}>
        <VistaEscena e={e} />
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {secuencias}
      <Progreso total={desde} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: "#2b2d42", background: "rgba(255,253,246,0.9)", borderRadius: 999, padding: "8px 30px" }}>{FIRMA}</div>
      </div>
      {/* Música original: primera mitad en tono menor, segunda en mayor (ver README) */}
      <Html5Audio src={staticFile("audio/historia-musica.mp3")} volume={0.8} />
    </AbsoluteFill>
  );
};

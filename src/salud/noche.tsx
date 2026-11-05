// Estilo "noche": cielo azul oscuro con estrellas que titilan, estrellas fugaces y una luna
// que brilla; tarjetas translúcidas que flotan, textos claros con brillo suave y fundidos
// lentos. Misma interfaz que el estilo "calma" (src/salud/calma.tsx), así las escenas
// pueden usar uno u otro cambiando solo el import.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SANS } from "../fuente";
import { FIRMA } from "./pop";

export { SANS, FIRMA };

export const C = {
  texto: "#f1f0ff",
  texto2: "#b8b6e0",
  violeta: "#b69cff",
  verde: "#7ee0c3",
  coral: "#ff9e8f",
  azul: "#8fb8ff",
  amarillo: "#ffd98a",
  blanco: "#ffffff",
  /** texto oscuro para poner sobre botones claros */
  oscuro: "#0b1030",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** Aparece despacio, flotando hacia arriba */
export const Entra: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; dur?: number; dx?: number }> = ({
  desde,
  children,
  style,
  dur = 26,
  dx = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 1], { ...clamp, easing: suave });
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * 40}px)`, filter: `blur(${(1 - p) * 6}px)`, ...style }}>{children}</div>;
};

export const Titulo: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 96, color = C.texto }) => (
  <div
    style={{
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.08,
      color,
      textAlign: "center",
      letterSpacing: -2,
      textWrap: "balance",
      textShadow: "0 0 30px rgba(182,156,255,0.35)",
    }}
  >
    {children}
  </div>
);

export const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({ children, size = 44, color = C.texto, peso = 600 }) => (
  <div style={{ fontFamily: SANS, fontWeight: peso, fontSize: size, lineHeight: 1.35, color, textAlign: "center", textWrap: "balance" }}>{children}</div>
);

/** Palabra resaltada con brillo, como luz de luna */
export const Resalta: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.violeta }) => (
  <span style={{ color, textShadow: `0 0 24px ${color}aa`, backgroundImage: `linear-gradient(transparent 70%, ${color}40 70%)`, padding: "0 6px" }}>{children}</span>
);

/** Tarjeta translúcida que flota apenas */
export const Tarjeta: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; color?: string }> = ({ children, style, color = C.violeta }) => {
  const frame = useCurrentFrame();
  const flota = Math.sin(frame / 40) * 3;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: `2px solid ${color}55`,
        borderRadius: 36,
        boxShadow: `0 0 40px ${color}22, inset 0 0 30px rgba(255,255,255,0.04)`,
        transform: `translateY(${flota}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 70 }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}>{e}</span>
);

export const Lista: React.FC<{ items: { emoji: string; texto: string }[]; desde: number; paso: number; color?: string; size?: number }> = ({
  items,
  desde,
  paso,
  color = C.violeta,
  size = 42,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
    {items.map((it, i) => (
      <Entra key={it.texto} desde={desde + i * paso} dx={-40}>
        <Tarjeta color={color} style={{ width: 920, padding: "18px 28px", display: "flex", alignItems: "center", gap: 24 }}>
          <Emoji e={it.emoji} size={66} />
          <div style={{ fontFamily: SANS, fontSize: size, fontWeight: 700, color: C.texto, lineHeight: 1.25 }}>{it.texto}</div>
        </Tarjeta>
      </Entra>
    ))}
  </div>
);

export const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 36, centro = false }) => (
  <AbsoluteFill
    style={{
      top: 200,
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

// ─── Marco: el cielo ────────────────────────────────────────────────────────
const ESTRELLAS = Array.from({ length: 80 }).map((_, i) => ({
  x: (i * 263 + 37) % 1080,
  y: (i * 431 + 91) % 1920,
  r: 1.5 + ((i * 7) % 5) * 0.6,
  fase: (i * 1.7) % 6.28,
  vel: 30 + ((i * 13) % 40),
}));

const Cielo: React.FC = () => {
  const frame = useCurrentFrame();
  // estrella fugaz cada 8 segundos
  const ciclo = frame % 240;
  const fugaz = interpolate(ciclo, [0, 25], [0, 1], clamp);
  const fx = 200 + 600 * fugaz + ((Math.floor(frame / 240) * 173) % 300);
  const fy = 150 + 300 * fugaz;
  const flotaLuna = Math.sin(frame / 90) * 10;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #070a24 0%, #121842 45%, #2a2464 100%)", overflow: "hidden" }}>
      {ESTRELLAS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: "50%",
            background: "#ffffff",
            opacity: 0.35 + 0.65 * ((Math.sin(frame / s.vel + s.fase) + 1) / 2),
            boxShadow: "0 0 6px #ffffff",
          }}
        />
      ))}
      {ciclo < 25 && (
        <div
          style={{
            position: "absolute",
            left: fx,
            top: fy,
            width: 180,
            height: 3,
            transform: "rotate(27deg)",
            transformOrigin: "100% 50%",
            background: "linear-gradient(90deg, transparent, #ffffff)",
            opacity: 1 - fugaz * 0.6,
          }}
        />
      )}
      {/* luna creciente con brillo */}
      <div style={{ position: "absolute", right: 50, top: 92 + flotaLuna * 0.4, width: 104, height: 104 }}>
        <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,200,0.35) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #fff7d6, #f1dc9e)" }} />
        <div style={{ position: "absolute", left: 28, top: -10, width: 104, height: 104, borderRadius: "50%", background: "#0b0f2c" }} />
      </div>
      {/* bruma suave abajo */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 500, background: "linear-gradient(180deg, transparent, rgba(182,156,255,0.12))" }} />
    </AbsoluteFill>
  );
};

const Fundido: React.FC<{ dur: number; primera: boolean; children: React.ReactNode }> = ({ dur, primera, children }) => {
  const frame = useCurrentFrame();
  const entra = primera ? 1 : interpolate(frame, [0, 22], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 16, dur], [1, 0], clamp);
  return <AbsoluteFill style={{ opacity: Math.min(entra, sale), transform: `translateY(${(1 - entra) * 30}px)` }}>{children}</AbsoluteFill>;
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.15)" }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 3, background: C.amarillo, boxShadow: `0 0 12px ${C.amarillo}` }} />
    </div>
  );
};

const Firma: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.texto, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: "8px 30px" }}>
      {FIRMA}
    </div>
  </div>
);

export type PaginaNoche = { id: string; seg: number; Escena: React.FC };

export const ReelNoche: React.FC<{ paginas: PaginaNoche[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
  let desde = 0;
  const secuencias = paginas.map((p, i) => {
    const dur = p.seg * fps;
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <Fundido dur={dur} primera={i === 0}>
          <p.Escena />
        </Fundido>
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill>
      <Cielo />
      {secuencias}
      <Progreso total={desde} />
      <Firma />
      {musica && <Html5Audio src={musica} volume={0.8} />}
    </AbsoluteFill>
  );
};

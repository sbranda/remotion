// Estilo "llamativo" de la serie de salud: fondo oscuro animado, neón, textos con golpe y marcador.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS } from "../fuente";

export { SANS };

/** Paleta neón sobre fondo oscuro */
export const P = {
  fondo1: "#071630",
  fondo2: "#0f2f5e",
  texto: "#ffffff",
  texto2: "#b9c8e6",
  rojo: "#ff4d5e",
  verde: "#2ee59d",
  amarillo: "#ffd23f",
  cian: "#3ad7ff",
  violeta: "#8b5cff",
  vidrio: "rgba(255,255,255,0.08)",
  borde: "rgba(255,255,255,0.16)",
};

/** Usuario que aparece al pie de todas las páginas */
export const FIRMA = "@sebranda";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** Resorte con rebote: para "golpes" de texto */
export const useGolpe = (desde: number, rebote = 9) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: rebote, stiffness: 160, mass: 0.7 } });
};

/** Sacudida corta a partir de `desde` */
export const useSacudida = (desde: number, fuerza = 14, dur = 14) => {
  const frame = useCurrentFrame();
  const t = frame - desde;
  if (t < 0 || t > dur) return 0;
  return Math.sin(t * 2.6) * fuerza * (1 - t / dur);
};

// ─── Piezas de estilo ───────────────────────────────────────────────────────

/** Texto que entra con golpe (escala con rebote + leve giro) */
export const Golpe: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; giro?: number }> = ({
  desde,
  children,
  style,
  giro = 0,
}) => {
  const p = useGolpe(desde);
  const frame = useCurrentFrame();
  const op = interpolate(frame, [desde, desde + 4], [0, 1], clamp);
  return (
    <div style={{ opacity: op, transform: `scale(${0.3 + 0.7 * p}) rotate(${giro * (1 - p)}deg)`, ...style }}>{children}</div>
  );
};

/** Palabra resaltada con "marcador" que se pinta de izquierda a derecha */
export const Marcador: React.FC<{ desde: number; color: string; children: React.ReactNode; texto?: string }> = ({
  desde,
  color,
  children,
  texto = "#071630",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 10], [0, 1], { ...clamp, easing: suave });
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${p * 100}% 100%`,
        color: p > 0.5 ? texto : "inherit",
        padding: "0 14px",
        borderRadius: 12,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
};

export const Grande: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  size = 110,
  color = P.texto,
  style,
}) => (
  <div
    style={{
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: -2,
      color,
      textAlign: "center",
      textWrap: "balance",
      textShadow: "0 6px 30px rgba(0,0,0,0.35)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chico: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 46, color = P.texto }) => (
  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, lineHeight: 1.3, color, textAlign: "center", textWrap: "balance" }}>
    {children}
  </div>
);

/** Tarjeta de vidrio con borde y brillo del color indicado */
export const Vidrio: React.FC<{ color?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ color = P.cian, children, style }) => (
  <div
    style={{
      background: P.vidrio,
      border: `3px solid ${color}`,
      borderRadius: 32,
      boxShadow: `0 0 40px ${color}55, inset 0 0 30px ${color}22`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Emoji: React.FC<{ e: string; size?: number; style?: React.CSSProperties }> = ({ e, size = 90, style }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif", ...style }}>
    {e}
  </span>
);

/** Zona útil: libre arriba (cabecera de Instagram) y el tercio inferior (descripción y botones) */
export const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 44, centro = false }) => (
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

export const Fila: React.FC<{ desde: number; emoji: string; color: string; flecha: string; numero?: number; children: React.ReactNode }> = ({
  desde,
  emoji,
  color,
  flecha,
  numero,
  children,
}) => {
  const p = useGolpe(desde, 11);
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: frame >= desde ? 1 : 0, transform: `translateX(${(1 - p) * -500}px) scale(${0.8 + 0.2 * p})` }}>
      <Vidrio color={color} style={{ width: 940, padding: "14px 24px", display: "flex", alignItems: "center", gap: 22 }}>
        {numero !== undefined && (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: color,
              color: "#071630",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {numero}
          </div>
        )}
        <Emoji e={emoji} size={72} />
        <div style={{ flex: 1, fontFamily: SANS, fontSize: 40, fontWeight: 700, color: P.texto, lineHeight: 1.2 }}>{children}</div>
        <div style={{ fontFamily: SANS, fontSize: 60, fontWeight: 800, color, textShadow: `0 0 20px ${color}` }}>{flecha}</div>
      </Vidrio>
    </div>
  );
};

export const Boton: React.FC<{ desde: number; emoji: string; texto: string; color: string }> = ({ desde, emoji, texto, color }) => {
  const p = useGolpe(desde, 8);
  const frame = useCurrentFrame();
  const pulso = 1 + 0.05 * Math.max(0, Math.sin((frame - desde) / 5));
  return (
    <div
      style={{
        transform: `scale(${p * pulso})`,
        background: color,
        borderRadius: 999,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 48,
        color: "#071630",
        boxShadow: `0 0 40px ${color}99`,
      }}
    >
      <Emoji e={emoji} size={56} />
      {texto}
    </div>
  );
};

// ─── Fondo, transiciones y marco del Reel ──────────────────────────────────────
const Fondo: React.FC = () => {
  const frame = useCurrentFrame();
  const manchas = [
    { color: P.violeta, x: 200, y: 400, r: 520, fx: 0.011, fy: 0.008 },
    { color: P.cian, x: 880, y: 900, r: 480, fx: 0.009, fy: 0.012 },
    { color: P.rojo, x: 300, y: 1500, r: 460, fx: 0.013, fy: 0.007 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${P.fondo2} 0%, ${P.fondo1} 60%)`, overflow: "hidden" }}>
      {manchas.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: m.x + Math.sin(frame * m.fx + i) * 160 - m.r,
            top: m.y + Math.cos(frame * m.fy + i * 2) * 160 - m.r,
            width: m.r * 2,
            height: m.r * 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${m.color}55 0%, transparent 65%)`,
          }}
        />
      ))}
      {/* puntitos de "partículas" */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = (i * 137) % 1080;
        const y = (((i * 263 - frame * (0.6 + (i % 4) * 0.3)) % 1920) + 1920) % 1920;
        return <div key={`p${i}`} style={{ position: "absolute", left: x, top: y, width: 6, height: 6, borderRadius: 3, background: "#ffffff33" }} />;
      })}
    </AbsoluteFill>
  );
};

const Transicion: React.FC<{ dur: number; children: React.ReactNode; primera: boolean }> = ({ dur, children, primera }) => {
  const frame = useCurrentFrame();
  const entra = primera ? 1 : interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 8, dur], [0, 1], clamp);
  const zoom = interpolate(frame, [0, dur], [1, 1.04]); // zoom lento y continuo
  const escala = (primera ? 1 : 1.25 - 0.25 * entra) * zoom * (1 - 0.15 * sale);
  return (
    <AbsoluteFill style={{ opacity: Math.min(entra, 1 - sale), transform: `scale(${escala})` }}>{children}</AbsoluteFill>
  );
};

const Destello: React.FC<{ inicios: number[] }> = ({ inicios }) => {
  const frame = useCurrentFrame();
  const op = Math.max(0, ...inicios.map((s) => interpolate(frame, [s - 1, s + 1, s + 7], [0, 0.45, 0], clamp)));
  return <AbsoluteFill style={{ background: "#fff", opacity: op, pointerEvents: "none" }} />;
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const v = frame / total;
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.15)" }}>
      <div
        style={{
          width: `${v * 100}%`,
          height: "100%",
          borderRadius: 5,
          background: `linear-gradient(90deg, ${P.cian}, ${P.verde}, ${P.amarillo})`,
          boxShadow: `0 0 16px ${P.cian}`,
        }}
      />
    </div>
  );
};

/** Usuario al pie, fijo en todo el video (por encima de la zona de botones de Instagram) */
const Firma: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [10, 25], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center", opacity: op }}>
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 1,
          color: P.texto,
          background: "rgba(7,22,48,0.55)",
          border: `2px solid ${P.borde}`,
          borderRadius: 999,
          padding: "10px 34px",
          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        {FIRMA}
      </div>
    </div>
  );
};

export type PaginaPop = { id: string; seg: number; Escena: React.FC };

/** Reel completo: fondo, páginas con transición y destello, progreso, firma y música */
export const ReelPop: React.FC<{ paginas: PaginaPop[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
  let desde = 0;
  const inicios: number[] = [];
  const secuencias = paginas.map((p, i) => {
    const dur = p.seg * fps;
    if (i > 0) inicios.push(desde);
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <Transicion dur={dur} primera={i === 0}>
          <p.Escena />
        </Transicion>
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill>
      <Fondo />
      {secuencias}
      <Destello inicios={inicios} />
      <Progreso total={desde} />
      <Firma />
      {musica && <Html5Audio src={musica} volume={0.9} />}
    </AbsoluteFill>
  );
};

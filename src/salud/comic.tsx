// Estilo "cómic / pop art": fondos de color con trama de puntos, bordes negros gruesos,
// sombras duras, stickers torcidos, globos de diálogo y onomatopeyas en las transiciones.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COMIC, SANS } from "../fuente";
import { FIRMA } from "./pop";

export { COMIC, SANS, FIRMA };

export const K = {
  negro: "#111111",
  blanco: "#ffffff",
  amarillo: "#ffe14d",
  celeste: "#4dd2ff",
  rosa: "#ff6fb5",
  lima: "#b6f34d",
  naranja: "#ff9f43",
  violeta: "#b49bff",
  rojo: "#ff3b3b",
  verde: "#2fd27a",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Resorte con rebote (0 → 1) */
export const useRebote = (desde: number, rebote = 9) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: rebote, stiffness: 170, mass: 0.7 } });
};

export const useSacudida = (desde: number, fuerza = 14, dur = 14) => {
  const frame = useCurrentFrame();
  const t = frame - desde;
  if (t < 0 || t > dur) return 0;
  return Math.sin(t * 2.6) * fuerza * (1 - t / dur);
};

/** Aparece con rebote y un leve giro */
export const Pop: React.FC<{ desde: number; children: React.ReactNode; giro?: number; style?: React.CSSProperties }> = ({
  desde,
  children,
  giro = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = useRebote(desde);
  if (frame < desde) return null;
  return <div style={{ transform: `scale(${p}) rotate(${giro}deg)`, ...style }}>{children}</div>;
};

/** Título de cómic: letras blancas con contorno negro y sombra dura */
export const TituloComic: React.FC<{ children: React.ReactNode; size?: number; color?: string; giro?: number }> = ({
  children,
  size = 120,
  color = K.blanco,
  giro = -2,
}) => (
  <div
    style={{
      fontFamily: COMIC,
      fontSize: size,
      lineHeight: 0.95,
      letterSpacing: 2,
      color,
      WebkitTextStroke: `${Math.max(4, size / 22)}px ${K.negro}`,
      paintOrder: "stroke fill",
      textShadow: `${size / 16}px ${size / 16}px 0 ${K.negro}`,
      textAlign: "center",
      transform: `rotate(${giro}deg)`,
      textWrap: "balance",
    }}
  >
    {children}
  </div>
);

/** Tarjeta "sticker" con borde negro y sombra dura */
export const Sticker: React.FC<{ color?: string; children: React.ReactNode; style?: React.CSSProperties; giro?: number }> = ({
  color = K.blanco,
  children,
  style,
  giro = 0,
}) => (
  <div
    style={{
      background: color,
      border: `6px solid ${K.negro}`,
      borderRadius: 24,
      boxShadow: `10px 10px 0 ${K.negro}`,
      transform: `rotate(${giro}deg)`,
      fontFamily: SANS,
      color: K.negro,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 80 }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}>{e}</span>
);

/** Globo de diálogo con colita */
export const Globo: React.FC<{ children: React.ReactNode; size?: number; ancho?: number; color?: string }> = ({
  children,
  size = 48,
  ancho = 860,
  color = K.blanco,
}) => (
  <div style={{ position: "relative", width: ancho }}>
    <div
      style={{
        background: color,
        border: `6px solid ${K.negro}`,
        borderRadius: 60,
        padding: "30px 40px",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.2,
        color: K.negro,
        textAlign: "center",
        boxShadow: `8px 8px 0 ${K.negro}`,
        textWrap: "balance",
      }}
    >
      {children}
    </div>
    <svg width={90} height={70} viewBox="0 0 90 70" style={{ position: "absolute", left: 120, bottom: -60 }}>
      <path d="M6 0 L84 0 L20 64 Z" fill={color} stroke={K.negro} strokeWidth={6} strokeLinejoin="round" />
      <rect x={10} y={-8} width={70} height={12} fill={color} />
    </svg>
  </div>
);

/** Sello tipo "MITO" con golpe */
export const Sello: React.FC<{ desde: number; texto: string; color: string; size?: number }> = ({ desde, texto, color, size = 70 }) => {
  const frame = useCurrentFrame();
  const p = useRebote(desde, 12);
  if (frame < desde) return null;
  return (
    <div
      style={{
        transform: `scale(${2.2 - 1.2 * p}) rotate(-12deg)`,
        opacity: Math.min(1, p * 2),
        border: `7px solid ${color}`,
        color,
        background: K.blanco,
        borderRadius: 14,
        padding: "0 22px",
        fontFamily: COMIC,
        fontSize: size,
        letterSpacing: 3,
        boxShadow: `6px 6px 0 ${K.negro}`,
      }}
    >
      {texto}
    </div>
  );
};

/** Lista de stickers con emoji que entran de a uno, alternando el giro */
export const ListaStickers: React.FC<{
  items: { emoji: string; texto: string }[];
  desde: number;
  paso: number;
  colores: string[];
  size?: number;
}> = ({ items, desde, paso, colores, size = 42 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
    {items.map((it, i) => (
      <Pop key={it.texto} desde={desde + i * paso} giro={i % 2 ? 1.5 : -1.5}>
        <Sticker color={colores[i % colores.length]} style={{ width: 900, padding: "16px 26px", display: "flex", alignItems: "center", gap: 22 }}>
          <Emoji e={it.emoji} size={70} />
          <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.2 }}>{it.texto}</div>
        </Sticker>
      </Pop>
    ))}
  </div>
);

/** Zona útil: libre arriba (cabecera de Instagram) y el tercio inferior (descripción y botones) */
export const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 40, centro = false }) => (
  <AbsoluteFill
    style={{
      top: 200,
      bottom: 500,
      left: 60,
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

export const Boton: React.FC<{ desde: number; emoji: string; texto: string; color: string }> = ({ desde, emoji, texto, color }) => {
  const frame = useCurrentFrame();
  const pulso = 1 + 0.05 * Math.max(0, Math.sin((frame - desde) / 5));
  return (
    <Pop desde={desde}>
      <div style={{ transform: `scale(${pulso})` }}>
        <Sticker color={color} style={{ borderRadius: 999, padding: "16px 36px", display: "flex", alignItems: "center", gap: 14 }}>
          <Emoji e={emoji} size={52} />
          <span style={{ fontFamily: COMIC, fontSize: 60, letterSpacing: 2 }}>{texto}</span>
        </Sticker>
      </div>
    </Pop>
  );
};

// ─── Marco del Reel ─────────────────────────────────────────────────────────
const Fondo: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: color, overflow: "hidden" }}>
      {/* rayos que giran despacio */}
      <div
        style={{
          position: "absolute",
          left: -600,
          top: -200,
          width: 2280,
          height: 2280,
          background: `repeating-conic-gradient(from ${frame * 0.15}deg at 50% 50%, rgba(255,255,255,0.22) 0deg 10deg, transparent 10deg 20deg)`,
        }}
      />
      {/* trama de puntos de historieta */}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.13) 3px, transparent 3.5px)",
          backgroundSize: "26px 26px",
        }}
      />
    </AbsoluteFill>
  );
};

const ONOMATOPEYAS = ["¡ZAS!", "¡PUM!", "¡BOOM!", "¡ZOOM!", "¡PAF!", "¡WOW!"];

const Explosion: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 6, 14, 20], [0, 1.1, 1, 0], clamp);
  if (p <= 0) return null;
  const puntas = 14;
  const d =
    Array.from({ length: puntas * 2 })
      .map((_, i) => {
        const r = i % 2 ? 150 : 260;
        const a = (i / (puntas * 2)) * Math.PI * 2;
        return `${i ? "L" : "M"}${(300 + Math.cos(a) * r).toFixed(1)} ${(300 + Math.sin(a) * r).toFixed(1)}`;
      })
      .join(" ") + " Z";
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ position: "relative", width: 600, height: 600, transform: `scale(${p}) rotate(-10deg)`, marginBottom: 300 }}>
        <svg width={600} height={600} viewBox="0 0 600 600" style={{ position: "absolute", inset: 0 }}>
          <path d={d} fill={K.amarillo} stroke={K.negro} strokeWidth={10} strokeLinejoin="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TituloComic size={130} color={K.rojo} giro={0}>
            {texto}
          </TituloComic>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Entrada en diagonal: la página nueva barre a la anterior */
const Barrido: React.FC<{ primera: boolean; color: string; children: React.ReactNode }> = ({ primera, color, children }) => {
  const frame = useCurrentFrame();
  const p = primera ? 1 : interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  // polígono que avanza de izquierda a derecha en diagonal
  const x = -40 + p * 180;
  const clip = `polygon(${x - 40}% 0, ${x}% 0, ${x - 40}% 100%, ${x - 80}% 100%)`;
  const lleno = p >= 1;
  return (
    <AbsoluteFill style={{ clipPath: lleno ? undefined : `polygon(0 0, ${x}% 0, ${x - 40}% 100%, 0 100%)` }}>
      <Fondo color={color} />
      {children}
      {!lleno && <AbsoluteFill style={{ background: K.negro, clipPath: clip }} />}
    </AbsoluteFill>
  );
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 56, left: 60, right: 60, height: 22, borderRadius: 11, background: K.blanco, border: `5px solid ${K.negro}` }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 8, background: K.rojo }} />
    </div>
  );
};

const Firma: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
    <div
      style={{
        background: K.negro,
        color: K.blanco,
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 40,
        borderRadius: 999,
        padding: "10px 34px",
        transform: "rotate(-2deg)",
        boxShadow: `6px 6px 0 ${K.blanco}`,
      }}
    >
      {FIRMA}
    </div>
  </div>
);

export type PaginaComic = { id: string; seg: number; color: string; Escena: React.FC };

export const ReelComic: React.FC<{ paginas: PaginaComic[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
  let desde = 0;
  const secuencias = paginas.map((p, i) => {
    const dur = p.seg * fps;
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <Barrido primera={i === 0} color={p.color}>
          <p.Escena />
        </Barrido>
        {i > 0 && <Explosion texto={ONOMATOPEYAS[(i - 1) % ONOMATOPEYAS.length]} />}
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  return (
    <AbsoluteFill style={{ background: K.negro }}>
      {secuencias}
      <Progreso total={desde} />
      <Firma />
      {musica && <Html5Audio src={musica} volume={0.9} />}
    </AbsoluteFill>
  );
};

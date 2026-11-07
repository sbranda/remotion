// Estilo "cuaderno": hoja rayada con margen rojo, letra manuscrita que se escribe sola,
// resaltado con fibrón, notas pegadas y cambio de página como al pasar la hoja.
// (Mismo estilo que el Reel del papel que llega a la Luna, en versión reutilizable.)
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MANUSCRITA, SANS } from "../fuente";
import { FIRMA } from "./pop";

export { MANUSCRITA, SANS };

export const K = {
  papel: "#fdfbf3",
  renglon: "#bcd4ee",
  margen: "#f08a8a",
  tinta: "#1f3a68",
  lapiz: "#3a3a3a",
  rojo: "#e04848",
  verde: "#2f9e5b",
  amarillo: "#ffe066",
  celeste: "#cdeffd",
  rosa: "#ffd6e0",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

export const Pop: React.FC<{ desde: number; children: React.ReactNode; giro?: number; style?: React.CSSProperties }> = ({ desde, children, giro = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - desde, fps, config: { damping: 11, stiffness: 150, mass: 0.7 } });
  if (frame < desde) return null;
  return <div style={{ transform: `scale(${p}) rotate(${giro}deg)`, ...style }}>{children}</div>;
};

/** Texto manuscrito que se escribe de izquierda a derecha */
export const Escribe: React.FC<{ desde: number; children: React.ReactNode; size?: number; color?: string; dur?: number }> = ({ desde, children, size = 100, color = K.tinta, dur = 22 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 100], clamp);
  return (
    <div style={{ fontFamily: MANUSCRITA, fontWeight: 700, fontSize: size, lineHeight: 1.05, color, textAlign: "center", clipPath: `inset(0 ${100 - p}% 0 0)`, textWrap: "balance" }}>
      {children}
    </div>
  );
};

export const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({ children, size = 46, color = K.lapiz, peso = 600 }) => (
  <div style={{ fontFamily: SANS, fontWeight: peso, fontSize: size, lineHeight: 1.35, color, textAlign: "center", textWrap: "balance" }}>{children}</div>
);

export const Fibron: React.FC<{ children: React.ReactNode; desde: number; color?: string }> = ({ children, desde, color = K.amarillo }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 12], [0, 100], clamp);
  return (
    <span style={{ backgroundImage: `linear-gradient(${color}, ${color})`, backgroundRepeat: "no-repeat", backgroundSize: `${p}% 70%`, backgroundPosition: "0 85%", padding: "0 8px" }}>
      {children}
    </span>
  );
};

export const Emoji: React.FC<{ e: string; size?: number; style?: React.CSSProperties }> = ({ e, size = 80, style }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif", ...style }}>{e}</span>
);

export const Nota: React.FC<{ children: React.ReactNode; color?: string; giro?: number; ancho?: number }> = ({ children, color = "#fff3a6", giro = -2, ancho = 840 }) => (
  <div style={{ width: ancho, background: color, padding: "22px 30px", transform: `rotate(${giro}deg)`, boxShadow: "6px 10px 20px rgba(0,0,0,0.12)" }}>{children}</div>
);

/** Ítem de lista tildado a mano */
export const Tilde: React.FC<{ desde: number; children: React.ReactNode; color?: string; marca?: string }> = ({ desde, children, color = K.verde, marca = "✔" }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 14], [0, 1], { ...clamp, easing: suave });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, width: 820, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
      <div style={{ fontFamily: MANUSCRITA, fontSize: 64, color, width: 50, textAlign: "center" }}>{marca}</div>
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 600, color: K.tinta, lineHeight: 1.25 }}>{children}</div>
    </div>
  );
};

export const Pagina: React.FC<{ children: React.ReactNode; gap?: number; centro?: boolean }> = ({ children, gap = 34, centro = false }) => (
  <AbsoluteFill style={{ top: 200, bottom: 500, left: 150, right: 60, width: "auto", height: "auto", flexDirection: "column", alignItems: "center", justifyContent: centro ? "center" : "flex-start", gap }}>
    {children}
  </AbsoluteFill>
);

const Hoja: React.FC = () => (
  <AbsoluteFill
    style={{
      background: K.papel,
      backgroundImage: `linear-gradient(90deg, transparent 118px, ${K.margen} 118px, ${K.margen} 122px, transparent 122px), repeating-linear-gradient(180deg, transparent 0 62px, ${K.renglon} 62px 64px)`,
    }}
  />
);

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

export type PaginaCuaderno = { id: string; seg: number; Escena: React.FC };

export const ReelCuaderno: React.FC<{ paginas: PaginaCuaderno[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
  let desde = 0;
  const secuencias = paginas.map((p, i) => {
    const dur = p.seg * fps;
    const seq = (
      <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
        <PasarHoja dur={dur} primera={i === 0}>
          <Hoja />
          <p.Escena />
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
      {musica && <Html5Audio src={musica} volume={0.8} />}
    </AbsoluteFill>
  );
};

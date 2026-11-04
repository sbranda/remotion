// Estilo "calma": fondo pastel que cambia despacio, burbujas suaves, tarjetas blancas
// redondeadas, entradas lentas y sin destellos. Pensado para temas como la ansiedad.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SANS } from "../fuente";
import { FIRMA } from "./pop";

export { SANS, FIRMA };

export const C = {
  texto: "#2b2d42",
  texto2: "#5c5f7a",
  violeta: "#7b61ff",
  verde: "#2a9d8f",
  coral: "#ff7b6b",
  azul: "#3a86ff",
  amarillo: "#f4a261",
  blanco: "#ffffff",
};

/** Paletas de fondo (arriba, abajo) que se van mezclando */
const FONDOS = [
  ["#e7defc", "#c8b6ff"],
  ["#d9f5ee", "#a8e6d8"],
  ["#ffe8d6", "#ffc8a8"],
  ["#dceaff", "#b4d0ff"],
];

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** Aparece despacio, subiendo un poco */
export const Entra: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; dur?: number; dx?: number }> = ({
  desde,
  children,
  style,
  dur = 22,
  dx = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 1], { ...clamp, easing: suave });
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * 30}px)`, ...style }}>{children}</div>;
};

export const Titulo: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 96, color = C.texto }) => (
  <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.08, color, textAlign: "center", letterSpacing: -2, textWrap: "balance" }}>
    {children}
  </div>
);

export const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({ children, size = 44, color = C.texto, peso = 600 }) => (
  <div style={{ fontFamily: SANS, fontWeight: peso, fontSize: size, lineHeight: 1.35, color, textAlign: "center", textWrap: "balance" }}>{children}</div>
);

/** Palabra resaltada con un subrayado de color suave */
export const Resalta: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.violeta }) => (
  <span style={{ color, backgroundImage: `linear-gradient(transparent 62%, ${color}33 62%)`, padding: "0 6px" }}>{children}</span>
);

export const Tarjeta: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; color?: string }> = ({ children, style, color = C.violeta }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.82)",
      borderRadius: 36,
      boxShadow: `0 18px 40px ${color}2e`,
      border: `3px solid ${color}33`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 70 }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}>{e}</span>
);

/** Lista de tarjetas con emoji que entran de a una */
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

// ─── Marco ──────────────────────────────────────────────────────────────────
const mezcla = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [h(a), h(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};

const Fondo: React.FC = () => {
  const frame = useCurrentFrame();
  // cambia de paleta cada 20 segundos, mezclando despacio
  const ciclo = frame / (20 * 30);
  const i = Math.floor(ciclo) % FONDOS.length;
  const j = (i + 1) % FONDOS.length;
  const t = (1 - Math.cos((ciclo % 1) * Math.PI)) / 2;
  const arriba = mezcla(FONDOS[i][0], FONDOS[j][0], t);
  const abajo = mezcla(FONDOS[i][1], FONDOS[j][1], t);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${arriba} 0%, ${abajo} 100%)`, overflow: "hidden" }}>
      {Array.from({ length: 9 }).map((_, k) => {
        const r = 60 + ((k * 37) % 90);
        const x = (k * 151) % 1080;
        const y = 1920 - ((frame * (0.5 + (k % 3) * 0.25) + k * 260) % 2200);
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 60 + k) * 30,
              top: y,
              width: r,
              height: r,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.35)",
              border: "2px solid rgba(255,255,255,0.6)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Fundido: React.FC<{ dur: number; primera: boolean; children: React.ReactNode }> = ({ dur, primera, children }) => {
  const frame = useCurrentFrame();
  const entra = primera ? 1 : interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 14, dur], [1, 0], clamp);
  return <AbsoluteFill style={{ opacity: Math.min(entra, sale), transform: `scale(${0.97 + 0.03 * entra})` }}>{children}</AbsoluteFill>;
};

const Progreso: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.5)" }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 5, background: C.violeta }} />
    </div>
  );
};

const Firma: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: C.texto, background: "rgba(255,255,255,0.7)", borderRadius: 999, padding: "10px 32px" }}>{FIRMA}</div>
  </div>
);

export type PaginaCalma = { id: string; seg: number; Escena: React.FC };

export const ReelCalma: React.FC<{ paginas: PaginaCalma[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
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
      <Fondo />
      {secuencias}
      <Progreso total={desde} />
      <Firma />
      {musica && <Html5Audio src={musica} volume={0.8} />}
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS } from "../fuente";
import { Icono, T } from "./iconos";

export { SANS, T };

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** 0 → 1 con resorte, a partir de `desde` */
export const usePop = (desde: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
};

export const Entra: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; dx?: number; dy?: number }> = ({
  desde,
  children,
  style,
  dx = 0,
  dy = 40,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 18], [0, 1], { ...clamp, easing: suave });
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`, ...style }}>{children}</div>;
};

export const Titulo: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 104 }) => {
  const p = usePop(0);
  return (
    <div
      style={{
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.05,
        color: T.azul,
        textAlign: "center",
        letterSpacing: -2,
        opacity: Math.min(1, p * 1.5),
        transform: `scale(${0.9 + 0.1 * p})`,
        textWrap: "balance",
      }}
    >
      {children}
    </div>
  );
};

/** Zona útil: libre arriba (cabecera de Instagram) y el tercio inferior (descripción y botones) */
export const Pagina: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 56 }) => (
  <AbsoluteFill
    style={{
      top: 210,
      bottom: 520,
      left: 80,
      right: 80,
      width: "auto",
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({
  children,
  size = 48,
  color = T.texto,
  peso = 600,
}) => (
  <div style={{ fontFamily: SANS, fontSize: size, fontWeight: peso, color, lineHeight: 1.3, textAlign: "center", textWrap: "balance" }}>
    {children}
  </div>
);
export const Item: React.FC<{ desde: number; icono: string; numero?: number; children: React.ReactNode }> = ({ desde, icono, numero, children }) => {
  const p = usePop(desde);
  const frame = useCurrentFrame();
  const op = interpolate(frame, [desde, desde + 10], [0, 1], clamp);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        width: 920,
        background: "#fff",
        borderRadius: 26,
        padding: "18px 26px",
        boxShadow: "0 6px 20px rgba(14,90,109,0.08)",
        opacity: op,
        transform: `translateX(${(1 - p) * -80}px)`,
      }}
    >
      {numero !== undefined && (
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            background: T.azul,
            color: "#fff",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {numero}
        </div>
      )}
      <div style={{ flex: 1, fontFamily: SANS, fontSize: 40, fontWeight: 600, color: T.texto, lineHeight: 1.25 }}>{children}</div>
      <div style={{ background: T.menta2, borderRadius: 20, padding: 10, flexShrink: 0, transform: `scale(${p})` }}>
        <Icono nombre={icono} size={80} />
      </div>
    </div>
  );
};

const Transicion: React.FC<{ dur: number; children: React.ReactNode; primera: boolean }> = ({ dur, children, primera }) => {
  const frame = useCurrentFrame();
  const entra = primera ? 1 : interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: Math.min(entra, sale), transform: `translateY(${(1 - entra) * 40}px)` }}>{children}</AbsoluteFill>
  );
};

export type PaginaReel = { id: string; seg: number; Escena: React.FC };

/** Barra de progreso fina arriba, segmentada por página */
const Progreso: React.FC<{ paginas: PaginaReel[]; fps: number }> = ({ paginas, fps }) => {
  const frame = useCurrentFrame();
  let acc = 0;
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, display: "flex", gap: 8 }}>
      {paginas.map((p) => {
        const ini = acc;
        acc += p.seg * fps;
        const v = interpolate(frame, [ini, acc], [0, 1], clamp);
        return (
          <div key={p.id} style={{ flex: p.seg, height: 8, borderRadius: 4, background: "rgba(14,90,109,0.15)", overflow: "hidden" }}>
            <div style={{ width: `${v * 100}%`, height: "100%", background: T.azul2 }} />
          </div>
        );
      })}
    </div>
  );
};

/** Reel de la serie de salud: fondo, páginas con transición, barra de progreso y música */
export const ReelSalud: React.FC<{ paginas: PaginaReel[]; fps: number; musica?: string }> = ({ paginas, fps, musica }) => {
  let desde = 0;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #ffffff 0%, ${T.fondo} 70%)` }}>
      {/* ondas suaves de fondo */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M-50 ${1500 + i * 40} C 300 ${1380 + i * 40}, 700 ${1640 + i * 40}, 1130 ${1480 + i * 40}`} stroke={T.menta} strokeWidth={3} fill="none" />
        ))}
      </svg>
      {paginas.map((p, i) => {
        const dur = p.seg * fps;
        const seq = (
          <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
            <Transicion dur={dur} primera={i === 0}>
              <p.Escena />
            </Transicion>
          </Sequence>
        );
        desde += dur;
        return seq;
      })}
      <Progreso paginas={paginas} fps={fps} />
      {musica && <Html5Audio src={musica} volume={0.9} />}
    </AbsoluteFill>
  );
};

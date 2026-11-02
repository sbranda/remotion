import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS } from "../fuente";

export { SANS };

/** Paleta sobria: fondo azul noche, texto claro y un rojo apagado solo para el impacto */
export const C = {
  fondo: "#0d1117",
  fondo2: "#161c26",
  panel: "#1d2533",
  linea: "#2c3646",
  texto: "#eef1f5",
  texto2: "#9aa5b4",
  acento: "#d9a441", // ámbar: señales, rótulos
  rojo: "#b8423a",
  verde: "#4f9d69",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Entrada suave (0 → 1) que empieza en `desde` */
export const useEntrada = (desde = 0, dur = 24) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [desde, desde + dur], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
};

export const useResorte = (desde = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: 200 } });
};

/** Bloque de texto que aparece subiendo */
export const Aparece: React.FC<{ desde?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  desde = 0,
  children,
  style,
}) => {
  const p = useEntrada(desde);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)`, ...style }}>{children}</div>;
};

export const Rotulo: React.FC<{ children: React.ReactNode; color?: string; size?: number; spacing?: number }> = ({
  children,
  color = C.acento,
  size = 30,
  spacing = 8,
}) => (
  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, letterSpacing: spacing, color, textTransform: "uppercase", textAlign: "center" }}>
    {children}
  </div>
);

/** Un vagón visto de lado, mirando a la derecha. `cabeza` = coche con morro. */
export const Vagon: React.FC<{ largo?: number; color: string; franja: string; cabeza?: boolean }> = ({
  largo = 130,
  color,
  franja,
  cabeza = false,
}) => {
  const alto = 64;
  const v = largo;
  const d = cabeza
    ? `M2 6 H${v - 60} Q${v} 14 ${v} ${alto - 6} V${alto} H2 Z`
    : `M2 6 H${v - 2} V${alto} H2 Z`;
  const n = cabeza ? 3 : 5;
  const ancho = (v - (cabeza ? 70 : 24)) / n;
  return (
    <svg width={v} height={alto + 8} viewBox={`0 0 ${v} ${alto + 8}`} style={{ overflow: "visible", display: "block" }}>
      <path d={d} fill={color} />
      <rect x={2} y={alto - 22} width={cabeza ? v - 8 : v - 4} height={7} fill={franja} />
      {Array.from({ length: n }).map((_, w) => (
        <rect key={w} x={12 + w * ancho} y={18} width={ancho - 8} height={14} rx={3} fill="#2a3442" />
      ))}
      <circle cx={22} cy={alto + 2} r={6} fill="#3a4454" />
      <circle cx={v - 26} cy={alto + 2} r={6} fill="#3a4454" />
    </svg>
  );
};

/** Tren completo; mira a la derecha salvo `espejo` */
export const Tren: React.FC<{ vagon?: number; color: string; franja: string; vagones?: number; espejo?: boolean }> = ({
  vagon = 130,
  color,
  franja,
  vagones = 3,
  espejo = false,
}) => (
  <div style={{ display: "flex", gap: 4, transform: espejo ? "scaleX(-1)" : undefined }}>
    {Array.from({ length: vagones }).map((_, i) => (
      <Vagon key={i} largo={vagon} color={color} franja={franja} cabeza={i === vagones - 1} />
    ))}
  </div>
);

/** Señal ferroviaria; `rojo` 0..1 mezcla de verde a rojo */
export const Senal: React.FC<{ rojo: number }> = ({ rojo }) => (
  <svg width={40} height={150} viewBox="0 0 40 150">
    <rect x={17} y={60} width={6} height={90} fill="#4a5568" />
    <rect x={4} y={0} width={32} height={66} rx={8} fill="#232b38" stroke="#4a5568" strokeWidth={2} />
    <circle cx={20} cy={18} r={9} fill={C.rojo} opacity={0.15 + 0.85 * rojo} />
    <circle cx={20} cy={46} r={9} fill={C.verde} opacity={0.15 + 0.85 * (1 - rojo)} />
  </svg>
);

/** Contador animado */
export const Contador: React.FC<{ valor: number; desde: number; dur?: number; prefijo?: string; color?: string; size?: number }> = ({
  valor,
  desde,
  dur = 60,
  prefijo = "",
  color = C.texto,
  size = 220,
}) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [desde, desde + dur], [0, valor], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) }));
  return (
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, color, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
      {prefijo}
      {v}
    </div>
  );
};

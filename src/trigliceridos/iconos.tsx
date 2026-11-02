import React from "react";

export const T = {
  fondo: "#f3f7f6",
  azul: "#0e5a6d",
  azul2: "#2f7586",
  menta: "#8fd3cb",
  menta2: "#dff1ee",
  texto: "#1d3b44",
  gris: "#5d7178",
  rojo: "#d33a34",
};

const base = { fill: "none", stroke: T.azul, strokeWidth: 6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Íconos de línea, 100×100 */
const PATHS: Record<string, React.ReactNode> = {
  gaseosa: (
    <>
      <path d="M38 14h24M42 14v10c-8 6-10 12-10 20v40a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V44c0-8-2-14-10-20V14" {...base} />
      <path d="M32 52h36v18H32z" fill={T.menta} stroke="none" />
      <circle cx="44" cy="40" r="2.5" fill={T.azul} />
      <circle cx="54" cy="34" r="2" fill={T.azul} />
    </>
  ),
  pan: (
    <>
      <path d="M12 62c0-18 16-30 38-30s38 12 38 30c0 8-6 12-14 12H26c-8 0-14-4-14-12z" {...base} fill={T.menta2} />
      <path d="M34 40l-6 18M50 36v20M66 40l6 18" {...base} />
    </>
  ),
  alcohol: (
    <>
      <path d="M30 12h40l-4 30a16 16 0 0 1-32 0z" {...base} />
      <path d="M33 30h34l-1.5 12a14.5 14.5 0 0 1-31 0z" fill={T.menta} stroke="none" />
      <path d="M50 58v24M36 88h28" {...base} />
    </>
  ),
  sillon: (
    <>
      <path d="M20 48V36a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v12" {...base} />
      <path d="M12 52a8 8 0 0 1 16 0v8h44v-8a8 8 0 0 1 16 0v22H12z" {...base} fill={T.menta2} />
      <path d="M20 74v10M80 74v10" {...base} />
    </>
  ),
  balanza: (
    <>
      <rect x="14" y="20" width="72" height="66" rx="14" {...base} fill={T.menta2} />
      <path d="M32 44a18 18 0 0 1 36 0z" {...base} fill="#fff" />
      <path d="M50 44l8-10" {...base} />
    </>
  ),
  sinAzucar: (
    <>
      <rect x="22" y="28" width="40" height="40" rx="6" {...base} fill={T.menta2} />
      <path d="M62 38h8a10 10 0 0 1 0 20h-8" {...base} />
      <path d="M14 86L86 14" stroke={T.rojo} strokeWidth={7} strokeLinecap="round" />
    </>
  ),
  trigo: (
    <>
      <path d="M50 90V20" {...base} />
      {[28, 44, 60].map((y) => (
        <g key={y}>
          <path d={`M50 ${y + 8}c-12 0-18-8-18-16 12 0 18 8 18 16z`} {...base} fill={T.menta} />
          <path d={`M50 ${y + 8}c12 0 18-8 18-16-12 0-18 8-18 16z`} {...base} fill={T.menta} />
        </g>
      ))}
    </>
  ),
  copaMenos: (
    <>
      <path d="M22 14h36l-4 26a14 14 0 0 1-28 0z" {...base} />
      <path d="M40 54v24M28 84h24" {...base} />
      <path d="M78 30v44M68 64l10 12 10-12" {...base} />
    </>
  ),
  zapatilla: (
    <>
      <path d="M10 66c0-10 4-24 10-30l14 6c6 4 12 6 20 8l22 6c8 2 14 6 14 12v6H10z" {...base} fill={T.menta2} />
      <path d="M10 74h80" {...base} />
      <path d="M36 46l6-6M46 50l6-6" {...base} />
    </>
  ),
  pescado: (
    <>
      <path d="M12 50c14-20 44-24 62 0-18 24-48 20-62 0z" {...base} fill={T.menta2} />
      <path d="M74 50l14-14v28z" {...base} fill={T.menta} />
      <circle cx="30" cy="46" r="3.5" fill={T.azul} />
    </>
  ),
  corazon: (
    <>
      <path d="M50 84S14 62 14 38a18 18 0 0 1 36-6 18 18 0 0 1 36 6c0 24-36 46-36 46z" {...base} fill={T.menta2} />
      <path d="M22 50h16l6-10 8 20 6-10h20" {...base} />
    </>
  ),
  silencio: (
    <>
      <circle cx="50" cy="50" r="36" {...base} fill={T.menta2} />
      <path d="M34 46a3 3 0 0 0 0 .1M66 46a3 3 0 0 0 0 .1" stroke={T.azul} strokeWidth={9} strokeLinecap="round" />
      <path d="M36 64h28" {...base} />
    </>
  ),
  pancreas: (
    <>
      <path
        d="M14 58c0-10 8-16 18-14 10 2 14-8 26-10 14-2 28 4 28 14s-12 12-22 12c-10 0-16 10-30 10-12 0-20-4-20-12z"
        {...base}
        fill={T.menta2}
      />
      <path d="M30 58c12 0 20-8 34-8" {...base} strokeWidth={4} />
    </>
  ),
  tubo: (
    <>
      <rect x="34" y="8" width="32" height="12" rx="3" fill={T.azul} />
      <path d="M38 20v58a12 12 0 0 0 24 0V20" {...base} fill="#fff" />
    </>
  ),
  marcador: <path d="M26 10h48v80L50 72 26 90z" {...base} fill={T.menta2} />,
};

export const Icono: React.FC<{ nombre: string; size?: number; style?: React.CSSProperties }> = ({ nombre, size = 100, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible", ...style }}>
    {PATHS[nombre]}
  </svg>
);

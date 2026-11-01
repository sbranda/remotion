import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, SANS, SERIF, clamp, prog } from "./graficos";

// Proyección simple (equirectangular) del Atlántico Norte sobre 1920x1080
const LON0 = -80;
const LON1 = 6;
const LAT0 = 36;
const LAT1 = 60;
export const px = (lat: number, lon: number): [number, number] => [
  60 + ((lon - LON0) / (LON1 - LON0)) * 1800,
  880 - ((lat - LAT0) / (LAT1 - LAT0)) * 800,
];

// Costas muy simplificadas (estilo ilustración, no cartografía exacta)
const TIERRAS: [number, number][][] = [
  // Gran Bretaña
  [
    [50.0, -5.7], [50.7, -1.5], [51.1, 1.4], [52.9, 1.7], [53.5, 0.2], [55.0, -1.5], [56.0, -2.5], [57.7, -1.8],
    [58.6, -3.0], [58.5, -5.0], [57.0, -6.0], [55.5, -5.0], [54.6, -3.6], [53.4, -3.0], [52.0, -4.9], [51.6, -3.0],
    [51.2, -4.2],
  ],
  // Irlanda
  [
    [51.5, -9.8], [51.9, -8.0], [52.2, -6.4], [53.3, -6.0], [54.6, -5.6], [55.3, -7.3], [54.6, -8.6], [53.5, -10.1],
    [52.1, -10.4],
  ],
  // Europa continental
  [
    [51.1, 2.5], [50.0, 1.5], [49.7, 0.2], [49.3, -0.3], [49.7, -1.9], [48.6, -1.6], [48.8, -3.0], [48.4, -4.8],
    [47.8, -4.3], [47.2, -2.2], [46.2, -1.2], [43.5, -1.5], [43.4, -8.0], [42.0, -8.9], [37.0, -8.9], [36, -6],
    [36, 6], [51.1, 6],
  ],
  // Norteamérica
  [
    [60, -64], [55, -60], [52, -56], [49.5, -55.5], [48.5, -59], [47.5, -59.3], [45.5, -61], [44.5, -63.5],
    [43.5, -66], [44.5, -67], [43.8, -70], [42, -70], [41.5, -71.5], [40.6, -74], [39, -74.5], [37, -76],
    [36, -75.5], [36, -80], [60, -80],
  ],
  // Terranova
  [
    [51.6, -55.6], [49.5, -53.5], [46.7, -53.0], [47.0, -55.5], [47.6, -59.3], [49.0, -58.2], [50.5, -57.3],
  ],
];

export const LUGARES = {
  southampton: [50.9, -1.4] as [number, number],
  cherburgo: [49.64, -1.62] as [number, number],
  queenstown: [51.85, -8.3] as [number, number],
  naufragio: [41.73, -49.95] as [number, number],
  nuevaYork: [40.7, -74.0] as [number, number],
  carpathia: [41.0, -48.6] as [number, number],
};

const RUTA: [number, number][] = [
  LUGARES.southampton,
  [50.2, -1.0],
  LUGARES.cherburgo,
  [49.9, -5.5],
  LUGARES.queenstown,
  [51.2, -10.5],
  [48.0, -25],
  [44.5, -38],
  [42.0, -47.0],
  LUGARES.naufragio,
];
const RUTA_PREVISTA: [number, number][] = [LUGARES.naufragio, [41.0, -60], LUGARES.nuevaYork];

const camino = (pts: [number, number][]) =>
  pts.map(([la, lo], i) => {
    const [x, y] = px(la, lo);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

const largo = (pts: [number, number][]) => {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = px(...pts[i - 1]);
    const [c, d] = px(...pts[i]);
    l += Math.hypot(c - a, d - b);
  }
  return l;
};

/** Puntos en pantalla del recorrido hasta la fracción t (0→1) */
const parcial = (pts: [number, number][], t: number): [number, number][] => {
  const scr = pts.map((p) => px(...p));
  const total = largo(pts) * Math.max(0, Math.min(1, t));
  const out: [number, number][] = [scr[0]];
  let acum = 0;
  for (let i = 1; i < scr.length; i++) {
    const seg = Math.hypot(scr[i][0] - scr[i - 1][0], scr[i][1] - scr[i - 1][1]);
    if (acum + seg >= total) {
      const f = seg === 0 ? 0 : (total - acum) / seg;
      out.push([scr[i - 1][0] + (scr[i][0] - scr[i - 1][0]) * f, scr[i - 1][1] + (scr[i][1] - scr[i - 1][1]) * f]);
      return out;
    }
    acum += seg;
    out.push(scr[i]);
  }
  return out;
};

const trazo = (scr: [number, number][]) => scr.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const Punto: React.FC<{ lugar: [number, number]; texto: string; visible: number; color?: string; abajo?: boolean; izq?: boolean }> = ({
  lugar,
  texto,
  visible,
  color = C.crema,
  abajo,
  izq,
}) => {
  const frame = useCurrentFrame();
  const [x, y] = px(...lugar);
  const pulso = (frame % 45) / 45;
  return (
    <g opacity={visible}>
      <circle cx={x} cy={y} r={10 + pulso * 26} fill="none" stroke={color} strokeWidth={2} opacity={1 - pulso} />
      <circle cx={x} cy={y} r={9} fill={color} />
      <text
        x={x + (izq ? -18 : 18)}
        y={y + (abajo ? 42 : -18)}
        textAnchor={izq ? "end" : "start"}
        fontFamily={SANS}
        fontWeight={600}
        fontSize={30}
        fill={C.crema}
      >
        {texto}
      </text>
    </g>
  );
};

/**
 * Mapa del Atlántico Norte.
 * modo "viaje": dibuja la ruta desde Southampton hasta el lugar del naufragio (progreso 0→1).
 * modo "rescate": acerca al lugar del naufragio y muestra al Carpathia acudiendo.
 */
export const Mapa: React.FC<{ progreso: number; prevista?: number; zoom?: number; carpathia?: number }> = ({
  progreso,
  prevista = 0,
  zoom = 0,
  carpathia = 0,
}) => {
  const frame = useCurrentFrame();
  const [nx, ny] = px(...LUGARES.naufragio);
  const s = 1 + zoom * 2.2;
  const tx = (960 - nx) * zoom;
  const ty = (480 - ny) * zoom;
  const [cx, cy] = px(...LUGARES.carpathia);
  const recorrido = parcial(RUTA, progreso);
  const cabeza = recorrido[recorrido.length - 1];
  return (
    <svg width={1920} height={1080}>
      <rect width={1920} height={1080} fill="#0b1a2c" />
      <g transform={`translate(${960 - 960 * s + tx * s}, ${480 - 480 * s + ty * s}) scale(${s})`}>
        {/* retícula */}
        {Array.from({ length: 10 }).map((_, i) => {
          const lon = -80 + i * 10;
          const [x] = px(40, lon);
          return <line key={`lo${i}`} x1={x} x2={x} y1={0} y2={1080} stroke="#ffffff10" strokeWidth={1.5 / s} />;
        })}
        {[40, 45, 50, 55].map((lat) => {
          const [, y] = px(lat, 0);
          return <line key={`la${lat}`} x1={0} x2={1920} y1={y} y2={y} stroke="#ffffff10" strokeWidth={1.5 / s} />;
        })}
        {TIERRAS.map((t, i) => (
          <path key={i} d={`${camino(t)} Z`} fill="#24364a" stroke="#3c5470" strokeWidth={2 / s} />
        ))}
        <path d={trazo(recorrido)} fill="none" stroke={C.oro} strokeWidth={5 / s} strokeLinecap="round" strokeLinejoin="round" />
        {prevista > 0 && (
          <path
            d={trazo(parcial(RUTA_PREVISTA, prevista))}
            fill="none"
            stroke={C.crema}
            strokeWidth={3 / s}
            strokeDasharray={`${14 / s} ${12 / s}`}
            opacity={0.6}
          />
        )}
        {progreso > 0 && progreso < 1 && <circle cx={cabeza[0]} cy={cabeza[1]} r={12 / s} fill={C.crema} />}
        {/* Carpathia */}
        {carpathia > 0 && (
          <g>
            <line
              x1={cx}
              y1={cy}
              x2={interpolate(carpathia, [0, 1], [cx, nx + 6])}
              y2={interpolate(carpathia, [0, 1], [cy, ny + 4])}
              stroke={C.verde}
              strokeWidth={4 / s}
              strokeDasharray={`${8 / s} ${6 / s}`}
            />
            <circle cx={cx} cy={cy} r={8 / s} fill={C.verde} />
          </g>
        )}
      </g>
      {/* etiquetas sin escalar */}
      {zoom === 0 && (
        <g>
          <Punto lugar={LUGARES.southampton} texto="Southampton" visible={prog(frame, 0, 15)} />
          <Punto lugar={LUGARES.cherburgo} texto="Cherburgo" visible={progreso > 0.04 ? 1 : 0} abajo izq />
          <Punto lugar={LUGARES.queenstown} texto="Queenstown" visible={progreso > 0.12 ? 1 : 0} izq />
          <Punto lugar={LUGARES.nuevaYork} texto="Nueva York" visible={prevista > 0 ? 1 : 0} abajo />
          <Punto lugar={LUGARES.naufragio} texto="" visible={progreso >= 1 ? 1 : 0} color={C.rojo} />
        </g>
      )}
      {zoom > 0.99 && (
        <g>
          <circle cx={960} cy={480} r={16} fill={C.rojo} />
          <text x={940} y={450} textAnchor="end" fontFamily={SERIF} fontWeight={700} fontSize={44} fill={C.crema}>
            Titanic
          </text>
          <g opacity={interpolate(carpathia, [0, 0.15], [0, 1], clamp)}>
            <text
              x={960 + (cx - nx) * s + 30}
              y={480 + (cy - ny) * s + 60}
              fontFamily={SERIF}
              fontWeight={700}
              fontSize={44}
              fill={C.verde}
            >
              Carpathia
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

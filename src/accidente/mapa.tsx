import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, SANS, clamp } from "./graficos";

// Mapa esquemático de la Península (sin Portugal), proyección simple lon/lat.
const K = 72;
const X = (lon: number) => (lon + 9.6) * K;
const Y = (lat: number) => (43.95 - lat) * K * 1.3;

const CONTORNO: [number, number][] = [
  [-8.9, 43.3], [-7.7, 43.75], [-5.8, 43.6], [-3.8, 43.45], [-1.8, 43.38], [-1.6, 43.1],
  [0.0, 42.7], [1.5, 42.45], [3.2, 42.4], [3.2, 41.9], [2.2, 41.3], [0.9, 41.0],
  [0.2, 40.3], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3],
  [-2.1, 36.7], [-3.0, 36.75], [-4.4, 36.7], [-5.3, 36.1], [-6.0, 36.3], [-6.4, 36.8],
  [-7.4, 37.2], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 38.9], [-7.0, 39.6], [-6.9, 40.2],
  [-6.8, 40.9], [-6.4, 41.6], [-6.9, 41.95], [-8.2, 42.1], [-8.9, 42.1], [-9.3, 42.9],
];

/** Trazado aproximado de la LAV Madrid–Sevilla */
const LINEA_AV: [number, number][] = [
  [-3.69, 40.4], [-3.85, 40.0], [-3.72, 39.41], [-3.93, 38.98], [-4.11, 38.69],
  [-4.78, 37.89], [-5.98, 37.39],
];

export const CIUDADES: { nombre: string; lon: number; lat: number; dx?: number; dy?: number }[] = [
  { nombre: "Madrid", lon: -3.7, lat: 40.42, dx: 18, dy: -12 },
  { nombre: "Toledo", lon: -4.02, lat: 39.86, dx: -120, dy: 6 },
  { nombre: "Ciudad Real", lon: -3.93, lat: 38.98, dx: 18, dy: 10 },
  { nombre: "Córdoba", lon: -4.78, lat: 37.89, dx: 18, dy: 6 },
  { nombre: "Sevilla", lon: -5.98, lat: 37.39, dx: -40, dy: 40 },
];

export const URDA = { lon: -3.72, lat: 39.41 };

const ruta = (pts: [number, number][]) => pts.map(([lo, la], i) => `${i ? "L" : "M"}${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join(" ");

const longitud = (pts: [number, number][]) =>
  pts.slice(1).reduce((a, [lo, la], i) => a + Math.hypot(X(lo) - X(pts[i][0]), Y(la) - Y(pts[i][1])), 0);

/**
 * Mapa con la línea que se dibuja y luego zoom a Urda.
 * Frames: línea [lineaDesde, lineaDesde+60], zoom [zoomDesde, zoomDesde+60].
 */
export const Mapa: React.FC<{ lineaDesde: number; zoomDesde: number }> = ({ lineaDesde, zoomDesde }) => {
  const frame = useCurrentFrame();
  const W = X(3.5);
  const H = Y(35.9);
  const largo = longitud(LINEA_AV);
  const dibujado = interpolate(frame, [lineaDesde, lineaDesde + 60], [0, 1], clamp);
  const zoom = interpolate(frame, [zoomDesde, zoomDesde + 60], [0, 1], { ...clamp, easing: (t) => t * t * (3 - 2 * t) });
  const escala = 1 + zoom * 1.6;
  const ux = X(URDA.lon);
  const uy = Y(URDA.lat);
  const pulso = (Math.sin(frame / 6) + 1) / 2;
  const opCiudades = interpolate(frame, [lineaDesde + 20, lineaDesde + 50], [0, 1], clamp);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <g transform={`translate(${ux} ${uy}) scale(${escala}) translate(${-ux} ${-uy})`}>
        <path d={ruta(CONTORNO) + " Z"} fill={C.panel} stroke={C.linea} strokeWidth={3 / escala} />
        <path
          d={ruta(LINEA_AV)}
          fill="none"
          stroke={C.acento}
          strokeWidth={6 / escala}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={largo}
          strokeDashoffset={largo * (1 - dibujado)}
        />
        {CIUDADES.map((c) => (
          <g key={c.nombre} opacity={opCiudades}>
            <circle cx={X(c.lon)} cy={Y(c.lat)} r={7 / escala} fill={C.texto} />
            <text
              x={X(c.lon) + (c.dx ?? 14) / escala}
              y={Y(c.lat) + (c.dy ?? 0) / escala}
              fill={C.texto2}
              fontFamily={SANS}
              fontSize={28 / escala}
              fontWeight={600}
            >
              {c.nombre}
            </text>
          </g>
        ))}
        <g opacity={zoom}>
          <circle cx={ux} cy={uy} r={(16 + pulso * 22) / escala} fill="none" stroke={C.rojo} strokeWidth={4 / escala} opacity={1 - pulso * 0.7} />
          <circle cx={ux} cy={uy} r={11 / escala} fill={C.rojo} />
          <text x={ux + 22 / escala} y={uy + 12 / escala} fill={C.texto} fontFamily={SANS} fontSize={40 / escala} fontWeight={800}>
            Urda
          </text>
        </g>
      </g>
    </svg>
  );
};

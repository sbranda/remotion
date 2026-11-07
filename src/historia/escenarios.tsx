// Fondos ilustrados de la historia "Ladrillo a ladrillo".
// El piso está a la altura y = 1420 (por encima de la zona de botones de Instagram).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SANS } from "../fuente";
import type { Escenario } from "./datos";

export const PISO = 1420;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Ladrillos: React.FC<{ id: string; color?: string; junta?: string }> = ({ id, color = "#c8643c", junta = "#e9c9a8" }) => (
  <pattern id={id} width={60} height={30} patternUnits="userSpaceOnUse">
    <rect width={60} height={30} fill={junta} />
    <rect x={2} y={2} width={56} height={12} fill={color} />
    <rect x={-28} y={17} width={56} height={12} fill={color} />
    <rect x={32} y={17} width={56} height={12} fill={color} />
  </pattern>
);

/** Casita del barrio: paredes sin revocar y techo de chapa */
const Casita: React.FC<{ x: number; ancho: number; alto: number; ventanaLuz?: boolean; patron: string }> = ({ x, ancho, alto, ventanaLuz, patron }) => {
  const y = PISO - alto;
  const ondas = Array.from({ length: Math.ceil((ancho + 60) / 30) })
    .map((_, i) => `L${x - 30 + i * 30 + 15} ${y - 52} L${x - 30 + i * 30 + 30} ${y - 40}`)
    .join(" ");
  return (
    <g>
      <rect x={x} y={y} width={ancho} height={alto} fill={`url(#${patron})`} stroke="#7a3e22" strokeWidth={4} />
      <path d={`M${x - 30} ${y - 40} ${ondas} L${x + ancho + 30} ${y + 4} L${x - 30} ${y + 4} Z`} fill="#9aa3ad" stroke="#5f6770" strokeWidth={4} />
      <rect x={x + ancho * 0.18} y={y + alto * 0.28} width={ancho * 0.24} height={ancho * 0.2} fill={ventanaLuz ? "#ffd56b" : "#6fa8dc"} stroke="#5f6770" strokeWidth={5} />
      <rect x={x + ancho * 0.6} y={y + alto * 0.38} width={ancho * 0.22} height={alto * 0.62} fill="#7b4a2a" stroke="#4b2a16" strokeWidth={4} />
      {ventanaLuz && <rect x={x + ancho * 0.18} y={y + alto * 0.28} width={ancho * 0.24} height={ancho * 0.2} fill="#ffd56b" opacity={0.6} style={{ filter: "blur(18px)" }} />}
    </g>
  );
};

const Cielo: React.FC<{ arriba: string; abajo: string }> = ({ arriba, abajo }) => (
  <>
    <defs>
      <linearGradient id={`cielo-${arriba}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={arriba} />
        <stop offset="1" stopColor={abajo} />
      </linearGradient>
    </defs>
    <rect width={1080} height={PISO} fill={`url(#cielo-${arriba})`} />
  </>
);

const Nubes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g fill="#ffffff" opacity={0.85}>
      {[
        [120, 640, 1],
        [700, 720, 0.8],
        [420, 860, 0.6],
      ].map(([x, y, s], i) => {
        const dx = ((x as number) + frame * (0.3 + i * 0.15)) % 1300 - 150;
        return (
          <g key={i} transform={`translate(${dx} ${y}) scale(${s})`}>
            <ellipse cx={0} cy={0} rx={90} ry={40} />
            <ellipse cx={60} cy={-20} rx={70} ry={45} />
            <ellipse cx={-60} cy={-10} rx={60} ry={35} />
          </g>
        );
      })}
    </g>
  );
};

const Piso: React.FC<{ color: string; borde?: string }> = ({ color, borde }) => (
  <>
    <rect y={PISO} width={1080} height={1920 - PISO} fill={color} />
    {borde && <rect y={PISO} width={1080} height={10} fill={borde} />}
  </>
);

const Barrio: React.FC<{ noche?: boolean }> = ({ noche }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <Ladrillos id="lad1" />
        <Ladrillos id="lad2" color="#b5562f" />
      </defs>
      {noche ? <Cielo arriba="#141c3a" abajo="#3d3b6e" /> : <Cielo arriba="#9fd3ff" abajo="#fff1d6" />}
      {noche ? (
        <>
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 263) % 1080} cy={(i * 131) % 1000} r={2 + (i % 3)} fill="#fff" opacity={0.4 + 0.6 * ((Math.sin(frame / 20 + i) + 1) / 2)} />
          ))}
          <circle cx={880} cy={700} r={60} fill="#fff4cf" style={{ filter: "drop-shadow(0 0 30px #fff4cf)" }} />
        </>
      ) : (
        <>
          <circle cx={900} cy={700} r={70} fill="#ffd56b" style={{ filter: "drop-shadow(0 0 30px #ffd56b)" }} />
          <Nubes />
        </>
      )}
      <Casita x={40} ancho={430} alto={380} patron="lad1" ventanaLuz={noche} />
      <Casita x={620} ancho={400} alto={340} patron="lad2" ventanaLuz={noche} />
      {/* soga con ropa */}
      <path d="M470 1150 Q545 1185 620 1150" stroke="#5f5f5f" strokeWidth={3} fill="none" />
      {["#e76f51", "#2a9d8f", "#f4a261"].map((c, i) => (
        <rect key={c} x={492 + i * 40} y={1160 + Math.abs(1 - i) * -6} width={28} height={40} fill={c} transform={`rotate(${Math.sin(frame / 15 + i) * 4} ${506 + i * 40} 1160)`} />
      ))}
      <Piso color={noche ? "#5a4636" : "#c9a27a"} borde={noche ? "#4a3a2c" : "#b38b62"} />
      {noche && <rect width={1080} height={1920} fill="#0b1030" opacity={0.25} />}
    </svg>
  );
};

const Escuela: React.FC = () => {
  const frame = useCurrentFrame();
  const flamea = Math.sin(frame / 8) * 6;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Cielo arriba="#9fd3ff" abajo="#fff1d6" />
      <Nubes />
      <rect x={60} y={960} width={960} height={PISO - 960} fill="#f3e3c3" stroke="#b9a07a" strokeWidth={5} />
      <rect x={60} y={940} width={960} height={30} fill="#c8643c" />
      <rect x={330} y={985} width={420} height={60} rx={10} fill="#ffffff" stroke="#b9a07a" strokeWidth={4} />
      <text x={540} y={1028} textAnchor="middle" fontFamily={SANS} fontSize={38} fontWeight={800} fill="#2b2d42">
        ESCUELA N.º 14
      </text>
      {[110, 870].map((x) => (
        <rect key={x} x={x} y={1080} width={110} height={90} fill="#6fa8dc" stroke="#b9a07a" strokeWidth={5} />
      ))}
      {/* mástil y bandera argentina */}
      <rect x={1000} y={640} width={8} height={330} fill="#7d7d7d" />
      <g transform={`translate(1008 650) skewY(${flamea * 0.3})`}>
        <rect width={150} height={30} fill="#74acdf" transform="translate(-160 0)" />
        <rect y={30} width={150} height={30} fill="#ffffff" transform="translate(-160 0)" />
        <rect y={60} width={150} height={30} fill="#74acdf" transform="translate(-160 0)" />
        <circle cx={-85} cy={45} r={10} fill="#f6b40e" />
      </g>
      <Piso color="#b8b8b0" borde="#9a9a92" />
    </svg>
  );
};

const Colectivo: React.FC = () => {
  const frame = useCurrentFrame();
  const x = 1200 - ((frame * 6) % 2400);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Cielo arriba="#ffcf9f" abajo="#fff1d6" />
      {/* ciudad de fondo */}
      {[0, 160, 300, 470, 620, 790, 930].map((bx, i) => (
        <rect key={bx} x={bx} y={760 + ((i * 97) % 220)} width={140} height={PISO - 760 - ((i * 97) % 220)} fill={i % 2 ? "#b9b2c9" : "#cbc4d8"} />
      ))}
      {/* colectivo */}
      <g transform={`translate(${x} ${PISO - 330})`}>
        <rect width={760} height={290} rx={30} fill="#f4a261" stroke="#9a5a2a" strokeWidth={6} />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={40 + i * 115} y={40} width={95} height={95} rx={10} fill="#bfe3ff" stroke="#9a5a2a" strokeWidth={4} />
        ))}
        <rect x={0} y={180} width={760} height={20} fill="#264653" />
        <circle cx={150} cy={290} r={44} fill="#2b2d42" />
        <circle cx={610} cy={290} r={44} fill="#2b2d42" />
      </g>
      {/* parada */}
      <rect x={130} y={1050} width={10} height={370} fill="#5f6770" />
      <rect x={70} y={1010} width={130} height={80} rx={12} fill="#2a9d8f" />
      <text x={135} y={1062} textAnchor="middle" fontFamily={SANS} fontSize={32} fontWeight={800} fill="#ffffff">
        PARADA
      </text>
      <Piso color="#8d8d8d" borde="#ffffff" />
    </svg>
  );
};

const Universidad: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
    <Cielo arriba="#9fd3ff" abajo="#fff1d6" />
    <Nubes />
    <path d="M80 930 L540 760 L1000 930 Z" fill="#e7e1d6" stroke="#a89f8f" strokeWidth={5} />
    <rect x={100} y={930} width={880} height={50} fill="#d9d1c3" stroke="#a89f8f" strokeWidth={4} />
    <text x={540} y={968} textAnchor="middle" fontFamily={SANS} fontSize={36} fontWeight={800} fill="#4a4338">
      UNIVERSIDAD
    </text>
    {Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} x={140 + i * 125} y={980} width={50} height={PISO - 1040} fill="#f2ede4" stroke="#a89f8f" strokeWidth={4} />
    ))}
    <rect x={80} y={PISO - 60} width={920} height={30} fill="#d9d1c3" />
    <rect x={60} y={PISO - 30} width={960} height={30} fill="#cfc6b6" />
    <Piso color="#9ccc65" borde="#7cb342" />
  </svg>
);

const Hospital: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
    <Cielo arriba="#9fd3ff" abajo="#e9f7ff" />
    <Nubes />
    <rect x={80} y={860} width={920} height={PISO - 860} fill="#ffffff" stroke="#b9c4d0" strokeWidth={5} />
    <rect x={430} y={890} width={220} height={60} rx={10} fill="#e63946" />
    <text x={540} y={933} textAnchor="middle" fontFamily={SANS} fontSize={36} fontWeight={800} fill="#ffffff">
      HOSPITAL
    </text>
    <path d="M520 970 h40 v40 h40 v40 h-40 v40 h-40 v-40 h-40 v-40 h40 z" fill="#e63946" />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={130 + (i % 4) * 230} y={1150 + Math.floor(i / 4) * 0} width={120} height={80} fill="#bfe3ff" stroke="#b9c4d0" strokeWidth={4} opacity={i < 4 ? 1 : 0} />
    ))}
    <Piso color="#b8b8b0" borde="#9a9a92" />
  </svg>
);

/** Casa nueva que se construye ladrillo a ladrillo */
const CasaNueva: React.FC = () => {
  const frame = useCurrentFrame();
  const filas = 14;
  const porFila = 12;
  const x0 = 190;
  const ancho = 700;
  const altoFila = 30;
  const base = PISO;
  const lad = ancho / porFila;
  const techo = interpolate(frame, [360, 400], [0, 1], clamp);
  const detalles = interpolate(frame, [400, 440], [0, 1], clamp);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Cielo arriba="#9fd3ff" abajo="#fff1d6" />
      <circle cx={900} cy={700} r={70} fill="#ffd56b" style={{ filter: "drop-shadow(0 0 30px #ffd56b)" }} />
      <Nubes />
      {Array.from({ length: filas * porFila }).map((_, k) => {
        const f = Math.floor(k / porFila);
        const c = k % porFila;
        const aparece = 20 + k * 2;
        const p = interpolate(frame, [aparece, aparece + 8], [0, 1], clamp);
        if (p <= 0) return null;
        const desplaz = f % 2 ? lad / 2 : 0;
        const x = x0 + c * lad + desplaz - (f % 2 && c === porFila - 1 ? lad / 2 : 0);
        const w = f % 2 && (c === 0 || c === porFila - 1) ? lad / 2 : lad;
        const xx = f % 2 && c === 0 ? x0 : x;
        return <rect key={k} x={xx + 2} y={base - (f + 1) * altoFila - 30 * (1 - p)} width={w - 4} height={altoFila - 4} fill="#d9774a" stroke="#a24f2c" strokeWidth={2} opacity={p} />;
      })}
      {/* techo */}
      <path d={`M${x0 - 40} ${base - filas * altoFila} L540 ${base - filas * altoFila - 200} L${x0 + ancho + 40} ${base - filas * altoFila} Z`} fill="#b23a48" opacity={techo} transform={`translate(0 ${-40 * (1 - techo)})`} />
      {/* ventanas, puerta y flores */}
      <g opacity={detalles}>
        <rect x={250} y={base - 330} width={130} height={110} fill="#bfe3ff" stroke="#ffffff" strokeWidth={8} />
        <rect x={700} y={base - 330} width={130} height={110} fill="#bfe3ff" stroke="#ffffff" strokeWidth={8} />
        <rect x={480} y={base - 260} width={120} height={260} rx={10} fill="#2a9d8f" />
      </g>
      <Piso color="#8bc34a" borde="#689f38" />
      {Array.from({ length: 9 }).map((_, i) => (
        <text key={i} x={40 + i * 120} y={PISO + 60} fontSize={56} opacity={detalles} fontFamily="'Noto Color Emoji', sans-serif">
          {i % 2 ? "🌻" : "🌷"}
        </text>
      ))}
    </svg>
  );
};

const Atardecer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Cielo arriba="#5b3a8c" abajo="#ff9e6d" />
      <circle cx={540} cy={1260 + frame * 0.15} r={160} fill="#ffd56b" style={{ filter: "drop-shadow(0 0 60px #ffb347)" }} />
      {[0, 150, 290, 440, 600, 760, 900].map((x, i) => (
        <rect key={x} x={x} y={1180 + ((i * 71) % 120)} width={150} height={PISO} fill="#3a2a5a" opacity={0.85} />
      ))}
      <Piso color="#2b1f45" />
    </svg>
  );
};

export const Fondo: React.FC<{ escenario: Escenario }> = ({ escenario }) => {
  switch (escenario) {
    case "barrio":
      return <Barrio />;
    case "noche":
      return <Barrio noche />;
    case "escuela":
      return <Escuela />;
    case "colectivo":
      return <Colectivo />;
    case "universidad":
      return <Universidad />;
    case "hospital":
      return <Hospital />;
    case "casaNueva":
      return <CasaNueva />;
    case "atardecer":
      return <Atardecer />;
  }
};

// Personajes ilustrados para los Reels de la serie de salud.
// Uso: <Personaje tipo="doctora" expresion="feliz" saluda size={400} />
// Animación propia: respiran, parpadean y (opcional) saludan con la mano.
import React from "react";
import { useCurrentFrame } from "remotion";

export type TipoPersonaje = "doctora" | "doctor" | "chica" | "chico" | "abuelo";
export type Expresion = "feliz" | "triste" | "dolor" | "sorpresa" | "pensando";

const PIEL: Record<TipoPersonaje, string> = {
  doctora: "#f2c6a0",
  doctor: "#c98d64",
  chica: "#f6d2b4",
  chico: "#8d5a3b",
  abuelo: "#efc9a8",
};

const PELO: Record<TipoPersonaje, string> = {
  doctora: "#4a2c1d",
  doctor: "#1f1f2b",
  chica: "#c8742d",
  chico: "#1b1b1b",
  abuelo: "#d9d9de",
};

const ROPA: Record<TipoPersonaje, string> = {
  doctora: "#ffffff",
  doctor: "#ffffff",
  chica: "#8b6cff",
  chico: "#2fbf8f",
  abuelo: "#d8b98a",
};

const TINTA = "#2b2d42";

/** Pelo detrás de la cabeza */
const PeloAtras: React.FC<{ tipo: TipoPersonaje }> = ({ tipo }) => {
  const c = PELO[tipo];
  if (tipo === "doctora") return <path d="M88 120 C80 60 220 40 214 120 L224 250 C190 270 110 270 76 250 Z" fill={c} />;
  if (tipo === "chica") return <path d="M200 110 C250 120 262 190 236 236 C226 200 214 170 200 150 Z" fill={c} />;
  return null;
};

/** Pelo delante (flequillo, peinado) */
const PeloAdelante: React.FC<{ tipo: TipoPersonaje }> = ({ tipo }) => {
  const c = PELO[tipo];
  switch (tipo) {
    case "doctora":
      return <path d="M92 118 C96 66 204 56 210 118 C186 92 140 86 92 118 Z" fill={c} />;
    case "doctor":
      return <path d="M94 110 C98 62 202 58 206 110 C200 92 180 84 150 86 C120 86 102 94 94 110 Z" fill={c} />;
    case "chica":
      return (
        <>
          <path d="M92 116 C96 64 204 58 208 116 C176 98 150 84 92 116 Z" fill={c} />
          <circle cx={206} cy={86} r={18} fill={c} />
        </>
      );
    case "chico":
      return (
        <g fill={c}>
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={98 + i * 13} cy={86 + Math.abs(4 - i) * 4} r={16} />
          ))}
        </g>
      );
    case "abuelo":
      return (
        <>
          <path d="M96 116 C92 96 100 84 112 82 L108 120 Z M204 116 C208 96 200 84 188 82 L192 120 Z" fill={c} />
          <path d="M122 186 C136 176 164 176 178 186 C166 192 134 192 122 186 Z" fill={c} />
        </>
      );
  }
};

const Cara: React.FC<{ expresion: Expresion; parpadeo: number; tipo: TipoPersonaje }> = ({ expresion, parpadeo, tipo }) => {
  const ojoY = 138;
  const cejas: Record<Expresion, string> = {
    feliz: "M110 116 Q122 108 134 116 M166 116 Q178 108 190 116",
    triste: "M110 112 Q122 118 134 122 M166 122 Q178 118 190 112",
    dolor: "M110 124 L134 114 M166 114 L190 124",
    sorpresa: "M110 108 Q122 98 134 108 M166 108 Q178 98 190 108",
    pensando: "M110 116 Q122 112 134 116 M166 110 Q178 102 190 108",
  };
  const boca: Record<Expresion, React.ReactNode> = {
    feliz: <path d="M126 172 Q150 196 174 172" stroke={TINTA} strokeWidth={6} fill="none" strokeLinecap="round" />,
    triste: <path d="M128 186 Q150 170 172 186" stroke={TINTA} strokeWidth={6} fill="none" strokeLinecap="round" />,
    dolor: <path d="M126 182 L136 176 L146 184 L156 176 L166 184 L174 178" stroke={TINTA} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    sorpresa: <ellipse cx={150} cy={180} rx={11} ry={15} fill={TINTA} />,
    pensando: <path d="M132 180 L170 174" stroke={TINTA} strokeWidth={6} strokeLinecap="round" />,
  };
  const ojosCerrados = expresion === "dolor";
  return (
    <g>
      <path d={cejas[expresion]} stroke={tipo === "abuelo" ? "#9a9aa6" : TINTA} strokeWidth={5} fill="none" strokeLinecap="round" />
      {ojosCerrados ? (
        <path d={`M112 ${ojoY} Q122 ${ojoY + 8} 132 ${ojoY} M168 ${ojoY} Q178 ${ojoY + 8} 188 ${ojoY}`} stroke={TINTA} strokeWidth={5} fill="none" strokeLinecap="round" />
      ) : (
        <g transform={`translate(0 ${ojoY}) scale(1 ${parpadeo}) translate(0 ${-ojoY})`}>
          <ellipse cx={122} cy={ojoY} rx={9} ry={expresion === "sorpresa" ? 12 : 10} fill={TINTA} />
          <ellipse cx={178} cy={ojoY} rx={9} ry={expresion === "sorpresa" ? 12 : 10} fill={TINTA} />
          <circle cx={125} cy={ojoY - 3} r={3} fill="#fff" />
          <circle cx={181} cy={ojoY - 3} r={3} fill="#fff" />
        </g>
      )}
      {tipo === "doctor" && (
        <g stroke={TINTA} strokeWidth={4} fill="none">
          <circle cx={122} cy={ojoY} r={20} />
          <circle cx={178} cy={ojoY} r={20} />
          <path d={`M142 ${ojoY} L158 ${ojoY}`} />
        </g>
      )}
      {/* cachetes */}
      <circle cx={106} cy={164} r={11} fill="#ff8a8a" opacity={expresion === "triste" ? 0.15 : 0.35} />
      <circle cx={194} cy={164} r={11} fill="#ff8a8a" opacity={expresion === "triste" ? 0.15 : 0.35} />
      {boca[expresion]}
      {expresion === "triste" && <path d="M188 150 Q194 162 188 168 Q182 162 188 150 Z" fill="#7ec8ff" />}
      {expresion === "dolor" && <path d="M206 100 Q214 112 206 118 Q198 112 206 100 Z" fill="#7ec8ff" />}
    </g>
  );
};

export const Personaje: React.FC<{
  tipo: TipoPersonaje;
  expresion?: Expresion;
  size?: number;
  saluda?: boolean;
  /** desfase para que no respiren todos a la vez */
  fase?: number;
}> = ({ tipo, expresion = "feliz", size = 360, saluda = false, fase = 0 }) => {
  const frame = useCurrentFrame() + fase;
  const respira = Math.sin(frame / 18) * 3;
  // parpadeo corto cada ~3 segundos
  const ciclo = frame % 95;
  const parpadeo = ciclo < 4 ? 0.1 : 1;
  const brazoSaludo = saluda ? -130 + Math.sin(frame / 5) * 18 : 0;
  const piel = PIEL[tipo];
  const ropa = ROPA[tipo];
  const medico = tipo === "doctora" || tipo === "doctor";
  const pensando = expresion === "pensando";
  const manga = ropa === "#ffffff" ? "#e7ecf4" : ropa;
  return (
    <svg width={size} height={size * 1.373} viewBox="0 0 300 412" style={{ overflow: "visible" }}>
      <g transform={`translate(0 ${respira})`}>
        {/* cuerpo */}
        <path d="M70 400 C70 300 96 250 150 250 C204 250 230 300 230 400 Q150 412 70 400 Z" fill={ropa} stroke={TINTA} strokeWidth={4} />
        {medico && (
          <>
            <path d="M150 252 L126 330 M150 252 L174 330" stroke="#c9d3e3" strokeWidth={5} />
            <rect x={136} y={252} width={28} height={60} fill="#7cc4ff" />
            {/* estetoscopio */}
            <path d="M118 262 C108 320 150 340 150 300 M182 262 C192 320 150 340 150 300" stroke="#3a3f5a" strokeWidth={5} fill="none" />
            <circle cx={150} cy={346} r={12} fill="#9aa4b8" stroke="#3a3f5a" strokeWidth={4} />
            <rect x={186} y={300} width={30} height={22} rx={4} fill="#e8eef8" stroke="#c9d3e3" strokeWidth={3} />
          </>
        )}
        {tipo === "abuelo" && <path d="M110 262 L150 300 L190 262" stroke="#b8956a" strokeWidth={6} fill="none" />}
        {/* brazo izquierdo (se apoya en el mentón si piensa) */}
        {pensando ? (
          <>
            <path d="M86 296 C66 262 96 222 132 214" stroke={manga} strokeWidth={26} strokeLinecap="round" fill="none" />
            <circle cx={140} cy={210} r={15} fill={piel} stroke={TINTA} strokeWidth={3} />
          </>
        ) : (
          <>
            <path d="M84 296 C72 322 70 346 74 366" stroke={manga} strokeWidth={26} strokeLinecap="round" fill="none" />
            <circle cx={75} cy={376} r={15} fill={piel} stroke={TINTA} strokeWidth={3} />
          </>
        )}
        {/* brazo derecho (saluda) */}
        <g transform={`rotate(${brazoSaludo} 216 296)`}>
          <path d="M216 296 C228 322 230 346 226 366" stroke={manga} strokeWidth={26} strokeLinecap="round" fill="none" />
          <circle cx={225} cy={376} r={15} fill={piel} stroke={TINTA} strokeWidth={3} />
        </g>
        {/* cuello y cabeza */}
        <rect x={134} y={204} width={32} height={50} rx={12} fill={piel} />
        <PeloAtras tipo={tipo} />
        <ellipse cx={150} cy={142} rx={66} ry={76} fill={piel} stroke={TINTA} strokeWidth={4} />
        <ellipse cx={84} cy={150} rx={10} ry={16} fill={piel} stroke={TINTA} strokeWidth={3} />
        <ellipse cx={216} cy={150} rx={10} ry={16} fill={piel} stroke={TINTA} strokeWidth={3} />
        <PeloAdelante tipo={tipo} />
        <Cara expresion={expresion} parpadeo={parpadeo} tipo={tipo} />
        {pensando && (
          <g fill="#ffffff" stroke="#c9c9e0" strokeWidth={3}>
            <circle cx={236} cy={70} r={8} />
            <circle cx={256} cy={44} r={12} />
            <ellipse cx={286} cy={8} rx={30} ry={22} />
          </g>
        )}
      </g>
    </svg>
  );
};

export const NOMBRES: Record<TipoPersonaje, string> = {
  doctora: "La doctora",
  doctor: "El doctor",
  chica: "Sofi",
  chico: "Tomi",
  abuelo: "El abuelo",
};

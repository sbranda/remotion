// ─────────────────────────────────────────────────────────────────────────────
//  REEL: PIES HINCHADOS (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "fovea", seg: 12 },
  { id: "comunes", seg: 14 },
  { id: "algoMas", seg: 14 },
  { id: "alarmas", seg: 14 },
  { id: "tips", seg: 12 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

/** Causas comunes y en general benignas */
export const COMUNES = [
  { emoji: "🧍", texto: "Muchas horas de pie o sentado" },
  { emoji: "✈️", texto: "Viajes largos" },
  { emoji: "🥵", texto: "El calor" },
  { emoji: "🧂", texto: "Comer con mucha sal" },
  { emoji: "🤰", texto: "El embarazo" },
];

/** Cuando puede ser algo más (para consultar) */
export const ALGO_MAS = [
  { emoji: "🫀", texto: "Corazón" },
  { emoji: "🫘", texto: "Riñones" },
  { emoji: "🟤", texto: "Hígado" },
  { emoji: "🦵", texto: "Várices" },
  { emoji: "🦋", texto: "Tiroides" },
  { emoji: "💊", texto: "Medicamentos" },
];

export const ALARMAS = [
  { emoji: "🦵", titulo: "Una sola pierna, con dolor, calor o enrojecimiento", texto: "Puede ser una trombosis: consultá en el día" },
  { emoji: "😮‍💨", titulo: "Con falta de aire o dolor de pecho", texto: "Llamá al 107 o al 911" },
  { emoji: "🤰", titulo: "Embarazada, con dolor de cabeza o visión borrosa", texto: "Consultá urgente" },
];

export const TIPS = [
  { emoji: "🛋️", texto: "Elevá las piernas un rato, por encima del corazón" },
  { emoji: "🚶", texto: "Caminá y mové los tobillos si estás mucho quieto" },
  { emoji: "🧂", texto: "Bajá la sal" },
  { emoji: "💧", texto: "Tomá agua" },
  { emoji: "🧦", texto: "Medias de compresión, si te las indica tu médico" },
];

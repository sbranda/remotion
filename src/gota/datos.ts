// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ÁCIDO ÚRICO Y GOTA (90 s) — textos y duraciones
//  Estilo neón de la serie de análisis (src/salud/pop.tsx), público argentino.
//  Valores de referencia orientativos: cada laboratorio tiene los suyos.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "acidoUrico", seg: 12 },
  { id: "valores", seg: 10 },
  { id: "gota", seg: 14 },
  { id: "sintomas", seg: 12 },
  { id: "sube", seg: 14 },
  { id: "ayuda", seg: 16 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const VALORES = [
  { quien: "Hombres", emoji: "👨", valor: 7 },
  { quien: "Mujeres", emoji: "👩", valor: 6 },
];

export const SINTOMAS = [
  { emoji: "⚡", texto: "Dolor muy fuerte, de golpe" },
  { emoji: "🌙", texto: "Suele empezar de noche" },
  { emoji: "🔴", texto: "Piel roja" },
  { emoji: "🔥", texto: "Calor en la zona" },
  { emoji: "🎈", texto: "Hinchazón" },
  { emoji: "🦶", texto: "Dedo gordo, tobillo o rodilla" },
];

export const SUBE = [
  { emoji: "🫀", texto: "Achuras: hígado, riñón, molleja" },
  { emoji: "🥩", texto: "Mucha carne roja" },
  { emoji: "🦐", texto: "Mariscos y anchoas" },
  { emoji: "🍺", texto: "Alcohol, sobre todo cerveza" },
  { emoji: "🥤", texto: "Gaseosas y jugos azucarados" },
  { emoji: "⚖️", texto: "Sobrepeso" },
];

export const AYUDA = [
  { emoji: "💧", texto: "Tomá mucha agua" },
  { emoji: "🥩", texto: "Menos achuras, carne roja y mariscos" },
  { emoji: "🍺", texto: "Menos alcohol, sobre todo cerveza" },
  { emoji: "⚖️", texto: "Bajá de peso de a poco, sin dietas extremas" },
  { emoji: "💊", texto: "Si te indicaron medicación, tomala aunque no duela" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ANEMIA (90 s) — textos y duraciones
//  Estilo llamativo de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 10 },
  { id: "sintomas", seg: 14 },
  { id: "valores", seg: 12 },
  { id: "causas", seg: 13 },
  { id: "hierro", seg: 12 },
  { id: "trucos", seg: 17 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "😴", texto: "Cansancio" },
  { emoji: "😶", texto: "Palidez" },
  { emoji: "😮‍💨", texto: "Falta de aire" },
  { emoji: "💫", texto: "Mareos" },
  { emoji: "🥶", texto: "Manos y pies fríos" },
  { emoji: "💓", texto: "Corazón acelerado" },
];

/** Hemoglobina por debajo de estos valores = anemia (criterio OMS, adultos) */
export const UMBRALES = [
  { quien: "Hombres", emoji: "👨", valor: 13 },
  { quien: "Mujeres", emoji: "👩", valor: 12 },
  { quien: "Embarazadas", emoji: "🤰", valor: 11 },
];

export const CAUSAS = [
  { emoji: "🍽️", texto: "Poco hierro en la alimentación" },
  { emoji: "🩸", texto: "Menstruaciones abundantes o sangrados" },
  { emoji: "🤰", texto: "Embarazo" },
  { emoji: "🌾", texto: "Celiaquía: el cuerpo absorbe mal el hierro" },
  { emoji: "💊", texto: "Falta de vitamina B12 o ácido fólico" },
];

export const HIERRO = [
  { emoji: "🥩", texto: "Carne roja, hígado y morcilla" },
  { emoji: "🐟", texto: "Pollo y pescado" },
  { emoji: "🥣", texto: "Lentejas y otras legumbres" },
  { emoji: "🥬", texto: "Acelga y espinaca" },
];

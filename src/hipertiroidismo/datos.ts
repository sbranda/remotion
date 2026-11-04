// ─────────────────────────────────────────────────────────────────────────────
//  REEL: HIPERTIROIDISMO (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "sintomas", seg: 16 },
  { id: "hiperHipo", seg: 12 },
  { id: "causas", seg: 12 },
  { id: "diagnostico", seg: 12 },
  { id: "tratamiento", seg: 14 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "💓", texto: "Palpitaciones" },
  { emoji: "⚖️", texto: "Bajás de peso" },
  { emoji: "😰", texto: "Nervios y ansiedad" },
  { emoji: "✋", texto: "Temblor en las manos" },
  { emoji: "🥵", texto: "Calor y sudor" },
  { emoji: "🌙", texto: "Dormís mal" },
  { emoji: "🚽", texto: "Vas más al baño" },
  { emoji: "💪", texto: "Debilidad muscular" },
  { emoji: "👀", texto: "Ojos saltones" },
];

/** Hiper vs. hipo */
export const COMPARACION = [
  { hiper: "Bajás de peso", hipo: "Subís de peso" },
  { hiper: "Tenés calor", hipo: "Tenés frío" },
  { hiper: "Corazón rápido", hipo: "Corazón lento" },
  { hiper: "Nervios", hipo: "Cansancio" },
];

export const CAUSAS = [
  { emoji: "🛡️", texto: "Enfermedad de Graves: tus defensas estimulan la tiroides (la más común)" },
  { emoji: "🔵", texto: "Nódulos en la tiroides" },
  { emoji: "🔥", texto: "Inflamación de la tiroides (tiroiditis)" },
  { emoji: "💊", texto: "Exceso de medicación para la tiroides" },
];

export const TRATAMIENTOS = [
  { emoji: "💊", texto: "Medicamentos" },
  { emoji: "☢️", texto: "Yodo radiactivo" },
  { emoji: "🏥", texto: "Cirugía" },
];

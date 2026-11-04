// ─────────────────────────────────────────────────────────────────────────────
//  REEL: HIPOTIROIDISMO (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
//  Es la contracara del Reel de hipertiroidismo y reutiliza sus piezas.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "sintomas", seg: 16 },
  { id: "hipoHiper", seg: 12 },
  { id: "causas", seg: 12 },
  { id: "diagnostico", seg: 12 },
  { id: "tratamiento", seg: 14 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "😴", texto: "Cansancio" },
  { emoji: "⚖️", texto: "Subís de peso" },
  { emoji: "🥶", texto: "Tenés frío" },
  { emoji: "🧴", texto: "Piel seca" },
  { emoji: "💇", texto: "Se te cae el pelo" },
  { emoji: "🚽", texto: "Constipación" },
  { emoji: "😔", texto: "Ánimo bajo" },
  { emoji: "🧠", texto: "Memoria lenta" },
  { emoji: "🐢", texto: "Corazón lento" },
];

export const CAUSAS = [
  { emoji: "🛡️", texto: "Tiroiditis de Hashimoto: tus defensas atacan la tiroides (la más común)" },
  { emoji: "🏥", texto: "Después de una cirugía o de yodo radiactivo" },
  { emoji: "💊", texto: "Algunos medicamentos" },
  { emoji: "🤰", texto: "Después del embarazo (tiroiditis posparto)" },
];

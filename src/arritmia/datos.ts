// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ARRITMIA (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 14 },
  { id: "sintomas", seg: 12 },
  { id: "fibrilacion", seg: 12 },
  { id: "causas", seg: 14 },
  { id: "pulso", seg: 12 },
  { id: "tratamiento", seg: 12 },
  { id: "cierre", seg: 10 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "💓", texto: "Palpitaciones" },
  { emoji: "💫", texto: "Mareos" },
  { emoji: "😮‍💨", texto: "Falta de aire" },
  { emoji: "😴", texto: "Cansancio" },
  { emoji: "🫀", texto: "Dolor de pecho" },
  { emoji: "😵", texto: "Desmayos" },
];

export const CAUSAS = [
  { emoji: "🩺", texto: "Presión alta y enfermedades del corazón" },
  { emoji: "🦋", texto: "Problemas de tiroides (sobre todo el hiper)" },
  { emoji: "☕", texto: "Mucho café o bebidas energizantes" },
  { emoji: "🍷", texto: "Alcohol y tabaco" },
  { emoji: "😰", texto: "Estrés y dormir poco" },
];

export const TRATAMIENTOS = [
  { emoji: "🥗", texto: "Cambios de hábitos" },
  { emoji: "💊", texto: "Medicamentos" },
  { emoji: "⚡", texto: "Procedimientos o marcapasos" },
];

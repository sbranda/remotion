// ─────────────────────────────────────────────────────────────────────────────
//  REEL: CELIAQUÍA Y SENSIBILIDAD AL GLUTEN NO CELÍACA (90 s)
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "gluten", seg: 8 },
  { id: "celiaca", seg: 12 },
  { id: "sintomas", seg: 12 },
  { id: "sensibilidad", seg: 12 },
  { id: "comparacion", seg: 12 },
  { id: "diagnostico", seg: 12 },
  { id: "sinTacc", seg: 12 },
  { id: "cierre", seg: 6 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const TACC = [
  { letra: "T", texto: "Trigo" },
  { letra: "A", texto: "Avena" },
  { letra: "C", texto: "Cebada" },
  { letra: "C", texto: "Centeno" },
];

export const SINTOMAS = [
  { emoji: "🎈", texto: "Panza hinchada" },
  { emoji: "🚽", texto: "Diarrea o constipación" },
  { emoji: "😖", texto: "Dolor de panza" },
  { emoji: "⚖️", texto: "Bajar de peso" },
  { emoji: "🩸", texto: "Anemia" },
  { emoji: "🔋", texto: "Cansancio" },
  { emoji: "👄", texto: "Aftas en la boca" },
  { emoji: "📏", texto: "En chicos: crecer poco" },
  { emoji: "🤷", texto: "O ningún síntoma" },
];

export const COMPARACION = [
  { tema: "¿Daña el intestino?", celiaca: "Sí", sensibilidad: "No" },
  { tema: "Análisis de sangre", celiaca: "Anticuerpos positivos", sensibilidad: "Normales" },
  { tema: "¿Es para siempre?", celiaca: "Sí", sensibilidad: "Puede variar" },
  { tema: "Dieta sin gluten", celiaca: "Estricta, de por vida", sensibilidad: "Según tolerancia" },
];

export const CONTAMINACION = [
  { emoji: "🍞", texto: "Tostadora y panera aparte" },
  { emoji: "🔪", texto: "Tablas y cubiertos bien lavados" },
  { emoji: "🍟", texto: "Nada de aceite donde se frió con harina" },
  { emoji: "🧈", texto: "Frascos propios: sin migas" },
];

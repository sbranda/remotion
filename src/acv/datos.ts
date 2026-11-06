// ─────────────────────────────────────────────────────────────────────────────
//  REEL: CÓMO RECONOCER UN ACV (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "tiempo", seg: 8 },
  { id: "sonreir", seg: 8 },
  { id: "brazos", seg: 8 },
  { id: "hablar", seg: 8 },
  { id: "otras", seg: 12 },
  { id: "queHacer", seg: 14 },
  { id: "riesgo", seg: 8 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

/** Neuronas que se pierden por minuto sin tratamiento (estimación publicada en Stroke, 2006) */
export const NEURONAS_POR_MINUTO = 1_900_000;

export const OTRAS = [
  { emoji: "🌀", texto: "Mareo o pérdida del equilibrio de golpe" },
  { emoji: "👁️", texto: "Ver mal o doble de repente" },
  { emoji: "⚡", texto: "Dolor de cabeza muy fuerte y repentino" },
  { emoji: "😵‍💫", texto: "Confusión, no entender lo que le dicen" },
];

export const QUE_HACER = [
  { emoji: "📞", texto: "Llamá YA al 107 o al 911" },
  { emoji: "⏱️", texto: "Anotá la hora en que empezó" },
  { emoji: "🚫", texto: "No le des comida, bebida ni remedios" },
  { emoji: "⚠️", texto: "Aunque los síntomas se vayan, igual es una emergencia" },
];

export const RIESGOS = ["🩺 Presión alta", "🚬 Cigarrillo", "🩸 Diabetes", "🧈 Colesterol", "💓 Arritmias", "🛋️ Sedentarismo"];

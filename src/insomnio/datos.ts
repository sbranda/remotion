// ─────────────────────────────────────────────────────────────────────────────
//  REEL: INSOMNIO (90 s) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "horas", seg: 8 },
  { id: "empeora", seg: 14 },
  { id: "habitos", seg: 22 },
  { id: "regla20", seg: 10 },
  { id: "consultar", seg: 12 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const FORMAS = [
  { emoji: "🛏️", texto: "Te cuesta dormirte" },
  { emoji: "🌙", texto: "Te despertás a la noche y no volvés a dormirte" },
  { emoji: "🌅", texto: "Te despertás muy temprano" },
];

export const EMPEORA = [
  { emoji: "😰", texto: "Estrés y preocupaciones" },
  { emoji: "📱", texto: "Pantallas antes de dormir" },
  { emoji: "🧉", texto: "Mate o café a la tarde" },
  { emoji: "🍷", texto: "Alcohol" },
  { emoji: "🕐", texto: "Horarios desordenados" },
  { emoji: "😪", texto: "Siestas largas" },
];

export const HABITOS = [
  { emoji: "⏰", texto: "Acostate y levantate a la misma hora, también el finde" },
  { emoji: "☀️", texto: "Tomá luz natural a la mañana" },
  { emoji: "🧉", texto: "Nada de mate ni café después de media tarde" },
  { emoji: "📵", texto: "Dejá las pantallas una hora antes" },
  { emoji: "🌑", texto: "Cuarto oscuro, fresco y en silencio" },
  { emoji: "🍲", texto: "Cená liviano y no muy tarde" },
];

export const CONSULTAR = [
  { emoji: "📆", texto: "Hace más de un mes que dormís mal" },
  { emoji: "🥱", texto: "Te afecta en el día: cansancio, humor, concentración" },
  { emoji: "😮‍💨", texto: "Roncás fuerte o parás de respirar dormido" },
];

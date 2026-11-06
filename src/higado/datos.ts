// ─────────────────────────────────────────────────────────────────────────────
//  REEL: HÍGADO GRASO (90 s) — textos y duraciones
//  Estilo neón de la serie de análisis (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "comun", seg: 8 },
  { id: "riesgos", seg: 14 },
  { id: "etapas", seg: 16 },
  { id: "diagnostico", seg: 10 },
  { id: "ayuda", seg: 18 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const RIESGOS = [
  { emoji: "⚖️", texto: "Sobrepeso, sobre todo en la panza" },
  { emoji: "🩸", texto: "Diabetes o glucosa alta" },
  { emoji: "🧈", texto: "Triglicéridos y colesterol altos" },
  { emoji: "🩺", texto: "Presión alta" },
  { emoji: "🥤", texto: "Gaseosas, jugos y azúcar" },
  { emoji: "🍺", texto: "Alcohol" },
];

export const ETAPAS = [
  { nombre: "Sano", color: "#2ee59d", grasa: 0, cicatriz: 0 },
  { nombre: "Graso", color: "#ffd23f", grasa: 1, cicatriz: 0 },
  { nombre: "Inflamado", color: "#ff9f43", grasa: 1, cicatriz: 0.3 },
  { nombre: "Cicatrices", color: "#ff4d5e", grasa: 0.8, cicatriz: 0.8 },
];

export const AYUDA = [
  { emoji: "🚶", texto: "Movete: 150 minutos por semana" },
  { emoji: "🥤", texto: "Cortá con las gaseosas y los jugos" },
  { emoji: "🥗", texto: "Más verduras, legumbres y pescado" },
  { emoji: "🍺", texto: "Evitá el alcohol" },
  { emoji: "🚫", texto: "Nada de “detox” ni suplementos sin indicación" },
];

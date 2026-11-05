// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ¿QUÉ ES UN ATAQUE DE PÁNICO? (3 minutos) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), hermano del Reel de ansiedad.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 6 },
  { id: "queEs", seg: 18 },
  { id: "siente", seg: 20 },
  { id: "ola", seg: 16 },
  { id: "porQue", seg: 16 },
  { id: "circulo", seg: 18 },
  { id: "queHacer", seg: 26 },
  { id: "respirar", seg: 24 },
  { id: "ayudar", seg: 16 },
  { id: "tratamiento", seg: 10 },
  { id: "cierre", seg: 10 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "💓", texto: "Corazón a mil" },
  { emoji: "😮‍💨", texto: "Falta de aire" },
  { emoji: "🫀", texto: "Opresión en el pecho" },
  { emoji: "💦", texto: "Sudor" },
  { emoji: "🫨", texto: "Temblor" },
  { emoji: "💫", texto: "Mareo" },
  { emoji: "🤢", texto: "Náuseas" },
  { emoji: "✋", texto: "Hormigueo" },
  { emoji: "🌫️", texto: "Sentir que nada es real" },
  { emoji: "😱", texto: "Miedo a morir o perder el control" },
];

export const CIRCULO = [
  { emoji: "💓", texto: "Notás el corazón rápido" },
  { emoji: "💭", texto: "“¿Me está dando un infarto?”" },
  { emoji: "😨", texto: "Más miedo" },
  { emoji: "📈", texto: "Más síntomas" },
];

export const QUE_HACER = [
  { emoji: "🗣️", texto: "Decite: “Es un ataque de pánico. Va a pasar”" },
  { emoji: "🌬️", texto: "Respirá lento, soltando el aire más largo" },
  { emoji: "🦶", texto: "Sentí los pies en el piso y mirá lo que te rodea" },
  { emoji: "🌊", texto: "No pelees con las sensaciones: dejá pasar la ola" },
  { emoji: "🧊", texto: "Agua fría en la cara o algo frío en las manos" },
];

export const AYUDAR = [
  { emoji: "🤝", texto: "Quedate cerca y hablá tranquilo" },
  { emoji: "🙅", texto: "No le digas “calmate” ni “no es nada”" },
  { emoji: "🌬️", texto: "Respirá despacio junto a la persona" },
  { emoji: "❓", texto: "Preguntale qué necesita" },
];

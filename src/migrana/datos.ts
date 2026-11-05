// ─────────────────────────────────────────────────────────────────────────────
//  REEL: MIGRAÑA (90 s) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx): colores suaves y sin destellos, público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "sintomas", seg: 12 },
  { id: "aura", seg: 12 },
  { id: "desencadenantes", seg: 14 },
  { id: "ayuda", seg: 14 },
  { id: "alarmas", seg: 14 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "💥", texto: "Dolor que late, de un lado" },
  { emoji: "🤢", texto: "Náuseas o vómitos" },
  { emoji: "💡", texto: "Te molesta la luz" },
  { emoji: "🔊", texto: "Te molestan los ruidos" },
  { emoji: "👃", texto: "Y a veces los olores" },
  { emoji: "🚶", texto: "Empeora al moverte" },
];

export const DESENCADENANTES = [
  { emoji: "😰", texto: "Estrés" },
  { emoji: "😴", texto: "Dormir poco o de más" },
  { emoji: "🍽️", texto: "Saltear comidas" },
  { emoji: "🩸", texto: "La menstruación" },
  { emoji: "🍷", texto: "Alcohol" },
  { emoji: "💧", texto: "Tomar poca agua" },
];

export const AYUDA = [
  { emoji: "🌑", texto: "Un lugar oscuro y en silencio" },
  { emoji: "🧊", texto: "Frío en la frente o la nuca" },
  { emoji: "💊", texto: "La medicación indicada, apenas empieza el dolor" },
  { emoji: "📓", texto: "Anotá cada crisis para descubrir qué la dispara" },
];

export const ALARMAS = [
  { emoji: "⚡", texto: "El peor dolor de tu vida, de golpe" },
  { emoji: "🌡️", texto: "Con fiebre y la nuca rígida" },
  { emoji: "🗣️", texto: "Con dificultad para hablar o debilidad de un lado" },
  { emoji: "🤕", texto: "Después de un golpe en la cabeza" },
];

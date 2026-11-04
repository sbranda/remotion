// ─────────────────────────────────────────────────────────────────────────────
//  REEL: COLESTEROL (90 s) — textos y duraciones
//  Mismo contenido que el diseño "Reel 90 s – Colesterol" de Canva,
//  en versión "llamativa": fondo oscuro, neón, textos grandes y emojis.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Usuario que aparece al pie de todas las páginas */
export const FIRMA = "@sebranda";

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 10 },
  { id: "buenoMalo", seg: 12 },
  { id: "valores", seg: 14 },
  { id: "importa", seg: 12 },
  { id: "sube", seg: 13 },
  { id: "bajar", seg: 17 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

/** Paleta neón sobre fondo oscuro */
export const P = {
  fondo1: "#071630",
  fondo2: "#0f2f5e",
  texto: "#ffffff",
  texto2: "#b9c8e6",
  rojo: "#ff4d5e",
  verde: "#2ee59d",
  amarillo: "#ffd23f",
  cian: "#3ad7ff",
  violeta: "#8b5cff",
  vidrio: "rgba(255,255,255,0.08)",
  borde: "rgba(255,255,255,0.16)",
};

export const SUBE = [
  { emoji: "🥓", texto: "Carnes grasas, embutidos y achuras" },
  { emoji: "🧈", texto: "Manteca, crema y quesos duros" },
  { emoji: "🥐", texto: "Facturas y productos industriales" },
  { emoji: "🚬", texto: "Sedentarismo y tabaco" },
  { emoji: "🧬", texto: "Genética: puede venir de familia" },
];

export const BAJAR = [
  { emoji: "🥩", texto: "En el asado, elegí cortes magros" },
  { emoji: "🫒", texto: "Cambiá la manteca por aceite de oliva" },
  { emoji: "🥣", texto: "Sumá avena, legumbres y frutos secos" },
  { emoji: "🏃", texto: "Movete: el ejercicio sube el HDL" },
  { emoji: "🚭", texto: "Si fumás, dejar ayuda muchísimo" },
];

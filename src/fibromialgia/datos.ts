// ─────────────────────────────────────────────────────────────────────────────
//  REEL: FIBROMIALGIA (90 s) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queEs", seg: 12 },
  { id: "volumen", seg: 10 },
  { id: "sintomas", seg: 14 },
  { id: "quien", seg: 8 },
  { id: "diagnostico", seg: 12 },
  { id: "ayuda", seg: 22 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SINTOMAS = [
  { emoji: "🔥", texto: "Dolor en todo el cuerpo" },
  { emoji: "🔋", texto: "Cansancio que no se va al descansar" },
  { emoji: "🛏️", texto: "Dormís y te levantás igual de cansado" },
  { emoji: "🌫️", texto: "“Niebla mental”: cuesta concentrarse" },
  { emoji: "🧊", texto: "Rigidez al levantarte" },
  { emoji: "🔊", texto: "Sensibilidad al frío, el ruido o la presión" },
];

export const AYUDA = [
  { emoji: "🚶", texto: "Ejercicio suave y de a poco: es lo que más ayuda" },
  { emoji: "🏊", texto: "Caminar, nadar, yoga o tai chi" },
  { emoji: "😴", texto: "Cuidar el sueño" },
  { emoji: "🗣️", texto: "Terapia para manejar el dolor y el estrés" },
  { emoji: "💊", texto: "Medicación, si la indica tu médico" },
];

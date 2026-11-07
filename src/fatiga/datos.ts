// ─────────────────────────────────────────────────────────────────────────────
//  REEL: FATIGA CRÓNICA Y BURNOUT (90 s) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "distintos", seg: 6 },
  { id: "fatiga", seg: 14 },
  { id: "burnout", seg: 14 },
  { id: "comparacion", seg: 14 },
  { id: "descartar", seg: 10 },
  { id: "ayudaFatiga", seg: 10 },
  { id: "ayudaBurnout", seg: 12 },
  { id: "cierre", seg: 6 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const FATIGA = [
  { emoji: "📆", texto: "Cansancio extremo por 6 meses o más" },
  { emoji: "🛏️", texto: "No mejora con el descanso" },
  { emoji: "📉", texto: "Empeora después de un esfuerzo, aunque sea chico" },
  { emoji: "🌫️", texto: "Niebla mental y sueño que no repara" },
];

export const BURNOUT = [
  { emoji: "🪫", texto: "Agotamiento" },
  { emoji: "🧊", texto: "Distancia o rechazo hacia el trabajo" },
  { emoji: "📉", texto: "Sentir que rendís menos" },
];

export const COMPARACION = [
  { tema: "¿Qué es?", fatiga: "Una enfermedad", burnout: "Desgaste por estrés laboral" },
  { tema: "¿De dónde viene?", fatiga: "No se sabe del todo; a veces, después de una infección", burnout: "Estrés crónico en el trabajo" },
  { tema: "¿Mejora descansando?", fatiga: "No", burnout: "Suele mejorar al bajar el estrés" },
  { tema: "Señal clave", fatiga: "Empeora después del esfuerzo", burnout: "Rechazo y desgaste con el trabajo" },
];

export const DESCARTAR = [
  { emoji: "🩸", texto: "Anemia" },
  { emoji: "🦋", texto: "Tiroides" },
  { emoji: "🌧️", texto: "Depresión" },
  { emoji: "😴", texto: "Apnea del sueño" },
  { emoji: "🍬", texto: "Diabetes" },
  { emoji: "💊", texto: "Medicamentos" },
];

export const AYUDA_FATIGA = [
  { emoji: "🔋", texto: "Dosificá la energía: no gastes todo un día bueno" },
  { emoji: "🚫", texto: "No te fuerces a hacer más ejercicio" },
  { emoji: "🩺", texto: "Seguimiento médico" },
];

export const AYUDA_BURNOUT = [
  { emoji: "🚧", texto: "Poné límites: horarios y mensajes" },
  { emoji: "⏸️", texto: "Pausas y desconexión de verdad" },
  { emoji: "🗣️", texto: "Hablalo en el trabajo y con un profesional" },
  { emoji: "📄", texto: "Si hace falta, licencia médica" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  REEL: TDAH (3 minutos) — textos y duraciones
//  Estilo "cómic / pop art" (src/salud/comic.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 5 },
  { id: "queEs", seg: 15 },
  { id: "comun", seg: 12 },
  { id: "tipos", seg: 18 },
  { id: "inatencion", seg: 18 },
  { id: "hiperactividad", seg: 18 },
  { id: "adultos", seg: 18 },
  { id: "mitos", seg: 22 },
  { id: "diagnostico", seg: 15 },
  { id: "tratamiento", seg: 17 },
  { id: "tips", seg: 14 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const PENDIENTES = ["📚 Estudiar", "🧺 Lavar la ropa", "📧 Responder mails", "🎸 Aprender guitarra", "🧹 Ordenar el cuarto"];

export const TIPOS = [
  { emoji: "🎈", nombre: "Inatento", texto: "Le cuesta concentrarse y organizarse" },
  { emoji: "⚡", nombre: "Hiperactivo-impulsivo", texto: "No para y actúa sin pensar" },
  { emoji: "🌀", nombre: "Combinado", texto: "Un poco de las dos" },
];

export const INATENCION = [
  { emoji: "🦋", texto: "Se distrae con cualquier cosa" },
  { emoji: "🔑", texto: "Pierde las llaves, el celular… todo" },
  { emoji: "📝", texto: "Le cuesta terminar lo que empieza" },
  { emoji: "👂", texto: "Parece que no escucha" },
  { emoji: "📅", texto: "Se olvida de turnos y tareas" },
];

export const HIPERACTIVIDAD = [
  { emoji: "🦵", texto: "Le cuesta quedarse quieto" },
  { emoji: "🗣️", texto: "Habla mucho e interrumpe" },
  { emoji: "⏳", texto: "Le cuesta esperar su turno" },
  { emoji: "💥", texto: "Actúa sin pensar" },
];

export const ADULTOS = [
  { emoji: "🌪️", texto: "Desorganización" },
  { emoji: "⏰", texto: "Llega tarde y calcula mal el tiempo" },
  { emoji: "🔜", texto: "Posterga todo" },
  { emoji: "🧠", texto: "La cabeza no para nunca" },
];

export const MITOS = ["Es falta de voluntad", "Es culpa de la crianza", "Solo les pasa a los chicos", "Se arregla con disciplina"];

export const DIAGNOSTICO = [
  { emoji: "👩‍⚕️", texto: "Lo hace un profesional especializado" },
  { emoji: "🗂️", texto: "Con entrevistas y cuestionarios" },
  { emoji: "🧒", texto: "Los síntomas vienen desde la infancia" },
  { emoji: "🩸", texto: "No hay un análisis de sangre que lo detecte" },
];

export const TRATAMIENTO = [
  { emoji: "📚", texto: "Entender qué es el TDAH" },
  { emoji: "🗨️", texto: "Terapia" },
  { emoji: "🏫", texto: "Apoyo en la escuela o el trabajo" },
  { emoji: "💊", texto: "Medicación, si el profesional la indica" },
];

export const TIPS = [
  { emoji: "✂️", texto: "Dividí las tareas en pasos chicos" },
  { emoji: "⏰", texto: "Usá alarmas y recordatorios" },
  { emoji: "📋", texto: "Tené las listas a la vista" },
  { emoji: "🏃", texto: "Movete y dormí bien" },
];

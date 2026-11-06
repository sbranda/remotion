// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ¿QUÉ ES LA DEPRESIÓN? (3 minutos) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), público argentino.
//  Incluye señales de alarma y línea de ayuda: revisá que siga vigente.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 6 },
  { id: "queEs", seg: 18 },
  { id: "tristeza", seg: 18 },
  { id: "comun", seg: 10 },
  { id: "sintomas", seg: 20 },
  { id: "cuerpo", seg: 12 },
  { id: "causas", seg: 14 },
  { id: "alarma", seg: 16 },
  { id: "tratamiento", seg: 20 },
  { id: "ayudar", seg: 22 },
  { id: "pasitos", seg: 14 },
  { id: "cierre", seg: 10 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const COMPARACION = [
  { tristeza: "Tiene un motivo claro", depresion: "A veces no hay un motivo claro" },
  { tristeza: "Pasa en unos días", depresion: "Dura 2 semanas o más" },
  { tristeza: "Podés seguir con tu vida", depresion: "Te frena en el día a día" },
];

export const SINTOMAS = [
  { emoji: "🌧️", texto: "Tristeza o vacío" },
  { emoji: "🎨", texto: "Nada te da ganas, ni lo que antes te gustaba" },
  { emoji: "🔋", texto: "Cansancio, sin energía" },
  { emoji: "🛏️", texto: "Dormir mucho o muy poco" },
  { emoji: "🍽️", texto: "Cambios en el apetito" },
  { emoji: "⚖️", texto: "Culpa o sentir que no valés" },
  { emoji: "🎯", texto: "Cuesta concentrarse" },
  { emoji: "😤", texto: "Irritabilidad" },
];

export const CAUSAS = [
  { emoji: "🧬", texto: "Genética: puede haber antecedentes en la familia" },
  { emoji: "🧠", texto: "Cambios en la química del cerebro" },
  { emoji: "💔", texto: "Situaciones difíciles: pérdidas, estrés, soledad" },
  { emoji: "🩺", texto: "Otras enfermedades o algunos medicamentos" },
];

export const ALARMAS = [
  { emoji: "💭", texto: "Pensar en morir o en hacerse daño" },
  { emoji: "👋", texto: "Despedirse o regalar sus cosas" },
  { emoji: "🕳️", texto: "Decir que no hay salida o que es una carga" },
];

export const AYUDAR = [
  { emoji: "👂", texto: "Escuchá sin juzgar" },
  { emoji: "🙅", texto: "No digas “poné voluntad” ni “hay gente peor”" },
  { emoji: "🤝", texto: "Acompañá a consultar" },
  { emoji: "❓", texto: "Si te preocupa, preguntá directo si piensa en hacerse daño: preguntar no lo provoca" },
  { emoji: "📱", texto: "Seguí presente, aunque no te responda" },
];

export const PASITOS = [
  { emoji: "🚶", texto: "Una caminata corta" },
  { emoji: "☀️", texto: "Un rato de luz natural" },
  { emoji: "🛏️", texto: "Horarios de sueño parecidos" },
  { emoji: "🗣️", texto: "Hablar con alguien de confianza" },
  { emoji: "✅", texto: "Metas chiquitas: de a un paso" },
];

/** Línea de ayuda (Centro de Asistencia al Suicida). Verificar que siga vigente. */
export const LINEA_AYUDA = "Línea 135 (gratis desde CABA y GBA) o (011) 5275-1135 desde todo el país";

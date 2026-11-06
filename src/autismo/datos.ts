// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ¿QUÉ ES EL AUTISMO? (3 minutos) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx): sin destellos ni movimientos bruscos.
//  Lenguaje respetuoso: el autismo no es una enfermedad ni algo para "curar".
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 6 },
  { id: "queEs", seg: 20 },
  { id: "espectro", seg: 18 },
  { id: "comun", seg: 10 },
  { id: "comunicacion", seg: 18 },
  { id: "conductas", seg: 18 },
  { id: "sentidos", seg: 18 },
  { id: "senales", seg: 18 },
  { id: "mitos", seg: 20 },
  { id: "acompanar", seg: 22 },
  { id: "cierre", seg: 12 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const COMUNICACION = [
  { emoji: "👀", texto: "Le cuesta o le incomoda mirar a los ojos" },
  { emoji: "📖", texto: "Entiende todo literal: chistes e ironías cuestan" },
  { emoji: "💬", texto: "Las conversaciones y las reglas sociales le resultan difíciles" },
  { emoji: "🤟", texto: "Algunas personas no hablan y se comunican de otras formas" },
];

export const CONDUCTAS = [
  { emoji: "🦖", texto: "Intereses muy intensos en temas puntuales" },
  { emoji: "📅", texto: "Necesidad de rutinas: los cambios cuestan" },
  { emoji: "👐", texto: "Movimientos repetitivos, como aletear las manos" },
  { emoji: "🚗", texto: "Ordenar o alinear objetos" },
];

export const SENTIDOS = [
  { emoji: "🔊", texto: "Ruidos" },
  { emoji: "💡", texto: "Luces" },
  { emoji: "👕", texto: "Texturas de la ropa" },
  { emoji: "🍝", texto: "Texturas de comidas" },
  { emoji: "👃", texto: "Olores" },
  { emoji: "🤗", texto: "Algunos abrazos o roces" },
];

export const SENALES = [
  { emoji: "📛", texto: "No responde a su nombre cerca del año" },
  { emoji: "👉", texto: "No señala para mostrarte algo" },
  { emoji: "🗣️", texto: "Pocas palabras o gestos para su edad" },
  { emoji: "🧸", texto: "Juego poco variado o muy repetitivo" },
  { emoji: "⚠️", texto: "Pierde palabras o habilidades que ya tenía: consultá ya" },
];

export const MITOS = [
  { mito: "Lo causan las vacunas", verdad: "Falso: está muy estudiado y las vacunas NO causan autismo" },
  { mito: "Es culpa de la crianza", verdad: "Falso: tiene un origen biológico, en gran parte genético" },
  { mito: "No sienten emociones", verdad: "Falso: sienten, aunque a veces las expresan distinto" },
  { mito: "Es cosa de chicos", verdad: "Falso: es para toda la vida, también hay adultos autistas" },
];

export const ACOMPANAR = [
  { emoji: "🗣️", texto: "Hablá claro y directo" },
  { emoji: "📅", texto: "Anticipá los cambios" },
  { emoji: "⏳", texto: "Respetá sus tiempos" },
  { emoji: "🎧", texto: "Cuidá los ambientes ruidosos" },
  { emoji: "👀", texto: "No fuerces el contacto visual" },
];

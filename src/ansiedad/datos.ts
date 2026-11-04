// ─────────────────────────────────────────────────────────────────────────────
//  REEL: ANSIEDAD (3 minutos) — textos y duraciones
//  Estilo "calma" (src/salud/calma.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 6 },
  { id: "queEs", seg: 20 },
  { id: "problema", seg: 16 },
  { id: "cuerpo", seg: 18 },
  { id: "mente", seg: 16 },
  { id: "panico", seg: 22 },
  { id: "respirar", seg: 28 },
  { id: "tecnica54321", seg: 18 },
  { id: "habitos", seg: 16 },
  { id: "ayuda", seg: 12 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const PENSAMIENTOS = ["¿Y si sale mal?", "No me va a alcanzar", "¿Cerré la puerta?", "Seguro piensan que…", "Mañana tengo que…", "¿Y si me pasa algo?"];

export const CUANDO = [
  { emoji: "🔥", texto: "Es muy intensa" },
  { emoji: "📆", texto: "Dura semanas o meses" },
  { emoji: "❓", texto: "Aparece sin un motivo claro" },
  { emoji: "🚧", texto: "Te frena en tu vida diaria" },
];

export const CUERPO = [
  { emoji: "💓", texto: "Corazón acelerado" },
  { emoji: "😮‍💨", texto: "Respiración rápida" },
  { emoji: "💪", texto: "Tensión muscular" },
  { emoji: "💦", texto: "Sudor" },
  { emoji: "🫨", texto: "Temblor" },
  { emoji: "🪢", texto: "Nudo en el estómago" },
  { emoji: "💫", texto: "Mareos" },
  { emoji: "🌙", texto: "Dormir mal" },
];

export const MENTE = [
  { emoji: "🔁", texto: "Preocupación que no se va" },
  { emoji: "🌧️", texto: "Pensar siempre lo peor" },
  { emoji: "🧘", texto: "No poder relajarte" },
  { emoji: "😤", texto: "Irritabilidad" },
  { emoji: "🎯", texto: "Te cuesta concentrarte" },
];

export const SENTIDOS = [
  { n: 5, emoji: "👀", texto: "cosas que ves" },
  { n: 4, emoji: "✋", texto: "cosas que tocás" },
  { n: 3, emoji: "👂", texto: "cosas que oís" },
  { n: 2, emoji: "👃", texto: "cosas que olés" },
  { n: 1, emoji: "👅", texto: "cosa que saboreás" },
];

export const HABITOS = [
  { emoji: "🚶", texto: "Moverte todos los días" },
  { emoji: "😴", texto: "Dormir bien" },
  { emoji: "☕", texto: "Menos café y alcohol" },
  { emoji: "📵", texto: "Ponerle un límite a las noticias y las pantallas" },
  { emoji: "🗣️", texto: "Hablar con alguien de confianza" },
];

/** Línea de ayuda que se muestra en el cierre */
export const LINEA_AYUDA = "Línea 135 (gratis desde CABA y GBA) o (011) 5275-1135 desde todo el país";

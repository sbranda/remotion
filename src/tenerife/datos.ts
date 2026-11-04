// ─────────────────────────────────────────────────────────────────────────────
//  REEL: JESÚS DE MIGUEL (3 minutos) — textos, datos y fuentes
//  Tono sobrio. Todo dato viene de medios publicados entre el 2 y el 4 de
//  noviembre de 2026. La causa exacta de la muerte NO está confirmada:
//  no la afirmes en el video hasta que haya información oficial.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

export const JUGADOR = {
  nombre: "Jesús de Miguel",
  nombreCompleto: "Jesús de Miguel Alameda",
  anios: "1996 – 2026",
  nacimiento: "21 de septiembre de 1996, Madrid",
  club: "CD Tenerife",
  posicion: "Delantero",
  edad: 30,
};

/** Fecha en que se publicaron los datos que muestra el video */
export const ACTUALIZADO = "4 de noviembre de 2026";

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "portada", seg: 8 },
  { id: "quePaso", seg: 25 },
  { id: "hospital", seg: 18 },
  { id: "quienEra", seg: 30 },
  { id: "seSabe", seg: 25 },
  { id: "homenajes", seg: 30 },
  { id: "rcp", seg: 30 },
  { id: "cierre", seg: 14 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const CRONOLOGIA = [
  { cuando: "Domingo", texto: "Tenerife – Andorra, jornada 12 de Segunda División, en el Heliodoro Rodríguez López" },
  { cuando: "Minuto 59", texto: "Jesús entra al campo" },
  { cuando: "Final del partido", texto: "En un contraataque choca con el arquero rival y cae al césped" },
  { cuando: "En el campo", texto: "Lo reaniman y lo trasladan en ambulancia al Hospital Universitario Nuestra Señora de Candelaria" },
];

export const HOSPITAL = [
  { texto: "Ingresa en la UCI", detalle: "" },
  { texto: "“Estable, dentro de la gravedad”", detalle: "Parte del club" },
  { texto: "“Ha empeorado neurológicamente”", detalle: "Parte del club" },
];

export const CARRERA = [
  { valor: 88, sufijo: "", texto: "partidos en el Castellón" },
  { valor: 25, sufijo: "", texto: "goles en el Castellón" },
  { valor: 11, sufijo: "", texto: "goles en 2025-26 con el Tenerife" },
];

export const SE_SABE = ["Sufrió un fuerte choque con el arquero rival", "Fue reanimado en el campo", "Murió el martes 3 de noviembre"];

export const NO_SE_SABE = ["La causa exacta de la muerte", "Cómo fue exactamente la reanimación", "El diagnóstico oficial"];

export const HOMENAJES = [
  { emoji: "🏟️", texto: "Minuto de silencio y homenaje en el campo del Tenerife" },
  { emoji: "⚽", texto: "El Real Madrid anunció un minuto de silencio antes de su entrenamiento" },
  { emoji: "🇪🇺", texto: "La UEFA anunció minutos de silencio en sus partidos de esta semana, incluida la Champions" },
  { emoji: "💬", texto: "Mensajes de despedida de figuras como Lionel Messi" },
];

export const RCP = [
  { n: 1, emoji: "📞", titulo: "Llamá a emergencias", texto: "112 en España · 107 o 911 en la Argentina" },
  { n: 2, emoji: "🫸", titulo: "Empezá la RCP", texto: "Compresiones fuertes y rápidas en el centro del pecho" },
  { n: 3, emoji: "⚡", titulo: "Usá un desfibrilador (DEA)", texto: "Si hay uno cerca: te va guiando por voz" },
];

export const FUENTES = ["CNN en Español", "La Nación", "Infobae", "La Jornada", "RTVC", "Telecinco", "El Universal"];

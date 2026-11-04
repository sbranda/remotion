// ─────────────────────────────────────────────────────────────────────────────
//  REEL: EL PAPEL QUE LLEGA A LA LUNA (90 s) — curiosidad matemática
//  Estilo "cuaderno". Hoja de 0,1 mm; cada doblez duplica el grosor.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Grosor de una hoja común, en milímetros */
export const GROSOR_HOJA_MM = 0.1;

/** Distancia media de la Tierra a la Luna, en km */
export const DISTANCIA_LUNA_KM = 384400;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 5 },
  { id: "hoja", seg: 6 },
  { id: "doblez", seg: 8 },
  { id: "duplica", seg: 12 },
  { id: "escalada", seg: 30 },
  { id: "luna", seg: 8 },
  { id: "realidad", seg: 10 },
  { id: "idea", seg: 6 },
  { id: "cierre", seg: 5 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

/** Momentos en que la cuenta se frena para mostrar una comparación */
export const HITOS = [
  { n: 10, emoji: "📕", texto: "Como un libro gordo" },
  { n: 17, emoji: "🏠", texto: "Como una casa de 4 pisos" },
  { n: 20, emoji: "🏢", texto: "Como un edificio de 35 pisos" },
  { n: 23, emoji: "🏙️", texto: "Más alto que el edificio más alto del mundo" },
  { n: 27, emoji: "✈️", texto: "Más alto que donde vuelan los aviones" },
  { n: 30, emoji: "🚀", texto: "¡Llega al espacio!" },
  { n: 42, emoji: "🌕", texto: "¡Llega a la Luna!" },
];

/** Grosor después de n dobleces, como texto fácil de leer */
export const grosor = (n: number): string => {
  const mm = GROSOR_HOJA_MM * Math.pow(2, n);
  const fmt = (v: number, dec = 0) => v.toLocaleString("es-AR", { maximumFractionDigits: dec, minimumFractionDigits: 0 });
  if (mm < 10) return `${fmt(mm, 1)} mm`;
  if (mm < 1000) return `${fmt(mm / 10, 1)} cm`;
  if (mm < 1_000_000) return `${fmt(mm / 1000, mm < 100_000 ? 1 : 0)} m`;
  return `${fmt(mm / 1_000_000)} km`;
};

export const capas = (n: number) => Math.pow(2, n).toLocaleString("es-AR");

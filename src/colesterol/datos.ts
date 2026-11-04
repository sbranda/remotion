// ─────────────────────────────────────────────────────────────────────────────
//  REEL: COLESTEROL (90 s) — textos y duraciones
//  Mismo contenido que el diseño "Reel 90 s – Colesterol" de Canva.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

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

export const VERDE = "#3e9b5a";
export const ROJO = "#d9534a";

/** Valores de referencia para adultos (mg/dL) */
export const VALORES = [
  { nombre: "Colesterol total", meta: "menos de 200", nota: "", color: "#0e5a6d" },
  { nombre: "LDL · el malo", meta: "menos de 100", nota: "Tu médico define tu meta según tu riesgo", color: ROJO },
  { nombre: "HDL · el bueno", meta: "más de 40 / 50", nota: "Más de 40 en hombres, más de 50 en mujeres", color: VERDE },
];

export const SUBE = [
  { icono: "chorizo", texto: "Carnes grasas, embutidos y achuras" },
  { icono: "manteca", texto: "Manteca, crema y quesos duros" },
  { icono: "factura", texto: "Facturas y productos industriales" },
  { icono: "cigarrillo", texto: "Sedentarismo y tabaco" },
  { icono: "adn", texto: "Genética: puede venir de familia" },
] as const;

export const BAJAR = [
  { icono: "carneMagra", texto: "En el asado, elegí cortes magros" },
  { icono: "aceite", texto: "Cambiá la manteca por aceite de oliva" },
  { icono: "legumbres", texto: "Sumá avena, legumbres y frutos secos" },
  { icono: "zapatilla", texto: "Movete: el ejercicio sube el HDL" },
  { icono: "sinCigarrillo", texto: "Si fumás, dejar ayuda muchísimo" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
//  REEL: TRIGLICÉRIDOS (90 s) — textos y duraciones
//  Mismo contenido que el diseño "Reel 90 s – Triglicéridos" de Canva.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "queSon", seg: 10 },
  { id: "valores", seg: 12 },
  { id: "importan", seg: 12 },
  { id: "suben", seg: 17 },
  { id: "bajar", seg: 23 },
  { id: "medir", seg: 7 },
  { id: "cierre", seg: 5 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

/** Valor de ejemplo del gancho: se marca en la tabla de valores */
export const VALOR_EJEMPLO = 210;

export const RANGOS = [
  { nombre: "Normal", texto: "menos de 150 mg/dL", desde: 0, hasta: 150, color: "#5cae5a" },
  { nombre: "Límite", texto: "150 a 199", desde: 150, hasta: 200, color: "#f2c230" },
  { nombre: "Alto", texto: "200 a 499", desde: 200, hasta: 500, color: "#f08a2c" },
  { nombre: "Muy alto", texto: "500 o más", desde: 500, hasta: Infinity, color: "#dc3b35" },
];

export const SUBEN = [
  { icono: "gaseosa", texto: "Gaseosas y jugos azucarados" },
  { icono: "pan", texto: "Pan, facturas y galletitas" },
  { icono: "alcohol", texto: "Alcohol (sí, también el fernet)" },
  { icono: "sillon", texto: "Poca actividad física" },
  { icono: "balanza", texto: "Sobrepeso" },
] as const;

export const BAJAR = [
  { icono: "sinAzucar", texto: "Cortá con las gaseosas y el azúcar (también la del mate)" },
  { icono: "trigo", texto: "Cambiá harinas blancas por integrales" },
  { icono: "copaMenos", texto: "Bajá el alcohol" },
  { icono: "zapatilla", texto: "Movete: 150 minutos por semana" },
  { icono: "pescado", texto: "Sumá pescado: caballa, sardinas, atún o salmón" },
] as const;

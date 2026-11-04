// ─────────────────────────────────────────────────────────────────────────────
//  REEL: PRESIÓN ARTERIAL (90 s) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
//  Valores: hipertensión desde 140/90 (criterio OMS y de las guías europeas y
//  argentinas). Algunas guías (EE. UU.) usan 130/80: por eso el video aclara
//  que la meta la define el médico.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS = [
  { id: "gancho", seg: 4 },
  { id: "numeros", seg: 12 },
  { id: "valores", seg: 14 },
  { id: "silenciosa", seg: 10 },
  { id: "medir", seg: 16 },
  { id: "ayuda", seg: 14 },
  { id: "urgencias", seg: 12 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const RANGOS = [
  { nombre: "Normal", valor: "Menos de 120/80", color: "#2ee59d" },
  { nombre: "Ojo, vigilala", valor: "Entre 120/80 y 139/89", color: "#ffd23f" },
  { nombre: "Presión alta", valor: "140/90 o más", color: "#ff4d5e" },
];

export const MEDIR = [
  { emoji: "🪑", texto: "5 minutos sentado y en reposo" },
  { emoji: "☕", texto: "Sin café, cigarrillo ni ejercicio 30 minutos antes" },
  { emoji: "🦶", texto: "Espalda apoyada y pies en el piso" },
  { emoji: "💪", texto: "Brazo apoyado, a la altura del corazón" },
  { emoji: "🤐", texto: "No hables mientras mide" },
  { emoji: "✌️", texto: "Medí 2 veces, con 1 o 2 minutos de diferencia" },
];

export const AYUDA = [
  { emoji: "🧂", texto: "Menos sal: ojo con fiambres, snacks y ultraprocesados" },
  { emoji: "🚶", texto: "Movete: 150 minutos por semana" },
  { emoji: "⚖️", texto: "Cuidá tu peso" },
  { emoji: "🍷", texto: "Menos alcohol y nada de cigarrillo" },
  { emoji: "💊", texto: "Si te dieron medicación, no la dejes por tu cuenta" },
];

export const URGENCIAS = [
  { emoji: "🤕", texto: "Dolor de cabeza muy fuerte" },
  { emoji: "👁️", texto: "Visión borrosa" },
  { emoji: "🫀", texto: "Dolor de pecho" },
  { emoji: "😮‍💨", texto: "Falta de aire" },
  { emoji: "🗣️", texto: "Dificultad para hablar" },
  { emoji: "🤚", texto: "Debilidad de un lado del cuerpo" },
];

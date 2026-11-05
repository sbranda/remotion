// ─────────────────────────────────────────────────────────────────────────────
//  REEL: DIABETES Y GLUCOSA (3 minutos) — textos y duraciones
//  Estilo neón de la serie (src/salud/pop.tsx), público argentino.
//  Valores: glucosa en ayunas (mg/dL) y hemoglobina glicosilada, criterios de
//  la Asociación Americana de Diabetes y la OMS, usados también en la Argentina.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

/** Duración de cada página en segundos (suman 180) */
export const PAGINAS = [
  { id: "gancho", seg: 6 },
  { id: "glucosa", seg: 16 },
  { id: "insulina", seg: 18 },
  { id: "queEs", seg: 16 },
  { id: "tipos", seg: 20 },
  { id: "valores", seg: 18 },
  { id: "sintomas", seg: 18 },
  { id: "prediabetes", seg: 14 },
  { id: "complicaciones", seg: 14 },
  { id: "quien", seg: 10 },
  { id: "ayuda", seg: 22 },
  { id: "cierre", seg: 8 },
] as const;

export type PaginaId = (typeof PAGINAS)[number]["id"];

export const DURACION_FRAMES = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const COMIDAS = ["🍞", "🍝", "🍎", "🍬", "🥔", "🧃"];

export const TIPOS = [
  { emoji: "🧒", nombre: "Tipo 1", texto: "El cuerpo no fabrica insulina. Suele aparecer de chico o de joven y se trata con insulina." },
  { emoji: "🧑", nombre: "Tipo 2", texto: "La más común (9 de cada 10). La insulina no funciona bien. Se relaciona con el peso, el sedentarismo y la herencia." },
  { emoji: "🤰", nombre: "Gestacional", texto: "Aparece durante el embarazo. Por eso se controla la glucosa en esa etapa." },
];

export const RANGOS = [
  { nombre: "Normal", valor: "Menos de 100 mg/dL", color: "#2ee59d" },
  { nombre: "Prediabetes", valor: "De 100 a 125 mg/dL", color: "#ffd23f" },
  { nombre: "Diabetes", valor: "126 mg/dL o más", color: "#ff4d5e" },
];

export const SINTOMAS = [
  { emoji: "🥤", texto: "Mucha sed" },
  { emoji: "🚽", texto: "Orinar seguido" },
  { emoji: "🍽️", texto: "Mucha hambre" },
  { emoji: "😴", texto: "Cansancio" },
  { emoji: "⚖️", texto: "Bajar de peso sin querer" },
  { emoji: "👓", texto: "Visión borrosa" },
  { emoji: "🩹", texto: "Heridas que tardan en curar" },
  { emoji: "🦶", texto: "Hormigueo en los pies" },
  { emoji: "🤷", texto: "O ningún síntoma" },
];

export const COMPLICACIONES = [
  { emoji: "🫀", texto: "Corazón" },
  { emoji: "🫘", texto: "Riñones" },
  { emoji: "👁️", texto: "Ojos" },
  { emoji: "🦶", texto: "Pies" },
  { emoji: "⚡", texto: "Nervios" },
  { emoji: "🧠", texto: "Cerebro (ACV)" },
];

export const QUIEN = [
  { emoji: "🎂", texto: "Mayores de 45 años" },
  { emoji: "⚖️", texto: "Con sobrepeso" },
  { emoji: "👨‍👩‍👧", texto: "Con familiares con diabetes" },
  { emoji: "🩺", texto: "Con presión alta o colesterol alto" },
];

export const AYUDA = [
  { emoji: "🚶", texto: "Movete: 150 minutos por semana" },
  { emoji: "🥤", texto: "Cortá con las gaseosas y los jugos" },
  { emoji: "🥗", texto: "Más verduras, legumbres e integrales" },
  { emoji: "⚖️", texto: "Cuidá tu peso" },
  { emoji: "🦶", texto: "Si tenés diabetes, revisá tus pies todos los días" },
  { emoji: "💊", texto: "Si te indicaron medicación o insulina, no la dejes" },
];

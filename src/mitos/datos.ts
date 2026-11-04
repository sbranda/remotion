// ─────────────────────────────────────────────────────────────────────────────
//  REEL: TRIGLICÉRIDOS · ¿MITO O VERDAD? (90 s)
//  Estilo llamativo de la serie (src/salud/pop.tsx), público argentino.
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;

export type Mito = {
  emoji: string;
  frase: string;
  veredicto: "MITO" | "VERDAD";
  explicacion: string;
};

export const MITOS: Mito[] = [
  {
    emoji: "🧍",
    frase: "Si sos flaco, no podés tener los triglicéridos altos.",
    veredicto: "MITO",
    explicacion: "También influyen la genética, el alcohol, el azúcar y la diabetes. Cualquiera puede tenerlos altos.",
  },
  {
    emoji: "🍔",
    frase: "Solo suben por comer grasa.",
    veredicto: "MITO",
    explicacion: "El azúcar, las harinas refinadas y el alcohol también los suben, y mucho.",
  },
  {
    emoji: "🧃",
    frase: "Los jugos de fruta no los suben porque son naturales.",
    veredicto: "MITO",
    explicacion: "Tienen mucha azúcar y poca fibra. Mejor comé la fruta entera.",
  },
  {
    emoji: "🤒",
    frase: "Si los tenés altos, te vas a dar cuenta.",
    veredicto: "MITO",
    explicacion: "Casi nunca dan síntomas. La única forma de saberlo es con un análisis de sangre.",
  },
  {
    emoji: "🍷",
    frase: "El alcohol los sube, aunque no tomes mucho.",
    veredicto: "VERDAD",
    explicacion: "En muchas personas, incluso cantidades moderadas los elevan. Si los tenés altos, conviene reducirlo.",
  },
  {
    emoji: "🏃",
    frase: "Moverte ayuda a bajarlos.",
    veredicto: "VERDAD",
    explicacion: "La actividad física regular ayuda a bajarlos, junto con una alimentación sana.",
  },
];

/** Duración de cada página en segundos (suman 90) */
export const SEG_GANCHO = 4;
export const SEG_INTRO = 6;
export const SEG_MITO = 12;
export const SEG_CIERRE = 8;

export const DURACION_FRAMES = (SEG_GANCHO + SEG_INTRO + MITOS.length * SEG_MITO + SEG_CIERRE) * FPS;

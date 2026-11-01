// Calcula cuándo empieza cada bloque y cada subtítulo.

import { BLOQUES, Bloque, BloqueId } from "./guion";

export const FPS = 30;
export const DURACION_SEG = 180; // 3 minutos

const MARGEN_INICIO = 0.4; // segundos antes de la primera frase de cada bloque
const MARGEN_FIN = 0.8; // aire al final de cada bloque
const PAUSA_FRASE = 0.35;
/** ritmo de narración deseado; si un bloque no entra, se acelera solo ese bloque */
const PALABRAS_POR_MINUTO = 140;

export type Cue = {
  texto: string;
  /** frames, relativos al inicio del bloque */
  inicio: number;
  fin: number;
};

export type BloqueTimed = Bloque & {
  /** frame global donde empieza */
  desde: number;
  duracion: number;
  cues: Cue[];
  /** ritmo de narración necesario para leer el bloque en su tiempo */
  palabrasPorMinuto: number;
};

const palabras = (s: string) => s.split(/\s+/).filter(Boolean).length;

const frases = (t: string): string[] =>
  t
    .split(/(?<=[.!?…])\s+/)
    .map((f) => f.trim())
    .filter(Boolean);

const total = BLOQUES.reduce((a, b) => a + b.duracionSeg, 0);
if (total !== DURACION_SEG) {
  throw new Error(`Los bloques de guion.ts suman ${total} s y deberían sumar ${DURACION_SEG} s`);
}

let cursor = 0;
export const LINEA: BloqueTimed[] = BLOQUES.map((b) => {
  const fs = frases(b.texto);
  const nPal = fs.reduce((a, f) => a + palabras(f), 0);
  const disponible = b.duracionSeg - MARGEN_INICIO - MARGEN_FIN - PAUSA_FRASE * (fs.length - 1);
  const segPorPalabra = Math.min(60 / PALABRAS_POR_MINUTO, disponible / nPal);
  let t = MARGEN_INICIO;
  const cues: Cue[] = fs.map((f, i) => {
    if (i > 0) t += PAUSA_FRASE;
    const dur = palabras(f) * segPorPalabra;
    const cue = { texto: f, inicio: Math.round(t * FPS), fin: Math.round((t + dur) * FPS) };
    t += dur;
    return cue;
  });
  const duracion = b.duracionSeg * FPS;
  const res: BloqueTimed = { ...b, desde: cursor, duracion, cues, palabrasPorMinuto: 60 / segPorPalabra };
  cursor += duracion;
  return res;
});

export const DURACION_FRAMES = DURACION_SEG * FPS;

export const bloque = (id: BloqueId) => LINEA.find((b) => b.id === id)!;

/** Frame local donde empieza el primer subtítulo que contiene `clave` */
export const cueDe = (id: BloqueId, clave: string): number => {
  const c = bloque(id).cues.find((q) => q.texto.includes(clave));
  if (!c) throw new Error(`No hay subtítulo con "${clave}" en el bloque ${id}`);
  return c.inicio;
};

const hhmmss = (frames: number) => {
  const ms = Math.round((frames / FPS) * 1000);
  const p = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor((ms % 3600000) / 60000))}:${p(
    Math.floor((ms % 60000) / 1000),
  )},${p(ms % 1000, 3)}`;
};

/** Subtítulos SRT: sirven de guía para grabar la voz en off */
export const generarSRT = () => {
  let n = 0;
  return LINEA.flatMap((b) =>
    b.cues.map((q) => {
      n++;
      return `${n}\n${hhmmss(b.desde + q.inicio)} --> ${hhmmss(b.desde + q.fin)}\n${q.texto}\n`;
    }),
  ).join("\n");
};

/** Guion con marcas de tiempo y ritmo de lectura por bloque */
export const guionConTiempos = () =>
  LINEA.map((b) => {
    const f = (fr: number) => {
      const s = Math.round(fr / FPS);
      return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    };
    return (
      `[${f(b.desde)}–${f(b.desde + b.duracion)}] ${b.etiqueta || b.id.toUpperCase()}` +
      `  (${b.palabrasPorMinuto.toFixed(0)} palabras/min)\n${b.texto}\n`
    );
  }).join("\n");

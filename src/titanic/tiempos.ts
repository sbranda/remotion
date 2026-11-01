// Calcula, a partir del guion, cuándo empieza cada capítulo y cada subtítulo.
// El ritmo de lectura se ajusta solo para que el video dure exactamente DURACION_SEG.

import { CAPITULOS, Capitulo, EscenaId } from "./guion";

export const FPS = 30;
export const DURACION_SEG = 600; // 10 minutos

const ENTRADA_SEG = 4; // tarjeta de título de cada capítulo
const ENTRADA_PRIMERO_SEG = 7; // el primero lleva además el aviso de recreación
const SALIDA_SEG = 2.5;
const PAUSA_PARRAFO = 0.7;
const PAUSA_FRASE = 0.3;
const PAUSAS_ACTUACION: Record<string, number> = {
  pausa: 1.5,
  respira: 1.5,
  "silencio de tres segundos": 3,
};

export type Cue = {
  texto: string;
  /** frames, relativos al inicio del capítulo */
  inicio: number;
  fin: number;
};

export type CapituloTimed = Capitulo & {
  /** frame global donde empieza */
  desde: number;
  duracion: number;
  cues: Cue[];
};

const palabras = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** Parte un párrafo en frases sin cortar dentro de comillas “…” */
const frases = (p: string): string[] => {
  const out: string[] = [];
  let actual = "";
  let enComillas = false;
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    actual += c;
    if (c === "“") enComillas = true;
    if (c === "”") enComillas = false;
    const fin = ".!?…".includes(c) && !enComillas;
    if (fin && (p[i + 1] === " " || i === p.length - 1)) {
      out.push(actual.trim());
      actual = "";
    }
  }
  if (actual.trim()) out.push(actual.trim());
  // agrupar frases muy cortas para que el subtítulo no parpadee
  const agrupadas: string[] = [];
  for (const f of out) {
    const prev = agrupadas[agrupadas.length - 1];
    if (prev && palabras(prev) + palabras(f) <= 9 && palabras(f) <= 4) {
      agrupadas[agrupadas.length - 1] = `${prev} ${f}`;
    } else {
      agrupadas.push(f);
    }
  }
  return agrupadas;
};

type Item = { texto: string; palabras: number; pausaAntes: number };

const items = (cap: Capitulo): Item[] => {
  const res: Item[] = [];
  cap.parrafos.forEach((p, pi) => {
    let pausa = pi === 0 ? 0 : PAUSA_PARRAFO;
    const sinDirecciones = p.replace(/\[([^\]]+)\]/g, (_, d: string) => {
      pausa += PAUSAS_ACTUACION[d.toLowerCase()] ?? 0;
      return "";
    }).trim();
    if (!sinDirecciones) {
      // párrafo que es solo una indicación (silencio): se suma al siguiente
      res.push({ texto: "", palabras: 0, pausaAntes: pausa });
      return;
    }
    frases(sinDirecciones).forEach((f, fi) => {
      res.push({ texto: f, palabras: palabras(f), pausaAntes: fi === 0 ? pausa : PAUSA_FRASE });
    });
  });
  return res;
};

const todos = CAPITULOS.map(items);
const fijo =
  ENTRADA_PRIMERO_SEG +
  (CAPITULOS.length - 1) * ENTRADA_SEG +
  CAPITULOS.length * SALIDA_SEG +
  todos.flat().reduce((a, i) => a + i.pausaAntes, 0);
const totalPalabras = todos.flat().reduce((a, i) => a + i.palabras, 0);

/** segundos por palabra, ajustado para clavar la duración total */
export const SEG_POR_PALABRA = (DURACION_SEG - fijo) / totalPalabras;
export const PALABRAS_POR_MINUTO = 60 / SEG_POR_PALABRA;

let cursor = 0;
export const LINEA: CapituloTimed[] = CAPITULOS.map((cap, ci) => {
  let t = ci === 0 ? ENTRADA_PRIMERO_SEG : ENTRADA_SEG;
  const cues: Cue[] = [];
  for (const it of todos[ci]) {
    t += it.pausaAntes;
    if (!it.texto) continue;
    const dur = it.palabras * SEG_POR_PALABRA;
    cues.push({ texto: it.texto, inicio: Math.round(t * FPS), fin: Math.round((t + dur) * FPS) });
    t += dur;
  }
  t += SALIDA_SEG;
  const duracion = Math.round(t * FPS);
  const res = { ...cap, desde: cursor, duracion, cues };
  cursor += duracion;
  return res;
});

// Ajuste de redondeo: el último capítulo absorbe la diferencia
LINEA[LINEA.length - 1].duracion += DURACION_SEG * FPS - cursor;

export const DURACION_FRAMES = DURACION_SEG * FPS;

export const capitulo = (id: EscenaId) => LINEA.find((c) => c.id === id)!;

/** Frame local donde empieza el primer subtítulo que contiene `clave` */
export const cueDe = (id: EscenaId, clave: string): number => {
  const c = capitulo(id).cues.find((q) => q.texto.includes(clave));
  if (!c) throw new Error(`No hay subtítulo con "${clave}" en ${id}`);
  return c.inicio;
};

const hhmmss = (frames: number, sep = ",") => {
  const ms = Math.round((frames / FPS) * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const r = ms % 1000;
  const p = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${p(h)}:${p(m)}:${p(s)}${sep}${p(r, 3)}`;
};

/** Subtítulos en formato SRT, útiles para grabar la voz o subirlos a YouTube */
export const generarSRT = () => {
  let n = 0;
  return LINEA.flatMap((cap) =>
    cap.cues.map((q) => {
      n++;
      return `${n}\n${hhmmss(cap.desde + q.inicio)} --> ${hhmmss(cap.desde + q.fin)}\n${q.texto}\n`;
    }),
  ).join("\n");
};

/** Marcas de tiempo de cada capítulo (mm:ss) para la descripción o el guion */
export const marcas = () =>
  LINEA.map((c) => {
    const s = Math.round(c.desde / FPS);
    const e = Math.round((c.desde + c.duracion) / FPS);
    const f = (x: number) => `${Math.floor(x / 60)}:${String(x % 60).padStart(2, "0")}`;
    return `${f(s)}–${f(e)}  ${c.numero}. ${c.titulo}`;
  }).join("\n");

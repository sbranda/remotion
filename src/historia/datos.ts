// ─────────────────────────────────────────────────────────────────────────────
//  "LADRILLO A LADRILLO" — historia de 5 minutos (ficticia, inspirada en muchas
//  historias reales): una familia que pasa de la pobreza a la clase media.
//  Todo el texto de la historia está acá: narración, diálogos y duraciones.
// ─────────────────────────────────────────────────────────────────────────────
import type { Expresion, TipoPersonaje } from "../salud/personajes";

export const FPS = 30;

/** Colores de la familia: misma piel para todos, y la ropa de cada uno */
const PIEL_FAMILIA = "#d9a47a";
const PELO_LUCIA = "#3b2416";

/** Elenco: cada personaje es un tipo ilustrado con sus colores */
export const ELENCO = {
  luciaNena: { tipo: "chica", piel: PIEL_FAMILIA, pelo: PELO_LUCIA, ropa: "#f4a261", nombre: "Lucía" },
  lucia: { tipo: "chica", piel: PIEL_FAMILIA, pelo: PELO_LUCIA, ropa: "#8b6cff", nombre: "Lucía" },
  luciaEnfermera: { tipo: "doctora", piel: PIEL_FAMILIA, pelo: PELO_LUCIA, nombre: "Lucía" },
  mateoNene: { tipo: "chico", piel: PIEL_FAMILIA, pelo: "#1b1b1b", ropa: "#2a9d8f", nombre: "Mateo" },
  mateo: { tipo: "chico", piel: PIEL_FAMILIA, pelo: "#1b1b1b", ropa: "#264653", nombre: "Mateo" },
  mama: { tipo: "mama", piel: PIEL_FAMILIA, nombre: "Rosa" },
  papa: { tipo: "papa", piel: PIEL_FAMILIA, nombre: "Juan" },
  abuela: { tipo: "abuela", piel: PIEL_FAMILIA, nombre: "Nélida" },
  maestra: { tipo: "maestra", nombre: "Marta" },
} satisfies Record<string, { tipo: TipoPersonaje; piel?: string; pelo?: string; ropa?: string; nombre: string }>;

export type IdPersonaje = keyof typeof ELENCO;

export type Escenario = "barrio" | "noche" | "escuela" | "colectivo" | "universidad" | "hospital" | "casaNueva" | "atardecer";

export type EnEscena = {
  quien: IdPersonaje;
  /** centro horizontal, en px (0 a 1080) */
  x: number;
  size: number;
  expr?: Expresion;
  /** cambia de expresión en este cuadro */
  exprLuego?: { desde: number; expr: Expresion };
  saluda?: boolean;
  desde: number;
};

export type Dialogo = { quien: number; texto: string; desde: number; hasta?: number };

export type Escena = {
  id: string;
  seg: number;
  escenario: Escenario;
  /** rótulo chiquito arriba (edad o momento) */
  rotulo?: string;
  narracion: string[];
  personajes: EnEscena[];
  dialogos?: Dialogo[];
  /** detalles extra que dibuja la escena */
  extra?: "ladrillos" | "costura" | "pizarron" | "libros" | "birrete" | "herramientas";
};

const NINO = 250;
const ADULTO = 320;

export const ESCENAS: Escena[] = [
  { id: "titulo", seg: 8, escenario: "barrio", narracion: [], personajes: [] },
  {
    id: "familia",
    seg: 24,
    escenario: "barrio",
    rotulo: "Lucía, 8 años",
    narracion: [
      "Lucía tenía 8 años.",
      "Vivía con su familia en una casita de un solo ambiente, en un barrio del conurbano.",
      "Eran cinco: mamá, papá, la abuela, su hermanito Mateo y ella.",
    ],
    personajes: [
      { quien: "abuela", x: 150, size: 290, desde: 300 },
      { quien: "papa", x: 360, size: ADULTO, desde: 330 },
      { quien: "luciaNena", x: 545, size: NINO, saluda: true, desde: 60 },
      { quien: "mama", x: 730, size: ADULTO, desde: 360 },
      { quien: "mateoNene", x: 930, size: 220, desde: 390 },
    ],
  },
  {
    id: "papa",
    seg: 22,
    escenario: "barrio",
    rotulo: "El papá",
    narracion: ["Juan, su papá, hacía changas de albañil.", "Algunos días había trabajo. Otros, no."],
    personajes: [
      { quien: "papa", x: 380, size: 360, expr: "pensando", exprLuego: { desde: 330, expr: "feliz" }, desde: 20 },
      { quien: "luciaNena", x: 760, size: NINO, desde: 260 },
    ],
    dialogos: [{ quien: 0, texto: "Mañana capaz sale algo, hija.", desde: 330 }],
    extra: "ladrillos",
  },
  {
    id: "mama",
    seg: 22,
    escenario: "noche",
    rotulo: "La mamá",
    narracion: ["Rosa, su mamá, limpiaba casas de día…", "…y de noche cosía ropa para vender."],
    personajes: [
      { quien: "mama", x: 360, size: 350, expr: "pensando", exprLuego: { desde: 470, expr: "feliz" }, desde: 20 },
      { quien: "luciaNena", x: 780, size: NINO, expr: "triste", desde: 260 },
    ],
    dialogos: [
      { quien: 1, texto: "¿No te vas a dormir, ma?", desde: 320, hasta: 460 },
      { quien: 0, texto: "Ya termino, mi amor.", desde: 470 },
    ],
    extra: "costura",
  },
  {
    id: "abuela",
    seg: 22,
    escenario: "barrio",
    rotulo: "La abuela",
    narracion: ["La abuela Nélida no había podido terminar la escuela.", "Por eso siempre le decía lo mismo:"],
    personajes: [
      { quien: "abuela", x: 330, size: 340, desde: 20 },
      { quien: "luciaNena", x: 760, size: NINO, expr: "pensando", exprLuego: { desde: 400, expr: "feliz" }, desde: 150 },
    ],
    dialogos: [{ quien: 0, texto: "Lo que aprendés, nadie te lo puede quitar.", desde: 270 }],
  },
  {
    id: "escuela",
    seg: 26,
    escenario: "escuela",
    rotulo: "La escuela",
    narracion: ["En la escuela pública, Lucía almorzaba en el comedor…", "…y era la mejor de su grado en matemática."],
    personajes: [
      { quien: "maestra", x: 330, size: ADULTO, desde: 20 },
      { quien: "luciaNena", x: 760, size: NINO, expr: "sorpresa", exprLuego: { desde: 540, expr: "feliz" }, desde: 60 },
    ],
    dialogos: [
      { quien: 0, texto: "Lucía, vos tenés que seguir estudiando.", desde: 290, hasta: 520 },
      { quien: 1, texto: "¿De verdad, seño?", desde: 530 },
    ],
    extra: "pizarron",
  },
  {
    id: "crisis",
    seg: 24,
    escenario: "barrio",
    rotulo: "Lucía, 15 años",
    narracion: ["Cuando Lucía tenía 15, su papá se quedó meses sin trabajo.", "Ella pensó en dejar la escuela para ayudar."],
    personajes: [
      { quien: "papa", x: 170, size: 300, expr: "triste", desde: 20 },
      { quien: "lucia", x: 520, size: 300, expr: "triste", exprLuego: { desde: 500, expr: "sorpresa" }, desde: 40 },
      { quien: "mama", x: 870, size: ADULTO, expr: "triste", exprLuego: { desde: 460, expr: "feliz" }, desde: 60 },
    ],
    dialogos: [
      { quien: 1, texto: "Puedo dejar y salir a trabajar…", desde: 290, hasta: 450 },
      { quien: 2, texto: "No. Vos terminá. Nos arreglamos.", desde: 460 },
    ],
  },
  {
    id: "esfuerzo",
    seg: 24,
    escenario: "barrio",
    rotulo: "Unos años después",
    narracion: ["Lucía terminó la secundaria cuidando chicos los fines de semana.", "Mateo fue a una escuela técnica y aprendió electricidad."],
    personajes: [
      { quien: "lucia", x: 330, size: 320, desde: 20 },
      { quien: "mateo", x: 760, size: 310, expr: "feliz", saluda: true, desde: 220 },
    ],
    dialogos: [{ quien: 1, texto: "¡Ya sé arreglar cualquier instalación!", desde: 340 }],
    extra: "herramientas",
  },
  {
    id: "universidad",
    seg: 28,
    escenario: "colectivo",
    rotulo: "La facultad",
    narracion: [
      "Lucía fue la primera de la familia en entrar a la universidad pública.",
      "Una beca la ayudaba con los apuntes y el colectivo.",
      "Viajaba dos horas por día. Y estudiaba en el viaje.",
    ],
    personajes: [{ quien: "lucia", x: 540, size: 340, expr: "pensando", desde: 20 }],
    extra: "libros",
  },
  {
    id: "graduacion",
    seg: 22,
    escenario: "universidad",
    rotulo: "Cinco años después",
    narracion: ["Cinco años después, se recibió de licenciada en Enfermería. 🎓"],
    personajes: [
      { quien: "abuela", x: 130, size: 260, expr: "sorpresa", exprLuego: { desde: 300, expr: "feliz" }, desde: 60 },
      { quien: "papa", x: 320, size: 290, desde: 80 },
      { quien: "lucia", x: 540, size: 330, saluda: true, desde: 20 },
      { quien: "mama", x: 760, size: 290, desde: 100 },
      { quien: "mateo", x: 950, size: 280, desde: 120 },
    ],
    dialogos: [{ quien: 0, texto: "¿Viste? Nadie te lo quita.", desde: 300 }],
    extra: "birrete",
  },
  {
    id: "trabajo",
    seg: 24,
    escenario: "hospital",
    rotulo: "Hoy",
    narracion: ["Hoy Lucía trabaja en un hospital.", "Mateo tiene su propio taller de electricidad… y su papá trabaja con él."],
    personajes: [
      { quien: "luciaEnfermera", x: 220, size: 330, desde: 20 },
      { quien: "mateo", x: 560, size: 310, desde: 200 },
      { quien: "papa", x: 870, size: 310, saluda: true, desde: 230 },
    ],
    extra: "herramientas",
  },
  {
    id: "casa",
    seg: 28,
    escenario: "casaNueva",
    rotulo: "La casa",
    narracion: ["Con años de trabajo, entre todos levantaron una casa nueva…", "…ladrillo a ladrillo."],
    personajes: [
      { quien: "abuela", x: 140, size: 250, desde: 420 },
      { quien: "mama", x: 330, size: 280, desde: 430 },
      { quien: "lucia", x: 540, size: 290, saluda: true, desde: 440 },
      { quien: "papa", x: 750, size: 280, desde: 450 },
      { quien: "mateo", x: 940, size: 270, desde: 460 },
    ],
    dialogos: [{ quien: 0, texto: "¡Y con jardín para mis plantas! 🌻", desde: 560 }],
  },
  {
    id: "reflexion",
    seg: 18,
    escenario: "atardecer",
    narracion: ["Nadie lo logra solo.", "La familia, la escuela pública, una maestra que creyó, una beca… y el trabajo de todos los días."],
    personajes: [],
  },
  { id: "cierre", seg: 8, escenario: "atardecer", narracion: [], personajes: [] },
];

export const DURACION_FRAMES = ESCENAS.reduce((a, e) => a + e.seg, 0) * FPS;

export type IconName =
  | "abaco"
  | "pascalina"
  | "babbage"
  | "ada"
  | "turing"
  | "eniac"
  | "transistor"
  | "chip"
  | "pc"
  | "web"
  | "smartphone"
  | "ia";

export type Hito = {
  /** Año numérico usado para la animación del contador (negativo = a.C.) */
  year: number;
  /** Texto que se muestra como año (permite "~2500 a.C." o "HOY") */
  label?: string;
  titulo: string;
  dato: string;
  icon: IconName;
  color: string;
};

export const HITOS: Hito[] = [
  {
    year: -2500,
    label: "~2500 a.C.",
    titulo: "El ábaco",
    dato: "La primera “calculadora”: cuentas que se deslizan sobre varillas.",
    icon: "abaco",
    color: "#E0A458",
  },
  {
    year: 1642,
    titulo: "La Pascalina",
    dato: "Blaise Pascal, con 19 años, crea una máquina de engranajes que suma y resta.",
    icon: "pascalina",
    color: "#D9884A",
  },
  {
    year: 1837,
    titulo: "La Máquina Analítica",
    dato: "Charles Babbage diseña la primera computadora programable. Nunca se terminó.",
    icon: "babbage",
    color: "#C9A227",
  },
  {
    year: 1843,
    titulo: "Ada Lovelace",
    dato: "Escribe el primer algoritmo pensado para una máquina: la primera programadora.",
    icon: "ada",
    color: "#E57A9A",
  },
  {
    year: 1936,
    titulo: "La Máquina de Turing",
    dato: "Alan Turing define qué significa “computar”. Nace la informática teórica.",
    icon: "turing",
    color: "#8FBF6A",
  },
  {
    year: 1946,
    titulo: "ENIAC",
    dato: "30 toneladas, unas 18.000 válvulas de vacío y una sala entera para ella sola.",
    icon: "eniac",
    color: "#F2C14E",
  },
  {
    year: 1947,
    titulo: "El transistor",
    dato: "Inventado en los Laboratorios Bell: más chico, más rápido y más frío que la válvula.",
    icon: "transistor",
    color: "#4FC3F7",
  },
  {
    year: 1971,
    titulo: "El microprocesador",
    dato: "El Intel 4004 mete 2.300 transistores en un solo chip.",
    icon: "chip",
    color: "#42A5F5",
  },
  {
    year: 1981,
    titulo: "La computadora personal",
    dato: "Las computadoras dejan los laboratorios y llegan a casas y oficinas.",
    icon: "pc",
    color: "#7E8CF5",
  },
  {
    year: 1991,
    titulo: "La World Wide Web",
    dato: "Tim Berners-Lee publica la primera página web. El mundo se conecta.",
    icon: "web",
    color: "#9C6CF0",
  },
  {
    year: 2007,
    titulo: "El smartphone",
    dato: "Una computadora en el bolsillo, millones de veces más potente que la del Apolo 11.",
    icon: "smartphone",
    color: "#C86CF0",
  },
  {
    year: 2026,
    label: "HOY",
    titulo: "Inteligencia artificial",
    dato: "Computadoras que conversan, escriben, programan y crean.",
    icon: "ia",
    color: "#FF6FB5",
  },
];

export const FPS = 30;
export const INTRO = 80;
export const HITO = 95;
export const OUTRO = 110;
export const TRANSICION = 15;

export const GRAFICO = 150;
export const NUM_GRAFICOS = 3;

export const DURACION_TOTAL =
  INTRO +
  HITOS.length * HITO +
  NUM_GRAFICOS * GRAFICO +
  OUTRO -
  (HITOS.length + NUM_GRAFICOS + 1) * TRANSICION;

/** Frame (global) en el que empieza cada hito, teniendo en cuenta el solapamiento */
export const inicioHito = (i: number) => INTRO - TRANSICION + i * (HITO - TRANSICION);

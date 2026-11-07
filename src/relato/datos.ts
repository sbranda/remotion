// ─────────────────────────────────────────────────────────────────────────────
//  "LA ARQUITECTURA DEL VACÍO" — relato de 5 minutos.
//  El texto es el del relato tal como lo pasó el usuario; los diálogos van en
//  globos y la narración en el recuadro de arriba.
// ─────────────────────────────────────────────────────────────────────────────
import type { Expresion, TipoPersonaje } from "../salud/personajes";

export const FPS = 30;

export const ELENCO = {
  julian: { tipo: "ejecutivo", nombre: "Julián" },
  carlos: { tipo: "ejecutivo", piel: "#c98d64", pelo: "#3b2a20", ropa: "#4a5568", nombre: "Carlos" },
  nino: { tipo: "chico", piel: "#e9c3a1", pelo: "#3b2a20", ropa: "#6c7a96", nombre: "Julián de chico" },
} satisfies Record<string, { tipo: TipoPersonaje; piel?: string; pelo?: string; ropa?: string; nombre: string }>;

export type IdPersonaje = keyof typeof ELENCO;
export type Hora = "dia" | "noche" | "amanecer";

export type EnEscena = {
  quien: IdPersonaje;
  x: number;
  size: number;
  expr?: Expresion;
  exprLuego?: { desde: number; expr: Expresion };
  desde: number;
};

export type Dialogo = { quien: number; texto: string; desde: number; hasta?: number };

export type Escena = {
  id: string;
  seg: number;
  hora: Hora;
  narracion: string[];
  personajes: EnEscena[];
  dialogos?: Dialogo[];
  extra?: "maquetas" | "notificacion" | "comparacion" | "whisky" | "reflejo" | "panico" | "vaso" | "alivio" | "telefono";
};

export const ESCENAS: Escena[] = [
  { id: "titulo", seg: 8, hora: "noche", narracion: [], personajes: [] },
  {
    id: "julian",
    seg: 26,
    hora: "dia",
    narracion: [
      "A los cuarenta y ocho años, Julián Varela medía su valor en grados Celsius.",
      "Su oficina en el piso veintidós de Puerto Madero no tenía una sola hoja de papel fuera de lugar; las maquetas de sus edificios corporativos brillaban bajo luces cenitales, réplicas exactas de su propia mente: frías, simétricas, impenetrables.",
    ],
    personajes: [{ quien: "julian", x: 300, size: 340, desde: 20 }],
    extra: "maquetas",
  },
  {
    id: "errores",
    seg: 24,
    hora: "dia",
    narracion: [
      "Julián no aceptaba errores. Ni de sus empleados, ni de los contratistas, ni de la vida.",
      "Para él, admitir una equivocación equivalía a una demolición estructural; significaba dejar al descubierto los cimientos podridos de un edificio que llevaba décadas levantando a base de aplausos, títulos y una infalibilidad calculada al milímetro.",
    ],
    personajes: [{ quien: "julian", x: 300, size: 340, expr: "pensando", desde: 0 }],
    extra: "maquetas",
  },
  {
    id: "notificacion",
    seg: 22,
    hora: "dia",
    narracion: [
      "El desplome comenzó un martes con una notificación oficial.",
      "El jurado del concurso para el nuevo Museo de Arte Urbano —un proyecto que Julián daba por ganado antes de presentar— había seleccionado el diseño de una arquitecta joven, casi una desconocida.",
    ],
    personajes: [{ quien: "julian", x: 280, size: 340, expr: "feliz", exprLuego: { desde: 300, expr: "sorpresa" }, desde: 0 }],
    extra: "notificacion",
  },
  {
    id: "socio",
    seg: 24,
    hora: "dia",
    narracion: ["…escupió Julián frente a su socio, con la mandíbula tensa."],
    personajes: [
      { quien: "julian", x: 290, size: 340, expr: "enojado", desde: 0 },
      { quien: "carlos", x: 800, size: 320, expr: "sorpresa", exprLuego: { desde: 480, expr: "pensando" }, desde: 20 },
    ],
    dialogos: [
      { quien: 0, texto: "Es un insulto a la técnica.", desde: 30, hasta: 220 },
      { quien: 0, texto: "Ese plano no cumple con las normativas de carga. Es un capricho estético sin sustento.", desde: 230, hasta: 500 },
      { quien: 0, texto: "El comité está cegado por la moda.", desde: 510 },
    ],
  },
  {
    id: "verdad",
    seg: 22,
    hora: "dia",
    narracion: [
      "Pero no era la moda. Era la verdad, y Julián lo sabía en el rincón más oscuro de su conciencia.",
      "La maqueta de la ganadora era audaz, orgánica, fluida. La suya, en cambio, era una fortaleza inexpugnable, perfecta y profundamente aburrida.",
    ],
    personajes: [],
    extra: "comparacion",
  },
  {
    id: "noche",
    seg: 24,
    hora: "noche",
    narracion: [
      "Esa noche, Julián se quedó solo en la oficina. Las luces del puerto parpadeaban a lo lejos, asemejándose a un campo de estrellas indiferentes.",
      "Se sirvió un vaso de whisky, pero el alcohol no le quemó la garganta; se sintió como plomo.",
    ],
    personajes: [{ quien: "julian", x: 380, size: 340, expr: "triste", desde: 20 }],
    extra: "whisky",
  },
  {
    id: "reflejo",
    seg: 28,
    hora: "noche",
    narracion: [
      "Al mirar su reflejo en el ventanal de vidrio templado, experimentó una extraña sensación de vértigo. Vio al hombre impecable del traje a medida, al conferencista aplaudido, al profesional temido y respetado.",
      "Y, sin embargo, por primera vez en su vida, sintió un asco visceral hacia esa imagen.",
      "Comprendió, con una claridad paralizante, que el ego no era su armadura: era su prisión. Había pasado cuarenta y ocho años construyendo muros altísimos para que nadie viera al niño asustado que temía no ser amado si no era perfecto.",
    ],
    personajes: [{ quien: "julian", x: 820, size: 330, expr: "triste", desde: 0 }],
    extra: "reflejo",
  },
  {
    id: "panico",
    seg: 24,
    hora: "noche",
    narracion: [
      "El pecho se le contrajo. Le faltó el aire. Por un segundo, el terror fue absoluto: si soltaba la razón, si admitía que su obra era inferior, ¿qué quedaba de él? ¿Quién era Julián Varela sin su pedestal?",
      "La tentación de culpar a la suerte, al jurado, al sistema, estiró sus garras una última vez. Pero la resistencia se rompió.",
    ],
    personajes: [{ quien: "julian", x: 540, size: 350, expr: "dolor", desde: 0 }],
    extra: "panico",
  },
  {
    id: "vaso",
    seg: 22,
    hora: "noche",
    narracion: [
      "Con un temblor en las manos que no pudo contener, Julián dejó caer el vaso sobre la alfombra.",
      "El cristal no se rompió, pero el líquido ámbar se desparramó en una mancha caótica, imperfecta e imposible de ordenar.",
    ],
    personajes: [{ quien: "julian", x: 330, size: 340, expr: "sorpresa", desde: 0 }],
    extra: "vaso",
  },
  {
    id: "alivio",
    seg: 24,
    hora: "noche",
    narracion: [
      "Cerró los ojos y, por primera vez en su vida adulta, no intentó arreglarlo. Se dejó caer en el sillón de cuero, respirando hondo, sintiendo el peso insoportable de la máscara deslizarse por su cuello.",
      "No hubo una epifanía ruidosa, solo un silencio espeso y un alivio extraño, como el de un prisionero que finalmente acepta que las puertas de su celda nunca estuvieron cerradas con llave.",
    ],
    personajes: [{ quien: "julian", x: 540, size: 350, expr: "dolor", exprLuego: { desde: 420, expr: "feliz" }, desde: 0 }],
    extra: "alivio",
  },
  {
    id: "manana",
    seg: 24,
    hora: "dia",
    narracion: [
      "Al día siguiente, Julián llegó a la oficina diez minutos más tarde de lo habitual. Miró la maqueta de su competidora en la pantalla del ordenador. Marcó el número de su socio.",
      "Habló con una voz que sonaba, por primera vez, humana.",
    ],
    personajes: [{ quien: "julian", x: 300, size: 340, expr: "feliz", desde: 0 }],
    dialogos: [
      { quien: 0, texto: "Carlos, hay que llamar a la ganadora. Quiero ver los planos de su estructura.", desde: 330, hasta: 540 },
      { quien: 0, texto: "Hay algo que ella hizo bien y yo necesito aprender.", desde: 550 },
    ],
    extra: "telefono",
  },
  {
    id: "sol",
    seg: 20,
    hora: "amanecer",
    narracion: [
      "Al colgar, miró por la ventana. El sol de la mañana bañaba la ciudad.",
      "Por primera vez en cuarenta y ocho años, Julián no sintió la necesidad de competir con el sol. Simplemente se dejó tibiar por él.",
    ],
    personajes: [{ quien: "julian", x: 540, size: 350, expr: "feliz", desde: 0 }],
  },
  { id: "cierre", seg: 8, hora: "amanecer", narracion: [], personajes: [] },
];

export const DURACION_FRAMES = ESCENAS.reduce((a, e) => a + e.seg, 0) * FPS;

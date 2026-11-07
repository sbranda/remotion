export type Mood = "cold" | "tension" | "crisis" | "release" | "dawn";

export type Paragraph = {
  text: string;
  mood: Mood;
  /** Efecto visual especial que acompaña al párrafo. */
  effect?: "spill" | "sun";
};

export const TITLE = "La Arquitectura del Vacío";
export const SUBTITLE = "Relato de 5 minutos";

export const PARAGRAPHS: Paragraph[] = [
  {
    mood: "cold",
    text: "A los cuarenta y ocho años, Julián Varela medía su valor en grados Celsius. Su oficina en el piso veintidós de Puerto Madero no tenía una sola hoja de papel fuera de lugar; las maquetas de sus edificios corporativos brillaban bajo luces cenitales, réplicas exactas de su propia mente: frías, simétricas, impenetrables.",
  },
  {
    mood: "cold",
    text: "Julián no aceptaba errores. Ni de sus empleados, ni de los contratistas, ni de la vida. Para él, admitir una equivocación equivalía a una demolición estructural; significaba dejar al descubierto los cimientos podridos de un edificio que llevaba décadas levantando a base de aplausos, títulos y una infalibilidad calculada al milímetro.",
  },
  {
    mood: "tension",
    text: "El desplome comenzó un martes con una notificación oficial. El jurado del concurso para el nuevo Museo de Arte Urbano —un proyecto que Julián daba por ganado antes de presentar— había seleccionado el diseño de una arquitecta joven, casi una desconocida.",
  },
  {
    mood: "tension",
    text: "—Es un insulto a la técnica —escupió Julián frente a su socio, con la mandíbula tensa—. Ese plano no cumple con las normativas de carga. Es un capricho estético sin sustento. El comité está cegado por la moda.",
  },
  {
    mood: "tension",
    text: "Pero no era la moda. Era la verdad, y Julián lo sabía en el rincón más oscuro de su conciencia. La maqueta de la ganadora era audaz, orgánica, fluida. La suya, en cambio, era una fortaleza inexpugnable, perfecta y profundamente aburrida.",
  },
  {
    mood: "crisis",
    text: "Esa noche, Julián se quedó solo en la oficina. Las luces del puerto parpadeaban a lo lejos, asemejándose a un campo de estrellas indiferentes. Se sirvió un vaso de whisky, pero el alcohol no le quemó la garganta; se sintió como plomo.",
  },
  {
    mood: "crisis",
    text: "Al mirar su reflejo en el ventanal de vidrio templado, experimentó una extraña sensación de vértigo. Vio al hombre impecable del traje a medida, al conferencista aplaudido, al profesional temido y respetado. Y, sin embargo, por primera vez en su vida, sintió un asco visceral hacia esa imagen.",
  },
  {
    mood: "crisis",
    text: "Comprendió, con una claridad paralizante, que el ego no era su armadura: era su prisión. Había pasado cuarenta y ocho años construyendo muros altísimos para que nadie viera al niño asustado que temía no ser amado si no era perfecto.",
  },
  {
    mood: "crisis",
    text: "El pecho se le contrajo. Le faltó el aire. Por un segundo, el terror fue absoluto: si soltaba la razón, si admitía que su obra era inferior, ¿qué quedaba de él? ¿Quién era Julián Varela sin su pedestal?",
  },
  {
    mood: "crisis",
    text: "La tentación de culpar a la suerte, al jurado, al sistema, estiró sus garras una última vez. Pero la resistencia se rompió.",
  },
  {
    mood: "release",
    effect: "spill",
    text: "Con un temblor en las manos que no pudo contener, Julián dejó caer el vaso sobre la alfombra. El cristal no se rompió, pero el líquido ámbar se desparramó en una mancha caótica, imperfecta e imposible de ordenar.",
  },
  {
    mood: "release",
    effect: "spill",
    text: "Cerró los ojos y, por primera vez en su vida adulta, no intentó arreglarlo. Se dejó caer en el sillón de cuero, respirando hondo, sintiendo el peso insoportable de la máscara deslizarse por su cuello.",
  },
  {
    mood: "release",
    text: "No hubo una epifanía ruidosa, solo un silencio espeso y un alivio extraño, como el de un prisionero que finalmente acepta que las puertas de su celda nunca estuvieron cerradas con llave.",
  },
  {
    mood: "dawn",
    text: "Al día siguiente, Julián llegó a la oficina diez minutos más tarde de lo habitual. Miró la maqueta de su competidora en la pantalla del ordenador. Marcó el número de su socio.",
  },
  {
    mood: "dawn",
    text: "—Carlos —dijo, con una voz que sonaba, por primera vez, humana—. Hay que llamar a la ganadora. Quiero ver los planos de su estructura. Hay algo que ella hizo bien y yo necesito aprender.",
  },
  {
    mood: "dawn",
    effect: "sun",
    text: "Al colgar, miró por la ventana. El sol de la mañana bañaba la ciudad. Por primera vez en cuarenta y ocho años, Julián no sintió la necesidad de competir con el sol. Simplemente se dejó tibiar por él.",
  },
];

export const FPS = 30;
/** Ritmo de lectura/narración en palabras por minuto. */
export const WORDS_PER_MINUTE = 150;
export const TITLE_SECONDS = 8;
export const END_SECONDS = 8;
/** Pausa (en segundos) tras terminar de revelarse cada párrafo. */
export const HOLD_SECONDS = 2.2;
/** Fundido de salida al final de cada párrafo. */
export const FADE_OUT_SECONDS = 0.8;

export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

export const revealSeconds = (p: Paragraph) =>
  (wordCount(p.text) / WORDS_PER_MINUTE) * 60;

export const paragraphFrames = (p: Paragraph) =>
  Math.round((revealSeconds(p) + HOLD_SECONDS + FADE_OUT_SECONDS) * FPS);

export type TimedParagraph = Paragraph & {
  from: number;
  durationInFrames: number;
};

export const TIMELINE: TimedParagraph[] = (() => {
  let cursor = TITLE_SECONDS * FPS;
  return PARAGRAPHS.map((p) => {
    const durationInFrames = paragraphFrames(p);
    const timed = { ...p, from: cursor, durationInFrames };
    cursor += durationInFrames;
    return timed;
  });
})();

const last = TIMELINE[TIMELINE.length - 1];
export const END_FROM = last.from + last.durationInFrames;
export const TOTAL_FRAMES = END_FROM + END_SECONDS * FPS;

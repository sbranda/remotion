// ─────────────────────────────────────────────────────────────────────────────
//  GUION DE LA VOZ EN OFF
//  Cada bloque tiene una duración fija (suman 180 s). Los subtítulos se reparten
//  solos dentro de cada bloque según la cantidad de palabras de cada frase.
//  Las cifras salen de datos.ts, así que al cambiarlas allí cambia el texto.
// ─────────────────────────────────────────────────────────────────────────────

import { DATOS, heridosTexto } from "./datos";

export type BloqueId =
  | "gancho"
  | "donde"
  | "como"
  | "cifras"
  | "porque"
  | "respuesta"
  | "contexto"
  | "cierre";

export type Bloque = {
  id: BloqueId;
  /** etiqueta discreta arriba a la izquierda */
  etiqueta: string;
  duracionSeg: number;
  texto: string;
};

export const BLOQUES: Bloque[] = [
  {
    id: "gancho",
    etiqueta: "",
    duracionSeg: 6,
    texto: `28 de octubre. Dos trenes de alta velocidad chocan en Toledo.`,
  },
  {
    id: "donde",
    etiqueta: "Qué y dónde",
    duracionSeg: 24,
    texto:
      `Ocurrió cerca de ${DATOS.lugar}, en la provincia de ${DATOS.provincia}, ` +
      `en la línea de alta velocidad que une Madrid con Andalucía. ` +
      `Uno de los trenes era un AVE de Renfe. ` +
      `El otro, un tren de Iryo, la operadora privada que compite en esa misma ruta.`,
  },
  {
    id: "como",
    etiqueta: "Cómo ocurrió",
    duracionSeg: 35,
    texto:
      `Según el Ministerio de Transportes, un fallo técnico en la señalización ` +
      `dejó fuera de servicio el sistema automático de seguridad del tramo. ` +
      `Por precaución, los trenes que circulaban por él se detuvieron. ` +
      `Poco después, el AVE y el Iryo colisionaron. ` +
      `Con el impacto, dos vagones se salieron de la vía y cayeron por un terraplén. ` +
      `Los equipos de emergencia se desplazaron de inmediato hasta el lugar.`,
  },
  {
    id: "cifras",
    etiqueta: "Las cifras",
    duracionSeg: 25,
    texto:
      `Las cifras fueron creciendo a lo largo del día. ` +
      `Con los últimos datos disponibles, al menos ${DATOS.fallecidos} personas perdieron la vida ` +
      `y ${heridosTexto()} resultaron heridas. ` +
      `Muchas de ellas siguen hospitalizadas.`,
  },
  {
    id: "porque",
    etiqueta: "¿Por qué?",
    duracionSeg: 35,
    texto:
      `La causa todavía no está clara. ` +
      `El ministro de Transportes, Óscar Puente, habló de un fallo en la señalización ` +
      `y de una orden dada desde el centro de control de Atocha. ` +
      `Según Bloomberg, los primeros indicios apuntan a un error humano. ` +
      `Será la investigación oficial la que determine qué falló y quién es responsable.`,
  },
  {
    id: "respuesta",
    etiqueta: "La respuesta",
    duracionSeg: 30,
    texto:
      `Los servicios de emergencia y los hospitales de la zona trabajaron durante horas ` +
      `para atender a los heridos y a sus familias. ` +
      `La tragedia llegó en plena campaña electoral. ` +
      `Hubo protestas que pidieron la dimisión del Gobierno, ` +
      `y la presión sobre Pedro Sánchez creció en las horas siguientes.`,
  },
  {
    id: "contexto",
    etiqueta: "Contexto",
    duracionSeg: 17,
    texto:
      `Es el accidente ferroviario más grave en España en más de una década. ` +
      `Y el segundo gran choque de trenes de este año.`,
  },
  {
    id: "cierre",
    etiqueta: "",
    duracionSeg: 8,
    texto: `Nuestro recuerdo está con las víctimas y con sus familias.`,
  },
];

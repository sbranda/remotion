// ─────────────────────────────────────────────────────────────────────────────
//  DATOS DEL ACCIDENTE
//  Todo lo que puede cambiar con las noticias está aquí. Antes de generar el
//  video, revisa estas cifras contra la última información oficial.
// ─────────────────────────────────────────────────────────────────────────────

export const DATOS = {
  fecha: "28 de octubre de 2026",
  fechaCorta: "28 · 10 · 2026",
  lugar: "Urda",
  provincia: "Toledo",
  linea: "Línea de alta velocidad Madrid – Andalucía",

  trenes: [
    { nombre: "AVE", operador: "Renfe", color: "#c9cfd8", franja: "#7a2c8f" },
    { nombre: "Iryo", operador: "Iryo", color: "#e9e3dc", franja: "#c8102e" },
  ],

  /** Cifras provisionales. Se muestran con la fecha de `actualizado`. */
  fallecidos: 68,
  heridos: 80,
  /** true = se muestra y se narra como "más de 80" */
  heridosMasDe: true,
  actualizado: "29 de octubre de 2026",
  fuenteCifras: "Bloomberg · Chequeado · Infobae",

  /** Fuentes que aparecen en el cierre */
  fuentes: ["Chequeado", "CNN en Español", "Infobae", "Bloomberg", "N+"],
};

export const heridosTexto = () =>
  DATOS.heridosMasDe ? `más de ${DATOS.heridos}` : `${DATOS.heridos}`;

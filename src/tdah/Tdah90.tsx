// Versión corta (90 s) del Reel de TDAH, mismo estilo cómic. Reutiliza las escenas de Tdah.tsx.
import React from "react";
import { staticFile } from "remotion";
import { K } from "../salud/comic";
import { ReelComic } from "../salud/comic";
import { FPS, HIPERACTIVIDAD, INATENCION } from "./datos";
import { Adultos, Cierre, Comun, Gancho, Lista, Mitos, QueEs } from "./Tdah";

/** Señales: 3 de distracción + 3 de hiperactividad/impulsividad */
const SENALES = [INATENCION[0], INATENCION[1], INATENCION[2], HIPERACTIVIDAD[0], HIPERACTIVIDAD[1], HIPERACTIVIDAD[3]];

const DIAG_TRAT = [
  { emoji: "👩‍⚕️", texto: "Lo diagnostica un profesional especializado" },
  { emoji: "🩸", texto: "No hay un análisis de sangre que lo detecte" },
  { emoji: "🗨️", texto: "Se trata con terapia y apoyo" },
  { emoji: "💊", texto: "Y medicación, si el profesional la indica" },
];

const Senales: React.FC = () => <Lista titulo="Señales" items={SENALES} paso={60} colores={[K.blanco, K.amarillo, K.blanco, K.lima]} />;

const DiagTrat: React.FC = () => <Lista titulo="¿Se diagnostica y se trata?" size={96} items={DIAG_TRAT} paso={85} colores={[K.blanco, K.celeste]} />;

/** Duración de cada página en segundos (suman 90) */
export const PAGINAS_90 = [
  { id: "gancho", seg: 5, color: K.amarillo, Escena: Gancho },
  { id: "queEs", seg: 12, color: K.celeste, Escena: QueEs },
  { id: "comun", seg: 8, color: K.lima, Escena: Comun },
  { id: "senales", seg: 16, color: K.naranja, Escena: Senales },
  { id: "adultos", seg: 12, color: K.violeta, Escena: () => <Adultos paso={55} globoDesde={250} /> },
  { id: "mitos", seg: 14, color: K.rosa, Escena: () => <Mitos paso={90} aSello={40} /> },
  { id: "diagTrat", seg: 15, color: K.amarillo, Escena: DiagTrat },
  { id: "cierre", seg: 8, color: K.celeste, Escena: Cierre },
];

export const DURACION_90 = PAGINAS_90.reduce((a, p) => a + p.seg, 0) * FPS;

export const Tdah90: React.FC = () => (
  <ReelComic
    paginas={PAGINAS_90}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,8,16,12,14,15,8 --transponer 4 --bpm 128 --estilo energico
    musica={staticFile("audio/tdah90-musica.mp3")}
  />
);

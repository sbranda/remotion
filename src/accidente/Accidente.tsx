import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { C, SANS, clamp } from "./graficos";
import { Cierre, Como, Cifras, Contexto, Donde, Gancho, Porque, Respuesta } from "./escenas";
import { BloqueId } from "./guion";
import { BloqueTimed, LINEA } from "./tiempos";

const ESCENAS: Record<BloqueId, React.FC> = {
  gancho: Gancho,
  donde: Donde,
  como: Como,
  cifras: Cifras,
  porque: Porque,
  respuesta: Respuesta,
  contexto: Contexto,
  cierre: Cierre,
};

/** En el gancho y el cierre el texto ya está grande en pantalla: no llevan subtítulo */
const SIN_SUBTITULO: BloqueId[] = ["gancho", "cierre"];

const Etiqueta: React.FC<{ b: BloqueTimed }> = ({ b }) => {
  const frame = useCurrentFrame();
  if (!b.etiqueta) return null;
  const op = interpolate(frame, [8, 24, b.duracion - 16, b.duracion], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 170, left: 70, display: "flex", alignItems: "center", gap: 16, opacity: op }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: C.rojo }} />
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: C.texto2, textTransform: "uppercase" }}>
        {b.etiqueta}
      </div>
    </div>
  );
};

const Subtitulos: React.FC<{ b: BloqueTimed }> = ({ b }) => {
  const frame = useCurrentFrame();
  const i = b.cues.findIndex((q, idx) => {
    const sig = b.cues[idx + 1];
    const hasta = Math.min(sig ? sig.inicio - 2 : b.duracion, q.fin + 24);
    return frame >= q.inicio && frame < hasta;
  });
  if (i < 0) return null;
  const q = b.cues[i];
  const op = interpolate(frame, [q.inicio, q.inicio + 5], [0, 1], clamp);
  return (
    // por encima de la descripción y los botones de Instagram
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
      <div
        style={{
          maxWidth: 900,
          padding: "16px 30px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: 14,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.3,
          color: "#fff",
          textAlign: "center",
          opacity: op,
          textWrap: "balance",
        }}
      >
        {q.texto}
      </div>
    </AbsoluteFill>
  );
};

const BloqueVista: React.FC<{ b: BloqueTimed; subtitulos: boolean }> = ({ b, subtitulos }) => {
  const frame = useCurrentFrame();
  const Escena = ESCENAS[b.id];
  const fundido = interpolate(frame, [0, 12, b.duracion - 12, b.duracion], [1, 0, 0, 1], clamp);
  return (
    <AbsoluteFill>
      <Escena />
      <Etiqueta b={b} />
      {subtitulos && !SIN_SUBTITULO.includes(b.id) && <Subtitulos b={b} />}
      <AbsoluteFill style={{ background: C.fondo, opacity: fundido }} />
    </AbsoluteFill>
  );
};

export type AccidenteProps = { subtitulos: boolean };

export const Accidente: React.FC<AccidenteProps> = ({ subtitulos }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, ${C.fondo2} 0%, ${C.fondo} 70%)` }}>
    {LINEA.map((b) => (
      <Sequence key={b.id} from={b.desde} durationInFrames={b.duracion} name={b.etiqueta || b.id}>
        <BloqueVista b={b} subtitulos={subtitulos} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

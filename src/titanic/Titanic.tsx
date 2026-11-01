import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { C, SANS, SERIF, clamp } from "./graficos";
import { ABordo, Choque, Embarque, Prologo } from "./escenas1";
import { Bote13, Botes, Carpathia, Epilogo, Hundimiento } from "./escenas2";
import { EscenaId } from "./guion";
import { CapituloTimed, LINEA } from "./tiempos";

const ESCENAS: Record<EscenaId, React.FC> = {
  prologo: Prologo,
  embarque: Embarque,
  aBordo: ABordo,
  choque: Choque,
  botes: Botes,
  bote13: Bote13,
  hundimiento: Hundimiento,
  carpathia: Carpathia,
  epilogo: Epilogo,
};

const TarjetaCapitulo: React.FC<{ cap: CapituloTimed }> = ({ cap }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 12, 95, 120], [0, 1, 1, 0], clamp);
  const y = interpolate(frame, [0, 30], [30, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        background: `rgba(3,7,14,${0.82 * op})`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 18,
        paddingBottom: 120,
      }}
    >
      <div style={{ opacity: op, transform: `translateY(${y}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 14, color: C.oro }}>CAPÍTULO {cap.numero}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 120, color: C.crema, marginTop: 10 }}>{cap.titulo}</div>
        <div style={{ width: 120, height: 3, background: C.oro, margin: "26px auto" }} />
        <div style={{ fontFamily: SANS, fontSize: 38, color: C.crema2, letterSpacing: 2 }}>{cap.rotulo}</div>
      </div>
    </AbsoluteFill>
  );
};

/** Etiqueta discreta arriba a la izquierda, después de la tarjeta */
const Marcador: React.FC<{ cap: CapituloTimed }> = ({ cap }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [120, 150, cap.duracion - 30, cap.duracion], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 44,
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: 5,
        color: C.crema,
        opacity: op * 0.55,
        textShadow: "0 2px 8px #000",
      }}
    >
      {cap.numero} · {cap.titulo.toUpperCase()}
    </div>
  );
};

const Subtitulos: React.FC<{ cap: CapituloTimed }> = ({ cap }) => {
  const frame = useCurrentFrame();
  const i = cap.cues.findIndex((q, idx) => {
    const sig = cap.cues[idx + 1];
    const hasta = Math.min(sig ? sig.inicio - 3 : cap.duracion, q.fin + 30);
    return frame >= q.inicio && frame < hasta;
  });
  if (i < 0) return null;
  const q = cap.cues[i];
  const op = interpolate(frame, [q.inicio, q.inicio + 6], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
      <div
        style={{
          maxWidth: 1500,
          padding: "14px 34px",
          background: "rgba(0,0,0,0.55)",
          borderRadius: 12,
          fontFamily: SANS,
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

const Capitulo: React.FC<{ cap: CapituloTimed; subtitulos: boolean }> = ({ cap, subtitulos }) => {
  const frame = useCurrentFrame();
  const Escena = ESCENAS[cap.id];
  // fundido a negro entre capítulos
  const negro = interpolate(frame, [0, 15, cap.duracion - 15, cap.duracion], [1, 0, 0, 1], clamp);
  return (
    <AbsoluteFill>
      <Escena />
      {/* viñeta y grano de época */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
      {cap.id !== "prologo" && <TarjetaCapitulo cap={cap} />}
      {cap.id !== "prologo" && <Marcador cap={cap} />}
      {subtitulos && <Subtitulos cap={cap} />}
      <AbsoluteFill style={{ background: "#000", opacity: negro }} />
    </AbsoluteFill>
  );
};

export type TitanicProps = { subtitulos: boolean };

export const Titanic: React.FC<TitanicProps> = ({ subtitulos }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    {LINEA.map((cap) => (
      <Sequence key={cap.id} from={cap.desde} durationInFrames={cap.duracion} name={`${cap.numero}. ${cap.titulo}`}>
        <Capitulo cap={cap} subtitulos={subtitulos} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

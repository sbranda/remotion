import React from "react";
import { Composition } from "remotion";
import { Reel } from "./Reel";
import { DURACION_TOTAL, FPS } from "./data";
import { Titanic } from "./titanic/Titanic";
import { DURACION_FRAMES, FPS as FPS_T } from "./titanic/tiempos";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="HistoriaComputadora"
      component={Reel}
      durationInFrames={DURACION_TOTAL}
      fps={FPS}
      width={1080}
      height={1920}
    />
    {/* Video de 10 minutos: "Yo estuve en el Titanic" */}
    <Composition
      id="Titanic"
      component={Titanic}
      durationInFrames={DURACION_FRAMES}
      fps={FPS_T}
      width={1920}
      height={1080}
      defaultProps={{ subtitulos: true }}
    />
    <Composition
      id="TitanicSinSubtitulos"
      component={Titanic}
      durationInFrames={DURACION_FRAMES}
      fps={FPS_T}
      width={1920}
      height={1080}
      defaultProps={{ subtitulos: false }}
    />
  </>
);

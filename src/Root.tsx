import React from "react";
import { Composition } from "remotion";
import { Accidente } from "./accidente/Accidente";
import { DURACION_FRAMES, FPS } from "./accidente/tiempos";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Reel de 3 minutos: choque de trenes del 28 de octubre de 2026 en Toledo */}
    <Composition
      id="Accidente"
      component={Accidente}
      durationInFrames={DURACION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ subtitulos: true }}
    />
    <Composition
      id="AccidenteSinSubtitulos"
      component={Accidente}
      durationInFrames={DURACION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ subtitulos: false }}
    />
  </>
);

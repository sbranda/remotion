import React from "react";
import { Composition } from "remotion";
import { Accidente } from "./accidente/Accidente";
import { DURACION_FRAMES, FPS } from "./accidente/tiempos";
import { Trigliceridos } from "./trigliceridos/Trigliceridos";
import { DURACION_FRAMES as DURACION_TG, FPS as FPS_TG } from "./trigliceridos/datos";
import { Colesterol } from "./colesterol/Colesterol";
import { DURACION_FRAMES as DURACION_COL, FPS as FPS_COL } from "./colesterol/datos";

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
    {/* Reel de 90 segundos: triglicéridos */}
    <Composition id="Trigliceridos" component={Trigliceridos} durationInFrames={DURACION_TG} fps={FPS_TG} width={1080} height={1920} />
    {/* Reel de 90 segundos: colesterol */}
    <Composition id="Colesterol" component={Colesterol} durationInFrames={DURACION_COL} fps={FPS_COL} width={1080} height={1920} />
  </>
);

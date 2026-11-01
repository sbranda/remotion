import React from "react";
import { Composition } from "remotion";
import { Reel } from "./Reel";
import { DURACION_TOTAL, FPS } from "./data";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HistoriaComputadora"
    component={Reel}
    durationInFrames={DURACION_TOTAL}
    fps={FPS}
    width={1080}
    height={1920}
  />
);

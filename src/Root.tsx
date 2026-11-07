import React from "react";
import { Composition } from "remotion";
import { ArquitecturaDelVacio } from "./Video";
import { FPS, TOTAL_FRAMES } from "./story";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ArquitecturaDelVacio"
    component={ArquitecturaDelVacio}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);

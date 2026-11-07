import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import "./fonts";
import { Background } from "./Background";
import { EndCard, TitleCard } from "./Cards";
import { ParagraphScene } from "./ParagraphScene";
import { Spill } from "./Spill";
import { Sun } from "./Sun";
import { END_FROM, FPS, TIMELINE, TITLE_SECONDS, TOTAL_FRAMES } from "./story";

const spillFrom = TIMELINE.find((p) => p.effect === "spill")!.from;
const releaseEnd = (() => {
  const release = TIMELINE.filter((p) => p.mood === "release");
  const last = release[release.length - 1];
  return last.from + last.durationInFrames;
})();
const sunFrom = TIMELINE.find((p) => p.mood === "dawn")!.from;

export const ArquitecturaDelVacio: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={spillFrom} durationInFrames={releaseEnd - spillFrom} name="Mancha de whisky">
        <Spill durationInFrames={releaseEnd - spillFrom} />
      </Sequence>
      <Sequence from={sunFrom} durationInFrames={TOTAL_FRAMES - sunFrom} name="Sol de la mañana">
        <Sun durationInFrames={TOTAL_FRAMES - sunFrom} />
      </Sequence>
      <Sequence durationInFrames={TITLE_SECONDS * FPS} name="Título">
        <TitleCard />
      </Sequence>
      {TIMELINE.map((p, i) => (
        <Sequence key={i} from={p.from} durationInFrames={p.durationInFrames} name={`Párrafo ${i + 1}`}>
          <ParagraphScene paragraph={p} />
        </Sequence>
      ))}
      <Sequence from={END_FROM} name="Fin">
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};

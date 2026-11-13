import "@fontsource/fredoka/400.css";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import * as S from "./scenes";

export const TRANSITION = 15;

export const SCENES: { component: React.FC; duration: number }[] = [
  { component: S.TitleScene, duration: 180 },
  { component: S.IntroScene, duration: 330 },
  { component: S.CelebrateScene, duration: 330 },
  { component: S.ReviewScene, duration: 390 },
  { component: S.DiscoveryScene, duration: 360 },
  { component: S.DanielViewScene, duration: 450 },
  { component: S.LauraViewScene, duration: 450 },
  { component: S.ClashScene, duration: 360 },
  { component: S.NightScene, duration: 480 },
  { component: S.EmailScene, duration: 300 },
  { component: S.DecisionScene, duration: 420 },
  { component: S.WorkingScene, duration: 300 },
  { component: S.MeetingScene, duration: 510 },
  { component: S.AftermathScene, duration: 330 },
  { component: S.ReflectionScene, duration: 420 },
];

export const STORY_DURATION =
  SCENES.reduce((a, s) => a + s.duration, 0) - TRANSITION * (SCENES.length - 1);

export const Story: React.FC = () => (
  <TransitionSeries>
    {SCENES.flatMap(({ component: Scene, duration }, i) => {
      const items = [
        <TransitionSeries.Sequence key={`s${i}`} durationInFrames={duration}>
          <Scene />
        </TransitionSeries.Sequence>,
      ];
      if (i < SCENES.length - 1) {
        items.push(
          <TransitionSeries.Transition
            key={`t${i}`}
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />,
        );
      }
      return items;
    })}
  </TransitionSeries>
);

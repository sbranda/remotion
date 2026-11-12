import "@fontsource/fredoka/400.css";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  ApologyScene,
  ArrivalScene,
  CelebrationScene,
  FriendScene,
  LonelyScene,
  MessageScene,
  MockingScene,
  NoticeScene,
  StandTogetherScene,
  TeacherScene,
  TitleScene,
} from "./scenes";

export const TRANSITION = 15;

export const SCENES: { component: React.FC; duration: number }[] = [
  { component: TitleScene, duration: 120 },
  { component: ArrivalScene, duration: 180 },
  { component: MockingScene, duration: 240 },
  { component: LonelyScene, duration: 210 },
  { component: NoticeScene, duration: 180 },
  { component: FriendScene, duration: 260 },
  { component: TeacherScene, duration: 270 },
  { component: StandTogetherScene, duration: 300 },
  { component: ApologyScene, duration: 240 },
  { component: CelebrationScene, duration: 180 },
  { component: MessageScene, duration: 210 },
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

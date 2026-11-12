import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

export const FPS = 24;
// Cada clip dura 10 s a 24 fps.
export const CLIP_FRAMES = 10 * FPS;
// Duración del fundido cruzado (2 s).
export const TRANSITION_FRAMES = 2 * FPS;
// Curva suave: arranca y termina despacio.
const EASE = Easing.inOut(Easing.cubic);
export const EMPALME_DURATION = CLIP_FRAMES * 2 - TRANSITION_FRAMES;

const Clip: React.FC<{
  src: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}> = ({ src, fadeIn, fadeOut }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo
        src={staticFile(src)}
        // El audio también se funde durante la transición.
        volume={(f) => {
          const inVol = fadeIn
            ? interpolate(f, [0, TRANSITION_FRAMES], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              })
            : 1;
          const outVol = fadeOut
            ? interpolate(
                f,
                [CLIP_FRAMES - TRANSITION_FRAMES, CLIP_FRAMES],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE,
                },
              )
            : 1;
          return Math.min(inVol, outVol);
        }}
      />
    </AbsoluteFill>
  );
};

export const Empalme: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={CLIP_FRAMES}>
        <Clip src="clip1.mp4" fadeOut />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({
          durationInFrames: TRANSITION_FRAMES,
          easing: EASE,
        })}
      />
      <TransitionSeries.Sequence durationInFrames={CLIP_FRAMES}>
        <Clip src="clip2.mp4" fadeIn />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

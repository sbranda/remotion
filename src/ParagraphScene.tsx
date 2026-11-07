import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SERIF } from "./fonts";
import { paletteAt } from "./palette";
import { FADE_OUT_SECONDS, TimedParagraph, revealSeconds } from "./story";

/**
 * Un párrafo que se revela palabra por palabra al ritmo de la narración,
 * se sostiene un instante y se desvanece.
 */
export const ParagraphScene: React.FC<{ paragraph: TimedParagraph }> = ({ paragraph }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = paragraph.text.split(/\s+/).filter(Boolean);
  const revealFrames = revealSeconds(paragraph) * fps;
  const perWord = revealFrames / words.length;
  const isDialogue = paragraph.text.startsWith("—");
  const color = paletteAt(paragraph.from + frame).text;

  const fadeOut = interpolate(
    frame,
    [paragraph.durationInFrames - FADE_OUT_SECONDS * fps, paragraph.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const drift = interpolate(frame, [0, paragraph.durationInFrames], [14, -14]);

  const fontSize = words.length > 50 ? 50 : words.length > 38 ? 54 : 60;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 220px" }}>
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: isDialogue ? "italic" : "normal",
          fontWeight: 500,
          fontSize,
          lineHeight: 1.42,
          color,
          margin: 0,
          maxWidth: 1400,
          textAlign: "center",
          opacity: fadeOut,
          transform: `translateY(${drift}px)`,
          textShadow: "0 2px 18px rgba(0,0,0,0.25)",
        }}
      >
        {words.map((w, i) => {
          const start = i * perWord;
          const t = interpolate(frame, [start, start + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: t,
                filter: `blur(${(1 - t) * 6}px)`,
                transform: `translateY(${(1 - t) * 10}px)`,
                whiteSpace: "pre",
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
    </AbsoluteFill>
  );
};

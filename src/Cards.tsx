import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS, SERIF } from "./fonts";
import { SUBTITLE, TITLE } from "./story";

const ease = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) } as const;

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const lineW = interpolate(frame, [10, 70], [0, 520], ease);
  const titleIn = interpolate(frame, [30, 80], [0, 1], ease);
  const subIn = interpolate(frame, [70, 110], [0, 1], ease);
  const out = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], ease);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out }}>
      <div style={{ width: lineW, height: 1, background: "#cfe3f5", opacity: 0.7, marginBottom: 48 }} />
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          fontSize: 118,
          letterSpacing: 2,
          color: "#eef4fa",
          margin: 0,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 24}px)`,
        }}
      >
        {TITLE}
      </h1>
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 300,
          fontSize: 28,
          letterSpacing: 12,
          textTransform: "uppercase",
          color: "#a9c4dc",
          marginTop: 36,
          opacity: subIn,
        }}
      >
        {SUBTITLE}
      </div>
      <div style={{ width: lineW, height: 1, background: "#cfe3f5", opacity: 0.7, marginTop: 48 }} />
    </AbsoluteFill>
  );
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inn = interpolate(frame, [0, 60], [0, 1], ease);
  const out = interpolate(frame, [durationInFrames - 45, durationInFrames], [1, 0], ease);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: inn * out }}>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 76, color: "#3a230c" }}>Fin</div>
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 300,
          fontSize: 24,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: "#5a3a18",
          marginTop: 28,
        }}
      >
        {TITLE}
      </div>
    </AbsoluteFill>
  );
};

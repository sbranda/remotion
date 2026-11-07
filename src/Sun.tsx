import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

/** El sol de la mañana: no compite, simplemente entibia. */
export const Sun: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const size = 40 + t * 70;
  const y = 30 - t * 12;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 78% ${y}%, rgba(255,250,230,${0.55 + t * 0.35}) 0%, rgba(255,214,140,${0.35 + t * 0.25}) ${size * 0.25}%, rgba(255,180,100,0) ${size}%)`,
      }}
    />
  );
};

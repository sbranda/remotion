import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * La mancha de whisky: una forma orgánica, imperfecta, que se expande
 * lentamente y nunca se ordena. Se usa dentro de una <Sequence>.
 */
export const Spill: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const grow = interpolate(frame, [0, durationInFrames * 0.7], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(frame, [0, 20, durationInFrames - 60, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cx = width * 0.5;
  const cy = height * 0.86;
  const base = 120 + grow * 520;
  const points = 64;
  const path = new Array(points + 1)
    .fill(0)
    .map((_, i) => {
      const a = (i / points) * Math.PI * 2;
      const wobble =
        1 +
        0.18 * Math.sin(a * 3 + 0.7) +
        0.11 * Math.sin(a * 7 + frame / 60) +
        0.06 * Math.sin(a * 13 - frame / 45);
      const r = base * wobble;
      // Achatada: un charco sobre la alfombra visto en perspectiva.
      const x = cx + Math.cos(a) * r * 1.35;
      const y = cy + Math.sin(a) * r * 0.32;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width={width} height={height}>
        <defs>
          <radialGradient id="amber" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="#e9a443" stopOpacity={0.75} />
            <stop offset="0.6" stopColor="#b8691c" stopOpacity={0.5} />
            <stop offset="1" stopColor="#6b3409" stopOpacity={0.15} />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation={6} />
          </filter>
        </defs>
        <path d={path} fill="url(#amber)" filter="url(#soft)" />
      </svg>
    </AbsoluteFill>
  );
};

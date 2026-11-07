import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { paletteAt } from "./palette";
import { TIMELINE } from "./story";

const crisisRange = (() => {
  const crisis = TIMELINE.filter((p) => p.mood === "crisis");
  const first = crisis[0];
  const last = crisis[crisis.length - 1];
  return { start: first.from, end: last.from + last.durationInFrames };
})();

/** Retícula de plano arquitectónico que se desplaza lentamente. */
const BlueprintGrid: React.FC<{ color: string; opacity: number; frame: number }> = ({ color, opacity, frame }) => {
  const { width, height } = useVideoConfig();
  const drift = (frame * 0.15) % 120;
  // Durante la crisis la retícula se inclina levemente: vértigo.
  const vertigo = interpolate(
    frame,
    [crisisRange.start, crisisRange.start + 120, crisisRange.end - 90, crisisRange.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const tilt = vertigo * Math.sin(frame / 70) * 1.6;
  const scale = 1 + vertigo * 0.06;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", opacity, transform: `rotate(${tilt}deg) scale(${scale})` }}
    >
      <defs>
        <pattern id="minor" width={24} height={24} patternUnits="userSpaceOnUse" x={drift} y={drift / 2}>
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={color} strokeWidth={0.5} opacity={0.5} />
        </pattern>
        <pattern id="major" width={120} height={120} patternUnits="userSpaceOnUse" x={drift} y={drift / 2}>
          <rect width={120} height={120} fill="url(#minor)" />
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={color} strokeWidth={1.2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#major)" />
      {/* Ejes de simetría: la mente de Julián */}
      <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke={color} strokeWidth={1} strokeDasharray="12 10" opacity={0.6} />
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke={color} strokeWidth={1} strokeDasharray="12 10" opacity={0.6} />
    </svg>
  );
};

/** Luces del puerto: un campo de estrellas indiferentes. */
const HarbourLights: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, height } = useVideoConfig();
  const visible = interpolate(
    frame,
    [crisisRange.start - 60, crisisRange.start + 60, crisisRange.end - 60, crisisRange.end + 90],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (visible === 0) return null;
  const lights = new Array(140).fill(0).map((_, i) => {
    const x = random(`x${i}`) * width;
    const y = height * (0.7 + random(`y${i}`) * 0.28);
    const r = 1 + random(`r${i}`) * 2.2;
    const phase = random(`p${i}`) * Math.PI * 2;
    const speed = 0.03 + random(`s${i}`) * 0.08;
    const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame * speed + phase));
    const warm = random(`c${i}`) > 0.6;
    return { x, y, r, tw, warm };
  });
  return (
    <svg width={width} height={height} style={{ position: "absolute", opacity: visible }}>
      <defs>
        <linearGradient id="horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#0b1420" stopOpacity={0.9} />
        </linearGradient>
      </defs>
      <rect x={0} y={height * 0.62} width={width} height={height * 0.38} fill="url(#horizon)" />
      {lights.map((l, i) => (
        <circle key={i} cx={l.x} cy={l.y} r={l.r} fill={l.warm ? "#ffcf8a" : "#cfe3ff"} opacity={l.tw * 0.8} />
      ))}
    </svg>
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const p = paletteAt(frame);
  const dawnFrom = TIMELINE.find((t) => t.mood === "dawn")!.from;
  const vignette = interpolate(frame, [dawnFrom - 150, dawnFrom], [0.45, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${p.top} 0%, ${p.bottom} 100%)` }}>
      <BlueprintGrid color={p.grid} opacity={p.gridOpacity} frame={frame} />
      <HarbourLights frame={frame} />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,${vignette}) 100%)` }}
      />
    </AbsoluteFill>
  );
};

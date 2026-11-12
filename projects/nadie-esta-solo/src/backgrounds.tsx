import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

export type Mood = "day" | "gloomy" | "golden";

const SKY: Record<Mood, [string, string]> = {
  day: ["#7cc6ff", "#d9f1ff"],
  gloomy: ["#7d8a99", "#b9c2cc"],
  golden: ["#ffb36b", "#ffe7b8"],
};

const Cloud: React.FC<{ x: number; y: number; s: number; color: string }> = ({
  x,
  y,
  s,
  color,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
    <ellipse cx={0} cy={0} rx={90} ry={50} />
    <ellipse cx={70} cy={-25} rx={70} ry={55} />
    <ellipse cx={140} cy={0} rx={85} ry={45} />
    <ellipse cx={60} cy={20} rx={110} ry={40} />
  </g>
);

const Tree: React.FC<{ x: number; y: number; s: number; leaf: string; dark: string }> = ({
  x,
  y,
  s,
  leaf,
  dark,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-200} width={44} height={200} rx={12} fill="#7a4d2b" />
    <circle cx={0} cy={-270} r={120} fill={dark} />
    <circle cx={-80} cy={-220} r={85} fill={leaf} />
    <circle cx={80} cy={-225} r={90} fill={leaf} />
    <circle cx={0} cy={-320} r={95} fill={leaf} />
  </g>
);

/** Stylised schoolyard; `mood` recolours the whole scene. */
export const SchoolYard: React.FC<{ mood?: Mood; rain?: boolean }> = ({
  mood = "day",
  rain = false,
}) => {
  const frame = useCurrentFrame();
  const [top, bottom] = SKY[mood];
  const grey = mood === "gloomy";
  const grass = grey ? "#7f9a7c" : mood === "golden" ? "#9cc95a" : "#8fd16a";
  const grassDark = grey ? "#6a8268" : mood === "golden" ? "#7fae45" : "#6fb84e";
  const wall = grey ? "#c9b9a8" : "#f4c48a";
  const roof = grey ? "#8a5e55" : "#d9534f";
  const leaf = grey ? "#6f8f6b" : "#5cbf5a";
  const dark = grey ? "#587455" : "#3f9d47";
  const cloud = grey ? "#9aa5b1" : "#ffffff";
  const drift = frame * 0.6;

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={top} />
            <stop offset="1" stopColor={bottom} />
          </linearGradient>
          <radialGradient id="sun">
            <stop offset="0" stopColor="#fff6c2" />
            <stop offset="0.5" stopColor="#ffe066" stopOpacity={0.9} />
            <stop offset="1" stopColor="#ffe066" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#sky)" />
        {!grey ? (
          <circle
            cx={mood === "golden" ? 1500 : 1650}
            cy={mood === "golden" ? 330 : 170}
            r={170}
            fill="url(#sun)"
          />
        ) : null}
        <Cloud x={(200 + drift) % 2200 - 200} y={150} s={1} color={cloud} />
        <Cloud x={(900 + drift * 0.7) % 2200 - 200} y={240} s={0.8} color={cloud} />
        <Cloud x={(1500 + drift * 0.5) % 2200 - 200} y={120} s={0.7} color={cloud} />
        {grey ? <Cloud x={(500 + drift * 0.4) % 2200 - 200} y={90} s={1.4} color="#8c97a3" /> : null}

        {/* Hills */}
        <ellipse cx={400} cy={760} rx={700} ry={180} fill={grassDark} opacity={0.6} />
        <ellipse cx={1600} cy={770} rx={800} ry={200} fill={grassDark} opacity={0.6} />

        {/* School building */}
        <g transform="translate(1080 250)">
          <rect x={0} y={150} width={720} height={420} fill={wall} rx={8} />
          <polygon points="-40,160 360,0 760,160" fill={roof} />
          <circle cx={360} cy={95} r={42} fill="#fff" stroke="#5b3a29" strokeWidth={6} />
          <line x1={360} y1={95} x2={360} y2={68} stroke="#5b3a29" strokeWidth={6} />
          <line x1={360} y1={95} x2={380} y2={105} stroke="#5b3a29" strokeWidth={6} />
          {[0, 1, 2, 3].map((c) =>
            [0, 1].map((r) =>
              c === 1 || c === 2 ? (
                r === 0 ? (
                  <rect key={`${c}${r}`} x={80 + c * 150} y={200} width={100} height={90} fill="#bfe6ff" stroke="#fff" strokeWidth={8} />
                ) : null
              ) : (
                <rect key={`${c}${r}`} x={80 + c * 150} y={200 + r * 150} width={100} height={90} fill="#bfe6ff" stroke="#fff" strokeWidth={8} />
              ),
            ),
          )}
          <rect x={300} y={400} width={120} height={170} fill="#8a5a3b" rx={10} />
          <text x={360} y={385} textAnchor="middle" fontFamily="Fredoka" fontWeight={600} fontSize={34} fill="#5b3a29">
            ESCUELA
          </text>
        </g>

        <Tree x={260} y={790} s={1.1} leaf={leaf} dark={dark} />
        <Tree x={880} y={780} s={0.8} leaf={leaf} dark={dark} />

        {/* Ground */}
        <rect x={0} y={760} width={1920} height={320} fill={grass} />
        <path d="M0 900 Q 960 840 1920 900 L1920 1080 L0 1080 Z" fill={grey ? "#b4aa9b" : "#e8d3a8"} />
        {/* Fence */}
        {new Array(24).fill(0).map((_, i) => (
          <rect key={i} x={i * 84} y={705} width={18} height={70} rx={6} fill={grey ? "#e4e1db" : "#ffffff"} />
        ))}
        <rect x={0} y={720} width={1920} height={12} fill={grey ? "#e4e1db" : "#ffffff"} />
        <rect x={0} y={750} width={1920} height={12} fill={grey ? "#e4e1db" : "#ffffff"} />
      </svg>
      {mood === "golden" ? (
        <AbsoluteFill style={{ background: "rgba(255,170,80,0.12)" }} />
      ) : null}
      {grey ? <AbsoluteFill style={{ background: "rgba(40,60,90,0.18)" }} /> : null}
      {rain ? <Rain /> : null}
    </AbsoluteFill>
  );
};

const Rain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        {new Array(120).fill(0).map((_, i) => {
          const x = random(`rx${i}`) * 1960;
          const y = ((random(`ry${i}`) * 1200 + frame * 28) % 1200) - 100;
          return (
            <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="rgba(220,235,255,0.55)" strokeWidth={3} />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Teacher's classroom. */
export const Classroom: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <rect width={1920} height={1080} fill="#f6e3c3" />
      <rect y={0} width={1920} height={60} fill="#e9cfa5" />
      {/* Window */}
      <rect x={120} y={170} width={420} height={360} rx={14} fill="#a9dcff" stroke="#fff" strokeWidth={18} />
      <line x1={330} y1={170} x2={330} y2={530} stroke="#fff" strokeWidth={14} />
      <line x1={120} y1={350} x2={540} y2={350} stroke="#fff" strokeWidth={14} />
      <circle cx={460} cy={240} r={40} fill="#ffe066" />
      {/* Chalkboard */}
      <rect x={720} y={150} width={980} height={430} rx={14} fill="#2f5d4a" stroke="#8a5a3b" strokeWidth={22} />
      <text x={1210} y={290} textAnchor="middle" fontFamily="Fredoka" fontWeight={600} fontSize={96} fill="#f3f3ea">
        Respeto
      </text>
      <text x={1210} y={390} textAnchor="middle" fontFamily="Fredoka" fontWeight={500} fontSize={56} fill="#f3f3ea" opacity={0.85}>
        Aquí todos cuentan
      </text>
      <rect x={760} y={585} width={900} height={20} fill="#8a5a3b" />
      {/* Floor */}
      <rect y={760} width={1920} height={320} fill="#c88f5a" />
      {new Array(10).fill(0).map((_, i) => (
        <line key={i} x1={0} y1={790 + i * 32} x2={1920} y2={790 + i * 32} stroke="#b47c4a" strokeWidth={4} />
      ))}
      <rect y={748} width={1920} height={16} fill="#9c6a3f" />
      {/* Desk */}
      <rect x={1380} y={690} width={440} height={34} rx={8} fill="#9c6a3f" />
      <rect x={1400} y={724} width={30} height={170} fill="#7a4d2b" />
      <rect x={1770} y={724} width={30} height={170} fill="#7a4d2b" />
      <circle cx={1700} cy={668} r={24} fill="#e94f37" />
      <rect x={1440} y={655} width={110} height={36} rx={4} fill="#4c7bd9" />
    </svg>
  </AbsoluteFill>
);

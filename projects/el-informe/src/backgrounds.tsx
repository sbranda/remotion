import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "./components";

export type Time = "morning" | "afternoon" | "evening" | "night" | "dawn";

const SKY: Record<Time, [string, string]> = {
  morning: ["#8ecdf7", "#e3f4ff"],
  afternoon: ["#79b8ea", "#fde7c4"],
  evening: ["#f08a5d", "#f9d29d"],
  night: ["#0f1a3a", "#2a3a6b"],
  dawn: ["#f6b8a8", "#fbe3c2"],
};

const WALL: Record<Time, string> = {
  morning: "#eef1f4",
  afternoon: "#f2eee8",
  evening: "#efe2d6",
  night: "#3a4260",
  dawn: "#f1e6e0",
};

const Skyline: React.FC<{ time: Time; x: number; y: number; w: number; h: number }> = ({
  time,
  x,
  y,
  w,
  h,
}) => {
  const night = time === "night";
  const b = night ? "#1d2645" : "#9fb3c8";
  const b2 = night ? "#26305a" : "#b9c8d8";
  const buildings = [
    [0, 0.45, 0.12], [0.11, 0.3, 0.1], [0.2, 0.55, 0.09], [0.3, 0.2, 0.12],
    [0.43, 0.4, 0.08], [0.52, 0.15, 0.1], [0.63, 0.5, 0.11], [0.75, 0.28, 0.1],
    [0.86, 0.42, 0.14],
  ];
  return (
    <g>
      {buildings.map(([bx, top, bw], i) => (
        <g key={i}>
          <rect
            x={x + bx * w}
            y={y + top * h}
            width={bw * w}
            height={h * (1 - top)}
            fill={i % 2 ? b : b2}
          />
          {new Array(6).fill(0).map((_, r) =>
            new Array(3).fill(0).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + bx * w + 10 + c * ((bw * w - 20) / 3)}
                y={y + top * h + 14 + r * 34}
                width={12}
                height={16}
                fill={night ? ((r + c + i) % 3 ? "#ffd86b" : "#3a4470") : "#dfe8f2"}
                opacity={y + top * h + 14 + r * 34 < y + h - 10 ? 1 : 0}
              />
            )),
          )}
        </g>
      ))}
    </g>
  );
};

const Plant: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-45 0 L45 0 L35 90 L-35 90 Z" fill="#c8794b" />
    {[-60, -30, 0, 30, 60].map((a, i) => (
      <ellipse
        key={i}
        cx={0}
        cy={-70}
        rx={22}
        ry={80}
        fill={i % 2 ? "#4f9d69" : "#3f8a5a"}
        transform={`rotate(${a} 0 0)`}
      />
    ))}
  </g>
);

const WallClock: React.FC<{ x: number; y: number; hour: number }> = ({ x, y, hour }) => {
  const h = ((hour % 12) / 12) * 360;
  const m = ((hour % 1) * 360);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={52} fill="#fff" stroke="#3a3a48" strokeWidth={8} />
      <line x1={0} y1={0} x2={0} y2={-28} stroke="#3a3a48" strokeWidth={7} strokeLinecap="round" transform={`rotate(${h})`} />
      <line x1={0} y1={0} x2={0} y2={-40} stroke="#3a3a48" strokeWidth={4} strokeLinecap="round" transform={`rotate(${m})`} />
      <circle r={5} fill="#3a3a48" />
    </g>
  );
};

/** Open-plan office with a big window. */
export const Office: React.FC<{ time?: Time; hour?: number; hourTo?: number; dur?: number; clock?: boolean }> = ({
  clock = true,
  time = "morning",
  hour = 9,
  hourTo,
  dur = 1,
}) => {
  const frame = useCurrentFrame();
  const [top, bottom] = SKY[time];
  const night = time === "night";
  const hr = hourTo === undefined ? hour : interpolate(frame, [0, dur], [hour, hourTo], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="osky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={top} />
            <stop offset="1" stopColor={bottom} />
          </linearGradient>
          <linearGradient id="ofloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={night ? "#3b3550" : "#cdb79e"} />
            <stop offset="1" stopColor={night ? "#2a2540" : "#b39c83"} />
          </linearGradient>
        </defs>
        <rect width={1920} height={1080} fill={WALL[time]} />
        {/* Window */}
        <rect x={980} y={110} width={880} height={600} fill="url(#osky)" />
        <Skyline time={time} x={980} y={330} w={880} h={380} />
        {night ? <circle cx={1720} cy={200} r={44} fill="#f4f0d0" /> : null}
        {[1200, 1420, 1640].map((x) => (
          <rect key={x} x={x} y={110} width={14} height={600} fill={night ? "#59607e" : "#ffffff"} />
        ))}
        <rect x={970} y={100} width={900} height={620} fill="none" stroke={night ? "#59607e" : "#ffffff"} strokeWidth={20} />
        {/* Shelf + wall elements */}
        <rect x={110} y={250} width={420} height={18} fill={night ? "#5c5470" : "#9a7a5d"} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={130 + i * 34} y={170 + (i % 3) * 8} width={26} height={80 - (i % 3) * 8} fill={["#e76f51", "#2a9d8f", "#e9c46a", "#264653", "#f4a261", "#8ab17d"][i]} opacity={night ? 0.6 : 1} />
        ))}
        {clock ? <WallClock x={700} y={210} hour={hr} /> : null}
        <rect x={120} y={360} width={300} height={200} rx={10} fill={night ? "#4a5274" : "#ffffff"} stroke={night ? "#5c5470" : "#d5dae0"} strokeWidth={6} />
        <path d="M150 520 L210 470 L260 495 L320 420 L390 440" stroke="#2a9d8f" strokeWidth={8} fill="none" opacity={night ? 0.6 : 1} />
        <text x={270} y={400} textAnchor="middle" fontFamily="Fredoka" fontWeight={600} fontSize={28} fill={night ? "#aab" : "#555"}>
          OBJETIVOS Q4
        </text>
        {/* Floor */}
        <rect y={800} width={1920} height={280} fill="url(#ofloor)" />
        <rect y={792} width={1920} height={12} fill={night ? "#2b2640" : "#a68b70"} />
        <Plant x={60} y={720} s={1.1} />
        <Plant x={1880} y={720} s={1} />
      </svg>
      {night ? <AbsoluteFill style={{ background: "rgba(10,15,40,0.15)" }} /> : null}
    </AbsoluteFill>
  );
};

/** Foreground desk that hides legs of characters standing behind it. */
export const Desk: React.FC<{ x: number; w: number; top?: number; monitor?: boolean; night?: boolean; glow?: boolean }> = ({
  x,
  w,
  top = 760,
  monitor = true,
  night = false,
  glow = false,
}) => (
  <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}>
    {monitor ? (
      <g>
        <rect x={x + w * 0.62} y={top - 230} width={300} height={190} rx={12} fill="#2c2f3a" />
        <rect x={x + w * 0.62 + 12} y={top - 218} width={276} height={166} rx={6} fill={glow ? "#cfe8ff" : "#4b6a8a"} />
        <rect x={x + w * 0.62 + 135} y={top - 40} width={30} height={40} fill="#2c2f3a" />
        <rect x={x + w * 0.62 + 90} y={top - 6} width={120} height={8} rx={4} fill="#2c2f3a" />
      </g>
    ) : null}
    <rect x={x} y={top} width={w} height={34} rx={8} fill={night ? "#6b5a4e" : "#d9b48a"} />
    <rect x={x + 10} y={top + 34} width={w - 20} height={1080 - top} fill={night ? "#4f4239" : "#b8916a"} />
    <rect x={x + 30} y={top + 70} width={w - 60} height={6} rx={3} fill="rgba(0,0,0,0.12)" />
    <rect x={x + 30} y={top + 160} width={w - 60} height={6} rx={3} fill="rgba(0,0,0,0.12)" />
  </svg>
);

/** Break room at night with a counter in front. */
export const BreakRoom: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <rect width={1920} height={1080} fill="#2f3654" />
      {/* Tiles */}
      {new Array(12).fill(0).map((_, i) => (
        <line key={i} x1={0} y1={420 + i * 30} x2={1920} y2={420 + i * 30} stroke="#384064" strokeWidth={3} />
      ))}
      {/* Window */}
      <rect x={760} y={120} width={420} height={300} fill="#101a3a" stroke="#4e567a" strokeWidth={16} />
      <circle cx={1100} cy={190} r={36} fill="#f4f0d0" />
      <Skyline time="night" x={760} y={250} w={420} h={170} />
      {/* Fridge & coffee machine */}
      <rect x={1540} y={260} width={240} height={560} rx={16} fill="#c9ced8" />
      <rect x={1550} y={450} width={220} height={6} fill="#a7adb9" />
      <rect x={1740} y={300} width={12} height={110} rx={6} fill="#8b92a0" />
      <rect x={300} y={330} width={160} height={210} rx={14} fill="#3a3f4b" />
      <rect x={325} y={360} width={110} height={60} rx={6} fill="#8fd3ff" opacity={0.6} />
      <circle cx={380} cy={480} r={18} fill="#e76f51" />
      {/* Lamp */}
      <line x1={960} y1={0} x2={960} y2={60} stroke="#888" strokeWidth={6} />
      <path d="M900 60 L1020 60 L990 110 L930 110 Z" fill="#e9c46a" />
      <ellipse cx={960} cy={560} rx={520} ry={420} fill="rgba(255,220,140,0.08)" />
      <rect y={800} width={1920} height={280} fill="#262a40" />
    </svg>
  </AbsoluteFill>
);

export const Counter: React.FC<{ x: number; w: number; top?: number }> = ({ x, w, top = 740 }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}>
    <rect x={x} y={top} width={w} height={36} rx={6} fill="#d8d2c8" />
    <rect x={x + 8} y={top + 36} width={w - 16} height={1080 - top} fill="#7a5c48" />
    {new Array(Math.floor(w / 220)).fill(0).map((_, i) => (
      <g key={i}>
        <rect x={x + 30 + i * 220} y={top + 70} width={190} height={240} rx={8} fill="#6a4f3d" />
        <rect x={x + 110 + i * 220} y={top + 90} width={30} height={8} rx={4} fill="#c9ced8" />
      </g>
    ))}
  </svg>
);

/** Meeting room with a projection screen; `children` render on the screen. */
export const MeetingRoom: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <rect width={1920} height={1080} fill="#e8ebf0" />
      <rect x={0} y={0} width={1920} height={70} fill="#d5dae2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={140 + i * 360} y={20} width={200} height={20} rx={10} fill="#fffbe8" />
      ))}
      <rect y={800} width={1920} height={280} fill="#9aa3b5" />
      <rect y={792} width={1920} height={12} fill="#7e879a" />
      <rect x={70} y={120} width={130} height={620} fill="#b8c7d9" />
      <rect x={1720} y={120} width={130} height={620} fill="#b8c7d9" />
    </svg>
    <div
      style={{
        position: "absolute",
        left: 560,
        top: 110,
        width: 1000,
        height: 560,
        background: "white",
        borderRadius: 12,
        border: "14px solid #3a3f4b",
        boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

export const MeetingTable: React.FC = () => (
  <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}>
    <path d="M260 860 L1660 860 L1820 1080 L100 1080 Z" fill="#6d5443" />
    <rect x={260} y={846} width={1400} height={20} rx={8} fill="#8a6a55" />
    <rect x={500} y={880} width={120} height={80} rx={6} fill="#f4f1ea" transform="rotate(-6 560 920)" />
    <rect x={1260} y={890} width={140} height={14} rx={7} fill="#2c2f3a" />
    <circle cx={980} cy={900} r={26} fill="#3a3f4b" />
  </svg>
);

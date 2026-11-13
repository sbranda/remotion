import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FONT = "Fredoka, sans-serif";
export const FLOOR = 1000;
export const INK = "#2d2a32";
export const LAURA = "#2a9d8f";
export const DANIEL = "#3d5a80";
export const BOSS = "#b5523b";

/** Native pixel heights of every sprite, so all poses share one scale. */
const NATIVE: Record<string, number> = {
  "m-angry": 488, "m-explain": 636, "m-idle": 708, "m-laugh": 630, "m-lean": 702,
  "m-sit-think": 556, "m-sit": 556, "m-speak": 630, "m-thumbs": 706, "m-walk1": 696,
  "m-walk2": 694, "m-water": 484, "w-angry": 488, "w-coffee": 482, "w-cross": 612,
  "w-cry": 482, "w-dance": 634, "w-idle": 684, "w-laugh": 614, "w-point": 692,
  "w-sit-think": 548, "w-sit": 548, "w-speak": 618, "w-stretch": 566, "w-think": 550,
  "w-walk1": 696, "w-walk2": 690, "w-wave": 678,
};

export const SCALE = 0.93;

type Enter = "none" | "left" | "right" | "pop" | "fade" | "up";

/**
 * One pose of a character. `x` is the horizontal centre and `y` the line the
 * bottom of the sprite rests on.
 */
export const Character: React.FC<{
  pose: string;
  x: number;
  y?: number;
  scale?: number;
  flip?: boolean;
  enter?: Enter;
  delay?: number;
  bob?: boolean;
  shadow?: boolean;
  tint?: string;
  lift?: number;
}> = ({
  pose,
  x,
  y = FLOOR,
  scale = SCALE,
  flip = false,
  enter = "none",
  delay = 0,
  bob = true,
  shadow = true,
  tint,
  lift = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const h = (NATIVE[pose] ?? 680) * scale;
  const p =
    enter === "none" ? 1 : spring({ frame: frame - delay, fps, config: { damping: 15 } });
  let dx = 0;
  let dy = 0;
  let s = 1;
  let alpha = 1;
  if (enter === "left") dx = interpolate(p, [0, 1], [-900, 0]);
  if (enter === "right") dx = interpolate(p, [0, 1], [900, 0]);
  if (enter === "up") dy = interpolate(p, [0, 1], [500, 0]);
  if (enter === "pop") s = p;
  if (enter === "fade") alpha = Math.min(1, p);
  const breathe = bob ? 1 + Math.sin((frame + x) / 16) * 0.01 : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x + dx,
        top: y - h + dy - lift,
        height: h,
        transform: `translateX(-50%) scale(${s})`,
        transformOrigin: "50% 100%",
        opacity: frame < delay && enter !== "none" ? 0 : alpha,
      }}
    >
      {shadow ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -12 + lift,
            width: h * 0.36,
            height: 28,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.2)",
            filter: "blur(5px)",
          }}
        />
      ) : null}
      <Img
        src={staticFile(`sprites/${pose}.png`)}
        style={{
          height: h,
          display: "block",
          transform: `scaleX(${flip ? -1 : 1}) scaleY(${breathe})`,
          transformOrigin: "50% 100%",
          filter: tint,
        }}
      />
    </div>
  );
};

/** Switches pose over time: [[fromFrame, pose], ...]. */
export const usePose = (timeline: [number, string][]) => {
  const frame = useCurrentFrame();
  let pose = timeline[0][1];
  for (const [f, p] of timeline) if (frame >= f) pose = p;
  return pose;
};

export const Walker: React.FC<{
  who: "w" | "m";
  from: number;
  to: number;
  start: number;
  end: number;
  stand: string;
  flip?: boolean;
  tint?: string;
}> = ({ who, from, to, start, end, stand, flip, tint }) => {
  const frame = useCurrentFrame();
  const walking = frame >= start && frame < end;
  const x = interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step = Math.floor(frame / 8) % 2;
  const lift = walking ? Math.abs(Math.sin((frame * Math.PI) / 8)) * 8 : 0;
  return (
    <Character
      pose={walking ? `${who}-walk${step + 1}` : stand}
      x={x}
      lift={lift}
      flip={flip}
      bob={!walking}
      tint={tint}
    />
  );
};

/** Speech / thought bubble whose tail tip sits at (x, y). */
export const Bubble: React.FC<{
  x: number;
  y: number;
  from: number;
  to?: number;
  side?: "left" | "right";
  thought?: boolean;
  width?: number;
  name?: string;
  color?: string;
  children: React.ReactNode;
}> = ({
  x,
  y,
  from,
  to = 99999,
  side = "left",
  thought = false,
  width = 560,
  name,
  color = INK,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame > to + 8) return null;
  const pin = spring({ frame: frame - from, fps, config: { damping: 13 } });
  const out = interpolate(frame, [to, to + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = pin * out;
  const left = side === "left" ? x - 60 : x - width + 60;
  return (
    <div
      style={{
        position: "absolute",
        left,
        bottom: 1080 - y + 44,
        width,
        transform: `scale(${s})`,
        transformOrigin: side === "left" ? "60px 120%" : `${width - 60}px 120%`,
        opacity: s,
        zIndex: 10,
      }}
    >
      {name ? (
        <div
          style={{
            position: "absolute",
            top: -26,
            [side === "left" ? "left" : "right"]: 30,
            background: color,
            color: "white",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 26,
            padding: "4px 18px",
            borderRadius: 14,
            zIndex: 2,
          }}
        >
          {name}
        </div>
      ) : null}
      <div
        style={{
          background: thought ? "#f7f4ff" : "white",
          borderRadius: thought ? 70 : 34,
          padding: "26px 34px",
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1.22,
          color: INK,
          border: `5px solid ${color}`,
          boxShadow: "0 10px 0 rgba(0,0,0,0.12)",
          textAlign: "center",
          fontStyle: thought ? "italic" : "normal",
        }}
      >
        {children}
      </div>
      {thought ? (
        <>
          <Dot size={32} left={side === "left" ? 40 : width - 72} bottom={-40} color={color} />
          <Dot size={18} left={side === "left" ? 24 : width - 42} bottom={-68} color={color} />
        </>
      ) : (
        <svg
          width={60}
          height={48}
          style={{
            position: "absolute",
            left: side === "left" ? 36 : width - 96,
            bottom: -42,
            transform: side === "right" ? "scaleX(-1)" : undefined,
          }}
        >
          <path d="M4 0 L24 44 L52 0" fill="white" stroke={color} strokeWidth={5} />
          <rect x={0} y={0} width={60} height={5} fill="white" />
        </svg>
      )}
    </div>
  );
};

const Dot: React.FC<{ size: number; left: number; bottom: number; color: string }> = ({
  size,
  left,
  bottom,
  color,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      bottom,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#f7f4ff",
      border: `5px solid ${color}`,
    }}
  />
);

/** Narrator caption at the top of the frame. */
export const Narration: React.FC<{ from?: number; to: number; children: React.ReactNode }> = ({
  from = 0,
  to,
  children,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 12, to - 12, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (o <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 40 + (1 - o) * -20,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 1560,
        padding: "16px 40px",
        borderRadius: 26,
        background: "rgba(25, 28, 40, 0.8)",
        color: "#f4f1ea",
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 42,
        textAlign: "center",
        lineHeight: 1.25,
        opacity: o,
        whiteSpace: "pre-line",
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};

/** Card that springs in, used for documents, emails and screens. */
export const PopCard: React.FC<{
  from: number;
  to?: number;
  x: number;
  y: number;
  width: number;
  children: React.ReactNode;
  rotate?: number;
}> = ({ from, to = 99999, x, y, width, children, rotate = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame > to + 10) return null;
  const p = spring({ frame: frame - from, fps, config: { damping: 14 } });
  const out = interpolate(frame, [to, to + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        transform: `translateY(${(1 - p) * 120}px) scale(${0.85 + 0.15 * p}) rotate(${rotate}deg)`,
        opacity: p * out,
        zIndex: 15,
      }}
    >
      {children}
    </div>
  );
};

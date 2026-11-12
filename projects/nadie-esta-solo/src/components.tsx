import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FONT = "Fredoka, sans-serif";
export const GROUND_Y = 960;

export const sprite = (name: string) => staticFile(`sprites/${name}.png`);

type Enter = "none" | "left" | "right" | "pop" | "fade";

/**
 * A character standing on the ground. `x` is the horizontal centre, `y` is the
 * line the feet rest on, `h` the rendered height in px.
 */
export const Character: React.FC<{
  src: string;
  x: number;
  y?: number;
  h: number;
  flip?: boolean;
  enter?: Enter;
  delay?: number;
  bob?: boolean;
  opacity?: number;
  shadow?: boolean;
  tint?: string;
}> = ({
  src,
  x,
  y = GROUND_Y,
  h,
  flip = false,
  enter = "none",
  delay = 0,
  bob = true,
  opacity = 1,
  shadow = true,
  tint,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p =
    enter === "none"
      ? 1
      : spring({ frame: frame - delay, fps, config: { damping: 14 } });

  let dx = 0;
  let scale = 1;
  let alpha = opacity;
  if (enter === "left") dx = interpolate(p, [0, 1], [-700, 0]);
  if (enter === "right") dx = interpolate(p, [0, 1], [700, 0]);
  if (enter === "pop") scale = p;
  if (enter === "fade") alpha *= Math.min(1, p);

  // Gentle "breathing" so still poses feel alive.
  const breathe = bob ? 1 + Math.sin((frame + x) / 14) * 0.012 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x + dx,
        top: y - h,
        height: h,
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "50% 100%",
        opacity: frame < delay && enter !== "none" ? 0 : alpha,
      }}
    >
      {shadow ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -14,
            width: h * 0.42,
            height: 26,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.22)",
            filter: "blur(4px)",
          }}
        />
      ) : null}
      <Img
        src={src}
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

/** Walk cycle between two frames, moving from `from` to `to` over [start, end]. */
export const Walker: React.FC<{
  frames: [string, string];
  from: number;
  to: number;
  start: number;
  end: number;
  h: number;
  y?: number;
  flip?: boolean;
  stand?: string;
  tint?: string;
}> = ({ frames, from, to, start, end, h, y = GROUND_Y, flip, stand, tint }) => {
  const frame = useCurrentFrame();
  const walking = frame >= start && frame < end;
  const x = interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step = Math.floor(frame / 7) % 2;
  const lift = walking ? Math.abs(Math.sin((frame * Math.PI) / 7)) * 10 : 0;
  const src = walking || !stand ? frames[step] : stand;
  return (
    <Character
      src={src}
      x={x}
      y={y - lift}
      h={h}
      flip={flip}
      bob={!walking}
      tint={tint}
    />
  );
};

/** Comic speech (or thought) bubble anchored by its tail tip at (x, y). */
export const Bubble: React.FC<{
  x: number;
  y: number;
  from: number;
  to?: number;
  side?: "left" | "right";
  thought?: boolean;
  width?: number;
  children: React.ReactNode;
}> = ({ x, y, from, to = 99999, side = "left", thought = false, width = 520, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame > to + 8) return null;
  const pin = spring({ frame: frame - from, fps, config: { damping: 12 } });
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
        bottom: 1080 - y + 46,
        width,
        transform: `scale(${s})`,
        transformOrigin: side === "left" ? "60px 120%" : `${width - 60}px 120%`,
        opacity: s,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: thought ? 80 : 40,
          padding: "26px 36px",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.2,
          color: "#3b2a1a",
          border: "5px solid #3b2a1a",
          boxShadow: "0 10px 0 rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        {children}
      </div>
      {thought ? (
        <>
          <Dot size={34} left={side === "left" ? 40 : width - 74} bottom={-40} />
          <Dot size={20} left={side === "left" ? 22 : width - 42} bottom={-70} />
        </>
      ) : (
        <svg
          width={60}
          height={50}
          style={{
            position: "absolute",
            left: side === "left" ? 36 : width - 96,
            bottom: -44,
            transform: side === "right" ? "scaleX(-1)" : undefined,
          }}
        >
          <path d="M4 0 L24 46 L52 0" fill="white" stroke="#3b2a1a" strokeWidth={5} />
          <rect x={0} y={0} width={60} height={5} fill="white" />
        </svg>
      )}
    </div>
  );
};

const Dot: React.FC<{ size: number; left: number; bottom: number }> = ({
  size,
  left,
  bottom,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      bottom,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "white",
      border: "5px solid #3b2a1a",
    }}
  />
);

/** Narrator caption at the top of the frame. */
export const Narration: React.FC<{
  from?: number;
  to: number;
  children: React.ReactNode;
}> = ({ from = 0, to, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 12, to - 12, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dy = interpolate(o, [0, 1], [-20, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 48 + dy,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 1500,
        padding: "18px 42px",
        borderRadius: 28,
        background: "rgba(40, 24, 12, 0.72)",
        color: "#fff7e8",
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 46,
        textAlign: "center",
        lineHeight: 1.25,
        opacity: o,
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </div>
  );
};

/** Deterministic falling confetti. */
export const Confetti: React.FC<{ count?: number }> = ({ count = 90 }) => {
  const frame = useCurrentFrame();
  const colors = ["#ff5d73", "#ffd23f", "#3bceac", "#7b5cff", "#4cc9f0", "#ff9f1c"];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const x0 = random(`x${i}`) * 1920;
        const speed = 3 + random(`s${i}`) * 4;
        const delay = random(`d${i}`) * 60;
        const y = -40 + (frame - delay) * speed;
        const sway = Math.sin((frame + i * 13) / 12) * 30;
        const rot = (frame + i * 20) * (4 + random(`r${i}`) * 6);
        if (y < -40 || y > 1120) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x0 + sway,
              top: y,
              width: 16,
              height: 26,
              borderRadius: 4,
              background: colors[i % colors.length],
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

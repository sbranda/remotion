import { interpolate, interpolateColors } from "remotion";
import { Mood, TIMELINE, TITLE_SECONDS, FPS, END_FROM } from "./story";

type Palette = {
  top: string;
  bottom: string;
  grid: string;
  text: string;
  gridOpacity: number;
};

export const PALETTES: Record<Mood, Palette> = {
  cold: { top: "#0a1520", bottom: "#1c2e3f", grid: "#7fb2e0", text: "#e8f0f7", gridOpacity: 0.32 },
  tension: { top: "#0b0f15", bottom: "#232933", grid: "#93a6ba", text: "#e2e6ea", gridOpacity: 0.22 },
  crisis: { top: "#030405", bottom: "#100e0d", grid: "#4a525c", text: "#d9d6d2", gridOpacity: 0.1 },
  release: { top: "#100a05", bottom: "#2c1a0a", grid: "#8a6a40", text: "#f1e3cc", gridOpacity: 0.04 },
  dawn: { top: "#f6dfae", bottom: "#f2a65e", grid: "#ffffff", text: "#2a1a0c", gridOpacity: 0 },
};

/** Fotogramas clave: cada párrafo fija su paleta al llegar a su punto medio. */
const keyframes: { frame: number; mood: Mood }[] = [
  { frame: 0, mood: "cold" },
  ...TIMELINE.map((p) => ({ frame: p.from + Math.round(p.durationInFrames * 0.3), mood: p.mood })),
  { frame: END_FROM + TITLE_SECONDS * FPS, mood: "dawn" },
];

// Elimina claves redundantes (mismo estado consecutivo) para transiciones largas y suaves.
const compact = keyframes.filter((k, i) => i === 0 || keyframes[i - 1].mood !== k.mood || i === keyframes.length - 1);
// Cada cambio de ánimo se funde durante ~5 segundos antes del párrafo que lo introduce.
const frames: number[] = [];
const moods: Mood[] = [];
compact.forEach((k, i) => {
  if (i > 0 && compact[i - 1].mood !== k.mood) {
    const start = Math.max(frames[frames.length - 1] + 1, k.frame - 5 * FPS);
    frames.push(start);
    moods.push(compact[i - 1].mood);
  }
  if (frames.length === 0 || k.frame > frames[frames.length - 1]) {
    frames.push(k.frame);
    moods.push(k.mood);
  }
});

const pick = <K extends keyof Palette>(key: K) => moods.map((m) => PALETTES[m][key]);

export const paletteAt = (frame: number): Palette => {
  const opts = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  return {
    top: interpolateColors(frame, frames, pick("top") as string[]),
    bottom: interpolateColors(frame, frames, pick("bottom") as string[]),
    grid: interpolateColors(frame, frames, pick("grid") as string[]),
    text: interpolateColors(frame, frames, pick("text") as string[]),
    gridOpacity: interpolate(frame, frames, pick("gridOpacity") as number[], opts),
  };
};

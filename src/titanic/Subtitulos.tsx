import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export type Subtitulo = { desde: number; hasta: number; texto: string };

export const Subtitulos: React.FC<{ subtitulos: Subtitulo[] }> = ({ subtitulos }) => {
  const frame = useCurrentFrame();
  const actual = subtitulos.find((s) => frame >= s.desde && frame < s.hasta);
  if (!actual) return null;

  const opacidad = interpolate(
    frame,
    [actual.desde, actual.desde + 8, actual.hasta - 8, actual.hasta],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 300,
        paddingLeft: 70,
        paddingRight: 70,
      }}
    >
      <div
        style={{
          opacity: opacidad,
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: 18,
          padding: "22px 34px",
          color: "#fff8e8",
          fontFamily: "Georgia, serif",
          fontSize: 56,
          lineHeight: 1.3,
          textAlign: "center",
          textShadow: "0 2px 8px black",
        }}
      >
        {actual.texto}
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from "remotion";

// Capa de grano, rayas y viñeta que da aspecto de película de principios del siglo XX.
export const EfectoPelicula: React.FC = () => {
  const frame = useCurrentFrame();
  const parpadeo = 0.06 + random(`p${frame}`) * 0.08;
  const raya = random(`r${Math.floor(frame / 4)}`);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.22 }}>
        <filter id={`grano-${frame}`}>
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={frame} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={1080} height={1920} filter={`url(#grano-${frame})`} />
      </svg>
      {raya > 0.55 ? (
        <div
          style={{
            position: "absolute",
            left: raya * 1080,
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(255,255,255,0.25)",
          }}
        />
      ) : null}
      <AbsoluteFill style={{ background: "black", opacity: parpadeo }} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Foto con tono sepia y zoom lento (efecto Ken Burns).
export const FotoAntigua: React.FC<{
  archivo: string;
  duracion: number;
  desde?: number;
  hasta?: number;
  origen?: string;
}> = ({ archivo, duracion, desde = 1.05, hasta = 1.2, origen = "50% 35%" }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, duracion], [desde, hasta]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a120a" }}>
      <Img
        src={staticFile(`titanic/${archivo}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
          transformOrigin: origen,
          filter: "grayscale(1) sepia(0.85) contrast(1.15) brightness(0.9)",
        }}
      />
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Altura del horizonte (en px, sobre 1920 de alto).
export const HORIZONTE = 1180;

export const Cielo: React.FC<{ tinte?: string }> = ({ tinte = "#0b1a33" }) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #01030a 0%, ${tinte} ${(HORIZONTE / 1920) * 100}%, #01030a 100%)`,
      }}
    />
  );
};

export const Estrellas: React.FC<{ cantidad?: number }> = ({ cantidad = 140 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {new Array(cantidad).fill(0).map((_, i) => {
        const x = random(`x${i}`) * 1080;
        const y = random(`y${i}`) * (HORIZONTE - 80);
        const r = 1 + random(`r${i}`) * 2.2;
        const brillo = 0.4 + 0.6 * Math.abs(Math.sin(frame / 20 + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r,
              height: r,
              borderRadius: "50%",
              background: "white",
              opacity: brillo,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Oceano: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const olas = new Array(9).fill(0).map((_, i) => {
    const y = HORIZONTE + 20 + i * i * 9;
    const amplitud = 3 + i * 1.5;
    const desplazamiento = frame * (0.6 + i * 0.25);
    let d = `M 0 ${y}`;
    for (let x = 0; x <= width; x += 20) {
      d += ` L ${x} ${y + Math.sin((x + desplazamiento) / (40 + i * 8)) * amplitud}`;
    }
    return { d, opacidad: 0.12 + i * 0.03 };
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: HORIZONTE,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #0c1f38 0%, #02060f 100%)",
        }}
      />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {olas.map((o, i) => (
          <path
            key={i}
            d={o.d}
            stroke="#8fb3d9"
            strokeWidth={2}
            fill="none"
            opacity={o.opacidad}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Silueta del RMS Titanic. Ancho base 1000, alto 300; la línea de flotación está en y=235.
export const Barco: React.FC<{ luces?: number }> = ({ luces = 1 }) => {
  const frame = useCurrentFrame();
  const chimeneas = [290, 410, 530, 650];
  const ojos = new Array(38).fill(0).map((_, i) => 110 + i * 21);
  return (
    <svg viewBox="0 0 1000 300" width={1000} height={300}>
      {/* mástiles y cables */}
      <line x1={120} y1={150} x2={130} y2={0} stroke="#2b2b2b" strokeWidth={4} />
      <line x1={880} y1={150} x2={870} y2={10} stroke="#2b2b2b" strokeWidth={4} />
      <line x1={130} y1={0} x2={870} y2={10} stroke="#2b2b2b" strokeWidth={1.5} />
      {/* chimeneas */}
      {chimeneas.map((x, i) => (
        <g key={x} transform={`skewX(-8)`}>
          <rect x={x + 20} y={20} width={46} height={105} fill="#c89a55" />
          <rect x={x + 20} y={20} width={46} height={22} fill="#111" />
          {i < 3 ? (
            <circle
              cx={x + 50 - 30 * Math.sin(frame / 30)}
              cy={5 - ((frame + i * 17) % 40)}
              r={14 + ((frame + i * 17) % 40) / 3}
              fill="#555"
              opacity={0.25 * (1 - ((frame + i * 17) % 40) / 40)}
            />
          ) : null}
        </g>
      ))}
      {/* superestructura */}
      <rect x={210} y={118} width={600} height={34} fill="#e9e4d8" />
      <rect x={250} y={104} width={520} height={16} fill="#e9e4d8" />
      {/* casco */}
      <path d="M 40 150 L 960 150 L 930 235 L 90 235 Q 55 200 40 150 Z" fill="#0d0d0d" />
      <path d="M 90 235 L 930 235 L 925 250 L 98 250 Z" fill="#7a1f1a" />
      <rect x={60} y={150} width={890} height={6} fill="#e9e4d8" />
      {/* ojos de buey iluminados */}
      {ojos.map((x, i) => (
        <React.Fragment key={x}>
          <circle cx={x} cy={175} r={3} fill="#ffd27a" opacity={luces * (0.7 + 0.3 * random(`a${i}`))} />
          <circle cx={x + 10} cy={198} r={3} fill="#ffd27a" opacity={luces * (0.6 + 0.4 * random(`b${i}`))} />
        </React.Fragment>
      ))}
      {new Array(28).fill(0).map((_, i) => (
        <rect key={i} x={225 + i * 21} y={128} width={9} height={8} fill="#ffd27a" opacity={luces * 0.9} />
      ))}
    </svg>
  );
};

export const Iceberg: React.FC<{ escala: number }> = ({ escala }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      width={400 * escala}
      height={300 * escala}
      style={{ overflow: "visible" }}
    >
      <path
        d="M 0 300 L 60 170 L 110 190 L 170 40 L 210 90 L 250 20 L 300 150 L 340 130 L 400 300 Z"
        fill="#cfe3f2"
      />
      <path d="M 170 40 L 210 90 L 190 300 L 120 300 Z" fill="#9fc1dc" opacity={0.6} />
      <path d="M 250 20 L 300 150 L 320 300 L 260 300 Z" fill="#88aecd" opacity={0.5} />
    </svg>
  );
};

export const Bengala: React.FC<{ inicio: number; x: number }> = ({ inicio, x }) => {
  const frame = useCurrentFrame() - inicio;
  if (frame < 0 || frame > 70) return null;
  const subida = interpolate(frame, [0, 30], [HORIZONTE - 100, 380], {
    extrapolateRight: "clamp",
  });
  const explosion = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      {frame < 30 ? (
        <div
          style={{
            position: "absolute",
            left: x,
            top: subida,
            width: 6,
            height: 30,
            background: "linear-gradient(#fff, transparent)",
          }}
        />
      ) : (
        new Array(16).fill(0).map((_, i) => {
          const ang = (i / 16) * Math.PI * 2;
          const dist = explosion * 140;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x + Math.cos(ang) * dist,
                top: 380 + Math.sin(ang) * dist + explosion * explosion * 120,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#fff6e0",
                boxShadow: "0 0 16px #fff",
                opacity: 1 - explosion,
              }}
            />
          );
        })
      )}
    </AbsoluteFill>
  );
};

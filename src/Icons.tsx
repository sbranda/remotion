import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { IconName } from "./data";

type P = { color: string };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useAppear = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 14 } });
};

const S = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 600 600" width={620} height={620}>
    {children}
  </svg>
);

const Abaco: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const rows = [0, 1, 2, 3, 4];
  return (
    <S>
      <rect x={70} y={90} width={460} height={420} rx={24} fill="none" stroke={color} strokeWidth={18} />
      {rows.map((r) => {
        const y = 160 + r * 70;
        const shift = interpolate(frame, [10 + r * 6, 30 + r * 6], [0, 120 - r * 20], clamp);
        return (
          <g key={r}>
            <line x1={80} x2={520} y1={y} y2={y} stroke="#ffffff55" strokeWidth={6} />
            {[0, 1, 2, 3].map((b) => (
              <ellipse
                key={b}
                cx={110 + b * 46 + (b < 2 ? 0 : shift)}
                cy={y}
                rx={22}
                ry={26}
                fill={b % 2 ? color : "#fff3e0"}
              />
            ))}
          </g>
        );
      })}
    </S>
  );
};

const Gear: React.FC<{ cx: number; cy: number; r: number; teeth: number; rot: number; color: string }> = ({
  cx,
  cy,
  r,
  teeth,
  rot,
  color,
}) => (
  <g transform={`rotate(${rot} ${cx} ${cy})`}>
    {Array.from({ length: teeth }).map((_, i) => (
      <rect
        key={i}
        x={cx - r * 0.13}
        y={cy - r - r * 0.22}
        width={r * 0.26}
        height={r * 0.4}
        rx={4}
        fill={color}
        transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
      />
    ))}
    <circle cx={cx} cy={cy} r={r} fill={color} />
    <circle cx={cx} cy={cy} r={r * 0.35} fill="#0b0b14" />
  </g>
);

const Pascalina: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  return (
    <S>
      <Gear cx={230} cy={260} r={120} teeth={12} rot={frame * 3} color={color} />
      <Gear cx={410} cy={390} r={80} teeth={9} rot={-frame * 4.5 + 20} color="#fff3e0" />
      <Gear cx={400} cy={170} r={55} teeth={7} rot={-frame * 6.5} color={color} />
    </S>
  );
};

const Babbage: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  return (
    <S>
      <rect x={100} y={60} width={20} height={480} fill="#ffffff55" />
      <rect x={480} y={60} width={20} height={480} fill="#ffffff55" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={150} y={80 + i * 75} width={300} height={50} rx={10} fill={i % 2 ? color : "#fff3e0"} />
          {[0, 1, 2, 3, 4].map((d) => (
            <text
              key={d}
              x={185 + d * 58}
              y={117 + i * 75}
              fontSize={34}
              fontFamily="monospace"
              fontWeight={700}
              fill="#0b0b14"
              textAnchor="middle"
            >
              {Math.floor((frame / 4 + i * 3 + d * 7) % 10)}
            </text>
          ))}
        </g>
      ))}
    </S>
  );
};

const Ada: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const lines = ["V1 = 1", "V2 = 2", "V4 = V2 − V1", "V5 = V2 + V1", "V11 = V4 ÷ V5", "→ B₁, B₃, B₅ …"];
  return (
    <S>
      <rect x={70} y={70} width={460} height={460} rx={20} fill="#fff3e0" />
      {lines.map((l, i) => {
        const chars = Math.floor(interpolate(frame, [8 + i * 9, 18 + i * 9], [0, l.length], clamp));
        return (
          <text key={i} x={105} y={145 + i * 66} fontSize={38} fontFamily="Georgia, serif" fontStyle="italic" fill="#2a1a10">
            {l.slice(0, chars)}
          </text>
        );
      })}
      <path
        d="M470 470 L560 330 L575 340 L490 485 Z"
        fill={color}
        transform={`translate(${Math.sin(frame / 3) * 6} ${Math.cos(frame / 3) * 4})`}
      />
    </S>
  );
};

const Turing: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const offset = (frame * 3) % 90;
  const bits = "1011001110100101";
  return (
    <S>
      <rect x={0} y={250} width={600} height={100} fill="#ffffff11" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -90 + i * 90 + offset;
        const bit = bits[(i - Math.floor((frame * 3) / 90) + 160) % bits.length];
        return (
          <g key={i}>
            <rect x={x + 5} y={255} width={80} height={90} rx={8} fill="#fff3e0" />
            <text x={x + 45} y={318} fontSize={52} fontFamily="monospace" fontWeight={700} textAnchor="middle" fill="#0b0b14">
              {bit}
            </text>
          </g>
        );
      })}
      <path d="M255 120 L345 120 L345 200 L300 240 L255 200 Z" fill={color} />
      <text x={300} y={180} fontSize={40} textAnchor="middle" fill="#0b0b14" fontWeight={800} fontFamily="monospace">
        q₁
      </text>
      <rect x={250} y={360} width={100} height={10} rx={5} fill={color} />
    </S>
  );
};

const Eniac: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  return (
    <S>
      {[0, 1, 2].map((p) => (
        <g key={p}>
          <rect x={60 + p * 165} y={80} width={150} height={440} rx={10} fill="#1c1c2a" stroke="#ffffff33" strokeWidth={4} />
          {Array.from({ length: 24 }).map((_, i) => {
            const on = Math.sin(frame * 0.6 + i * 1.7 + p * 2.3) > 0.2;
            return (
              <circle
                key={i}
                cx={90 + p * 165 + (i % 3) * 45}
                cy={115 + Math.floor(i / 3) * 52}
                r={13}
                fill={on ? color : "#3a3a4a"}
                style={{ filter: on ? `drop-shadow(0 0 8px ${color})` : undefined }}
              />
            );
          })}
        </g>
      ))}
    </S>
  );
};

const Transistor: React.FC<P> = ({ color }) => {
  const a = useAppear(4);
  return (
    <S>
      <g transform={`translate(0 ${(1 - a) * 80})`} opacity={a}>
        <path d="M180 300 A120 120 0 0 1 420 300 L420 330 L180 330 Z" fill={color} />
        <rect x={180} y={300} width={240} height={30} fill="#0d2a3a" />
        {[230, 300, 370].map((x, i) => (
          <rect key={x} x={x - 9} y={330} width={18} height={interpolate(a, [0, 1], [0, 180 + (i === 1 ? 20 : 0)])} rx={4} fill="#d0d8e0" />
        ))}
        {["E", "B", "C"].map((l, i) => (
          <text key={l} x={230 + i * 70} y={580} fontSize={36} fill="#ffffffaa" textAnchor="middle" fontFamily="monospace">
            {l}
          </text>
        ))}
      </g>
    </S>
  );
};

const Chip: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const pins = Array.from({ length: 8 });
  const pulse = (frame % 30) / 30;
  return (
    <S>
      {pins.map((_, i) => (
        <g key={i}>
          <rect x={150 + i * 40} y={70} width={16} height={60} fill="#c0c8d0" />
          <rect x={150 + i * 40} y={470} width={16} height={60} fill="#c0c8d0" />
          <rect x={70} y={150 + i * 40} width={60} height={16} fill="#c0c8d0" />
          <rect x={470} y={150 + i * 40} width={60} height={16} fill="#c0c8d0" />
        </g>
      ))}
      <rect x={130} y={130} width={340} height={340} rx={24} fill="#141a2a" stroke={color} strokeWidth={8} />
      <rect x={210} y={210} width={180} height={180} rx={10} fill={color} opacity={0.25 + 0.5 * (1 - pulse)} />
      <text x={300} y={318} fontSize={52} textAnchor="middle" fill="#fff" fontWeight={800} fontFamily="monospace">
        4004
      </text>
    </S>
  );
};

const Pc: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const text = "C:\\> HOLA MUNDO";
  const n = Math.floor(interpolate(frame, [12, 45], [0, text.length], clamp));
  const cursor = Math.floor(frame / 8) % 2 === 0;
  return (
    <S>
      <rect x={90} y={70} width={420} height={320} rx={24} fill="#e8e2d0" />
      <rect x={120} y={100} width={360} height={250} rx={10} fill="#07120a" />
      <text x={140} y={160} fontSize={30} fontFamily="monospace" fill={color}>
        {text.slice(0, n)}
        {cursor ? "█" : ""}
      </text>
      <rect x={250} y={390} width={100} height={40} fill="#cfc8b4" />
      <rect x={70} y={450} width={460} height={80} rx={12} fill="#e8e2d0" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={90 + (i % 10) * 43} y={462 + Math.floor(i / 10) * 30} width={36} height={22} rx={4} fill="#bdb6a2" />
      ))}
    </S>
  );
};

const Web: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const rot = frame * 2;
  return (
    <S>
      <circle cx={300} cy={300} r={210} fill="none" stroke={color} strokeWidth={14} />
      {[0, 1, 2].map((i) => {
        const rx = Math.abs(Math.cos(((rot + i * 60) * Math.PI) / 180)) * 210;
        return <ellipse key={i} cx={300} cy={300} rx={rx} ry={210} fill="none" stroke={color} strokeWidth={8} opacity={0.8} />;
      })}
      {[-120, 0, 120].map((y) => (
        <line key={y} x1={300 - Math.sqrt(210 * 210 - y * y)} x2={300 + Math.sqrt(210 * 210 - y * y)} y1={300 + y} y2={300 + y} stroke={color} strokeWidth={8} opacity={0.8} />
      ))}
      <text x={300} y={575} fontSize={44} textAnchor="middle" fill="#fff" fontFamily="monospace" fontWeight={700}>
        www
      </text>
    </S>
  );
};

const Smartphone: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  return (
    <S>
      <rect x={180} y={40} width={240} height={520} rx={40} fill="#15151f" stroke="#ffffff66" strokeWidth={8} />
      <rect x={200} y={90} width={200} height={410} rx={12} fill={color} opacity={0.18} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = interpolate(frame, [6 + i * 2, 16 + i * 2], [0, 1], clamp);
        return (
          <rect
            key={i}
            x={218 + (i % 3) * 60}
            y={115 + Math.floor(i / 3) * 70}
            width={44}
            height={44}
            rx={12}
            fill={i % 2 ? color : "#ffffffcc"}
            opacity={a}
            transform={`translate(0 ${(1 - a) * 20})`}
          />
        );
      })}
      <circle cx={300} cy={530} r={14} fill="none" stroke="#ffffff66" strokeWidth={4} />
    </S>
  );
};

const Ia: React.FC<P> = ({ color }) => {
  const frame = useCurrentFrame();
  const layers = [3, 5, 5, 2];
  const nodes = layers.map((n, l) =>
    Array.from({ length: n }).map((_, i) => ({ x: 110 + l * 127, y: 300 + (i - (n - 1) / 2) * 95 })),
  );
  return (
    <S>
      {nodes.slice(0, -1).map((layer, l) =>
        layer.flatMap((a, i) =>
          nodes[l + 1].map((b, j) => {
            const glow = Math.sin(frame * 0.25 - l * 1.2 + i + j) > 0.6;
            return (
              <line
                key={`${l}-${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={glow ? color : "#ffffff33"}
                strokeWidth={glow ? 5 : 2}
              />
            );
          }),
        ),
      )}
      {nodes.flat().map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={22} fill="#15151f" stroke={color} strokeWidth={6} />
      ))}
    </S>
  );
};

const MAP: Record<IconName, React.FC<P>> = {
  abaco: Abaco,
  pascalina: Pascalina,
  babbage: Babbage,
  ada: Ada,
  turing: Turing,
  eniac: Eniac,
  transistor: Transistor,
  chip: Chip,
  pc: Pc,
  web: Web,
  smartphone: Smartphone,
  ia: Ia,
};

export const Icon: React.FC<{ name: IconName; color: string }> = ({ name, color }) => {
  const C = MAP[name];
  return <C color={color} />;
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BOSS, DANIEL, FONT, INK, LAURA } from "./components";

/** Small "deadline" pill in the bottom-right corner. */
export const Deadline: React.FC<{ text?: string; from?: number; urgent?: boolean }> = ({
  text = "Presentación: mañana, 9:00",
  from = 0,
  urgent = false,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = urgent ? 1 + Math.max(0, Math.sin(frame / 5)) * 0.05 : 1;
  return (
    <div
      style={{
        position: "absolute",
        right: 40,
        bottom: 36,
        zIndex: 25,
        opacity: o,
        transform: `scale(${pulse})`,
        transformOrigin: "100% 100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 26px",
        borderRadius: 40,
        background: urgent ? "#d62839" : "rgba(25,28,40,0.85)",
        color: "white",
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 30,
      }}
    >
      <svg width={30} height={30} viewBox="0 0 30 30">
        <circle cx={15} cy={15} r={12} fill="none" stroke="white" strokeWidth={3} />
        <path d="M15 8 L15 15 L20 18" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" />
      </svg>
      {text}
    </div>
  );
};

/** Dims the scene behind an overlay. */
export const Dim: React.FC<{ from: number; to: number; amount?: number }> = ({
  from,
  to,
  amount = 0.55,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 12, to, to + 12], [0, amount, amount, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ background: `rgba(10,12,25,${o})`, zIndex: 12 }} />;
};

const ROWS: [string, string][] = [
  ["Duración del proyecto", "6 meses"],
  ["Equipo asignado", "8 personas"],
  ["Coste total estimado", "1.200.000 €"],
  ["Margen previsto", "18 %"],
];

/** The report, with the cost row turning red at `errorAt`. */
export const Report: React.FC<{ errorAt: number }> = ({ errorAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - errorAt, fps, config: { damping: 10 } });
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        padding: "40px 56px",
        fontFamily: FONT,
        color: INK,
        boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ fontSize: 26, color: "#888", fontWeight: 500 }}>CONFIDENCIAL · Versión final</div>
      <div style={{ fontSize: 54, fontWeight: 700, margin: "6px 0 26px" }}>
        Informe final — Proyecto Atlas
      </div>
      {ROWS.map(([k, v], i) => {
        const bad = i === 2 && frame >= errorAt;
        return (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 40,
              padding: "16px 20px",
              borderRadius: 12,
              background: bad ? `rgba(214,40,57,${0.15 * e})` : i % 2 ? "#f4f6f9" : "white",
              border: bad ? "4px solid #d62839" : "4px solid transparent",
              position: "relative",
            }}
          >
            <span>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
            {bad ? (
              <div
                style={{
                  position: "absolute",
                  right: -270,
                  top: 6,
                  transform: `scale(${e}) rotate(-6deg)`,
                  background: "#d62839",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 34,
                  padding: "8px 20px",
                  borderRadius: 12,
                }}
              >
                Real: 2.100.000 €
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

/** Email from management. */
export const Email: React.FC<{ highlightAt: number }> = ({ highlightAt }) => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [highlightAt, highlightAt + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        overflow: "hidden",
        fontFamily: FONT,
        color: INK,
        boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ background: BOSS, color: "white", padding: "18px 34px", fontSize: 30, fontWeight: 600 }}>
        Nuevo mensaje · 22:47
      </div>
      <div style={{ padding: "26px 34px" }}>
        <div style={{ fontSize: 30, color: "#666" }}>
          De: <b style={{ color: INK }}>Dirección General</b>
        </div>
        <div style={{ fontSize: 30, color: "#666", marginBottom: 18 }}>
          Asunto: <b style={{ color: INK }}>Presentación de mañana</b>
        </div>
        <div style={{ fontSize: 38, lineHeight: 1.4 }}>
          Laura, Daniel: recordad que el cliente decidirá un contrato de tres años{" "}
          <span
            style={{
              background: `linear-gradient(90deg, rgba(255,214,10,0.8) ${h * 100}%, transparent ${h * 100}%)`,
              fontWeight: 600,
            }}
          >
            basándose en vuestras cifras
          </span>
          . Confío en vuestro rigor.
        </div>
      </div>
    </div>
  );
};

/** Balance scale; tilt in degrees (negative = left side down). */
export const Scale: React.FC<{ tilt: number }> = ({ tilt }) => {
  const rad = (tilt * Math.PI) / 180;
  const arm = 300;
  const lx = -arm * Math.cos(rad);
  const ly = -arm * Math.sin(rad);
  const Pan: React.FC<{ x: number; y: number; label: string; color: string }> = ({ x, y, label, color }) => (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={-90} y2={120} stroke="#555" strokeWidth={4} />
      <line x1={0} y1={0} x2={90} y2={120} stroke="#555" strokeWidth={4} />
      <path d="M-120 120 Q0 190 120 120 Z" fill={color} />
      <text y={110} textAnchor="middle" fontFamily="Fredoka" fontWeight={700} fontSize={30} fill="white" stroke={color} strokeWidth={8} paintOrder="stroke">
        {label}
      </text>
    </g>
  );
  return (
    <svg width={900} height={560} viewBox="-450 -80 900 560">
      <rect x={-12} y={0} width={24} height={400} fill="#6b5a4e" />
      <rect x={-120} y={390} width={240} height={30} rx={10} fill="#6b5a4e" />
      <line x1={lx} y1={ly} x2={-lx} y2={-ly} stroke="#6b5a4e" strokeWidth={18} strokeLinecap="round" />
      <circle r={22} fill="#e9c46a" />
      <Pan x={lx} y={ly} label="TRANSPARENCIA" color={LAURA} />
      <Pan x={-lx} y={-ly} label="PLAZOS" color={DANIEL} />
    </svg>
  );
};

/** Checklist with items ticking at the given frames. */
export const Checklist: React.FC<{ items: string[]; at: number[] }> = ({ items, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: 20,
        padding: "26px 40px",
        fontFamily: FONT,
        color: INK,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, marginBottom: 12 }}>Plan para la presentación</div>
      {items.map((it, i) => {
        const p = spring({ frame: frame - at[i], fps, config: { damping: 12 } });
        const done = frame >= at[i];
        return (
          <div key={it} style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, margin: "8px 0", opacity: done ? 1 : 0.45 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: `4px solid ${LAURA}`,
                background: done ? LAURA : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {done ? (
                <svg width={26} height={26} viewBox="0 0 26 26" style={{ transform: `scale(${p})` }}>
                  <path d="M4 14 L10 20 L22 6" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" />
                </svg>
              ) : null}
            </div>
            {it}
          </div>
        );
      })}
    </div>
  );
};

/** Slide shown on the meeting-room screen. */
export const Slide: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    ["Coste real", "2,1 M€ (no 1,2 M€)"],
    ["Causa", "error al transcribir cifras"],
    ["Plan", "revisión externa · +2 semanas"],
    ["Compromiso", "doble verificación en cada entrega"],
  ];
  return (
    <div style={{ padding: "34px 46px", color: INK }}>
      <div style={{ fontSize: 26, color: "#d62839", fontWeight: 700, letterSpacing: 2 }}>PROYECTO ATLAS</div>
      <div style={{ fontSize: 48, fontWeight: 700, margin: "4px 0 22px" }}>
        Corrección importante antes de firmar
      </div>
      {lines.map(([k, v], i) => {
        const o = interpolate(frame, [20 + i * 25, 35 + i * 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={k} style={{ display: "flex", gap: 16, fontSize: 34, margin: "12px 0", opacity: o }}>
            <b style={{ width: 230, color: DANIEL }}>{k}</b>
            <span>{v}</span>
          </div>
        );
      })}
    </div>
  );
};

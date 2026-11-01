import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadTypewriter } from "@remotion/google-fonts/SpecialElite";

export const SERIF = loadPlayfair("normal", { weights: ["400", "700", "900"], subsets: ["latin"] }).fontFamily;
export const SERIF_IT = loadPlayfair("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const SANS = loadInter("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily;
export const MAQUINA = loadTypewriter("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;

export const C = {
  noche: "#050b16",
  noche2: "#0c1a2e",
  mar: "#0a1626",
  crema: "#f1e6d0",
  crema2: "#f1e6d0b3",
  crema3: "#f1e6d066",
  oro: "#c9a45c",
  hielo: "#bfe3f2",
  rojo: "#d64545",
  verde: "#6fe0a0",
  luz: "#ffd27a",
  sepia: "#3b2a1a",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const suave = { ...clamp, easing: Easing.inOut(Easing.cubic) };

/** 0→1 entre dos frames */
export const prog = (
  frame: number,
  a: number,
  b: number,
  ease: { extrapolateLeft?: "clamp"; extrapolateRight?: "clamp"; easing?: (t: number) => number } = suave,
) => interpolate(frame, [a, b], [0, 1], ease);

export const useSpring = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

// ---------------------------------------------------------------------------
// Fondos
// ---------------------------------------------------------------------------

export const Cielo: React.FC<{ arriba: string; abajo: string }> = ({ arriba, abajo }) => (
  <AbsoluteFill style={{ background: `linear-gradient(${arriba}, ${abajo})` }} />
);

export const Estrellas: React.FC<{ n?: number; alto?: number; opacidad?: number; seed?: string }> = ({
  n = 160,
  alto = 700,
  opacidad = 1,
  seed = "e",
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: opacidad }}>
      <svg width={1920} height={1080}>
        {Array.from({ length: n }).map((_, i) => {
          const x = random(`${seed}x${i}`) * 1920;
          const y = random(`${seed}y${i}`) * alto;
          const r = 0.6 + random(`${seed}r${i}`) * 1.8;
          const tw = 0.55 + 0.45 * Math.sin(frame / (12 + random(`${seed}t${i}`) * 30) + i);
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={tw} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Mar con líneas de oleaje. `y` = línea del horizonte */
export const Mar: React.FC<{ y?: number; color?: string; lineas?: string; opacidad?: number; quieto?: boolean }> = ({
  y = 760,
  color = C.mar,
  lineas = "#ffffff",
  opacidad = 1,
  quieto = false,
}) => {
  const frame = useCurrentFrame();
  const amp = quieto ? 1.5 : 5;
  return (
    <AbsoluteFill style={{ opacity: opacidad }}>
      <svg width={1920} height={1080}>
        <rect x={0} y={y} width={1920} height={1080 - y} fill={color} />
        {Array.from({ length: 9 }).map((_, i) => {
          const yy = y + 10 + i * i * 4.2;
          const ph = frame / (40 - i * 2) + i;
          let d = `M0,${yy}`;
          for (let x = 0; x <= 1920; x += 40) d += ` L${x},${yy + Math.sin(x / (90 + i * 20) + ph) * amp * (1 + i * 0.3)}`;
          return <path key={i} d={d} stroke={lineas} strokeWidth={1 + i * 0.25} fill="none" opacity={0.06 + i * 0.012} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// El Titanic (vista lateral, mira a la derecha). viewBox 1000 x 240, línea de flotación y=200
// ---------------------------------------------------------------------------

const FUNNELS = [300, 410, 520, 630];
export const CORTE_X = 575; // donde se parte el barco (entre la 3.ª y 4.ª chimenea)

export const BarcoPartes: React.FC<{ luces?: number; humo?: number; parte?: "todo" | "proa" | "popa"; id?: string }> = ({
  luces = 1,
  humo = 0,
  parte = "todo",
  id = "b",
}) => {
  const frame = useCurrentFrame();
  const clip = parte === "todo" ? undefined : `url(#${id}-${parte})`;
  return (
    <g>
      <defs>
        <clipPath id={`${id}-casco`}>
          <path d="M30,120 L975,112 L955,226 L85,226 Q42,212 30,172 Z" />
        </clipPath>
        {/* corte en zigzag para que la fractura se vea irregular */}
        <clipPath id={`${id}-popa`}>
          <path d={`M-200,-400 L${CORTE_X},-400 L${CORTE_X},100 L${CORTE_X - 12},140 L${CORTE_X + 10},175 L${CORTE_X - 6},260 L-200,260 Z`} />
        </clipPath>
        <clipPath id={`${id}-proa`}>
          <path d={`M1200,-400 L${CORTE_X},-400 L${CORTE_X},100 L${CORTE_X - 12},140 L${CORTE_X + 10},175 L${CORTE_X - 6},260 L1200,260 Z`} />
        </clipPath>
      </defs>
      <g clipPath={clip}>
        {/* humo */}
        {humo > 0 &&
          FUNNELS.slice(0, 3).map((x, i) => (
            <g key={x} opacity={humo}>
              {[0, 1, 2].map((k) => {
                const t = ((frame + i * 13 + k * 20) % 60) / 60;
                return <circle key={k} cx={x + 8 - t * 90} cy={8 - t * 50} r={10 + t * 26} fill="#d8d8d8" opacity={0.35 * (1 - t)} />;
              })}
            </g>
          ))}
        {/* mástiles y cables */}
        <line x1={170} y1={118} x2={160} y2={-10} stroke="#c9b28a" strokeWidth={3} />
        <line x1={860} y1={114} x2={850} y2={-10} stroke="#c9b28a" strokeWidth={3} />
        <line x1={160} y1={-8} x2={850} y2={-8} stroke="#c9b28a" strokeWidth={1} opacity={0.6} />
        {/* chimeneas */}
        {FUNNELS.map((x) => (
          <g key={x}>
            <path d={`M${x},82 L${x + 40},82 L${x + 30},4 L${x - 10},4 Z`} fill="#d9a441" />
            <path d={`M${x - 8},18 L${x + 32},18 L${x + 30},4 L${x - 10},4 Z`} fill="#141414" />
          </g>
        ))}
        {/* superestructura */}
        <rect x={215} y={82} width={590} height={16} fill="#efe9dc" />
        <rect x={235} y={96} width={560} height={20} fill="#e6dfd0" />
        {/* botes salvavidas */}
        {[245, 270, 295, 345, 370, 690, 715, 740, 765].map((x) => (
          <rect key={x} x={x} y={74} width={20} height={8} rx={3} fill="#fff" />
        ))}
        {/* casco */}
        <path d="M30,120 L975,112 L955,226 L85,226 Q42,212 30,172 Z" fill="#141414" />
        <g clipPath={`url(#${id}-casco)`}>
          <rect x={0} y={201} width={1000} height={40} fill="#6e1f1f" />
          <rect x={0} y={118} width={1000} height={4} fill="#d9a441" opacity={0.7} />
        </g>
        {/* ojos de buey */}
        {[140, 158, 176].map((y, row) =>
          Array.from({ length: 58 }).map((_, i) => {
            const x = 70 + i * 15.5 + row * 3;
            if (x > 935 - row * 6) return null;
            const encendida = random(`p${row}-${i}`) > 0.18;
            return (
              <circle
                key={`${row}-${i}`}
                cx={x}
                cy={y}
                r={2.6}
                fill={encendida ? C.luz : "#333"}
                opacity={encendida ? 0.25 + 0.75 * luces : 1}
              />
            );
          }),
        )}
        {/* ventanas de la superestructura */}
        {Array.from({ length: 36 }).map((_, i) => (
          <rect key={i} x={245 + i * 15.3} y={102} width={8} height={7} fill={C.luz} opacity={0.2 + 0.8 * luces} />
        ))}
      </g>
    </g>
  );
};

/** Barco completo dentro de su propio <svg>. ancho en px */
export const Barco: React.FC<{ ancho?: number; luces?: number; humo?: number; id?: string; style?: React.CSSProperties }> = ({
  ancho = 1400,
  luces = 1,
  humo = 0,
  id = "b",
  style,
}) => (
  <svg width={ancho} height={(ancho * 260) / 1000} viewBox="0 -20 1000 260" style={{ overflow: "visible", ...style }}>
    <BarcoPartes luces={luces} humo={humo} id={id} />
  </svg>
);

// ---------------------------------------------------------------------------
// Bote salvavidas
// ---------------------------------------------------------------------------
export const Bote: React.FC<{ ancho?: number; numero?: string; gente?: number }> = ({ ancho = 260, numero, gente = 8 }) => (
  <svg width={ancho} height={ancho * 0.36} viewBox="0 0 260 94" style={{ overflow: "visible" }}>
    {Array.from({ length: gente }).map((_, i) => (
      <g key={i}>
        <circle cx={40 + i * (180 / Math.max(1, gente - 1))} cy={22} r={9} fill="#2a3446" />
        <rect x={32 + i * (180 / Math.max(1, gente - 1))} y={30} width={16} height={20} rx={5} fill="#2a3446" />
      </g>
    ))}
    <path d="M5,45 L255,45 Q240,90 200,92 L60,92 Q20,90 5,45 Z" fill="#f4efe4" />
    <path d="M5,45 L255,45 L252,54 L8,54 Z" fill="#8a6a43" />
    {numero && (
      <text x={130} y={80} fontSize={22} textAnchor="middle" fontFamily={SANS} fontWeight={600} fill="#333">
        {numero}
      </text>
    )}
  </svg>
);

// ---------------------------------------------------------------------------
// Reloj analógico + hora digital
// ---------------------------------------------------------------------------
export const Reloj: React.FC<{ h: number; m: number; size?: number; desdeH?: number; desdeM?: number; dur?: number }> = ({
  h,
  m,
  size = 380,
  desdeH,
  desdeM,
  dur = 45,
}) => {
  const frame = useCurrentFrame();
  const total = h * 60 + m;
  const inicio = desdeH !== undefined ? desdeH * 60 + (desdeM ?? 0) : total - 30;
  // si cruza la medianoche (23:40 → 02:20), seguimos contando hacia adelante
  const fin = inicio > total ? total + 1440 : total;
  const t = interpolate(frame, [0, dur], [inicio, fin], { ...clamp, easing: Easing.out(Easing.cubic) });
  const hh = Math.floor(t / 60) % 24;
  const mm = Math.floor(t % 60);
  const angM = (t % 60) * 6;
  const angH = ((t / 60) % 12) * 30;
  const r = size / 2;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <svg width={size} height={size}>
        <circle cx={r} cy={r} r={r - 6} fill="#0b1524" stroke={C.oro} strokeWidth={6} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={r}
            y1={18}
            x2={r}
            y2={i % 3 === 0 ? 46 : 34}
            stroke={C.crema}
            strokeWidth={i % 3 === 0 ? 6 : 3}
            transform={`rotate(${i * 30} ${r} ${r})`}
          />
        ))}
        <line x1={r} y1={r} x2={r} y2={r * 0.45} stroke={C.crema} strokeWidth={10} strokeLinecap="round" transform={`rotate(${angH} ${r} ${r})`} />
        <line x1={r} y1={r} x2={r} y2={r * 0.18} stroke={C.oro} strokeWidth={5} strokeLinecap="round" transform={`rotate(${angM} ${r} ${r})`} />
        <circle cx={r} cy={r} r={10} fill={C.oro} />
      </svg>
      <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 84, color: C.crema, fontVariantNumeric: "tabular-nums" }}>
        {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Texto
// ---------------------------------------------------------------------------
export const Titular: React.FC<{ children: React.ReactNode; size?: number; delay?: number; color?: string; italic?: boolean }> = ({
  children,
  size = 110,
  delay = 0,
  color = C.crema,
  italic,
}) => {
  const a = useSpring(delay);
  return (
    <div
      style={{
        fontFamily: italic ? SERIF_IT : SERIF,
        fontWeight: italic ? 400 : 900,
        fontSize: size,
        color,
        lineHeight: 1.05,
        textAlign: "center",
        opacity: a,
        transform: `translateY(${(1 - a) * 40}px)`,
        letterSpacing: italic ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
};

export const Dato: React.FC<{ valor: string; texto: string; delay?: number; size?: number }> = ({ valor, texto, delay = 0, size = 150 }) => {
  const a = useSpring(delay, 14);
  const b = useSpring(delay + 10);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: size,
          color: C.crema,
          lineHeight: 1,
          transform: `scale(${a})`,
        }}
      >
        {valor}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 40, color: C.crema2, marginTop: 16, opacity: b, letterSpacing: 2 }}>{texto}</div>
    </div>
  );
};

export const Contador: React.FC<{ de: number; a: number; dur?: number; delay?: number; formato?: (n: number) => string }> = ({
  de,
  a,
  dur = 40,
  delay = 0,
  formato = (n) => Math.round(n).toLocaleString("es-ES").replace(/,/g, "."),
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + dur], [de, a], { ...clamp, easing: Easing.out(Easing.cubic) });
  return <>{formato(v)}</>;
};

/** miles con punto, también para números de 4 cifras */
export const miles = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// ---------------------------------------------------------------------------
// Pictograma de puntos (cada punto = N personas)
// ---------------------------------------------------------------------------
export const Pictograma: React.FC<{
  total: number;
  marcados: number;
  colorMarcado: string;
  colorResto?: string;
  columnas?: number;
  tam?: number;
  delay?: number;
  marcarDesde?: number;
}> = ({ total, marcados, colorMarcado, colorResto = "#ffffff26", columnas = 30, tam = 22, delay = 0, marcarDesde = 30 }) => {
  const frame = useCurrentFrame();
  const gap = tam * 0.45;
  const filas = Math.ceil(total / columnas);
  return (
    <svg width={columnas * (tam + gap)} height={filas * (tam + gap)}>
      {Array.from({ length: total }).map((_, i) => {
        const col = i % columnas;
        const fila = Math.floor(i / columnas);
        const aparece = prog(frame, delay + i * 0.25, delay + i * 0.25 + 8);
        const marca = prog(frame, delay + marcarDesde + i * 0.3, delay + marcarDesde + i * 0.3 + 8);
        const esMarcado = i < marcados;
        return (
          <circle
            key={i}
            cx={col * (tam + gap) + tam / 2}
            cy={fila * (tam + gap) + tam / 2}
            r={(tam / 2) * aparece}
            fill={esMarcado && marca > 0.5 ? colorMarcado : colorResto}
            opacity={esMarcado ? 0.5 + 0.5 * marca : 1}
          />
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Sucesión de "beats": cada uno empieza en un frame y se funde con el siguiente
// ---------------------------------------------------------------------------
export type Beat = { desde: number; render: React.ReactNode };

export const Beats: React.FC<{ beats: Beat[]; total: number; fundido?: number }> = ({ beats, total, fundido = 18 }) => {
  const frame = useCurrentFrame();
  const orden = [...beats].sort((a, b) => a.desde - b.desde);
  return (
    <>
      {orden.map((b, i) => {
        const hasta = i < orden.length - 1 ? orden[i + 1].desde + fundido : total;
        const dur = Math.max(1, hasta - b.desde);
        const op =
          i === 0
            ? interpolate(frame, [hasta - fundido, hasta], [1, i === orden.length - 1 ? 1 : 0], clamp)
            : interpolate(frame, [b.desde, b.desde + fundido, hasta - fundido, hasta], [0, 1, 1, i === orden.length - 1 ? 1 : 0], clamp);
        return (
          <Sequence key={i} from={b.desde} durationInFrames={dur} layout="none">
            <AbsoluteFill style={{ opacity: op }}>{b.render}</AbsoluteFill>
          </Sequence>
        );
      })}
    </>
  );
};

export const Centro: React.FC<{ children: React.ReactNode; top?: number; gap?: number; style?: React.CSSProperties }> = ({
  children,
  top = 0,
  gap = 30,
  style,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap,
      paddingBottom: 170 - top,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Tokens de texto (el texto nunca usa el color de la serie)
const INK = "#FFFFFF";
const INK_2 = "#FFFFFFCC";
const INK_3 = "#FFFFFF80";
const GRID = "#FFFFFF1F";
const SURFACE = "#0b0b14";

// Un solo color por gráfico (cada gráfico tiene una sola serie).
// Validados contra la superficie oscura #0b0b14 (banda de luminosidad, croma y contraste).
const AZUL = "#3A93E6";
const VIOLETA = "#A070EE";
const AMBAR = "#E0A458";

/** Formato de números en español: 2.300 · 3,1 millones · 208.000 millones */
export const formatoNumero = (n: number): string => {
  const miles = (x: number) => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (n < 1e6) return miles(n);
  const m = n / 1e6;
  if (m < 10) return `${m.toFixed(1).replace(".", ",")} millones`;
  return `${miles(m)} millones`;
};

// ---------- Marco común: título, subtítulo, fuente ----------
const Marco: React.FC<{
  fonts: { title: string; body: string };
  kicker: string;
  titulo: string;
  fuente: string;
  children: React.ReactNode;
}> = ({ fonts, kicker, titulo, fuente, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 240 }}>
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: 6,
          color: INK_3,
          opacity: a,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: fonts.title,
          fontWeight: 700,
          fontSize: 76,
          lineHeight: 1.08,
          color: INK,
          textAlign: "center",
          maxWidth: 940,
          marginTop: 14,
          textWrap: "balance",
          opacity: a,
          transform: `translateY(${(1 - a) * 30}px)`,
        }}
      >
        {titulo}
      </div>
      <div style={{ marginTop: 40 }}>{children}</div>
      <div
        style={{
          position: "absolute",
          top: 1470,
          fontFamily: fonts.body,
          fontSize: 28,
          color: INK_3,
          opacity: a,
        }}
      >
        {fuente}
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// 1) Peso: barras horizontales en escala lineal (lo chico casi no se ve: ese es el punto)
// =====================================================================
const PESOS = [
  { nombre: "ENIAC (1946)", kg: 27000, etiqueta: "27.000 kg" },
  { nombre: "Notebook (2010s)", kg: 1.5, etiqueta: "1,5 kg" },
  { nombre: "Smartphone (hoy)", kg: 0.2, etiqueta: "0,2 kg" },
];

export const GraficoPeso: React.FC<{ fonts: { title: string; body: string } }> = ({ fonts }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ancho = 900;
  const max = PESOS[0].kg;
  const remate = spring({ frame: frame - 85, fps, config: { damping: 12 } });
  return (
    <Marco fonts={fonts} kicker="EN NÚMEROS · 1/3" titulo="¿Cuánto pesa una computadora?" fuente="Valores aproximados">
      <div style={{ width: ancho, display: "flex", flexDirection: "column", gap: 56, marginTop: 30 }}>
        {PESOS.map((p, i) => {
          const t = interpolate(frame, [15 + i * 14, 55 + i * 14], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          // mínimo visible de 8px para que la barra exista aunque sea diminuta
          const w = Math.max(8, (p.kg / max) * ancho) * t;
          return (
            <div key={p.nombre} style={{ opacity: interpolate(t, [0, 0.2], [0, 1], clamp) }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: fonts.body,
                  fontSize: 42,
                  color: INK_2,
                  marginBottom: 14,
                }}
              >
                <span>{p.nombre}</span>
                <span style={{ fontFamily: fonts.title, fontWeight: 700, color: INK }}>{p.etiqueta}</span>
              </div>
              <div style={{ height: 70, width: ancho, background: "#FFFFFF0D", borderRadius: 10 }}>
                <div style={{ height: 70, width: w, background: AMBAR, borderRadius: 10 }} />
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: fonts.title,
          fontWeight: 700,
          fontSize: 64,
          color: INK,
          textAlign: "center",
          marginTop: 90,
          transform: `scale(${remate})`,
        }}
      >
        ¡135.000 veces más liviano! 🪶
      </div>
    </Marco>
  );
};

// =====================================================================
// 2) Transistores por chip: línea en escala logarítmica (Ley de Moore)
// =====================================================================
const TRANSISTORES: { anio: number; n: number; chip: string }[] = [
  { anio: 1971, n: 2300, chip: "Intel 4004" },
  { anio: 1978, n: 29000, chip: "Intel 8086" },
  { anio: 1985, n: 275000, chip: "Intel 386" },
  { anio: 1993, n: 3.1e6, chip: "Pentium" },
  { anio: 2000, n: 42e6, chip: "Pentium 4" },
  { anio: 2006, n: 291e6, chip: "Core 2 Duo" },
  { anio: 2012, n: 1.4e9, chip: "Core i7 (Ivy Bridge)" },
  { anio: 2020, n: 16e9, chip: "Apple M1" },
  { anio: 2022, n: 114e9, chip: "Apple M1 Ultra" },
  { anio: 2024, n: 208e9, chip: "NVIDIA B200" },
];

export const GraficoTransistores: React.FC<{ fonts: { title: string; body: string } }> = ({ fonts }) => {
  const frame = useCurrentFrame();
  const W = 940;
  const H = 860;
  const m = { l: 40, r: 40, t: 70, b: 70 };
  const x0 = 1968;
  const x1 = 2027;
  const yMin = 2.4; // un poco por debajo de mil, para que el primer punto no toque la base
  const yMax = 12; // log10(1 billón)
  const sx = (anio: number) => m.l + ((anio - x0) / (x1 - x0)) * (W - m.l - m.r);
  const sy = (n: number) => H - m.b - ((Math.log10(n) - yMin) / (yMax - yMin)) * (H - m.t - m.b);

  // Progreso de dibujo: año "actual" de la cabeza de la línea
  const anioActual = interpolate(frame, [15, 105], [1971, 2024], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  // Valor interpolado (en escala log) en el año actual
  const valorEn = (anio: number) => {
    for (let i = 0; i < TRANSISTORES.length - 1; i++) {
      const a = TRANSISTORES[i];
      const b = TRANSISTORES[i + 1];
      if (anio <= b.anio) {
        const t = (anio - a.anio) / (b.anio - a.anio);
        return Math.pow(10, Math.log10(a.n) + t * (Math.log10(b.n) - Math.log10(a.n)));
      }
    }
    return TRANSISTORES[TRANSISTORES.length - 1].n;
  };
  const visibles = TRANSISTORES.filter((p) => p.anio <= anioActual);
  const cabeza = { anio: anioActual, n: valorEn(anioActual) };
  const puntos = [...visibles, cabeza];
  const d = puntos.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.anio)},${sy(p.n)}`).join(" ");
  const area = `${d} L${sx(cabeza.anio)},${H - m.b} L${sx(1971)},${H - m.b} Z`;

  const ticks = [
    { v: 1e6, t: "1 millón" },
    { v: 1e9, t: "mil millones" },
    { v: 1e12, t: "1 billón" },
  ];
  const anotar = [0, 3, TRANSISTORES.length - 1];
  const ejeA = interpolate(frame, [0, 15], [0, 1], clamp);

  return (
    <Marco
      fonts={fonts}
      kicker="EN NÚMEROS · 2/3"
      titulo="Transistores dentro de un chip"
      fuente="Escala logarítmica · Datos de fabricantes"
    >
      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="areaT" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={AZUL} stopOpacity={0.35} />
            <stop offset="100%" stopColor={AZUL} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* grilla y eje (recesivos) */}
        <g opacity={ejeA}>
          {ticks.map((tk) => (
            <g key={tk.v}>
              <line x1={m.l} x2={W - m.r} y1={sy(tk.v)} y2={sy(tk.v)} stroke={GRID} strokeWidth={2} />
              <text x={m.l} y={sy(tk.v) - 14} fontSize={28} fill={INK_3} fontFamily={fonts.body}>
                {tk.t}
              </text>
            </g>
          ))}
          {[1980, 2000, 2020].map((a) => (
            <text key={a} x={sx(a)} y={H - m.b + 50} fontSize={30} fill={INK_3} textAnchor="middle" fontFamily={fonts.body}>
              {a}
            </text>
          ))}
        </g>
        <path d={area} fill="url(#areaT)" />
        <path d={d} fill="none" stroke={AZUL} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
        {visibles.map((p) => (
          <circle key={p.anio} cx={sx(p.anio)} cy={sy(p.n)} r={11} fill={AZUL} stroke={SURFACE} strokeWidth={5} />
        ))}
        {/* etiquetas selectivas */}
        {anotar.map((idx) => {
          const p = TRANSISTORES[idx];
          if (p.anio > anioActual) return null;
          // la línea sube hacia la derecha: el primer rótulo va abajo a la derecha,
          // los demás arriba a la izquierda, así nunca la cruzan
          const abajo = idx === 0;
          const x = sx(p.anio) + (abajo ? 26 : -26);
          const y = sy(p.n) + (abajo ? 50 : -58);
          const anchor = abajo ? "start" : "end";
          return (
            <g key={idx} fontFamily={fonts.body}>
              <text x={x} y={y} textAnchor={anchor} fontSize={36} fontWeight={600} fill={INK}>
                {formatoNumero(p.n)}
              </text>
              <text x={x} y={y + 36} textAnchor={anchor} fontSize={28} fill={INK_2}>
                {p.chip} · {p.anio}
              </text>
            </g>
          );
        })}
        {/* cabeza de la línea */}
        {anioActual < 2024 && (
          <circle cx={sx(cabeza.anio)} cy={sy(cabeza.n)} r={14} fill={INK} stroke={AZUL} strokeWidth={6} />
        )}
      </svg>
    </Marco>
  );
};

// =====================================================================
// 3) Usuarios de Internet: columnas
// =====================================================================
const INTERNET = [
  { anio: 1995, millones: 16 },
  { anio: 2000, millones: 361 },
  { anio: 2005, millones: 1018 },
  { anio: 2010, millones: 1971 },
  { anio: 2015, millones: 3185 },
  { anio: 2020, millones: 4585 },
  { anio: 2024, millones: 5500 },
];

export const GraficoInternet: React.FC<{ fonts: { title: string; body: string } }> = ({ fonts }) => {
  const frame = useCurrentFrame();
  const W = 940;
  const H = 820;
  const m = { l: 20, r: 20, t: 60, b: 70 };
  const max = 6000;
  const gap = 18;
  const n = INTERNET.length;
  const bw = (W - m.l - m.r - gap * (n - 1)) / n;
  const sy = (v: number) => H - m.b - (v / max) * (H - m.t - m.b);
  const ejeA = interpolate(frame, [0, 15], [0, 1], clamp);
  const ultimo = interpolate(frame, [15 + (n - 1) * 10, 45 + (n - 1) * 10], [0, 1], clamp);
  return (
    <Marco
      fonts={fonts}
      kicker="EN NÚMEROS · 3/3"
      titulo="Personas conectadas a Internet"
      fuente="Estimaciones de UIT e Internet World Stats"
    >
      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <g opacity={ejeA}>
          {[0, 2000, 4000, 6000].map((v) => (
            <g key={v}>
              <line x1={m.l} x2={W - m.r} y1={sy(v)} y2={sy(v)} stroke={GRID} strokeWidth={2} />
              {v > 0 && (
                <text x={m.l} y={sy(v) - 14} fontSize={28} fill={INK_3} fontFamily={fonts.body}>
                  {v / 1000} mil millones
                </text>
              )}
            </g>
          ))}
        </g>
        {INTERNET.map((d, i) => {
          const t = interpolate(frame, [15 + i * 10, 45 + i * 10], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          const h = Math.max(6, (d.millones / max) * (H - m.t - m.b)) * t;
          const x = m.l + i * (bw + gap);
          const r = 10;
          const y = H - m.b - h;
          // barra con extremo superior redondeado, anclada a la base
          const path = `M${x},${H - m.b} L${x},${y + Math.min(r, h)} Q${x},${y} ${x + Math.min(r, h)},${y} L${x + bw - Math.min(r, h)},${y} Q${x + bw},${y} ${x + bw},${y + Math.min(r, h)} L${x + bw},${H - m.b} Z`;
          return (
            <g key={d.anio}>
              <path d={path} fill={VIOLETA} opacity={i === n - 1 ? 1 : 0.85} />
              <text
                x={x + bw / 2}
                y={H - m.b + 48}
                fontSize={30}
                fill={INK_3}
                textAnchor="middle"
                fontFamily={fonts.body}
              >
                {d.anio}
              </text>
            </g>
          );
        })}
        {/* etiquetas selectivas: primera y última */}
        <g fontFamily={fonts.body} opacity={interpolate(frame, [25, 40], [0, 1], clamp)}>
          <text x={m.l} y={sy(16) - 70} fontSize={36} fontWeight={600} fill={INK}>
            16 millones
          </text>
          <text x={m.l} y={sy(16) - 32} fontSize={28} fill={INK_2}>
            en 1995
          </text>
        </g>
        <g fontFamily={fonts.body} opacity={ultimo}>
          <text x={W - m.r} y={sy(5500) - 60} fontSize={36} fontWeight={600} fill={INK} textAnchor="end">
            5.500 millones
          </text>
          <text x={W - m.r} y={sy(5500) - 22} fontSize={28} fill={INK_2} textAnchor="end">
            en 2024 · 2 de cada 3 personas
          </text>
        </g>
      </svg>
    </Marco>
  );
};

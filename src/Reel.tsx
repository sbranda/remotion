import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { loadFont as loadTitle } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { GRAFICO, HITO, HITOS, Hito, INTRO, OUTRO, TRANSICION, inicioHito } from "./data";
import { GraficoInternet, GraficoPeso, GraficoTransistores } from "./Charts";
import { Icon } from "./Icons";

const { fontFamily: TITLE } = loadTitle("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: BODY } = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Fondo global: el color va cambiando según la época ----------
const Fondo: React.FC = () => {
  const frame = useCurrentFrame();
  const inputs = HITOS.map((_, i) => inicioHito(i) + HITO / 2);
  const color = interpolateColors(
    frame,
    inputs,
    HITOS.map((h) => h.color),
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b14" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, ${color}40 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(#ffffff08 2px, transparent 2px), linear-gradient(90deg, #ffffff08 2px, transparent 2px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${frame * 0.8}px`,
        }}
      />
    </AbsoluteFill>
  );
};

// ---------- Intro (gancho) ----------
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 12 } });
  const b = spring({ frame: frame - 12, fps, config: { damping: 12 } });
  const c = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div
        style={{
          fontFamily: TITLE,
          fontSize: 150,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          lineHeight: 1,
          transform: `scale(${a})`,
        }}
      >
        Del ábaco
      </div>
      <div
        style={{
          fontFamily: TITLE,
          fontSize: 150,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          marginTop: 10,
          transform: `scale(${b})`,
          background: "linear-gradient(90deg, #E0A458, #42A5F5, #FF6FB5)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        a la IA
      </div>
      <div
        style={{
          fontFamily: BODY,
          fontSize: 54,
          color: "#ffffffcc",
          marginTop: 60,
          textAlign: "center",
          opacity: c,
          transform: `translateY(${(1 - c) * 30}px)`,
        }}
      >
        4.500 años de computadoras
        <br />
        en menos de un minuto ⏱️
      </div>
    </AbsoluteFill>
  );
};

// ---------- Año animado ----------
const formatear = (y: number) => (y < 0 ? `${Math.abs(y)} a.C.` : `${y}`);

const Anio: React.FC<{ hito: Hito; anterior?: Hito }> = ({ hito, anterior }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 20, fps, config: { damping: 8, stiffness: 160 } });
  let texto: string;
  if (!anterior || hito.label) {
    texto = hito.label ?? formatear(hito.year);
    if (hito.label && anterior) {
      const y = Math.round(
        interpolate(frame, [0, 20], [anterior.year, hito.year], { ...clamp, easing: Easing.out(Easing.cubic) }),
      );
      texto = frame < 20 ? formatear(y) : hito.label;
    }
  } else {
    const y = Math.round(
      interpolate(frame, [0, 20], [anterior.year, hito.year], { ...clamp, easing: Easing.out(Easing.cubic) }),
    );
    texto = formatear(y);
  }
  return (
    <div
      style={{
        fontFamily: TITLE,
        fontWeight: 700,
        fontSize: texto.length > 6 ? 150 : 210,
        color: hito.color,
        lineHeight: 1,
        letterSpacing: -4,
        fontVariantNumeric: "tabular-nums",
        transform: `scale(${1 + 0.08 * pop * (1 - Math.min(1, (frame - 20) / 20))})`,
        textShadow: `0 0 50px ${hito.color}66`,
      }}
    >
      {texto}
    </div>
  );
};

// ---------- Escena de cada hito ----------
const EscenaHito: React.FC<{ hito: Hito; anterior?: Hito; index: number }> = ({ hito, anterior, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icono = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  const titulo = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const dato = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 250, paddingLeft: 70, paddingRight: 70 }}>
      <div
        style={{
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: 6,
          color: "#ffffff88",
          marginBottom: 10,
        }}
      >
        {String(index + 1).padStart(2, "0")} / {HITOS.length}
      </div>
      <Anio hito={hito} anterior={anterior} />
      <div
        style={{
          marginTop: 10,
          height: 620,
          transform: `scale(${0.6 + 0.4 * icono})`,
          opacity: icono,
        }}
      >
        <Icon name={hito.icon} color={hito.color} />
      </div>
      <div
        style={{
          fontFamily: TITLE,
          fontWeight: 700,
          fontSize: 84,
          color: "white",
          textAlign: "center",
          lineHeight: 1.05,
          marginTop: 10,
          opacity: titulo,
          transform: `translateY(${(1 - titulo) * 40}px)`,
        }}
      >
        {hito.titulo}
      </div>
      <div
        style={{
          fontFamily: BODY,
          fontSize: 46,
          color: "#ffffffd9",
          textAlign: "center",
          lineHeight: 1.3,
          marginTop: 28,
          maxWidth: 900,
          textWrap: "balance",
          opacity: dato,
          transform: `translateY(${(1 - dato) * 30}px)`,
        }}
      >
        {hito.dato}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Cierre ----------
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 } });
  const b = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const c = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ fontFamily: BODY, fontSize: 52, color: "#ffffffcc", textAlign: "center", opacity: a }}>
        4.500 años de historia…
      </div>
      <div
        style={{
          fontFamily: TITLE,
          fontWeight: 700,
          fontSize: 120,
          textAlign: "center",
          lineHeight: 1.05,
          marginTop: 30,
          transform: `scale(${b})`,
          background: "linear-gradient(90deg, #42A5F5, #9C6CF0, #FF6FB5)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        y recién empieza
      </div>
      <div
        style={{
          fontFamily: TITLE,
          fontWeight: 700,
          fontSize: 78,
          color: "white",
          marginTop: 90,
          textAlign: "center",
          opacity: c,
          transform: `translateY(${(1 - c) * 30}px)`,
        }}
      >
        ¿Qué viene después? 🤔
      </div>
      <div style={{ fontFamily: BODY, fontSize: 44, color: "#ffffffaa", marginTop: 30, opacity: c }}>
        Guárdalo y compártelo 💾
      </div>
    </AbsoluteFill>
  );
};

// ---------- Línea de tiempo inferior ----------
const LineaDeTiempo: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = interpolate(
    frame,
    [INTRO - TRANSICION, INTRO, inicioHito(HITOS.length) - 5, inicioHito(HITOS.length) + 10],
    [0, 1, 1, 0],
    clamp,
  );
  // Avanza un paso al comenzar cada hito y se queda quieto mientras dura
  const progreso = interpolate(
    frame,
    HITOS.flatMap((_, i) => [inicioHito(i), inicioHito(i) + TRANSICION]),
    HITOS.flatMap((_, i) => [Math.max(0, i - 1), i]),
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  const ancho = 860;
  const paso = ancho / (HITOS.length - 1);
  return (
    <AbsoluteFill style={{ opacity: visible }}>
      <div style={{ position: "absolute", top: 1490, left: (1080 - ancho) / 2, width: ancho, height: 40 }}>
        <div style={{ position: "absolute", top: 18, left: 0, width: ancho, height: 4, background: "#ffffff22", borderRadius: 2 }} />
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            width: progreso * paso,
            height: 4,
            background: "linear-gradient(90deg, #E0A458, #42A5F5, #FF6FB5)",
            borderRadius: 2,
          }}
        />
        {HITOS.map((h, i) => {
          const activo = Math.round(progreso) === i;
          const pasado = activo || progreso >= i - 0.01;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * paso - (activo ? 16 : 9),
                top: activo ? 4 : 11,
                width: activo ? 32 : 18,
                height: activo ? 32 : 18,
                borderRadius: "50%",
                background: pasado ? h.color : "#2a2a3a",
                boxShadow: activo ? `0 0 20px ${h.color}` : undefined,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const transicion = linearTiming({ durationInFrames: TRANSICION });

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill>
      <Fondo />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <Intro />
        </TransitionSeries.Sequence>
        {HITOS.map((h, i) => (
          <React.Fragment key={h.titulo}>
            <TransitionSeries.Transition
              presentation={i % 2 === 0 ? slide({ direction: "from-right" }) : slide({ direction: "from-bottom" })}
              timing={transicion}
            />
            <TransitionSeries.Sequence durationInFrames={HITO}>
              <EscenaHito hito={h} anterior={HITOS[i - 1]} index={i} />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
        {[GraficoPeso, GraficoTransistores, GraficoInternet].map((Grafico, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Transition
              presentation={i === 0 ? fade() : slide({ direction: "from-right" })}
              timing={transicion}
            />
            <TransitionSeries.Sequence durationInFrames={GRAFICO}>
              <Grafico fonts={{ title: TITLE, body: BODY }} />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
        <TransitionSeries.Transition presentation={fade()} timing={transicion} />
        <TransitionSeries.Sequence durationInFrames={OUTRO}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <LineaDeTiempo />
    </AbsoluteFill>
  );
};

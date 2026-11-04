import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, useGolpe, useSacudida } from "../salud/pop";
import { FPS, MITOS, Mito, SEG_CIERRE, SEG_GANCHO, SEG_INTRO, SEG_MITO } from "./datos";

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  // MITO y VERDAD se iluminan alternados, como un cartel
  const alterna = Math.floor(frame / 8) % 2 === 0;
  const sac = useSacudida(20, 14);
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0} giro={-8}>
        <div style={{ transform: `translateX(${sac}px)`, textAlign: "center" }}>
          <Grande size={170} color={P.rojo} style={{ opacity: alterna ? 1 : 0.45, textShadow: alterna ? `0 0 50px ${P.rojo}` : "none" }}>
            ¿MITO
          </Grande>
          <Grande size={90}>o</Grande>
          <Grande size={170} color={P.verde} style={{ opacity: alterna ? 0.45 : 1, textShadow: alterna ? "none" : `0 0 50px ${P.verde}` }}>
            VERDAD?
          </Grande>
        </div>
      </Golpe>
      <Golpe desde={30}>
        <Chico size={52}>
          6 cosas que creés sobre los <Marcador desde={40} color={P.amarillo}>triglicéridos</Marcador>
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Intro ───────────────────────────────────────────────────────────────
const Intro: React.FC = () => (
  <Pagina gap={50} centro>
    <Golpe desde={0}>
      <Emoji e="👀" size={170} />
    </Golpe>
    <Golpe desde={10}>
      <Grande size={86}>
        Respondé <Marcador desde={20} color={P.cian}>antes</Marcador> de que aparezca la respuesta
      </Grande>
    </Golpe>
    <Golpe desde={70}>
      <Chico size={52} color={P.texto2}>
        Y contá cuántas acertás ✍️
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 3. Un mito ─────────────────────────────────────────────────────────────
const Temporizador: React.FC<{ desde: number; hasta: number }> = ({ desde, hasta }) => {
  const frame = useCurrentFrame();
  if (frame < desde || frame >= hasta) return null;
  const p = interpolate(frame, [desde, hasta], [0, 1], clamp);
  const n = Math.max(1, 3 - Math.floor(p * 3));
  const golpe = interpolate((frame - desde) % ((hasta - desde) / 3), [0, 8], [1.3, 1], clamp);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
      <svg width={130} height={130} viewBox="0 0 130 130">
        <circle cx={65} cy={65} r={55} stroke="rgba(255,255,255,0.15)" strokeWidth={12} fill="none" />
        <circle
          cx={65}
          cy={65}
          r={55}
          stroke={P.amarillo}
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={346}
          strokeDashoffset={346 * p}
          transform="rotate(-90 65 65)"
        />
        <text x={65} y={86} textAnchor="middle" fontSize={64} fontWeight={800} fill={P.amarillo} fontFamily={SANS} transform={`translate(65 65) scale(${golpe}) translate(-65 -65)`}>
          {n}
        </text>
      </svg>
      <div style={{ fontFamily: SANS, fontSize: 50, fontWeight: 800, color: P.texto }}>¿Vos qué decís?</div>
    </div>
  );
};

const Sello: React.FC<{ desde: number; veredicto: Mito["veredicto"] }> = ({ desde, veredicto }) => {
  const frame = useCurrentFrame();
  const color = veredicto === "MITO" ? P.rojo : P.verde;
  const p = useGolpe(desde, 12);
  if (frame < desde) return null;
  return (
    <div
      style={{
        transform: `scale(${2.4 - 1.4 * p}) rotate(-8deg)`,
        opacity: Math.min(1, p * 2),
        border: `10px solid ${color}`,
        color,
        borderRadius: 24,
        padding: "6px 44px",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 130,
        letterSpacing: 6,
        background: "rgba(7,22,48,0.6)",
        boxShadow: `0 0 60px ${color}aa, inset 0 0 30px ${color}55`,
        textShadow: `0 0 30px ${color}`,
      }}
    >
      {veredicto === "MITO" ? "❌ MITO" : "✅ VERDAD"}
    </div>
  );
};

const PaginaMito: React.FC<{ m: Mito; numero: number }> = ({ m, numero }) => {
  const frame = useCurrentFrame();
  const sello = 135;
  const color = m.veredicto === "MITO" ? P.rojo : P.verde;
  const sac = useSacudida(sello, 20, 16);
  const flash = interpolate(frame, [sello, sello + 2, sello + 9], [0, 0.35, 0], clamp);
  return (
    <>
      <Pagina gap={34}>
        <Golpe desde={0}>
          <div
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 34,
              letterSpacing: 4,
              color: "#071630",
              background: P.amarillo,
              borderRadius: 999,
              padding: "10px 30px",
            }}
          >
            MITO O VERDAD · {numero}/{MITOS.length}
          </div>
        </Golpe>
        <div style={{ transform: `translateX(${sac}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <Golpe desde={4}>
            <Emoji e={m.emoji} size={150} />
          </Golpe>
          <Golpe desde={10}>
            <Grande size={78}>“{m.frase}”</Grande>
          </Golpe>
        </div>
        <Temporizador desde={40} hasta={sello} />
        <Sello desde={sello} veredicto={m.veredicto} />
        <Golpe desde={sello + 25}>
          <Vidrio color={color} style={{ width: 940, padding: "26px 34px" }}>
            <Chico size={44}>{m.explicacion}</Chico>
          </Vidrio>
        </Golpe>
      </Pagina>
      <AbsoluteFill style={{ background: color, opacity: flash, pointerEvents: "none" }} />
    </>
  );
};

// ─── 4. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0} giro={-6}>
      <Grande size={120}>
        ¿Cuántas <Marcador desde={12} color={P.amarillo}>acertaste</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={30}>
      <Chico size={52}>Contalo en los comentarios 💬</Chico>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={60} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={72} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={95}>
      <Chico size={32} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
export const PAGINAS_MITOS = [
  { id: "gancho", seg: SEG_GANCHO, Escena: Gancho },
  { id: "intro", seg: SEG_INTRO, Escena: Intro },
  ...MITOS.map((m, i) => ({ id: `mito${i + 1}`, seg: SEG_MITO, Escena: () => <PaginaMito m={m} numero={i + 1} /> })),
  { id: "cierre", seg: SEG_CIERRE, Escena: Cierre },
];

export const Mitos: React.FC = () => (
  <ReelPop
    paginas={PAGINAS_MITOS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --estilo energico (ver README)
    musica={staticFile("audio/mitos-musica.mp3")}
  />
);

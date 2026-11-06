import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { FPS, NEURONAS_POR_MINUTO, OTRAS, PAGINAS, PaginaId, QUE_HACER, RIESGOS } from "./datos";

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const late = 1 + 0.06 * Math.max(0, Math.sin(frame / 6));
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ transform: `scale(${late})` }}>
          <Emoji e="🧠" size={170} />
        </div>
      </Golpe>
      <Golpe desde={8}>
        <Grande size={86}>Esto puede salvar una vida</Grande>
      </Golpe>
      <Golpe desde={45} giro={-4}>
        <Grande size={80}>
          Cómo reconocer un <Marcador desde={55} color={P.rojo} texto="#fff">ACV</Marcador> en 3 pasos
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es: un vaso que se tapa o se rompe ──────────────────────────────
const Vasos: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 940;
  const tapa = interpolate(frame, [120, 160], [0, 1], { ...clamp, easing: suave });
  const rompe = interpolate(frame, [230, 270], [0, 1], { ...clamp, easing: suave });
  const flujo = (y: number, frena: number, desde = 0) =>
    Array.from({ length: 7 }).map((_, i) => {
      const x = ((frame * (6 - 5 * frena) + i * 70) % 420) + 20;
      const corte = frena > 0.5 && x > 220;
      return corte || frame < desde ? null : <circle key={i} cx={x} cy={y} r={11} fill={P.rojo} />;
    });
  return (
    <svg width={W} height={330} viewBox={`0 0 ${W} 330`}>
      {/* vaso que se tapa */}
      <text x={20} y={40} fontFamily={SANS} fontSize={32} fontWeight={800} fill={P.texto2}>
        Se tapa (el más común)
      </text>
      <rect x={20} y={70} width={440} height={60} rx={30} fill="#3a0d22" stroke="#ff7a86" strokeWidth={4} />
      {flujo(100, tapa)}
      <circle cx={240} cy={100} r={26 * tapa} fill={P.amarillo} style={{ filter: `drop-shadow(0 0 10px ${P.amarillo})` }} />
      {/* vaso que se rompe */}
      <text x={20} y={210} fontFamily={SANS} fontSize={32} fontWeight={800} fill={P.texto2}>
        Se rompe
      </text>
      <rect x={20} y={240} width={440} height={60} rx={30} fill="#3a0d22" stroke="#ff7a86" strokeWidth={4} />
      {flujo(270, rompe, 180)}
      <ellipse cx={250} cy={300} rx={70 * rompe} ry={30 * rompe} fill={P.rojo} opacity={0.75} style={{ filter: "blur(3px)" }} />
      {/* cerebro que se apaga */}
      <g transform="translate(560 40)">
        <text x={170} y={250} textAnchor="middle" fontSize={230} fontFamily="'Noto Color Emoji', sans-serif" opacity={1 - 0.5 * Math.max(tapa, rompe)}>
          🧠
        </text>
        <text x={290} y={60} fontSize={70} opacity={Math.max(tapa, rompe)} fontFamily="'Noto Color Emoji', sans-serif">
          ⚠️
        </text>
      </g>
    </svg>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={30}>
    <Golpe desde={0}>
      <Grande size={88}>
        ¿Qué es un <Marcador desde={10} color={P.rojo} texto="#fff">ACV</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={44}>
        Un <b style={{ color: P.rojo }}>ataque cerebral</b>: un vaso del cerebro se tapa o se rompe, y esa zona se queda sin oxígeno.
      </Chico>
    </Golpe>
    <Golpe desde={60}>
      <Vasos />
    </Golpe>
  </Pagina>
);

// ─── 3. El tiempo es cerebro ────────────────────────────────────────────────
const Tiempo: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [20, 150], [0, NEURONAS_POR_MINUTO], { ...clamp, easing: suave }));
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <Emoji e="⏱️" size={130} />
      </Golpe>
      <Golpe desde={10}>
        <Grande size={80}>Cada minuto sin tratamiento se pierden casi</Grande>
      </Golpe>
      <div style={{ fontFamily: SANS, fontSize: 130, fontWeight: 800, color: P.rojo, textShadow: `0 0 40px ${P.rojo}`, fontVariantNumeric: "tabular-nums" }}>
        {n.toLocaleString("es-AR")}
      </div>
      <Golpe desde={30}>
        <Grande size={70}>neuronas 🧠</Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 4-6. La prueba de los 3 pasos ──────────────────────────────────────────
const Paso: React.FC<{ n: number; titulo: string; pregunta: string; color: string; children: React.ReactNode }> = ({ n, titulo, pregunta, color, children }) => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            background: color,
            color: "#071630",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px ${color}`,
          }}
        >
          {n}
        </div>
        <Grande size={84}>{titulo}</Grande>
      </div>
    </Golpe>
    <Golpe desde={15}>{children}</Golpe>
    <Golpe desde={120}>
      <Vidrio color={P.rojo} style={{ width: 940, padding: "18px 28px" }}>
        <Chico size={44}>
          🚩 <b style={{ color: P.rojo }}>{pregunta}</b>
        </Chico>
      </Vidrio>
    </Golpe>
  </Pagina>
);

const Cara: React.FC = () => {
  const frame = useCurrentFrame();
  const cae = interpolate(frame, [80, 120], [0, 1], { ...clamp, easing: suave });
  // boca: sonrisa simétrica que se cae del lado derecho
  const boca = `M120 230 Q200 ${290 - 20 * cae} ${280 - 6 * cae} ${230 + 40 * cae}`;
  return (
    <svg width={400} height={400} viewBox="0 0 400 400">
      <circle cx={200} cy={200} r={170} fill="#ffd9a8" stroke={P.amarillo} strokeWidth={8} style={{ filter: `drop-shadow(0 0 20px ${P.amarillo})` }} />
      <circle cx={140} cy={150} r={18} fill="#2b2d42" />
      <ellipse cx={260} cy={150 + 6 * cae} rx={18} ry={18 - 6 * cae} fill="#2b2d42" />
      <path d={boca} fill="none" stroke="#2b2d42" strokeWidth={14} strokeLinecap="round" />
      {cae > 0.5 && (
        <text x={330} y={300} fontSize={60} fontFamily="'Noto Color Emoji', sans-serif">
          ⬇️
        </text>
      )}
    </svg>
  );
};

const Brazos: React.FC = () => {
  const frame = useCurrentFrame();
  const sube = interpolate(frame, [15, 45], [0, 1], { ...clamp, easing: suave });
  const cae = interpolate(frame, [80, 140], [0, 1], { ...clamp, easing: suave });
  const izq = -80 * sube;
  const der = -80 * sube + 70 * cae;
  return (
    <svg width={600} height={420} viewBox="0 0 600 420">
      {/* cuerpo */}
      <circle cx={300} cy={110} r={60} fill="#ffd9a8" stroke={P.cian} strokeWidth={6} />
      <rect x={240} y={180} width={120} height={200} rx={40} fill={P.cian} opacity={0.5} stroke={P.cian} strokeWidth={6} />
      {/* brazos: giran desde los hombros */}
      <g transform={`rotate(${-izq} 245 200)`}>
        <rect x={60} y={185} width={185} height={34} rx={17} fill="#ffd9a8" stroke={P.cian} strokeWidth={5} />
      </g>
      <g transform={`rotate(${der} 355 200)`}>
        <rect x={355} y={185} width={185} height={34} rx={17} fill="#ffd9a8" stroke={cae > 0.3 ? P.rojo : P.cian} strokeWidth={5} />
      </g>
    </svg>
  );
};

const Habla: React.FC = () => {
  const frame = useCurrentFrame();
  const frase = "Hoy es un lindo día";
  const traba = frame > 80;
  const texto = traba
    ? frase
        .split("")
        .map((c, i) => (c === " " ? " " : (Math.floor(frame / 6) + i) % 4 === 0 ? "…" : c))
        .join("")
    : frase.slice(0, Math.floor(interpolate(frame, [15, 60], [0, frase.length], clamp)));
  const sac = traba ? Math.sin(frame * 1.7) * 4 : 0;
  return (
    <div style={{ position: "relative", width: 860, transform: `translateX(${sac}px)` }}>
      <Vidrio color={traba ? P.rojo : P.verde} style={{ padding: "40px 40px", borderRadius: 60 }}>
        <div style={{ fontFamily: SANS, fontSize: 76, fontWeight: 800, color: P.texto, textAlign: "center", minHeight: 100 }}>“{texto}”</div>
      </Vidrio>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Emoji e="🗣️" size={110} />
      </div>
    </div>
  );
};

const Sonreir: React.FC = () => (
  <Paso n={1} titulo="Pedile que sonría 😁" pregunta="¿Se le cae un lado de la cara?" color={P.amarillo}>
    <Cara />
  </Paso>
);

const LevantaBrazos: React.FC = () => (
  <Paso n={2} titulo="Que levante los brazos 🙌" pregunta="¿Uno se le cae o no lo puede subir?" color={P.cian}>
    <Brazos />
  </Paso>
);

const Hablar: React.FC = () => (
  <Paso n={3} titulo="Que repita una frase 🗣️" pregunta="¿Habla raro, trabado o no te entiende?" color={P.verde}>
    <Habla />
  </Paso>
);

// ─── 7. Otras señales ───────────────────────────────────────────────────────
const Otras: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={86}>
        Otras <Marcador desde={10} color={P.amarillo}>señales</Marcador> de golpe
      </Grande>
    </Golpe>
    {OTRAS.map((o, i) => (
      <Fila key={o.texto} desde={28 + i * 55} emoji={o.emoji} color={P.amarillo} flecha="!">
        {o.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 8. Qué hacer ───────────────────────────────────────────────────────────
const QueHacer: React.FC = () => {
  const frame = useCurrentFrame();
  const sirena = Math.floor(frame / 8) % 2 === 0;
  const sac = useSacudida(20, 12);
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <div
            style={{
              width: 940,
              background: sirena ? P.rojo : "#c9303f",
              borderRadius: 30,
              padding: "20px 30px",
              boxShadow: `0 0 60px ${P.rojo}${sirena ? "cc" : "55"}`,
              fontFamily: SANS,
              fontSize: 54,
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
            }}
          >
            🚨 Si falla UNA sola prueba
          </div>
        </div>
      </Golpe>
      {QUE_HACER.map((q, i) => (
        <Fila key={q.texto} desde={40 + i * 75} emoji={q.emoji} color={i === 0 ? P.rojo : P.amarillo} flecha="" numero={i + 1}>
          {q.texto}
        </Fila>
      ))}
    </Pagina>
  );
};

// ─── 9. Factores de riesgo ──────────────────────────────────────────────────
const Riesgo: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={80}>
        Se puede <Marcador desde={10} color={P.verde}>prevenir</Marcador> cuidando…
      </Grande>
    </Golpe>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", width: 940 }}>
      {RIESGOS.map((r, i) => {
        const p = useGolpe(25 + i * 18, 9);
        return (
          <div
            key={r}
            style={{
              transform: `scale(${p})`,
              fontFamily: SANS,
              fontSize: 42,
              fontWeight: 800,
              color: P.texto,
              border: `3px solid ${P.verde}`,
              borderRadius: 999,
              padding: "12px 26px",
              background: P.vidrio,
              boxShadow: `0 0 20px ${P.verde}55`,
            }}
          >
            {r}
          </div>
        );
      })}
    </div>
  </Pagina>
);

// ─── 10. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={40} centro>
    <Golpe desde={0}>
      <div style={{ display: "flex", gap: 20 }}>
        <Emoji e="😁" size={110} />
        <Emoji e="🙌" size={110} />
        <Emoji e="🗣️" size={110} />
      </div>
    </Golpe>
    <Golpe desde={10}>
      <Grande size={80}>
        Sonreír, brazos, hablar… y <Marcador desde={25} color={P.rojo} texto="#fff">llamar YA</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={45} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={58} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={80}>
      <Chico size={32} color={P.texto2}>
        Compartilo: puede salvar una vida. No reemplaza la consulta médica.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  tiempo: Tiempo,
  sonreir: Sonreir,
  brazos: LevantaBrazos,
  hablar: Hablar,
  otras: Otras,
  queHacer: QueHacer,
  riesgo: Riesgo,
  cierre: Cierre,
};

export const Acv: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,8,8,8,8,12,14,8,8 --transponer 1 --bpm 116 --estilo energico
    musica={staticFile("audio/acv-musica.mp3")}
  />
);

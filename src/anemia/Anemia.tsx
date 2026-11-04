import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { CAUSAS, FPS, HIERRO, PAGINAS, PaginaId, SINTOMAS, UMBRALES } from "./datos";

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  // la "batería" se descarga
  const carga = interpolate(frame, [0, 60], [1, 0.12], { ...clamp, easing: suave });
  const parpadeo = frame > 60 && Math.floor(frame / 6) % 2 === 0 ? 0.4 : 1;
  const sac = useSacudida(62, 12);
  return (
    <Pagina gap={36} centro>
      <Golpe desde={0}>
        <div style={{ display: "flex", alignItems: "center", gap: 30, transform: `translateX(${sac}px)` }}>
          <Emoji e="😴" size={150} />
          <div style={{ position: "relative", width: 300, height: 140, border: `8px solid ${P.texto}`, borderRadius: 26, padding: 10 }}>
            <div
              style={{
                width: `${carga * 100}%`,
                height: "100%",
                borderRadius: 12,
                background: carga > 0.4 ? P.verde : P.rojo,
                opacity: parpadeo,
                boxShadow: `0 0 30px ${carga > 0.4 ? P.verde : P.rojo}`,
              }}
            />
            <div style={{ position: "absolute", right: -26, top: 40, width: 18, height: 44, borderRadius: 6, background: P.texto }} />
          </div>
        </div>
      </Golpe>
      <Golpe desde={8}>
        <Grande size={110}>¿Siempre cansado?</Grande>
      </Golpe>
      <Golpe desde={45} giro={-6}>
        <Grande size={96}>
          Podría ser <Marcador desde={55} color={P.rojo} texto="#fff">anemia</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es: glóbulos rojos que llevan oxígeno ───────────────────────────
const Globulos: React.FC<{ faltanDesde: number }> = ({ faltanDesde }) => {
  const frame = useCurrentFrame();
  const W = 940;
  const H = 360;
  const faltan = interpolate(frame, [faltanDesde, faltanDesde + 50], [0, 1], clamp);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect x={0} y={0} width={W} height={H} rx={40} fill="#3a0d22" stroke="#ff7a86" strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => {
        // la mitad de los glóbulos desaparece cuando hay anemia
        const desaparece = i % 2 === 1;
        const op = desaparece ? 1 - faltan : 1;
        const x = ((frame * 5 + i * 90) % (W + 120)) - 60;
        const y = H / 2 + Math.sin(i * 2.1 + frame / 20) * 100;
        return (
          <g key={i} opacity={op} transform={`translate(${x} ${y})`}>
            <ellipse rx={36} ry={26} fill={P.rojo} stroke="#ffb3ba" strokeWidth={4} />
            <ellipse rx={16} ry={10} fill="#c7344a" />
            <circle cx={30} cy={-26} r={14} fill={P.cian} opacity={0.9} />
            <text x={30} y={-21} textAnchor="middle" fontSize={14} fontWeight={800} fill="#071630" fontFamily={SANS}>
              O₂
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={36}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Qué es la <Marcador desde={8} color={P.rojo} texto="#fff">anemia</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={22}>
      <Chico size={48}>
        Los <b style={{ color: P.rojo }}>glóbulos rojos</b> llevan el <b style={{ color: P.cian }}>oxígeno</b> a todo tu cuerpo.
      </Chico>
    </Golpe>
    <Golpe desde={35}>
      <Globulos faltanDesde={140} />
    </Golpe>
    <Golpe desde={130} giro={4}>
      <Grande size={62}>
        Con anemia hay <Marcador desde={140} color={P.amarillo}>menos</Marcador>, y llega menos oxígeno
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 3. Síntomas: grilla de emojis ──────────────────────────────────────────
const Sintoma: React.FC<{ desde: number; emoji: string; texto: string }> = ({ desde, emoji, texto }) => {
  const p = useGolpe(desde, 9);
  const frame = useCurrentFrame();
  return (
    <div style={{ transform: `scale(${p})`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={P.amarillo} style={{ width: 290, height: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <Emoji e={emoji} size={100} />
        <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: P.texto, textAlign: "center", lineHeight: 1.15, padding: "0 10px" }}>{texto}</div>
      </Vidrio>
    </div>
  );
};

const Sintomas: React.FC = () => (
  <Pagina gap={30}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 24 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={30 + i * 40} emoji={s.emoji} texto={s.texto} />
      ))}
    </div>
  </Pagina>
);

// ─── 4. Valores ─────────────────────────────────────────────────────────────
const Umbral: React.FC<{ desde: number; quien: string; emoji: string; valor: number }> = ({ desde, quien, emoji, valor }) => {
  const frame = useCurrentFrame();
  const p = useGolpe(desde, 12);
  const n = interpolate(frame, [desde, desde + 25], [0, valor], { ...clamp, easing: suave });
  return (
    <div style={{ transform: `scale(${p})`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={P.rojo} style={{ width: 940, padding: "18px 32px", display: "flex", alignItems: "center", gap: 26 }}>
        <Emoji e={emoji} size={80} />
        <div style={{ flex: 1, fontFamily: SANS, fontSize: 46, fontWeight: 800, color: P.texto }}>{quien}</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, color: P.rojo, textShadow: `0 0 24px ${P.rojo}`, fontSize: 84, fontVariantNumeric: "tabular-nums" }}>
          {"< "}
          {Math.round(n)}
          <span style={{ fontSize: 34, color: P.texto2, textShadow: "none" }}> g/dL</span>
        </div>
      </Vidrio>
    </div>
  );
};

const Valores: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={92}>
        <Marcador desde={8} color={P.cian}>Hemoglobina</Marcador> baja
      </Grande>
    </Golpe>
    <Golpe desde={18}>
      <Chico size={42} color={P.texto2}>
        Hay anemia si está por debajo de:
      </Chico>
    </Golpe>
    {UMBRALES.map((u, i) => (
      <Umbral key={u.quien} desde={40 + i * 50} {...u} />
    ))}
    <Golpe desde={210}>
      <Chico size={44}>
        Se mide con un <b style={{ color: P.amarillo }}>hemograma</b> 🩸
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Causas ──────────────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Por qué <Marcador desde={10} color={P.rojo} texto="#fff">pasa</Marcador>?
      </Grande>
    </Golpe>
    {CAUSAS.map((c, i) => (
      <Fila key={c.texto} desde={28 + i * 45} emoji={c.emoji} color={P.rojo} flecha="!">
        {c.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 6. Dónde hay hierro ────────────────────────────────────────────────────
const Hierro: React.FC = () => (
  <Pagina gap={22}>
    <Golpe desde={0}>
      <Grande size={92}>
        Comidas con <Marcador desde={10} color={P.verde}>hierro</Marcador>
      </Grande>
    </Golpe>
    {HIERRO.map((h, i) => (
      <Fila key={h.texto} desde={28 + i * 50} emoji={h.emoji} color={P.verde} flecha="✓">
        {h.texto}
      </Fila>
    ))}
    <Golpe desde={250}>
      <Chico size={34} color={P.texto2}>
        El hierro de las carnes se absorbe mejor que el de los vegetales.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. Trucos ──────────────────────────────────────────────────────────────
const Truco: React.FC<{ desde: number; emoji: string; color: string; titulo: React.ReactNode; texto: string }> = ({
  desde,
  emoji,
  color,
  titulo,
  texto,
}) => {
  const p = useGolpe(desde, 10);
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: frame >= desde ? 1 : 0, transform: `translateY(${(1 - p) * 120}px) scale(${0.85 + 0.15 * p})` }}>
      <Vidrio color={color} style={{ width: 940, padding: "24px 30px", display: "flex", alignItems: "center", gap: 26 }}>
        <Emoji e={emoji} size={100} />
        <div style={{ flex: 1, fontFamily: SANS }}>
          <div style={{ fontSize: 46, fontWeight: 800, color, lineHeight: 1.15 }}>{titulo}</div>
          <div style={{ fontSize: 36, fontWeight: 600, color: P.texto, lineHeight: 1.3, marginTop: 6 }}>{texto}</div>
        </div>
      </Vidrio>
    </div>
  );
};

const Trucos: React.FC = () => {
  const sac = useSacudida(190, 12);
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={96}>
          3 <Marcador desde={10} color={P.amarillo}>trucos</Marcador>
        </Grande>
      </Golpe>
      <Truco desde={30} emoji="🍊" color={P.verde} titulo="Sumá vitamina C" texto="Cítricos, tomate o morrón en la misma comida ayudan a absorber el hierro." />
      <div style={{ transform: `translateX(${sac}px)` }}>
        <Truco
          desde={180}
          emoji="🧉"
          color={P.amarillo}
          titulo="¡Ojo con el mate!"
          texto="El mate, el café y el té frenan el hierro: tomalos lejos de las comidas."
        />
      </div>
      <Truco desde={330} emoji="⚠️" color={P.rojo} titulo="No tomes hierro por tu cuenta" texto="Primero hay que saber la causa. Lo indica tu médico." />
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🩸" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={92}>
        Si te sentís así, pedí un <Marcador desde={20} color={P.amarillo}>hemograma</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={45} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={58} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={80}>
      <Chico size={32} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  sintomas: Sintomas,
  valores: Valores,
  causas: Causas,
  hierro: Hierro,
  trucos: Trucos,
  cierre: Cierre,
};

export const Anemia: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --estilo energico (ver README)
    musica={staticFile("audio/anemia-musica.mp3")}
  />
);

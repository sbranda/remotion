// Reel de 90 s: apnea del sueño, estilo neón.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave } from "../salud/pop";

const FPS = 30;

// ─── Vía aérea: corte de la garganta ────────────────────────────────────────
const ViaAerea: React.FC<{ cierre: number; ancho?: number }> = ({ cierre, ancho = 560 }) => {
  const frame = useCurrentFrame();
  const lengua = 250 + 100 * cierre; // borde de la lengua avanza hacia la pared de atrás (x=360)
  return (
    <svg width={ancho} height={ancho * 0.9} viewBox="0 0 600 540" style={{ overflow: "visible" }}>
      {/* pared de atrás */}
      <path d="M370 0 L370 540 L600 540 L600 0 Z" fill="#5a1d3a" />
      <line x1={370} y1={0} x2={370} y2={540} stroke={P.rojo} strokeWidth={6} />
      {/* lengua y paladar blando */}
      <path d={`M0 0 L230 0 Q240 120 ${lengua} 230 Q${lengua + 10} 300 230 360 L230 540 L0 540 Z`} fill="#7a2a4a" stroke={P.rojo} strokeWidth={6} />
      <text x={110} y={260} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill="#ffd0dc">
        lengua
      </text>
      {/* partículas de aire */}
      {Array.from({ length: 10 }).map((_, i) => {
        const vel = cierre > 0.9 ? 0 : 1 - cierre * 0.7;
        let y = ((frame * 6 * vel + i * 54) % 540);
        if (cierre > 0.9 && y > 170) y = 140 - (i % 4) * 30;
        const x = 300 + Math.sin(i * 1.7) * 30 * (1 - cierre);
        return <circle key={i} cx={x} cy={y} r={11} fill={P.cian} opacity={0.9} style={{ filter: `drop-shadow(0 0 8px ${P.cian})` }} />;
      })}
      {cierre > 0.9 && (
        <text x={460} y={240} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={90} fill={P.amarillo} opacity={0.6 + 0.4 * Math.sin(frame / 3)}>
          ✕
        </text>
      )}
    </svg>
  );
};

// ─── Onda de respiración con pausa y jadeo ─────────────────────────────────
const Onda: React.FC<{ p: number }> = ({ p }) => {
  const pts: string[] = [];
  for (let x = 0; x <= 900; x += 6) {
    let y = 90;
    if (x < 330) y = 90 - 45 * Math.sin(x / 26);
    else if (x < 620) y = 90 - 4 * Math.sin(x / 10);
    else if (x < 700) y = 90 - 80 * Math.sin((x - 620) / 25);
    else y = 90 - 45 * Math.sin(x / 26);
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y}`);
  }
  return (
    <svg width={900} height={220} viewBox="0 0 900 220" style={{ overflow: "visible" }}>
      <path d={pts.join(" ")} stroke={P.cian} strokeWidth={7} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ filter: `drop-shadow(0 0 10px ${P.cian})` }} />
      <g opacity={p > 0.5 ? 1 : 0}>
        <rect x={340} y={150} width={270} height={56} rx={14} fill={P.rojo} />
        <text x={475} y={190} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill="#fff">
          PAUSA ≥ 10 s
        </text>
      </g>
      <text x={660} y={0} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={P.amarillo} opacity={p > 0.75 ? 1 : 0}>
        ¡jadeo!
      </text>
    </svg>
  );
};

// ─── Medidor de oxígeno ─────────────────────────────────────────────────────
const Oxigeno: React.FC<{ valor: number }> = ({ valor }) => {
  const color = valor > 93 ? P.verde : valor > 88 ? P.amarillo : P.rojo;
  const frac = (valor - 75) / 25;
  return (
    <Vidrio color={color} style={{ width: 420, padding: "18px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 700, color: P.texto2 }}>Oxígeno en sangre</div>
      <div style={{ fontFamily: SANS, fontSize: 120, fontWeight: 800, color, lineHeight: 1, textShadow: `0 0 30px ${color}` }}>{Math.round(valor)}%</div>
      <div style={{ width: 360, height: 22, borderRadius: 11, background: "rgba(255,255,255,0.12)" }}>
        <div style={{ width: `${Math.max(0, Math.min(1, frac)) * 100}%`, height: "100%", borderRadius: 11, background: color }} />
      </div>
    </Vidrio>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const z = frame < 70;
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 150, color: z ? P.cian : P.texto2, textShadow: z ? `0 0 30px ${P.cian}` : "none", transform: `scale(${z ? 1 + 0.06 * Math.sin(frame / 4) : 0.9})` }}>{z ? "ZZZ…" : "…"}</div>
      </Golpe>
      <Golpe desde={10}>
        <Grande size={86}>Roncás fuerte…</Grande>
      </Golpe>
      <Golpe desde={70} giro={-5}>
        <Grande size={90}>
          <Marcador desde={80} color={P.rojo} texto="#fff">y de repente, silencio.</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [60, 200], [0, 1], clamp);
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <Grande size={84}>
          ¿Qué es la <Marcador desde={12} color={P.cian}>apnea del sueño</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={30}>
        <Chico size={44}>
          Mientras dormís, <b style={{ color: P.rojo }}>dejás de respirar</b> por 10 segundos o más.
        </Chico>
      </Golpe>
      <Onda p={p} />
      <Golpe desde={210}>
        <Chico size={42}>
          Y puede pasar <b style={{ color: P.amarillo }}>decenas o cientos de veces</b> por noche… sin que te enteres.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 3. Qué pasa en la garganta ─────────────────────────────────────────────
const Garganta: React.FC = () => {
  const frame = useCurrentFrame();
  const cierre = interpolate(frame, [150, 230, 380, 410], [0, 1, 1, 0], { ...clamp, easing: suave });
  const texto = frame < 150 ? 0 : frame < 380 ? 1 : 2;
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Grande size={78}>
          ¿Qué pasa en la <Marcador desde={12} color={P.rojo} texto="#fff">garganta</Marcador>?
        </Grande>
      </Golpe>
      <ViaAerea cierre={cierre} ancho={520} />
      <Vidrio color={[P.cian, P.rojo, P.verde][texto]} style={{ width: 940, padding: "16px 26px" }}>
        <Chico size={38}>
          {texto === 0 && (
            <>
              Despierto, los músculos mantienen el paso <b style={{ color: P.cian }}>abierto</b> y el aire fluye.
            </>
          )}
          {texto === 1 && (
            <>
              Dormido se <b style={{ color: P.rojo }}>relajan</b>: la lengua y la garganta caen hacia atrás y <b style={{ color: P.rojo }}>tapan</b> el paso. Antes de cerrarse, vibran: es el ronquido.
            </>
          )}
          {texto === 2 && (
            <>
              Hasta que el cerebro <b style={{ color: P.verde }}>reacciona</b> y lo vuelve a abrir.
            </>
          )}
        </Chico>
      </Vidrio>
    </Pagina>
  );
};

// ─── 4. El ciclo ────────────────────────────────────────────────────────────
const Ciclo: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame % 150;
  const valor = interpolate(t, [0, 90, 110, 150], [97, 82, 82, 97], clamp);
  const alarma = t > 90 && t < 120;
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={80}>
          Un ciclo que se <Marcador desde={12} color={P.amarillo}>repite</Marcador>
        </Grande>
      </Golpe>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Oxigeno valor={valor} />
        <div style={{ transform: `scale(${alarma ? 1.2 : 1}) rotate(${alarma ? Math.sin(frame) * 10 : 0}deg)` }}>
          <Emoji e={alarma ? "🚨" : "🧠"} size={150} />
        </div>
      </div>
      <Fila desde={30} emoji="🚫" color={P.rojo} flecha="1">
        No entra aire y baja el oxígeno
      </Fila>
      <Fila desde={110} emoji="🚨" color={P.amarillo} flecha="2">
        El cerebro da la alarma
      </Fila>
      <Fila desde={190} emoji="😮‍💨" color={P.cian} flecha="3">
        Te despertás un instante, con un jadeo
      </Fila>
      <Fila desde={270} emoji="🔁" color={P.violeta} flecha="4">
        Volvés a dormir… y empieza de nuevo
      </Fila>
    </Pagina>
  );
};

// ─── 5. Señales ─────────────────────────────────────────────────────────────
const SENALES = [
  { emoji: "📢", texto: "Ronquidos muy fuertes", color: P.cian },
  { emoji: "👀", texto: "Pausas que ve tu pareja", color: P.rojo },
  { emoji: "😮‍💨", texto: "Despertarte ahogado", color: P.amarillo },
  { emoji: "🥱", texto: "Sueño y cansancio de día", color: P.violeta },
  { emoji: "🤕", texto: "Dolor de cabeza al despertar", color: P.verde },
  { emoji: "🚽", texto: "Ir al baño de noche", color: P.cian },
];

const Senales: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={84}>
        <Marcador desde={12} color={P.amarillo}>Señales</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {SENALES.map((s, i) => (
        <Sintoma key={s.texto} desde={25 + i * 35} emoji={s.emoji} texto={s.texto} color={s.color} />
      ))}
    </div>
    <Golpe desde={270}>
      <Chico size={36} color={P.texto2}>
        Dormís 8 horas… pero tu cuerpo no descansa.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Riesgos ─────────────────────────────────────────────────────────────
const Riesgos: React.FC = () => (
  <Pagina gap={22}>
    <Golpe desde={0}>
      <Grande size={80}>
        Si no se trata, <Marcador desde={12} color={P.rojo} texto="#fff">aumenta el riesgo</Marcador> de:
      </Grande>
    </Golpe>
    <Fila desde={35} emoji="🩺" color={P.rojo} flecha="↑">
      Presión alta
    </Fila>
    <Fila desde={75} emoji="💓" color={P.rojo} flecha="↑">
      Arritmias, infarto y ACV
    </Fila>
    <Fila desde={115} emoji="🍬" color={P.amarillo} flecha="↑">
      Diabetes
    </Fila>
    <Fila desde={155} emoji="🚗" color={P.amarillo} flecha="↑">
      Accidentes por dormirte manejando
    </Fila>
  </Pagina>
);

// ─── 7. Qué la favorece ─────────────────────────────────────────────────────
const Factores: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={80}>
        Qué la <Marcador desde={12} color={P.violeta} texto="#fff">favorece</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", width: 940 }}>
      {[
        { e: "⚖️", t: "Sobrepeso" },
        { e: "👔", t: "Cuello ancho" },
        { e: "🍷", t: "Alcohol de noche" },
        { e: "💊", t: "Pastillas para dormir" },
        { e: "🚬", t: "Cigarrillo" },
        { e: "🛌", t: "Dormir boca arriba" },
        { e: "👴", t: "Más edad" },
      ].map((x, i) => (
        <Golpe key={x.t} desde={25 + i * 18}>
          <Vidrio color={P.violeta} style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <Emoji e={x.e} size={52} />
            <span style={{ fontFamily: SANS, fontSize: 38, fontWeight: 700, color: P.texto }}>{x.t}</span>
          </Vidrio>
        </Golpe>
      ))}
    </div>
    <Golpe desde={170}>
      <Chico size={36} color={P.texto2}>
        Pero también puede tenerla gente delgada y joven.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 8. Qué hacer ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={80}>
        Se <Marcador desde={12} color={P.verde}>diagnostica y se trata</Marcador>
      </Grande>
    </Golpe>
    <Fila desde={30} emoji="🔬" color={P.cian} flecha="✓">
      Con un estudio del sueño (polisomnografía)
    </Fila>
    <Fila desde={80} emoji="😷" color={P.verde} flecha="✓">
      CPAP: una máscara que mantiene la vía abierta
    </Fila>
    <Fila desde={130} emoji="🏃" color={P.verde} flecha="✓">
      Bajar de peso y evitar alcohol de noche
    </Fila>
    <Fila desde={180} emoji="↪️" color={P.verde} flecha="✓">
      Dormir de costado
    </Fila>
  </Pagina>
);

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={84}>
        Roncar fuerte <Marcador desde={15} color={P.amarillo}>no es normal</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={40} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={55} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={75}>
      <Chico size={30} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "queEs", seg: 10, Escena: QueEs },
  { id: "garganta", seg: 15, Escena: Garganta },
  { id: "ciclo", seg: 15, Escena: Ciclo },
  { id: "senales", seg: 12, Escena: Senales },
  { id: "riesgos", seg: 10, Escena: Riesgos },
  { id: "factores", seg: 8, Escena: Factores },
  { id: "ayuda", seg: 10, Escena: Ayuda },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_APNEA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const ApneaSueno: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,10,15,15,12,10,8,10,5 --bpm 100 --transponer 1 --estilo energico
    musica={staticFile("audio/apnea-musica.mp3")}
  />
);

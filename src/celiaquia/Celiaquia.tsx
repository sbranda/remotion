import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { COMPARACION, CONTAMINACION, FPS, PAGINAS, PaginaId, SINTOMAS, TACC } from "./datos";

// ─── Vellosidades del intestino ─────────────────────────────────────────────
const Vellosidades: React.FC<{ dano: number; gluten?: number }> = ({ dano, gluten = 0 }) => {
  const frame = useCurrentFrame();
  const W = 900;
  const n = 11;
  const alto = 200 - 160 * dano;
  return (
    <svg width={W} height={340} viewBox={`0 0 ${W} 340`}>
      {/* pared del intestino */}
      <rect x={0} y={270} width={W} height={60} rx={20} fill="#7a2a3a" />
      {Array.from({ length: n }).map((_, i) => {
        const x = 40 + i * ((W - 80) / (n - 1));
        const ondula = Math.sin(frame / 12 + i) * 6 * (1 - dano);
        const ancho = 52 + 22 * dano;
        return (
          <path
            key={i}
            d={`M${x - ancho / 2} 275 L${x - ancho / 2 + ondula} ${275 - alto + ancho / 2} A${ancho / 2} ${ancho / 2} 0 0 1 ${x + ancho / 2 + ondula} ${275 - alto + ancho / 2} L${x + ancho / 2} 275 Z`}
            fill={dano > 0.5 ? "#c45a6a" : "#ff8fa0"}
            stroke={dano > 0.5 ? P.rojo : "#ffb3be"}
            strokeWidth={4}
          />
        );
      })}
      {/* partículas de gluten que caen */}
      {gluten > 0 &&
        Array.from({ length: 14 }).map((_, i) => {
          const y = ((frame * 4 + i * 37) % 260) - 10;
          return <circle key={`g${i}`} cx={40 + ((i * 67) % (W - 80))} cy={y} r={9} fill={P.amarillo} opacity={gluten} style={{ filter: `drop-shadow(0 0 6px ${P.amarillo})` }} />;
        })}
    </svg>
  );
};

// ─── Sello "Sin TACC" (genérico, no el logo oficial) ────────────────────────
const SelloSinTacc: React.FC<{ size?: number }> = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <circle cx={100} cy={100} r={92} fill="#ffffff" stroke={P.verde} strokeWidth={10} />
    <text x={100} y={112} textAnchor="middle" fontSize={78} fontFamily="'Noto Color Emoji', sans-serif">
      🌾
    </text>
    <line x1={42} y1={150} x2={158} y2={46} stroke={P.rojo} strokeWidth={12} strokeLinecap="round" />
    <text x={100} y={180} textAnchor="middle" fontFamily={SANS} fontSize={26} fontWeight={800} fill="#071630">
      SIN TACC
    </text>
  </svg>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const sac = useSacudida(40, 12);
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ display: "flex", gap: 20, transform: `translateX(${sac}px)` }}>
          <Emoji e="🍕" size={120} />
          <Emoji e="➡️" size={90} />
          <Emoji e="🎈" size={120} />
        </div>
      </Golpe>
      <Golpe desde={10}>
        <Grande size={80}>¿Comés pan o pizza y se te hincha la panza?</Grande>
      </Golpe>
      <Golpe desde={55} giro={-4}>
        <Grande size={80}>
          Puede ser el <Marcador desde={65} color={P.amarillo}>gluten</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es el gluten ────────────────────────────────────────────────────
const Gluten: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26} centro>
      <Golpe desde={0}>
        <Grande size={84}>
          ¿Qué es el <Marcador desde={10} color={P.amarillo}>gluten</Marcador>? 🌾
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={44}>Una proteína de algunos cereales. Por eso en Argentina se habla de TACC:</Chico>
      </Golpe>
      <div style={{ display: "flex", gap: 16 }}>
        {TACC.map((t, i) => {
          const d = 50 + i * 20;
          const p = useGolpe(d, 9);
          return (
            <div key={t.texto} style={{ transform: `scale(${p})`, opacity: frame >= d ? 1 : 0 }}>
              <Vidrio color={P.amarillo} style={{ width: 214, height: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: SANS, fontSize: 110, fontWeight: 800, color: P.amarillo, textShadow: `0 0 30px ${P.amarillo}`, lineHeight: 1 }}>{t.letra}</div>
                <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: P.texto }}>{t.texto}</div>
              </Vidrio>
            </div>
          );
        })}
      </div>
    </Pagina>
  );
};

// ─── 3. Celiaquía ───────────────────────────────────────────────────────────
const Celiaca: React.FC = () => {
  const frame = useCurrentFrame();
  const gluten = interpolate(frame, [110, 130], [0, 1], clamp);
  const dano = interpolate(frame, [140, 240], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={84}>
          La <Marcador desde={10} color={P.rojo} texto="#fff">celiaquía</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={42}>
          Una enfermedad <b style={{ color: P.rojo }}>autoinmune</b>: el gluten hace que las defensas dañen el intestino.
        </Chico>
      </Golpe>
      <Golpe desde={50}>
        <Vellosidades dano={dano} gluten={gluten} />
      </Golpe>
      <div style={{ display: "flex", gap: 30, fontFamily: SANS, fontSize: 36, fontWeight: 800 }}>
        <span style={{ color: P.verde, opacity: dano < 0.5 ? 1 : 0.3 }}>Vellosidades sanas</span>
        <span style={{ color: P.rojo, opacity: dano >= 0.5 ? 1 : 0.3 }}>→ Aplanadas</span>
      </div>
      <Golpe desde={260}>
        <Chico size={36} color={P.texto2}>
          Así el cuerpo absorbe peor los nutrientes. Afecta a alrededor de 1 de cada 100 personas.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={84}>
        Las <Marcador desde={10} color={P.amarillo}>señales</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 18 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={25 + i * 28} emoji={s.emoji} texto={s.texto} color={i === SINTOMAS.length - 1 ? P.cian : P.amarillo} />
      ))}
    </div>
  </Pagina>
);

// ─── 5. Sensibilidad no celíaca ─────────────────────────────────────────────
const Sensibilidad: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={76}>
        ¿Y la <Marcador desde={10} color={P.cian}>sensibilidad al gluten no celíaca</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={30}>
      <Vidrio color={P.cian} style={{ width: 940, padding: "22px 30px" }}>
        <Chico size={42}>
          Síntomas parecidos al comer gluten (hinchazón, dolor, cansancio, “niebla mental”)…
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={140}>
      <Vidrio color={P.verde} style={{ width: 940, padding: "22px 30px" }}>
        <Chico size={42}>
          …pero <b style={{ color: P.verde }}>sin daño en el intestino</b> y con análisis normales.
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={250}>
      <Chico size={36} color={P.texto2}>
        Se diagnostica después de descartar la celiaquía y la alergia al trigo.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Comparación ─────────────────────────────────────────────────────────
const Comparacion: React.FC = () => {
  const frame = useCurrentFrame();
  const celda = (texto: string, color: string, peso = 800): React.CSSProperties => ({
    fontFamily: SANS,
    fontSize: 32,
    fontWeight: peso,
    color,
    textAlign: "center",
    padding: "14px 8px",
    lineHeight: 1.2,
  });
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={80}>
          <span style={{ color: P.rojo, textShadow: `0 0 24px ${P.rojo}` }}>Celiaquía</span> vs.{" "}
          <span style={{ color: P.cian, textShadow: `0 0 24px ${P.cian}` }}>sensibilidad</span>
        </Grande>
      </Golpe>
      <Vidrio color={P.violeta} style={{ width: 960, padding: "10px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 1fr" }}>
          <div />
          <div style={celda("", P.rojo)}>Celiaquía</div>
          <div style={celda("", P.cian)}>Sensibilidad</div>
          {COMPARACION.map((f, i) => {
            const op = interpolate(frame, [30 + i * 70, 45 + i * 70], [0, 1], clamp);
            return (
              <React.Fragment key={f.tema}>
                <div style={{ ...celda("", P.texto), textAlign: "left", opacity: op, borderTop: `2px solid ${P.borde}` }}>{f.tema}</div>
                <div style={{ ...celda("", P.texto, 700), opacity: op, borderTop: `2px solid ${P.borde}` }}>{f.celiaca}</div>
                <div style={{ ...celda("", P.texto, 700), opacity: op, borderTop: `2px solid ${P.borde}` }}>{f.sensibilidad}</div>
              </React.Fragment>
            );
          })}
        </div>
      </Vidrio>
    </Pagina>
  );
};

// ─── 7. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => {
  const frame = useCurrentFrame();
  const alerta = useGolpe(200, 9);
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={84}>
          ¿Cómo se <Marcador desde={10} color={P.cian}>detecta</Marcador>?
        </Grande>
      </Golpe>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🩸", t: "Análisis de sangre (anticuerpos)", d: 30 },
          { e: "🔬", t: "Biopsia del intestino (endoscopía)", d: 90 },
        ].map((x) => (
          <Golpe key={x.t} desde={x.d}>
            <Vidrio color={P.cian} style={{ width: 448, height: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 16 }}>
              <Emoji e={x.e} size={90} />
              <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: P.texto, textAlign: "center", lineHeight: 1.2 }}>{x.t}</div>
            </Vidrio>
          </Golpe>
        ))}
      </div>
      <div style={{ transform: `scale(${alerta})`, opacity: frame >= 200 ? 1 : 0 }}>
        <div style={{ width: 940, background: P.amarillo, borderRadius: 30, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, boxShadow: `0 0 50px ${P.amarillo}88`, fontFamily: SANS }}>
          <Emoji e="⚠️" size={70} />
          <div style={{ fontSize: 38, fontWeight: 800, color: "#071630", lineHeight: 1.2 }}>
            No dejes el gluten antes de los estudios: puede dar un resultado falso
          </div>
        </div>
      </div>
    </Pagina>
  );
};

// ─── 8. Sin TACC ────────────────────────────────────────────────────────────
const SinTacc: React.FC = () => {
  const frame = useCurrentFrame();
  const sello = useGolpe(20, 8);
  return (
    <Pagina gap={18}>
      <Golpe desde={0}>
        <Grande size={80}>
          El tratamiento: <Marcador desde={10} color={P.verde}>dieta sin TACC</Marcador>
        </Grande>
      </Golpe>
      <div style={{ transform: `scale(${sello}) rotate(${-8 * sello}deg)`, opacity: frame >= 20 ? 1 : 0 }}>
        <SelloSinTacc size={230} />
      </div>
      <Golpe desde={70}>
        <Chico size={38}>Y ojo con la contaminación cruzada: una miga alcanza.</Chico>
      </Golpe>
      {CONTAMINACION.map((c, i) => (
        <Fila key={c.texto} desde={110 + i * 45} emoji={c.emoji} color={P.verde} flecha="✓">
          {c.texto}
        </Fila>
      ))}
    </Pagina>
  );
};

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={36} centro>
    <Golpe desde={0}>
      <Grande size={80}>
        Si tenés síntomas, <Marcador desde={12} color={P.amarillo}>consultá antes de sacar el gluten</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={30} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={40} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={55}>
      <Chico size={32} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  gluten: Gluten,
  celiaca: Celiaca,
  sintomas: Sintomas,
  sensibilidad: Sensibilidad,
  comparacion: Comparacion,
  diagnostico: Diagnostico,
  sinTacc: SinTacc,
  cierre: Cierre,
};

export const Celiaquia: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,8,12,12,12,12,12,12,6 --transponer 3 --bpm 110 --estilo energico
    musica={staticFile("audio/celiaquia-musica.mp3")}
  />
);

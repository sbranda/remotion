// Reel de 3 min: SOP (síndrome de ovario poliquístico), estilo neón.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave } from "../salud/pop";

const FPS = 30;
const ROSA = "#ff6fb5";

// ─── Ovario con folículos ───────────────────────────────────────────────────
const Ovario: React.FC<{ foliculos: number; ancho?: number; madura?: number }> = ({ foliculos, ancho = 520, madura = 0 }) => {
  const frame = useCurrentFrame();
  const N = 14;
  return (
    <svg width={ancho} height={ancho * 0.66} viewBox="0 0 520 340" style={{ overflow: "visible" }}>
      <ellipse cx={260} cy={170} rx={230} ry={150} fill="#5a1d4a" stroke={ROSA} strokeWidth={8} style={{ filter: `drop-shadow(0 0 18px ${ROSA})` }} />
      {/* folículo que madura (ovario sano) */}
      {madura > 0 && <circle cx={260} cy={170} r={20 + 60 * madura} fill={P.amarillo} opacity={0.9} style={{ filter: `drop-shadow(0 0 20px ${P.amarillo})` }} />}
      {/* "collar de perlas": muchos folículos chicos en el borde */}
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        const aparece = Math.max(0, Math.min(1, foliculos * N - i));
        const lat = 1 + 0.08 * Math.sin(frame / 8 + i);
        return <circle key={i} cx={260 + Math.cos(a) * 170} cy={170 + Math.sin(a) * 100} r={22 * aparece * lat} fill={P.cian} opacity={0.85} />;
      })}
    </svg>
  );
};

// ─── Iceberg: lo que se ve y lo que no ─────────────────────────────────────
const Iceberg: React.FC<{ bajo: number }> = ({ bajo }) => {
  const frame = useCurrentFrame();
  const ola = Math.sin(frame / 10) * 6;
  return (
    <svg width={940} height={520} viewBox="0 0 940 520" style={{ overflow: "visible" }}>
      <rect x={0} y={150} width={940} height={370} rx={30} fill="#0a3a6b" opacity={0.55} />
      <path d={`M0 ${150 + ola} Q235 ${140 - ola} 470 ${150 + ola} T940 ${150 + ola}`} stroke={P.cian} strokeWidth={6} fill="none" />
      <path d="M380 150 L470 20 L560 150 Z" fill="#e8f6ff" />
      <path d="M380 150 L250 500 L690 500 L560 150 Z" fill="#b9e3ff" opacity={0.25 + 0.6 * bajo} />
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <div style={{ display: "flex", gap: 30 }}>
      {["😮‍💨", "😣", "💇‍♀️", "📅"].map((e, i) => (
        <Golpe key={e} desde={i * 8} giro={i % 2 ? 10 : -10}>
          <Emoji e={e} size={120} />
        </Golpe>
      ))}
    </div>
    <Golpe desde={30}>
      <Grande size={78}>Cansancio, granitos, pelo que se cae, períodos que no llegan…</Grande>
    </Golpe>
    <Golpe desde={95} giro={-5}>
      <Grande size={84}>
        <Marcador desde={105} color={ROSA}>¿y si no es casualidad?</Marcador>
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <Grande size={86}>
          ¿Qué es el <Marcador desde={12} color={ROSA}>SOP</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={25}>
        <Chico size={44}>
          <b style={{ color: ROSA }}>Síndrome de Ovario Poliquístico</b>: un desequilibrio hormonal que afecta a todo el cuerpo, no solo a los ovarios.
        </Chico>
      </Golpe>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const op = interpolate(frame, [150 + i * 8, 160 + i * 8], [0, 1], clamp);
          const marcada = i === 9 && frame > 260;
          return (
            <div key={i} style={{ opacity: op, transform: `scale(${marcada ? 1.25 : 1})`, filter: marcada ? `drop-shadow(0 0 20px ${ROSA})` : "grayscale(0.6) opacity(0.6)" }}>
              <Emoji e="👩" size={64} />
            </div>
          );
        })}
      </div>
      <Golpe desde={270}>
        <Grande size={70}>
          <span style={{ color: ROSA }}>1 de cada 10</span> mujeres lo tiene
        </Grande>
      </Golpe>
      <Golpe desde={340}>
        <Chico size={38} color={P.texto2}>
          Y muchas no lo saben: suele empezar en la adolescencia.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 3. El nombre engaña ────────────────────────────────────────────────────
const Nombre: React.FC = () => {
  const frame = useCurrentFrame();
  const foliculos = interpolate(frame, [70, 170], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={78}>
          “Poliquístico”… <Marcador desde={15} color={P.amarillo}>pero no son quistes</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={50}>
        <Ovario foliculos={foliculos} ancho={560} />
      </Golpe>
      <Golpe desde={200}>
        <Chico size={42}>
          Son <b style={{ color: P.cian }}>folículos</b> (óvulos en preparación) que <b style={{ color: P.cian }}>se frenan</b> antes de madurar.
        </Chico>
      </Golpe>
      <Golpe desde={300}>
        <Chico size={36} color={P.texto2}>
          Por eso la ovulación falla y el ciclo se desordena.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. Qué pasa con las hormonas ──────────────────────────────────────────
const Hormonas: React.FC = () => (
  <Pagina gap={22}>
    <Golpe desde={0}>
      <Grande size={80}>
        El efecto <Marcador desde={15} color={P.violeta} texto="#fff">dominó</Marcador> hormonal
      </Grande>
    </Golpe>
    <Fila desde={40} emoji="🍬" color={P.amarillo} flecha="↑" numero={1}>
      El cuerpo responde peor a la <b style={{ color: P.amarillo }}>insulina</b> y fabrica más
    </Fila>
    <Fila desde={150} emoji="🧪" color={ROSA} flecha="↑" numero={2}>
      Los ovarios producen más <b style={{ color: ROSA }}>andrógenos</b> (hormonas “masculinas”)
    </Fila>
    <Fila desde={260} emoji="🥚" color={P.cian} flecha="✗" numero={3}>
      Los folículos no maduran y <b style={{ color: P.cian }}>no hay ovulación</b>
    </Fila>
    <Fila desde={370} emoji="🔁" color={P.rojo} flecha="↻" numero={4}>
      Más insulina, más andrógenos: <b style={{ color: P.rojo }}>un círculo</b>
    </Fila>
    <Golpe desde={480}>
      <Chico size={34} color={P.texto2}>
        Influyen la genética y el estilo de vida. No es culpa tuya.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Lo que se ve ────────────────────────────────────────────────────────
const VISIBLES = [
  { emoji: "📅", texto: "Ciclos irregulares o ausentes", color: ROSA },
  { emoji: "😣", texto: "Acné que no se va", color: P.rojo },
  { emoji: "🪒", texto: "Vello en cara, pecho o panza", color: P.amarillo },
  { emoji: "💇‍♀️", texto: "Caída del pelo de la cabeza", color: P.violeta },
  { emoji: "⚖️", texto: "Aumento de peso en la panza", color: P.cian },
  { emoji: "🌑", texto: "Manchas oscuras en cuello o axilas", color: P.verde },
];

const Visibles: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={84}>
        Lo que <Marcador desde={12} color={P.cian}>se ve</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {VISIBLES.map((s, i) => (
        <Sintoma key={s.texto} desde={35 + i * 50} emoji={s.emoji} texto={s.texto} color={s.color} />
      ))}
    </div>
    <Golpe desde={370}>
      <Chico size={36} color={P.texto2}>
        No todas tienen todo: cada SOP es distinto.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Lo que no se ve ─────────────────────────────────────────────────────
const INVISIBLES = [
  { e: "🪫", t: "Fatiga constante" },
  { e: "🌧️", t: "Ansiedad y bajón" },
  { e: "🎢", t: "Cambios de humor" },
  { e: "🍫", t: "Antojos de dulce" },
  { e: "😴", t: "Dormir mal" },
  { e: "🪞", t: "Autoestima golpeada" },
];

const Invisibles: React.FC = () => {
  const frame = useCurrentFrame();
  const bajo = interpolate(frame, [90, 150], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={14}>
      <Golpe desde={0}>
        <Grande size={78}>
          Y lo que <Marcador desde={12} color={ROSA}>no se ve</Marcador>
        </Grande>
      </Golpe>
      <div style={{ position: "relative", width: 940, height: 760 }}>
        <div style={{ position: "absolute", top: 40, left: 0 }}>
          <Iceberg bajo={bajo} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", opacity: interpolate(frame, [30, 50], [0, 1], clamp) }}>
          <Chico size={34} color={P.cian}>
            Acné · vello · ciclos
          </Chico>
          <Chico size={34} color={P.texto2}>
            ← lo que ven los demás
          </Chico>
        </div>
        <div style={{ position: "absolute", top: 250, left: 40, right: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {INVISIBLES.map((s, i) => {
            const d = 150 + i * 55;
            const op = interpolate(frame, [d, d + 14], [0, 1], { ...clamp, easing: suave });
            return (
              <div key={s.t} style={{ opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
                <Vidrio color={ROSA} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, background: "rgba(7,22,48,0.7)" }}>
                  <Emoji e={s.e} size={56} />
                  <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: P.texto, lineHeight: 1.15 }}>{s.t}</div>
                </Vidrio>
              </div>
            );
          })}
        </div>
      </div>
      <Golpe desde={520}>
        <Chico size={38}>
          Es <b style={{ color: ROSA }}>real</b>, aunque nadie lo vea. 💜
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 7. La piel ─────────────────────────────────────────────────────────────
const Piel: React.FC = () => (
  <Pagina gap={22}>
    <Golpe desde={0}>
      <Grande size={80}>
        La <Marcador desde={12} color={P.amarillo}>piel</Marcador> también habla
      </Grande>
    </Golpe>
    <Fila desde={35} emoji="🧴" color={P.amarillo} flecha="!">
      Acné en mandíbula, mentón y cuello, piel grasa
    </Fila>
    <Fila desde={120} emoji="🌑" color={P.verde} flecha="!">
      Piel oscura y aterciopelada en nuca, axilas o ingle: señal de insulina alta
    </Fila>
    <Fila desde={205} emoji="🔸" color={P.cian} flecha="!">
      Verruguitas de piel (acrocordones) en cuello o axilas
    </Fila>
    <Fila desde={290} emoji="🪒" color={ROSA} flecha="!">
      Vello grueso donde antes no había
    </Fila>
    <Golpe desde={380}>
      <Chico size={36} color={P.texto2}>
        Tratar la causa hormonal suele mejorar la piel más que cualquier crema.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 8. Diagnóstico ─────────────────────────────────────────────────────────
const CRITERIOS = [
  { e: "📅", t: "Ciclos irregulares o sin ovulación", c: ROSA },
  { e: "🧪", t: "Andrógenos altos: en síntomas o en el análisis", c: P.amarillo },
  { e: "🩻", t: "Ovarios con muchos folículos en la ecografía", c: P.cian },
];

const Diagnostico: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={80}>
          ¿Cómo se <Marcador desde={12} color={P.verde}>diagnostica</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={30}>
        <Chico size={42}>
          Con <b style={{ color: P.verde }}>2 de estas 3</b> señales:
        </Chico>
      </Golpe>
      {CRITERIOS.map((c, i) => {
        const d = 70 + i * 80;
        const tilde = frame > 340 && i < 2;
        return (
          <Golpe key={c.t} desde={d}>
            <Vidrio color={c.c} style={{ width: 940, padding: "16px 24px", display: "flex", alignItems: "center", gap: 20 }}>
              <Emoji e={c.e} size={66} />
              <div style={{ flex: 1, fontFamily: SANS, fontSize: 38, fontWeight: 700, color: P.texto, lineHeight: 1.2 }}>{c.t}</div>
              <div style={{ fontFamily: SANS, fontSize: 60, fontWeight: 800, color: P.verde, opacity: tilde ? 1 : 0.15 }}>✔</div>
            </Vidrio>
          </Golpe>
        );
      })}
      <Golpe desde={390}>
        <Chico size={36} color={P.texto2}>
          Además se descartan otras causas (tiroides, prolactina). En adolescentes la ecografía no se usa para diagnosticar.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 9. Mitos ───────────────────────────────────────────────────────────────
const MITOS = [
  { mito: "“Con SOP no podés quedar embarazada”", real: "Muchas pueden; a veces con ayuda médica." },
  { mito: "“Solo les pasa a las que tienen sobrepeso”", real: "También aparece en personas delgadas." },
  { mito: "“Las pastillas lo curan”", real: "No lo curan: controlan síntomas." },
];

const Mitos: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={84}>
        <Marcador desde={10} color={P.rojo} texto="#fff">Mitos</Marcador> ❌
      </Grande>
    </Golpe>
    {MITOS.map((m, i) => (
      <Golpe key={m.mito} desde={35 + i * 130}>
        <Vidrio color={P.rojo} style={{ width: 940, padding: "18px 26px" }}>
          <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 800, color: P.texto2, textDecoration: "line-through", textDecorationColor: P.rojo, textDecorationThickness: 5 }}>{m.mito}</div>
          <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: P.verde, marginTop: 8 }}>✅ {m.real}</div>
        </Vidrio>
      </Golpe>
    ))}
  </Pagina>
);

// ─── 10. Qué ayuda ──────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={18}>
    <Golpe desde={0}>
      <Grande size={80}>
        Qué <Marcador desde={12} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    <Fila desde={35} emoji="🏃‍♀️" color={P.verde} flecha="✓">
      Moverte: mejora cómo usás la insulina
    </Fila>
    <Fila desde={110} emoji="🥗" color={P.verde} flecha="✓">
      Comer real y regular, sin dietas extremas
    </Fila>
    <Fila desde={185} emoji="😴" color={P.cian} flecha="✓">
      Dormir bien y bajar el estrés
    </Fila>
    <Fila desde={260} emoji="💊" color={P.violeta} flecha="✓">
      Tratamiento médico según tus síntomas y tus planes
    </Fila>
    <Fila desde={335} emoji="🧠" color={ROSA} flecha="✓">
      Cuidar tu salud mental: pedir ayuda también es tratamiento
    </Fila>
    <Golpe desde={420}>
      <Chico size={36} color={P.texto2}>
        Consultá con ginecología o endocrinología 👩‍⚕️
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 11. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={92}>No es tu culpa.</Grande>
    </Golpe>
    <Golpe desde={30} giro={-4}>
      <Grande size={84}>
        <Marcador desde={40} color={ROSA}>No estás exagerando.</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={90} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={110} emoji="📲" texto="Compartilo" color={ROSA} />
    </div>
    <Golpe desde={140}>
      <Chico size={30} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 6, Escena: Gancho },
  { id: "queEs", seg: 16, Escena: QueEs },
  { id: "nombre", seg: 14, Escena: Nombre },
  { id: "hormonas", seg: 20, Escena: Hormonas },
  { id: "visibles", seg: 18, Escena: Visibles },
  { id: "invisibles", seg: 22, Escena: Invisibles },
  { id: "piel", seg: 16, Escena: Piel },
  { id: "diagnostico", seg: 18, Escena: Diagnostico },
  { id: "mitos", seg: 16, Escena: Mitos },
  { id: "ayuda", seg: 20, Escena: Ayuda },
  { id: "cierre", seg: 14, Escena: Cierre },
];

export const DURACION_SOP = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const Sop: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 6,16,14,20,18,22,16,18,16,20,14 --bpm 104 --transponer 2 --estilo energico
    musica={staticFile("audio/sop-musica.mp3")}
  />
);

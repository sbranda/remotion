import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { HiperHipo, Hormona, Mariposa, Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, useGolpe } from "../salud/pop";
import { CAUSAS, FPS, PAGINAS, PaginaId, SINTOMAS } from "./datos";

// ─── 1. Gancho: barra de carga que no avanza ────────────────────────────────
const Carga: React.FC = () => {
  const frame = useCurrentFrame();
  // arranca y se queda casi quieta
  const v = interpolate(frame, [0, 20, 110], [0, 0.18, 0.24], clamp);
  const gira = frame * 4;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
      <svg width={90} height={90} viewBox="0 0 90 90" style={{ transform: `rotate(${gira}deg)` }}>
        <circle cx={45} cy={45} r={34} stroke="rgba(255,255,255,0.15)" strokeWidth={10} fill="none" />
        <path d="M45 11 A34 34 0 0 1 79 45" stroke={P.cian} strokeWidth={10} fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ width: 560, height: 54, borderRadius: 27, border: `5px solid ${P.texto}`, padding: 6 }}>
        <div style={{ width: `${v * 100}%`, height: "100%", borderRadius: 20, background: P.cian, boxShadow: `0 0 20px ${P.cian}` }} />
      </div>
    </div>
  );
};

const Gancho: React.FC = () => (
  <Pagina gap={36} centro>
    <Golpe desde={0}>
      <Emoji e="🐢" size={140} />
    </Golpe>
    <Golpe desde={4}>
      <Carga />
    </Golpe>
    <Golpe desde={10}>
      <Grande size={78}>¿Cansancio, frío y subís de peso sin explicación?</Grande>
    </Golpe>
    <Golpe desde={50} giro={-6}>
      <Grande size={92}>
        Podría ser la <Marcador desde={60} color={P.cian}>tiroides</Marcador>
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={32}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Qué es el <Marcador desde={8} color={P.cian}>hipotiroidismo</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={46}>
        La tiroides, la <b style={{ color: P.cian }}>mariposa</b> 🦋 del cuello, regula el <b style={{ color: P.amarillo }}>motor</b> de tu cuerpo
      </Chico>
    </Golpe>
    <Golpe desde={30}>
      <Mariposa aceleraDesde={190} modo="hipo" />
    </Golpe>
    <Golpe desde={180} giro={4}>
      <Grande size={64}>
        En el hipotiroidismo fabrica hormonas <Marcador desde={195} color={P.cian}>de menos</Marcador>: todo se enlentece 🐢
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 3. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={30 + i * 40} emoji={s.emoji} texto={s.texto} color={P.cian} />
      ))}
    </div>
  </Pagina>
);

// ─── 5. Causas ──────────────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Por qué <Marcador desde={10} color={P.cian}>pasa</Marcador>?
      </Grande>
    </Golpe>
    {CAUSAS.map((c, i) => (
      <Fila key={c.texto} desde={28 + i * 50} emoji={c.emoji} color={P.cian} flecha="!">
        {c.texto}
      </Fila>
    ))}
    <Golpe desde={250}>
      <Chico size={40}>
        👩 Es más frecuente en <b style={{ color: P.amarillo }}>mujeres</b>. Y en la Argentina a todos los bebés se los estudia al nacer 👶
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={34}>
    <Golpe desde={0}>
      <Grande size={86}>
        Se detecta con un <Marcador desde={10} color={P.amarillo}>análisis de sangre</Marcador> 🩸
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Hormona desde={40} nombre="TSH" estado="ALTA" flecha="↑" color={P.rojo} />
      <Hormona desde={100} nombre="T4 libre" estado="BAJA" flecha="↓" color={P.cian} />
    </div>
    <Golpe desde={200}>
      <Chico size={42} color={P.texto2}>
        La TSH sube porque el cuerpo "le grita" a la tiroides que trabaje más 📢
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. Tratamiento ─────────────────────────────────────────────────────────
const Paso: React.FC<{ desde: number; emoji: string; titulo: string; texto: string; color: string }> = ({ desde, emoji, titulo, texto, color }) => {
  const frame = useCurrentFrame();
  const p = useGolpe(desde, 10);
  return (
    <div style={{ opacity: frame >= desde ? 1 : 0, transform: `translateX(${(1 - p) * -500}px)` }}>
      <Vidrio color={color} style={{ width: 940, padding: "20px 28px", display: "flex", alignItems: "center", gap: 24 }}>
        <Emoji e={emoji} size={86} />
        <div style={{ flex: 1, fontFamily: SANS }}>
          <div style={{ fontSize: 44, fontWeight: 800, color, lineHeight: 1.15 }}>{titulo}</div>
          <div style={{ fontSize: 34, fontWeight: 600, color: P.texto, lineHeight: 1.3 }}>{texto}</div>
        </div>
      </Vidrio>
    </div>
  );
};

const Tratamiento: React.FC = () => {
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={92}>
          ¿Tiene tratamiento? <Marcador desde={12} color={P.verde}>¡Sí!</Marcador>
        </Grande>
      </Golpe>
      <Paso desde={30} emoji="💊" titulo="Una pastilla por día" texto="Reemplaza la hormona que falta (levotiroxina)." color={P.verde} />
      <Paso
        desde={120}
        emoji="🌅"
        titulo="En ayunas, antes del desayuno"
        texto="Y esperá un rato antes del mate o el café 🧉, porque frenan su absorción."
        color={P.amarillo}
      />
      <Paso desde={220} emoji="🩸" titulo="Controles con análisis" texto="Tu médico ajusta la dosis según la TSH." color={P.cian} />
      <Golpe desde={320}>
        <div
          style={{
            width: 940,
            background: P.amarillo,
            borderRadius: 30,
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            gap: 22,
            boxShadow: `0 0 50px ${P.amarillo}88`,
            fontFamily: SANS,
          }}
        >
          <Emoji e="⚠️" size={70} />
          <div style={{ fontSize: 38, fontWeight: 800, color: "#071630", lineHeight: 1.2 }}>No la dejes ni cambies la dosis sin hablar con tu médico</div>
        </div>
      </Golpe>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🦋" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={86}>
        Si te sentís así, pedí un <Marcador desde={20} color={P.amarillo}>análisis de tiroides</Marcador>
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
  hipoHiper: () => <HiperHipo primero="hipo" />,
  causas: Causas,
  diagnostico: Diagnostico,
  tratamiento: Tratamiento,
  cierre: Cierre,
};

export const Hipotiroidismo: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,16,12,12,12,14,8 --transponer 0 --bpm 104 --estilo energico
    musica={staticFile("audio/hipotiroidismo-musica.mp3")}
  />
);

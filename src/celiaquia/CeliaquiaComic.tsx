// Reel de 90 s: enfermedad celíaca (solo celiaquía), estilo cómic.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, COMIC, Emoji, Globo, K, ListaStickers, Pagina, Pop, ReelComic, SANS, Sello, Sticker, TituloComic, clamp } from "../salud/comic";

const FPS = 30;

// ─── Vellosidades del intestino, versión historieta ────────────────────────
const Vellosidades: React.FC<{ dano: number; ancho?: number }> = ({ dano, ancho = 900 }) => {
  const frame = useCurrentFrame();
  const N = 8;
  const alto = 200 * (1 - 0.82 * dano);
  return (
    <svg width={ancho} height={ancho * 0.42} viewBox="0 0 900 380" style={{ overflow: "visible" }}>
      {/* pared del intestino */}
      <rect x={0} y={300} width={900} height={70} rx={14} fill="#ff9fb8" stroke={K.negro} strokeWidth={7} />
      {Array.from({ length: N }).map((_, i) => {
        const x = 40 + i * 108;
        const h = alto + (i % 2) * 12 * (1 - dano);
        return (
          <path
            key={i}
            d={`M${x} 304 L${x} ${304 - h + 40} Q${x} ${304 - h} ${x + 40} ${304 - h} Q${x + 80} ${304 - h} ${x + 80} ${304 - h + 40} L${x + 80} 304`}
            fill={dano > 0.5 ? "#ffb3a7" : "#ffc4d4"}
            stroke={K.negro}
            strokeWidth={7}
            strokeLinejoin="round"
          />
        );
      })}
      {/* nutrientes: entran si la pared está sana, rebotan si está dañada */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t = ((frame + i * 13) % 60) / 60;
        const x = 70 + i * 95;
        const yTope = 304 - alto - 10;
        const y = dano < 0.5 ? 20 + t * (yTope - 20) : 20 + (t < 0.5 ? t * 2 : 2 - t * 2) * (yTope - 20);
        return <circle key={i} cx={x} cy={y} r={16} fill={dano < 0.5 ? K.verde : K.naranja} stroke={K.negro} strokeWidth={5} opacity={1 - t * 0.4} />;
      })}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={40} centro>
    <Pop desde={0} giro={-8}>
      <Emoji e="🍞" size={170} />
    </Pop>
    <Pop desde={10}>
      <TituloComic size={100}>¿Comés pan y te cae mal?</TituloComic>
    </Pop>
    <Pop desde={55} giro={4}>
      <Sticker color={K.rosa} style={{ padding: "14px 34px" }}>
        <span style={{ fontFamily: COMIC, fontSize: 80, letterSpacing: 2 }}>¿Y SI ES CELIAQUÍA?</span>
      </Sticker>
    </Pop>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={40}>
    <Pop desde={0}>
      <TituloComic size={96}>¿Qué es?</TituloComic>
    </Pop>
    <Pop desde={25} giro={-1.5}>
      <Sticker style={{ width: 920, padding: "22px 30px", fontSize: 44, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
        Una enfermedad <span style={{ background: K.amarillo, padding: "0 10px" }}>autoinmune</span>: al comer <b>gluten</b>, tus defensas atacan… <span style={{ color: K.rojo }}>tu propio intestino</span> 🛡️💥
      </Sticker>
    </Pop>
    <Pop desde={170} giro={1.5}>
      <Globo size={44} ancho={860} color={K.amarillo}>
        No es alergia ni intolerancia: es para toda la vida.
      </Globo>
    </Pop>
  </Pagina>
);

// ─── 3. El intestino ────────────────────────────────────────────────────────
const Intestino: React.FC = () => {
  const frame = useCurrentFrame();
  const dano = interpolate(frame, [190, 230], [0, 1], clamp);
  const sano = frame < 190;
  return (
    <Pagina gap={30}>
      <Pop desde={0}>
        <TituloComic size={86}>¿Qué le pasa al intestino?</TituloComic>
      </Pop>
      <Pop desde={20}>
        <Sticker color={sano ? K.lima : K.naranja} style={{ padding: "10px 30px", fontFamily: COMIC, fontSize: 64, letterSpacing: 2 }}>
          {sano ? "SANO" : "CON GLUTEN"}
        </Sticker>
      </Pop>
      <Pop desde={30}>
        <Vellosidades dano={dano} />
      </Pop>
      <Pop desde={sano ? 50 : 240}>
        <Sticker style={{ width: 920, padding: "18px 28px", fontSize: 40, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
          {sano ? (
            <>
              Tiene “deditos” llamados <span style={{ background: K.lima, padding: "0 8px" }}>vellosidades</span> que absorben los nutrientes 🟢
            </>
          ) : (
            <>
              La inflamación las <span style={{ background: K.naranja, padding: "0 8px" }}>aplasta</span> y los nutrientes ya no se absorben 🟠
            </>
          )}
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 4. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => {
  const col = (titulo: string, color: string, items: string[], desde: number, giro: number) => (
    <Pop desde={desde} giro={giro}>
      <Sticker color={color} style={{ width: 440, padding: "18px 20px" }}>
        <div style={{ fontFamily: COMIC, fontSize: 52, letterSpacing: 2, textAlign: "center", marginBottom: 10 }}>{titulo}</div>
        {items.map((t) => (
          <div key={t} style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, marginTop: 8 }}>
            {t}
          </div>
        ))}
      </Sticker>
    </Pop>
  );
  return (
    <Pagina gap={32}>
      <Pop desde={0}>
        <TituloComic size={92}>Síntomas</TituloComic>
      </Pop>
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {col("EN LA PANZA", K.blanco, ["🎈 Hinchazón", "💩 Diarrea o constipación", "🤢 Dolor y gases", "⚖️ Bajar de peso"], 25, -2)}
        {col("FUERA DE LA PANZA", K.amarillo, ["🩸 Anemia", "🪫 Cansancio", "👄 Aftas", "🦴 Huesos débiles", "📏 Niños que no crecen"], 120, 2)}
      </div>
      <Pop desde={300} giro={-2}>
        <Globo size={40} ancho={860}>
          ¡Y hay quienes no tienen ningún síntoma! 😶
        </Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 5. Cifras ──────────────────────────────────────────────────────────────
const Cifras: React.FC = () => (
  <Pagina gap={36} centro>
    <Pop desde={0} giro={-4}>
      <TituloComic size={210} color={K.amarillo}>
        1 de 100
      </TituloComic>
    </Pop>
    <Pop desde={30}>
      <TituloComic size={70}>personas es celíaca</TituloComic>
    </Pop>
    <Sello desde={90} texto="¡Y LA MAYORÍA NO LO SABE!" color={K.rojo} size={56} />
  </Pagina>
);

// ─── 6. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={30}>
    <Pop desde={0}>
      <TituloComic size={88}>¿Cómo se diagnostica?</TituloComic>
    </Pop>
    <ListaStickers
      items={[
        { emoji: "🩸", texto: "1. Análisis de sangre (anticuerpos)" },
        { emoji: "🔬", texto: "2. Biopsia del intestino por endoscopía" },
      ]}
      desde={30}
      paso={60}
      colores={[K.blanco, K.celeste]}
      size={42}
    />
    <Sello desde={170} texto="¡OJO!" color={K.rojo} size={80} />
    <Pop desde={185} giro={1}>
      <Sticker color={K.amarillo} style={{ width: 900, padding: "18px 28px", fontSize: 40, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
        No dejes el gluten <u>antes</u> de estudiarte: los análisis pueden salir normales.
      </Sticker>
    </Pop>
  </Pagina>
);

// ─── 7. Tratamiento: sin TACC ───────────────────────────────────────────────
const TACC = [
  { l: "T", p: "Trigo", c: K.amarillo },
  { l: "A", p: "Avena", c: K.lima },
  { l: "C", p: "Cebada", c: K.celeste },
  { l: "C", p: "Centeno", c: K.rosa },
];

const SinTacc: React.FC = () => (
  <Pagina gap={30}>
    <Pop desde={0}>
      <TituloComic size={80}>El tratamiento: dieta SIN TACC de por vida</TituloComic>
    </Pop>
    <div style={{ display: "flex", gap: 18 }}>
      {TACC.map((t, i) => (
        <Pop key={t.p} desde={40 + i * 20} giro={i % 2 ? 4 : -4}>
          <Sticker color={t.c} style={{ width: 205, padding: "10px 0", textAlign: "center" }}>
            <div style={{ fontFamily: COMIC, fontSize: 120, lineHeight: 1 }}>{t.l}</div>
            <div style={{ fontSize: 34, fontWeight: 800 }}>{t.p}</div>
          </Sticker>
        </Pop>
      ))}
    </div>
    <Pop desde={150}>
      <TituloComic size={60} color={K.amarillo}>
        Cuidado con la contaminación cruzada:
      </TituloComic>
    </Pop>
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", width: 940 }}>
      {["🔪 Tablas y cuchillos", "🍞 Tostadora compartida", "🍟 Aceite de freír", "🧈 Manteca con migas"].map((t, i) => (
        <Pop key={t} desde={190 + i * 25} giro={i % 2 ? 2 : -2}>
          <Sticker style={{ padding: "12px 22px", fontSize: 36, fontWeight: 800 }}>{t}</Sticker>
        </Pop>
      ))}
    </div>
    <Pop desde={330}>
      <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: K.negro, textAlign: "center" }}>Buscá el logo “Sin TACC” en los envases 🏷️</div>
    </Pop>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={34} centro>
    <Pop desde={0}>
      <TituloComic size={90}>¡Sin gluten, el intestino se recupera! 💪</TituloComic>
    </Pop>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={50} emoji="🔖" texto="GUARDALO" color={K.lima} />
      <Boton desde={65} emoji="📲" texto="COMPARTILO" color={K.rosa} />
    </div>
    <Pop desde={90}>
      <Sticker style={{ padding: "8px 22px", fontSize: 28, fontWeight: 700 }}>Esto no reemplaza la consulta con tu médico.</Sticker>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, color: K.amarillo, Escena: Gancho },
  { id: "queEs", seg: 12, color: K.celeste, Escena: QueEs },
  { id: "intestino", seg: 14, color: K.rosa, Escena: Intestino },
  { id: "sintomas", seg: 14, color: K.lima, Escena: Sintomas },
  { id: "cifras", seg: 8, color: K.violeta, Escena: Cifras },
  { id: "diagnostico", seg: 12, color: K.naranja, Escena: Diagnostico },
  { id: "sinTacc", seg: 15, color: K.celeste, Escena: SinTacc },
  { id: "cierre", seg: 10, color: K.amarillo, Escena: Cierre },
];

export const DURACION_CELIAQUIA_COMIC = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const CeliaquiaComic: React.FC = () => (
  <ReelComic
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,14,14,8,12,15,10 --bpm 118 --transponer 0 --estilo energico
    musica={staticFile("audio/celiaquia-comic-musica.mp3")}
  />
);

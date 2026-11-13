// Reels de artrosis vs. artritis, estilo cómic: versión de 3 min y versión de 90 s.
import React, { createContext, useContext } from "react";
import { interpolate, staticFile, useCurrentFrame as useFrameReal } from "remotion";
import {
  Boton as BotonBase,
  COMIC,
  Emoji,
  Globo,
  K,
  ListaStickers as ListaStickersBase,
  Pagina,
  Pop as PopBase,
  ReelComic,
  SANS,
  Sello as SelloBase,
  Sticker,
  TituloComic,
  clamp,
  useSacudida as useSacudidaBase,
} from "../salud/comic";

// ─── Ritmo: acelera una escena sin reescribir sus tiempos ───────────────────
// Con ritmo 0.6, todo lo que en la versión larga pasaba en el cuadro 100 pasa en el 60.
const Ritmo = createContext(1);
const useCurrentFrame = () => useFrameReal() / useContext(Ritmo);
const useSacudida = (desde: number, fuerza?: number, dur?: number) => useSacudidaBase(desde * useContext(Ritmo), fuerza, dur);
const Pop: React.FC<React.ComponentProps<typeof PopBase>> = ({ desde, ...resto }) => <PopBase desde={desde * useContext(Ritmo)} {...resto} />;
const Sello: React.FC<React.ComponentProps<typeof SelloBase>> = ({ desde, ...resto }) => <SelloBase desde={desde * useContext(Ritmo)} {...resto} />;
const Boton: React.FC<React.ComponentProps<typeof BotonBase>> = ({ desde, ...resto }) => <BotonBase desde={desde * useContext(Ritmo)} {...resto} />;
const ListaStickers: React.FC<React.ComponentProps<typeof ListaStickersBase>> = ({ desde, paso, ...resto }) => {
  const r = useContext(Ritmo);
  return <ListaStickersBase desde={desde * r} paso={paso * r} {...resto} />;
};

const FPS = 30;
const C_ARTROSIS = K.naranja;
const C_ARTRITIS = K.rosa;

// ─── Articulación animada ───────────────────────────────────────────────────
export const Articulacion: React.FC<{ desgaste?: number; picos?: number; inflama?: number; ataque?: number; mueve?: number; ancho?: number }> = ({
  desgaste = 0,
  picos = 0,
  inflama = 0,
  ataque = 0,
  mueve = 1,
  ancho = 460,
}) => {
  const frame = useCurrentFrame();
  const giro = Math.sin(frame / 14) * 7 * mueve;
  const grosor = 24 * (1 - desgaste * 0.9);
  const separa = 26 * (1 - desgaste * 0.8);
  const pulso = inflama * (0.5 + 0.5 * Math.sin(frame / 6));
  const roce = desgaste > 0.7 && Math.abs(giro) > 5.5 * mueve;
  const yBaja = 330 + separa;
  return (
    <svg width={ancho} height={ancho * 1.25} viewBox="0 0 500 625" style={{ overflow: "visible" }}>
      {/* cápsula y membrana sinovial */}
      <ellipse cx={250} cy={300} rx={190 + 40 * inflama + 8 * pulso} ry={140 + 30 * inflama + 6 * pulso} fill={inflama > 0 ? `rgba(255, 80, 90, ${0.15 + 0.35 * inflama})` : "rgba(160, 220, 255, 0.25)"} stroke={inflama > 0.3 ? K.rojo : "#ff8fb5"} strokeWidth={7} strokeDasharray={inflama > 0.3 ? undefined : "14 10"} />
      {/* calor */}
      {inflama > 0.4 &&
        [0, 1, 2].map((i) => {
          const t = ((frame + i * 12) % 36) / 36;
          return <path key={i} d={`M${120 + i * 130} ${120 - t * 60} q12 -14 0 -28 q-12 -14 0 -28`} stroke={K.rojo} strokeWidth={6} fill="none" strokeLinecap="round" opacity={inflama * (1 - t)} />;
        })}
      {/* hueso de abajo (tibia) */}
      <path d={`M150 ${yBaja} Q150 ${yBaja - 10} 170 ${yBaja - 10} L330 ${yBaja - 10} Q350 ${yBaja - 10} 350 ${yBaja} L350 ${yBaja + 90} Q310 ${yBaja + 120} 310 ${yBaja + 170} L310 625 L190 625 L190 ${yBaja + 170} Q190 ${yBaja + 120} 150 ${yBaja + 90} Z`} fill="#fff6e3" stroke={K.negro} strokeWidth={7} strokeLinejoin="round" />
      <line x1={160} y1={yBaja - 10 - grosor / 2} x2={340} y2={yBaja - 10 - grosor / 2} stroke="#8fd3ff" strokeWidth={grosor} strokeLinecap="round" />
      {/* picos de loro abajo */}
      {picos > 0 && (
        <>
          <path d={`M152 ${yBaja} l${-34 * picos} ${-18 * picos} l${28 * picos} ${30 * picos} Z`} fill="#fff6e3" stroke={K.negro} strokeWidth={5} />
          <path d={`M348 ${yBaja} l${34 * picos} ${-18 * picos} l${-28 * picos} ${30 * picos} Z`} fill="#fff6e3" stroke={K.negro} strokeWidth={5} />
        </>
      )}
      {/* hueso de arriba (fémur), que se mueve */}
      <g transform={`rotate(${giro} 250 230)`}>
        <path d="M190 0 L310 0 L310 170 Q370 190 360 250 Q350 320 250 322 Q150 320 140 250 Q130 190 190 170 Z" fill="#fff6e3" stroke={K.negro} strokeWidth={7} strokeLinejoin="round" />
        <path d="M150 268 Q250 340 350 268" stroke="#8fd3ff" strokeWidth={grosor} fill="none" strokeLinecap="round" />
        {/* grietas del cartílago */}
        {desgaste > 0.35 &&
          [175, 235, 300].map((x, i) => (
            <path key={i} d={`M${x} ${292 + (i === 1 ? 14 : 0)} l8 12 l-6 10`} stroke={K.negro} strokeWidth={4} fill="none" opacity={Math.min(1, (desgaste - 0.35) * 3)} />
          ))}
        {picos > 0 && (
          <>
            <path d={`M142 262 l${-30 * picos} ${12 * picos} l${30 * picos} ${14 * picos} Z`} fill="#fff6e3" stroke={K.negro} strokeWidth={5} />
            <path d={`M358 262 l${30 * picos} ${12 * picos} l${-30 * picos} ${14 * picos} Z`} fill="#fff6e3" stroke={K.negro} strokeWidth={5} />
          </>
        )}
      </g>
      {/* roce: chispas */}
      {roce && (
        <text x={380} y={330} fontFamily={COMIC} fontSize={64} fill={K.rojo} stroke={K.negro} strokeWidth={3}>
          ¡CRIC!
        </text>
      )}
      {/* defensas que atacan la membrana */}
      {ataque > 0 &&
        Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2 + frame / 40;
          const r = 300 - 90 * Math.min(1, ataque) + 10 * Math.sin(frame / 4 + i);
          const x = 250 + Math.cos(a) * r;
          const y = 300 + Math.sin(a) * r * 0.75;
          return (
            <g key={i} opacity={Math.min(1, ataque * 2)}>
              <circle cx={x} cy={y} r={24} fill={K.violeta} stroke={K.negro} strokeWidth={4} />
              <path d={`M${x - 10} ${y - 6} l7 4 M${x + 10} ${y - 6} l-7 4`} stroke={K.negro} strokeWidth={3} />
              <path d={`M${x - 8} ${y + 9} q8 -6 16 0`} stroke={K.negro} strokeWidth={3} fill="none" />
            </g>
          );
        })}
    </svg>
  );
};

// ─── Etiqueta lateral de la articulación ────────────────────────────────────
const Rotulo: React.FC<{ desde: number; color: string; children: React.ReactNode; giro?: number }> = ({ desde, color, children, giro = 0 }) => (
  <Pop desde={desde} giro={giro}>
    <Sticker color={color} style={{ padding: "10px 18px", fontSize: 32, fontWeight: 800, width: 360 }}>
      {children}
    </Sticker>
  </Pop>
);

// ─── Tabla VS ───────────────────────────────────────────────────────────────
const FilaVS: React.FC<{ desde: number; tema: string; artrosis: string; artritis: string }> = ({ desde, tema, artrosis, artritis }) => (
  <Pop desde={desde}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontFamily: COMIC, fontSize: 46, letterSpacing: 2, color: K.blanco, WebkitTextStroke: `3px ${K.negro}`, paintOrder: "stroke fill" }}>{tema}</div>
      <div style={{ display: "flex", gap: 18 }}>
        <Sticker color={C_ARTROSIS} giro={-1.5} style={{ width: 460, padding: "14px 18px", fontSize: 32, fontWeight: 800, lineHeight: 1.2, textAlign: "center" }}>
          {artrosis}
        </Sticker>
        <Sticker color={C_ARTRITIS} giro={1.5} style={{ width: 460, padding: "14px 18px", fontSize: 32, fontWeight: 800, lineHeight: 1.2, textAlign: "center" }}>
          {artritis}
        </Sticker>
      </div>
    </div>
  </Pop>
);

const Cabecera: React.FC = () => (
  <div style={{ display: "flex", gap: 18 }}>
    <Pop desde={0} giro={-3}>
      <Sticker color={C_ARTROSIS} style={{ width: 460, padding: "8px 0", textAlign: "center", fontFamily: COMIC, fontSize: 60, letterSpacing: 2 }}>
        ARTROSIS 🔧
      </Sticker>
    </Pop>
    <Pop desde={8} giro={3}>
      <Sticker color={C_ARTRITIS} style={{ width: 460, padding: "8px 0", textAlign: "center", fontFamily: COMIC, fontSize: 60, letterSpacing: 2 }}>
        ARTRITIS 🔥
      </Sticker>
    </Pop>
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const sac = useSacudida(40, 20, 18);
  return (
    <Pagina gap={30} centro>
      <Pop desde={0} giro={-6}>
        <Sticker color={C_ARTROSIS} style={{ padding: "10px 40px", fontFamily: COMIC, fontSize: 120, letterSpacing: 3 }}>
          ARTROSIS
        </Sticker>
      </Pop>
      <div style={{ transform: `translateX(${sac}px) rotate(-8deg)` }}>
        <Pop desde={35}>
          <TituloComic size={200} color={K.amarillo} giro={0}>
            VS
          </TituloComic>
        </Pop>
      </div>
      <Pop desde={15} giro={6}>
        <Sticker color={C_ARTRITIS} style={{ padding: "10px 40px", fontFamily: COMIC, fontSize: 120, letterSpacing: 3 }}>
          ARTRITIS
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 2. La confusión ────────────────────────────────────────────────────────
const Confusion: React.FC = () => (
  <Pagina gap={40} centro>
    <Pop desde={0}>
      <TituloComic size={92}>Todo el mundo los confunde…</TituloComic>
    </Pop>
    <Pop desde={60} giro={-1.5}>
      <Globo size={46} ancho={880} color={K.amarillo}>
        …pero tu cuerpo sufre cosas COMPLETAMENTE distintas.
      </Globo>
    </Pop>
    <Sello desde={170} texto="¡NO SON LO MISMO!" color={K.rojo} size={70} />
  </Pagina>
);

// ─── 3. Una articulación sana ───────────────────────────────────────────────
const Sana: React.FC = () => (
  <Pagina gap={22}>
    <Pop desde={0}>
      <TituloComic size={80}>Primero: una articulación SANA</TituloComic>
    </Pop>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Pop desde={20}>
        <Articulacion ancho={440} />
      </Pop>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Rotulo desde={60} color={K.blanco} giro={-2}>
          🦴 Dos huesos que se encuentran
        </Rotulo>
        <Rotulo desde={150} color="#bfe8ff" giro={2}>
          🧽 Cartílago: un almohadón liso que amortigua
        </Rotulo>
        <Rotulo desde={240} color="#ffd0e0" giro={-2}>
          💧 Membrana sinovial: fabrica el “aceite” que lubrica
        </Rotulo>
      </div>
    </div>
    <Pop desde={360}>
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: K.negro, textAlign: "center" }}>Todo se desliza sin dolor. 😌</div>
    </Pop>
  </Pagina>
);

// ─── 4. Artrosis ────────────────────────────────────────────────────────────
const Artrosis: React.FC = () => {
  const frame = useCurrentFrame();
  const desgaste = interpolate(frame, [80, 300], [0, 1], clamp);
  const picos = interpolate(frame, [340, 420], [0, 1], clamp);
  return (
    <Pagina gap={20}>
      <Pop desde={0}>
        <TituloComic size={84}>ARTROSIS = DESGASTE 🔧</TituloComic>
      </Pop>
      <Pop desde={20}>
        <Sticker color={C_ARTROSIS} style={{ padding: "8px 24px", fontSize: 34, fontWeight: 800 }}>
          “-osis”: algo que se deteriora
        </Sticker>
      </Pop>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Articulacion desgaste={desgaste} picos={picos} ancho={420} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Rotulo desde={90} color={K.blanco} giro={-2}>
            El cartílago se gasta y se agrieta
          </Rotulo>
          <Rotulo desde={240} color={K.amarillo} giro={2}>
            Los huesos empiezan a rozar: ¡CRIC!
          </Rotulo>
          <Rotulo desde={350} color={C_ARTROSIS} giro={-2}>
            Crecen “picos de loro” (osteofitos)
          </Rotulo>
        </div>
      </div>
      <Pop desde={480} giro={-1}>
        <Globo size={34} ancho={880}>
          Es la más común: un “desgaste” de la articulación con los años y el uso.
        </Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 5. Artritis ────────────────────────────────────────────────────────────
const Artritis: React.FC = () => {
  const frame = useCurrentFrame();
  const inflama = interpolate(frame, [80, 200], [0, 1], clamp);
  const ataque = interpolate(frame, [250, 340], [0, 1], clamp);
  return (
    <Pagina gap={20}>
      <Pop desde={0}>
        <TituloComic size={84}>ARTRITIS = INFLAMACIÓN 🔥</TituloComic>
      </Pop>
      <Pop desde={20}>
        <Sticker color={C_ARTRITIS} style={{ padding: "8px 24px", fontSize: 34, fontWeight: 800 }}>
          “-itis”: algo que se inflama
        </Sticker>
      </Pop>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Articulacion inflama={inflama} ataque={ataque} desgaste={interpolate(frame, [450, 640], [0, 0.5], clamp)} ancho={420} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Rotulo desde={90} color={K.blanco} giro={-2}>
            La membrana se inflama: hinchada, roja y caliente
          </Rotulo>
          <Rotulo desde={260} color={K.violeta} giro={2}>
            En la reumatoide, las defensas la atacan
          </Rotulo>
          <Rotulo desde={430} color={C_ARTRITIS} giro={-2}>
            Sin tratamiento, daña cartílago y hueso
          </Rotulo>
        </div>
      </div>
      <Pop desde={520} giro={1}>
        <Globo size={34} ancho={880}>
          Hay muchas: reumatoide, psoriásica, gota… ¡son más de 100!
        </Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 6. VS: el dolor ────────────────────────────────────────────────────────
const VsDolor: React.FC = () => (
  <Pagina gap={26}>
    <Cabecera />
    <FilaVS desde={40} tema="EL DOLOR" artrosis="Duele al moverte y mejora con reposo" artritis="Duele también en reposo y de noche" />
    <FilaVS desde={170} tema="RIGIDEZ AL DESPERTAR" artrosis="Menos de 30 minutos" artritis="Más de 1 hora" />
    <FilaVS desde={300} tema="CÓMO SE VE" artrosis="Poca hinchazón, a veces ruidos" artritis="Hinchada, caliente, a veces roja" />
  </Pagina>
);

// ─── 7. VS: dónde ───────────────────────────────────────────────────────────
const VsDonde: React.FC = () => (
  <Pagina gap={26}>
    <Cabecera />
    <FilaVS desde={30} tema="DÓNDE" artrosis="Rodillas, caderas, columna y puntas de los dedos" artritis="Manos, muñecas y nudillos, entre otras" />
    <FilaVS desde={170} tema="CÓMO SE REPARTE" artrosis="Suele ser de un lado más que del otro" artritis="Reumatoide: los dos lados a la vez (simétrica)" />
    <FilaVS desde={300} tema="EL RESTO DEL CUERPO" artrosis="Solo la articulación" artritis="Puede dar cansancio y fiebre" />
  </Pagina>
);

// ─── 8. VS: a quién ─────────────────────────────────────────────────────────
const VsQuien: React.FC = () => (
  <Pagina gap={26}>
    <Cabecera />
    <FilaVS desde={30} tema="A QUIÉN" artrosis="Más frecuente después de los 50" artritis="A cualquier edad, incluso en niños" />
    <FilaVS desde={160} tema="QUÉ LA FAVORECE" artrosis="Edad, sobrepeso, lesiones y sobrecarga" artritis="Sistema inmune, genética, tabaco; reumatoide: 3 veces más en mujeres" />
  </Pagina>
);

// ─── 9. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={26}>
    <Pop desde={0}>
      <TituloComic size={84}>¿Cómo se diagnostica?</TituloComic>
    </Pop>
    <FilaVS desde={30} tema="ESTUDIOS" artrosis="Examen físico y radiografía 🩻" artritis="Análisis de sangre 🩸 y ecografía" />
    <Pop desde={170} giro={-1.5}>
      <Sticker color={K.amarillo} style={{ width: 930, padding: "18px 26px", fontSize: 38, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
        ⏰ En la artritis reumatoide, tratar en los primeros meses evita daños que no tienen vuelta atrás.
      </Sticker>
    </Pop>
    <Pop desde={280}>
      <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: K.negro, textAlign: "center" }}>El especialista: reumatología 👩‍⚕️</div>
    </Pop>
  </Pagina>
);

// ─── 10. Tratamiento ────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => (
  <Pagina gap={26}>
    <Cabecera />
    <FilaVS desde={30} tema="EL TRATAMIENTO" artrosis="Ejercicio, bajar de peso, kinesiología, calmantes; prótesis si es avanzada" artritis="Medicamentos que frenan al sistema inmune, más ejercicio" />
    <Pop desde={220} giro={1.5}>
      <Globo size={44} ancho={880} color={K.lima}>
        En las dos: ¡MOVERSE AYUDA! 💪 Músculos fuertes protegen las articulaciones.
      </Globo>
    </Pop>
  </Pagina>
);

// ─── 11. Mitos ──────────────────────────────────────────────────────────────
const MITOS = [
  { m: "“Es cosa de viejos”", r: "La artritis puede aparecer a cualquier edad." },
  { m: "“Si duele, reposo total”", r: "El movimiento adecuado es parte del tratamiento." },
  { m: "“Tronarse los dedos da artrosis”", r: "No hay pruebas de que la cause." },
];

const Mitos: React.FC = () => (
  <Pagina gap={30}>
    <Pop desde={0}>
      <TituloComic size={92}>MITOS</TituloComic>
    </Pop>
    {MITOS.map((x, i) => (
      <div key={x.m} style={{ position: "relative" }}>
        <Pop desde={30 + i * 130} giro={i % 2 ? 1.5 : -1.5}>
          <Sticker style={{ width: 920, padding: "16px 26px" }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#777", textDecoration: "line-through", textDecorationColor: K.rojo, textDecorationThickness: 5 }}>{x.m}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: K.negro, marginTop: 6 }}>✅ {x.r}</div>
          </Sticker>
        </Pop>
        <div style={{ position: "absolute", right: -10, top: -26 }}>
          <Sello desde={60 + i * 130} texto="MITO" color={K.rojo} size={40} />
        </div>
      </div>
    ))}
  </Pagina>
);

// ─── 12. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Pop desde={0} giro={-2}>
      <Sticker color={C_ARTROSIS} style={{ width: 860, padding: "12px 20px", textAlign: "center", fontFamily: COMIC, fontSize: 64, letterSpacing: 2 }}>
        ARTROSIS = DESGASTE 🔧
      </Sticker>
    </Pop>
    <Pop desde={15} giro={2}>
      <Sticker color={C_ARTRITIS} style={{ width: 860, padding: "12px 20px", textAlign: "center", fontFamily: COMIC, fontSize: 64, letterSpacing: 2 }}>
        ARTRITIS = INFLAMACIÓN 🔥
      </Sticker>
    </Pop>
    <Pop desde={60}>
      <Sticker color={K.blanco} style={{ width: 900, padding: "14px 24px", fontSize: 34, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
        Consultá si una articulación está hinchada, o si la rigidez de la mañana dura más de 1 hora.
      </Sticker>
    </Pop>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={110} emoji="🔖" texto="GUARDALO" color={K.lima} />
      <Boton desde={125} emoji="📲" texto="COMPARTILO" color={K.celeste} />
    </div>
    <Pop desde={145}>
      <Sticker style={{ padding: "8px 22px", fontSize: 28, fontWeight: 700 }}>Esto no reemplaza la consulta con tu médico.</Sticker>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 6, color: K.amarillo, Escena: Gancho },
  { id: "confusion", seg: 10, color: K.celeste, Escena: Confusion },
  { id: "sana", seg: 18, color: K.lima, Escena: Sana },
  { id: "artrosis", seg: 22, color: K.amarillo, Escena: Artrosis },
  { id: "artritis", seg: 22, color: K.celeste, Escena: Artritis },
  { id: "vsDolor", seg: 16, color: K.violeta, Escena: VsDolor },
  { id: "vsDonde", seg: 14, color: K.celeste, Escena: VsDonde },
  { id: "vsQuien", seg: 12, color: K.violeta, Escena: VsQuien },
  { id: "diagnostico", seg: 14, color: K.lima, Escena: Diagnostico },
  { id: "tratamiento", seg: 18, color: K.violeta, Escena: Tratamiento },
  { id: "mitos", seg: 16, color: K.amarillo, Escena: Mitos },
  { id: "cierre", seg: 12, color: K.violeta, Escena: Cierre },
];

export const DURACION_ARTROSIS = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const ArtrosisArtritis: React.FC = () => (
  <ReelComic
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 6,10,18,22,22,16,14,12,14,18,16,12 --bpm 112 --transponer 1 --estilo energico
    musica={staticFile("audio/artrosis-musica.mp3")}
  />
);

// ─── Versión de 90 segundos ─────────────────────────────────────────────────
/** Cada escena se acelera en proporción a su nueva duración (seg nuevos / seg originales) */
const conRitmo = (Escena: React.FC, original: number, nuevo: number): React.FC => {
  const ConRitmo: React.FC = () => (
    <Ritmo.Provider value={nuevo / original}>
      <Escena />
    </Ritmo.Provider>
  );
  return ConRitmo;
};

const PAGINAS_90 = [
  { id: "gancho", seg: 4, color: K.amarillo, Escena: conRitmo(Gancho, 6, 4) },
  { id: "confusion", seg: 6, color: K.celeste, Escena: conRitmo(Confusion, 10, 6) },
  { id: "sana", seg: 10, color: K.lima, Escena: conRitmo(Sana, 18, 10) },
  { id: "artrosis", seg: 14, color: K.amarillo, Escena: conRitmo(Artrosis, 22, 14) },
  { id: "artritis", seg: 14, color: K.celeste, Escena: conRitmo(Artritis, 22, 14) },
  { id: "vsDolor", seg: 11, color: K.violeta, Escena: conRitmo(VsDolor, 16, 11) },
  { id: "vsDonde", seg: 10, color: K.celeste, Escena: conRitmo(VsDonde, 14, 10) },
  { id: "tratamiento", seg: 10, color: K.lima, Escena: conRitmo(Tratamiento, 18, 10) },
  { id: "cierre", seg: 11, color: K.violeta, Escena: conRitmo(Cierre, 12, 11) },
];

export const DURACION_ARTROSIS_90 = PAGINAS_90.reduce((a, p) => a + p.seg, 0) * FPS;

export const ArtrosisArtritis90: React.FC = () => (
  <ReelComic
    paginas={PAGINAS_90}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,6,10,14,14,11,10,10,11 --bpm 116 --transponer 1 --estilo energico
    musica={staticFile("audio/artrosis90-musica.mp3")}
  />
);

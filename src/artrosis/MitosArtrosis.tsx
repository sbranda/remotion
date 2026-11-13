// Reel de 90 s: mitos sobre la artrosis (la degradación del "amortiguador"), estilo cómic.
// Parte 2 de la serie: mantiene el naranja 🔧 de la artrosis.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, COMIC, Emoji, Globo, K, ListaStickers, Pagina, Pop, ReelComic, SANS, Sello, Sticker, TituloComic, clamp, useSacudida } from "../salud/comic";
import { Articulacion } from "./ArtrosisArtritis";

const FPS = 30;
const NARANJA = K.naranja;
const HUESO = "#fff6e3";
const CARTILAGO = "#8fd3ff";

// ─── Hueso con vasos y cartílago sin vasos ──────────────────────────────────
const SinVasos: React.FC<{ p: number }> = ({ p }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={820} height={430} viewBox="0 0 820 430" style={{ overflow: "visible" }}>
      {/* hueso */}
      <path d="M260 430 L260 250 Q160 230 170 160 Q190 90 410 90 Q630 90 650 160 Q660 230 560 250 L560 430 Z" fill={HUESO} stroke={K.negro} strokeWidth={7} strokeLinejoin="round" />
      {/* vasos sanguíneos dentro del hueso */}
      {["M410 430 L410 300 Q380 240 300 200", "M410 300 Q450 230 530 200", "M330 430 L340 330 Q300 270 240 190", "M490 430 L480 330 Q530 270 590 190"].map((d, i) => (
        <path key={i} d={d} stroke={K.rojo} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p * 1.5)} />
      ))}
      {/* sangre que circula por el hueso */}
      {p > 0.6 &&
        [0, 1, 2].map((i) => {
          const t = ((frame + i * 20) % 60) / 60;
          return <circle key={i} cx={410} cy={430 - t * 130} r={9} fill={K.rojo} stroke={K.negro} strokeWidth={2} />;
        })}
      {/* cartílago arriba, sin vasos */}
      <path d="M180 150 Q190 70 410 66 Q630 70 640 150" stroke={CARTILAGO} strokeWidth={46} fill="none" strokeLinecap="round" />
      <text x={410} y={60} textAnchor="middle" fontFamily={COMIC} fontSize={42} fill={K.negro}>
        CARTÍLAGO
      </text>
      {p > 0.75 && (
        <g transform="translate(700 70)">
          <circle r={58} fill={K.blanco} stroke={K.negro} strokeWidth={6} />
          <text y={18} textAnchor="middle" fontSize={56}>
            🩸
          </text>
          <line x1={-40} y1={40} x2={40} y2={-40} stroke={K.rojo} strokeWidth={10} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

// ─── El cartílago como esponja ──────────────────────────────────────────────
const Esponja: React.FC<{ activa: number }> = ({ activa }) => {
  const frame = useCurrentFrame();
  const ciclo = 50;
  const fase = (frame % ciclo) / ciclo;
  const aprieta = activa * (fase < 0.5 ? Math.sin(fase * 2 * Math.PI) : 0); // 0..1 en la primera mitad
  const suelta = activa > 0 && fase >= 0.5;
  const alto = 150 * (1 - 0.45 * aprieta);
  const yTop = 220 - alto / 2;
  return (
    <svg width={860} height={470} viewBox="0 0 860 470" style={{ overflow: "visible" }}>
      {/* hueso de arriba que empuja */}
      <path d={`M330 0 L530 0 L530 ${yTop - 60} Q640 ${yTop - 40} 640 ${yTop} L220 ${yTop} Q220 ${yTop - 40} 330 ${yTop - 60} Z`} fill={HUESO} stroke={K.negro} strokeWidth={7} strokeLinejoin="round" />
      {/* esponja */}
      <rect x={220} y={yTop} width={420} height={alto} rx={26} fill={CARTILAGO} stroke={K.negro} strokeWidth={7} />
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={i} cx={260 + (i % 7) * 57} cy={yTop + alto * (i < 7 ? 0.32 : 0.7)} rx={14} ry={10 * (alto / 150)} fill="#5fb6e8" />
      ))}
      {/* hueso de abajo */}
      <path d={`M220 ${yTop + alto} L640 ${yTop + alto} Q640 ${yTop + alto + 40} 530 ${yTop + alto + 60} L530 470 L330 470 L330 ${yTop + alto + 60} Q220 ${yTop + alto + 40} 220 ${yTop + alto} Z`} fill={HUESO} stroke={K.negro} strokeWidth={7} strokeLinejoin="round" />
      {/* nutrientes que entran al soltar, desechos que salen al apretar */}
      {activa > 0 &&
        Array.from({ length: 6 }).map((_, i) => {
          const lado = i % 2 ? 1 : -1;
          const u = suelta ? (fase - 0.5) * 2 : fase * 2;
          const xFuera = 430 + lado * 410;
          const xDentro = 430 + lado * 100;
          const x = suelta ? xFuera + (xDentro - xFuera) * u : xDentro + (xFuera - xDentro) * u;
          const y = 220 + ((i * 37) % 80) - 40;
          return suelta ? (
            <circle key={i} cx={x} cy={y} r={22} fill={K.verde} stroke={K.negro} strokeWidth={5} />
          ) : (
            <circle key={i} cx={x} cy={y} r={19} fill="#a87b4f" stroke={K.negro} strokeWidth={4} opacity={1 - u * 0.4} />
          );
        })}
      {activa > 0 && (
        <text x={430} y={yTop + alto + 50} textAnchor="middle" fontFamily={COMIC} fontSize={46} fill={K.negro} opacity={0}>
          .
        </text>
      )}
      {activa > 0 && (
        <g>
          <rect x={suelta ? 600 : 20} y={400} width={240} height={64} rx={16} fill={suelta ? K.verde : K.naranja} stroke={K.negro} strokeWidth={5} />
          <text x={suelta ? 720 : 140} y={444} textAnchor="middle" fontFamily={COMIC} fontSize={40} fill={K.negro}>
            {suelta ? "¡SUELTA!" : "¡APRIETA!"}
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── Círculo vicioso ────────────────────────────────────────────────────────
const PASOS = [
  { e: "😣", t: "Duele", c: K.rosa },
  { e: "🛋️", t: "No me muevo", c: K.amarillo },
  { e: "🍽️", t: "El cartílago se nutre menos", c: K.celeste },
  { e: "💪", t: "Los músculos se debilitan", c: K.lima },
];

const Circulo: React.FC = () => {
  const frame = useCurrentFrame();
  const activo = Math.floor(Math.max(0, frame - 40) / 45) % 4;
  const R = 300;
  const cx = 470;
  const cy = 390;
  return (
    <div style={{ position: "relative", width: 940, height: 780 }}>
      <svg width={940} height={780} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={R - 40} fill="none" stroke={K.negro} strokeWidth={8} strokeDasharray="22 16" />
        {[45, 135, 225, 315].map((a) => {
          const rad = ((a + 18) * Math.PI) / 180;
          const x = cx + Math.cos(rad) * (R - 40);
          const y = cy + Math.sin(rad) * (R - 40);
          return <path key={a} d={`M${x} ${y} l-18 -10 l4 22 Z`} transform={`rotate(${a + 108} ${x} ${y})`} fill={K.negro} />;
        })}
        <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={COMIC} fontSize={46} fill={K.rojo} stroke={K.negro} strokeWidth={2}>
          ¡MÁS DOLOR!
        </text>
      </svg>
      {PASOS.map((p, i) => {
        const ang = (-90 + i * 90) * (Math.PI / 180);
        const x = cx + Math.cos(ang) * R;
        const y = cy + Math.sin(ang) * R;
        const on = frame > 40 + i * 45;
        return (
          <div key={p.t} style={{ position: "absolute", left: x - 140, top: y - 70, width: 280, opacity: on ? 1 : 0, transform: `scale(${i === activo && frame > 220 ? 1.1 : 1})` }}>
            <Sticker color={p.c} giro={i % 2 ? 3 : -3} style={{ padding: "12px 14px", textAlign: "center" }}>
              <Emoji e={p.e} size={56} />
              <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.15 }}>{p.t}</div>
            </Sticker>
          </div>
        );
      })}
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const sac = useSacudida(15, 14, 16);
  return (
    <Pagina gap={26}>
      <Pop desde={0}>
        <TituloComic size={78}>Creías que tus rodillas crujen por la edad…</TituloComic>
      </Pop>
      <div style={{ transform: `translateX(${sac}px)` }}>
        <Articulacion desgaste={0.75} ancho={360} />
      </div>
      <Pop desde={80} giro={-3}>
        <Sticker color={NARANJA} style={{ padding: "12px 30px", fontFamily: COMIC, fontSize: 70, letterSpacing: 2 }}>
          PERO LA VERDADERA RAZÓN ES ESTA…
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 2. El mito ─────────────────────────────────────────────────────────────
const Mito: React.FC = () => (
  <Pagina gap={34} centro>
    <Pop desde={0} giro={-1.5}>
      <Globo size={50} ancho={880}>
        “La artrosis es cosa de viejos y no hay nada que hacer: hay que aguantarse.”
      </Globo>
    </Pop>
    <Sello desde={60} texto="¡MITO!" color={K.rojo} size={110} />
    <Pop desde={110}>
      <Sticker color={K.blanco} style={{ width: 920, padding: "16px 26px", fontSize: 36, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
        La edad suma, pero no es la única causa. Y sí: <span style={{ background: K.lima, padding: "0 8px" }}>hay mucho para hacer</span>.
      </Sticker>
    </Pop>
  </Pagina>
);

// ─── 3. El cartílago no tiene vasos ─────────────────────────────────────────
const Vasos: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [40, 200], [0, 1], clamp);
  return (
    <Pagina gap={24}>
      <Pop desde={0}>
        <TituloComic size={76}>El secreto: el cartílago NO tiene vasos sanguíneos</TituloComic>
      </Pop>
      <SinVasos p={p} />
      <Pop desde={60} giro={-1.5}>
        <Sticker style={{ width: 920, padding: "16px 26px", fontSize: 38, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
          Al hueso le llega sangre 🩸. Al cartílago <span style={{ background: K.rosa, padding: "0 8px" }}>no</span>.
        </Sticker>
      </Pop>
      <Pop desde={260} giro={1.5}>
        <Globo size={38} ancho={880} color={K.amarillo}>
          Entonces… ¿cómo se alimenta? 🤔
        </Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 4. La esponja ──────────────────────────────────────────────────────────
const EsponjaEscena: React.FC = () => {
  const frame = useCurrentFrame();
  const activa = frame > 70 ? 1 : 0;
  return (
    <Pagina gap={20}>
      <Pop desde={0}>
        <TituloComic size={80}>¡Funciona como una ESPONJA! 🧽</TituloComic>
      </Pop>
      <Esponja activa={activa} />
      <Pop desde={90} giro={-1.5}>
        <Sticker color={K.naranja} style={{ width: 920, padding: "12px 24px", fontSize: 34, fontWeight: 800, textAlign: "center" }}>
          🟤 Al cargar peso se aprieta y saca los desechos
        </Sticker>
      </Pop>
      <Pop desde={200} giro={1.5}>
        <Sticker color={K.verde} style={{ width: 920, padding: "12px 24px", fontSize: 34, fontWeight: 800, textAlign: "center" }}>
          🟢 Al soltar absorbe líquido con nutrientes
        </Sticker>
      </Pop>
      <Pop desde={320}>
        <TituloComic size={60} color={K.amarillo}>
          Moverte = alimentarlo
        </TituloComic>
      </Pop>
    </Pagina>
  );
};

// ─── 5. El círculo del miedo ────────────────────────────────────────────────
const Miedo: React.FC = () => (
  <Pagina gap={14}>
    <Pop desde={0}>
      <TituloComic size={70}>Dejar de moverte por miedo… la empeora</TituloComic>
    </Pop>
    <Circulo />
  </Pagina>
);

// ─── 6. Poco o demasiado ────────────────────────────────────────────────────
const Carga: React.FC = () => (
  <Pagina gap={26}>
    <Pop desde={0}>
      <TituloComic size={78}>El problema: los extremos</TituloComic>
    </Pop>
    <div style={{ display: "flex", gap: 18 }}>
      <Pop desde={30} giro={-2}>
        <Sticker color={K.celeste} style={{ width: 460, height: 330, padding: "16px 18px", textAlign: "center" }}>
          <Emoji e="🛋️" size={80} />
          <div style={{ fontFamily: COMIC, fontSize: 46, letterSpacing: 2, marginTop: 6 }}>MUY POCO</div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, marginTop: 6 }}>Sedentarismo: cartílago sin “bombeo” y músculos débiles</div>
        </Sticker>
      </Pop>
      <Pop desde={110} giro={2}>
        <Sticker color={K.rosa} style={{ width: 460, height: 330, padding: "16px 18px", textAlign: "center" }}>
          <Emoji e="🏋️" size={80} />
          <div style={{ fontFamily: COMIC, fontSize: 46, letterSpacing: 2, marginTop: 6 }}>DEMASIADO</div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, marginTop: 6 }}>Sobrecarga: kilos de más, impactos repetidos, lesiones viejas</div>
        </Sticker>
      </Pop>
    </div>
    <Pop desde={210} giro={-1}>
      <Globo size={36} ancho={880} color={K.amarillo}>
        ⚖️ Cada kilo de más pesa unas 4 veces en la rodilla al caminar.
      </Globo>
    </Pop>
  </Pagina>
);

// ─── 7. Qué hacer ───────────────────────────────────────────────────────────
const QueHacer: React.FC = () => (
  <Pagina gap={26}>
    <Pop desde={0}>
      <TituloComic size={84}>¿Qué SÍ podés hacer?</TituloComic>
    </Pop>
    <ListaStickers
      items={[
        { emoji: "🦵", texto: "Fortalecer los músculos (sobre todo los muslos)" },
        { emoji: "🚲", texto: "Caminar, bici o nadar: movimiento sin impacto" },
        { emoji: "⚖️", texto: "Bajar de peso si hace falta" },
        { emoji: "👩‍⚕️", texto: "Kinesiología: un plan a tu medida" },
      ]}
      desde={25}
      paso={50}
      colores={[K.lima, K.blanco, K.celeste, K.amarillo]}
      size={34}
    />
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={28} centro>
    <Pop desde={0}>
      <TituloComic size={80}>No es solo vejez: tu cartílago necesita MOVIMIENTO</TituloComic>
    </Pop>
    <Pop desde={30}>
      <Sticker style={{ padding: "10px 24px", fontSize: 30, fontWeight: 800, textAlign: "center" }}>Un poco de molestia al moverte puede ser normal; si el dolor aumenta, consultá.</Sticker>
    </Pop>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={55} emoji="🔖" texto="GUARDALO" color={K.lima} />
      <Boton desde={70} emoji="📲" texto="COMPARTILO" color={K.naranja} />
    </div>
    <Pop desde={90}>
      <Sticker style={{ padding: "8px 22px", fontSize: 28, fontWeight: 700 }}>Esto no reemplaza la consulta con tu médico.</Sticker>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 6, color: K.amarillo, Escena: Gancho },
  { id: "mito", seg: 8, color: K.celeste, Escena: Mito },
  { id: "vasos", seg: 12, color: K.lima, Escena: Vasos },
  { id: "esponja", seg: 14, color: K.celeste, Escena: EsponjaEscena },
  { id: "miedo", seg: 14, color: K.amarillo, Escena: Miedo },
  { id: "carga", seg: 13, color: K.violeta, Escena: Carga },
  { id: "queHacer", seg: 12, color: K.naranja, Escena: QueHacer },
  { id: "cierre", seg: 11, color: K.violeta, Escena: Cierre },
];

export const DURACION_MITOS_ARTROSIS = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const MitosArtrosis: React.FC = () => (
  <ReelComic
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 6,8,12,14,14,13,12,11 --bpm 110 --transponer 3 --estilo energico
    musica={staticFile("audio/mitos-artrosis-musica.mp3")}
  />
);

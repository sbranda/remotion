// Reel de 90 s: resistencia a la insulina, estilo cómic.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, COMIC, Emoji, Globo, K, ListaStickers, Pagina, Pop, ReelComic, SANS, Sello, Sticker, TituloComic, clamp, useSacudida } from "../salud/comic";

const FPS = 30;

// ─── Célula con puerta, llave e insulina ────────────────────────────────────
const Celula: React.FC<{ abre: number; llaves: number; trabada?: boolean; ancho?: number }> = ({ abre, llaves, trabada = false, ancho = 860 }) => {
  const frame = useCurrentFrame();
  const sac = trabada ? Math.sin(frame / 2) * 4 : 0;
  return (
    <svg width={ancho} height={ancho * 0.5} viewBox="0 0 860 430" style={{ overflow: "visible" }}>
      {/* célula */}
      <ellipse cx={600} cy={215} rx={240} ry={190} fill="#ffe7a8" stroke={K.negro} strokeWidth={8} />
      <circle cx={650} cy={200} r={50} fill="#ffb86b" stroke={K.negro} strokeWidth={6} />
      <text x={600} y={360} textAnchor="middle" fontFamily={COMIC} fontSize={44} fill={K.negro}>
        CÉLULA
      </text>
      {/* puerta */}
      <rect x={348} y={160} width={30} height={110} fill={K.blanco} stroke={K.negro} strokeWidth={6} />
      <rect x={350} y={162 + 106 * abre} width={26} height={106 * (1 - abre)} fill="#8b5a2b" transform={`translate(${sac} 0)`} />
      {/* cerradura */}
      <circle cx={363} cy={215} r={9} fill={K.negro} opacity={1 - abre} />
      {/* glucosa en la sangre */}
      {Array.from({ length: 7 }).map((_, i) => {
        const t = ((frame + i * 17) % 80) / 80;
        const entra = abre > 0.5;
        const x = entra ? 60 + t * 600 : 60 + ((i * 41) % 230) + Math.sin(frame / 10 + i) * 12;
        const y = entra ? 215 + Math.sin(t * 6 + i) * 30 : 40 + ((i * 53) % (llaves > 1 ? 230 : 330));
        const op = entra && t > 0.9 ? 0 : 1;
        return (
          <g key={i} opacity={op}>
            <circle cx={x} cy={y} r={20} fill={K.amarillo} stroke={K.negro} strokeWidth={5} />
            <text x={x} y={y + 8} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={20} fill={K.negro}>
              G
            </text>
          </g>
        );
      })}
      {/* llaves de insulina */}
      {Array.from({ length: llaves }).map((_, i) => (
        <text key={i} x={llaves === 1 ? 270 : 30 + (i % 4) * 72} y={llaves === 1 ? 235 : 345 + Math.floor(i / 4) * 64} fontSize={56}>
          🔑
        </text>
      ))}
    </svg>
  );
};

// ─── Montaña rusa de glucosa y energía ──────────────────────────────────────
const MontanaRusa: React.FC<{ p: number }> = ({ p }) => {
  const pts: [number, number][] = [];
  for (let x = 0; x <= 860; x += 10) {
    const k = x / 860;
    let y = 220;
    if (k > 0.1 && k < 0.35) y = 220 - 170 * Math.sin(((k - 0.1) / 0.25) * Math.PI);
    if (k >= 0.35 && k < 0.6) y = 220 + 110 * Math.sin(((k - 0.35) / 0.25) * Math.PI);
    if (k >= 0.6 && k < 0.8) y = 220 - 140 * Math.sin(((k - 0.6) / 0.2) * Math.PI);
    if (k >= 0.8) y = 220 + 90 * Math.sin(((k - 0.8) / 0.2) * Math.PI);
    pts.push([x, y]);
  }
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const idx = Math.min(pts.length - 1, Math.floor(p * (pts.length - 1)));
  const [cx, cy] = pts[idx];
  return (
    <svg width={900} height={380} viewBox="0 0 860 380" style={{ overflow: "visible" }}>
      <line x1={0} y1={220} x2={860} y2={220} stroke={K.negro} strokeWidth={3} strokeDasharray="10 10" opacity={0.4} />
      <path d={d} stroke={K.negro} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={d} stroke={K.rojo} strokeWidth={7} fill="none" strokeLinecap="round" />
      <text x={cx - 30} y={cy - 14} fontSize={60}>
        🛒
      </text>
      <text x={190} y={30} textAnchor="middle" fontFamily={COMIC} fontSize={42} fill={K.negro} opacity={p > 0.2 ? 1 : 0}>
        PICO ⚡
      </text>
      <text x={410} y={370} textAnchor="middle" fontFamily={COMIC} fontSize={42} fill={K.negro} opacity={p > 0.45 ? 1 : 0}>
        BAJÓN 😴
      </text>
      <text x={790} y={350} textAnchor="middle" fontFamily={COMIC} fontSize={38} fill={K.negro} opacity={p > 0.9 ? 1 : 0}>
        ¡HAMBRE! 🍫
      </text>
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={36} centro>
    <Pop desde={0} giro={-6}>
      <Emoji e="🥱" size={160} />
    </Pop>
    <Pop desde={10}>
      <TituloComic size={92}>¿Comés y a la hora te agarra un sueño terrible?</TituloComic>
    </Pop>
    <Sello desde={70} texto="¿RESISTENCIA A LA INSULINA?" color={K.rojo} size={50} />
  </Pagina>
);

// ─── 2. La llave ────────────────────────────────────────────────────────────
const Llave: React.FC = () => {
  const frame = useCurrentFrame();
  const abre = interpolate(frame, [130, 160], [0, 1], clamp);
  return (
    <Pagina gap={28}>
      <Pop desde={0}>
        <TituloComic size={84}>La insulina es una LLAVE 🔑</TituloComic>
      </Pop>
      <Pop desde={20}>
        <Celula abre={abre} llaves={frame > 100 ? 1 : 0} />
      </Pop>
      <Pop desde={60} giro={-1.5}>
        <Sticker style={{ width: 930, padding: "18px 28px", fontSize: 40, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
          Al comer, sube la <span style={{ background: K.amarillo, padding: "0 8px" }}>glucosa</span>. El páncreas manda <b>insulina</b>, que abre la puerta de las células para que la glucosa entre y se convierta en <b>energía</b> ⚡
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 3. La cerradura trabada ───────────────────────────────────────────────
const Trabada: React.FC = () => {
  const frame = useCurrentFrame();
  const llaves = Math.min(8, 1 + Math.floor(interpolate(frame, [60, 220], [0, 8], clamp)));
  const sac = useSacudida(40, 12, 20);
  return (
    <Pagina gap={26}>
      <Pop desde={0}>
        <TituloComic size={84}>Con resistencia… ¡la cerradura se TRABA!</TituloComic>
      </Pop>
      <div style={{ transform: `translateX(${sac}px)` }}>
        <Celula abre={0.15} llaves={llaves} trabada />
      </div>
      <Pop desde={70} giro={1.5}>
        <Sticker color={K.blanco} style={{ width: 930, padding: "18px 28px", fontSize: 38, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
          El páncreas manda <span style={{ background: K.rosa, padding: "0 8px" }}>más y más insulina</span> para forzar la puerta.
        </Sticker>
      </Pop>
      <Pop desde={250} giro={-1.5}>
        <Globo size={36} ancho={880} color={K.amarillo}>
          Por eso, al principio, la glucosa puede salir NORMAL en el análisis… ¡mientras la insulina está por las nubes!
        </Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 4. Energía ─────────────────────────────────────────────────────────────
const Energia: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [30, 300], [0, 1], clamp);
  return (
    <Pagina gap={26}>
      <Pop desde={0}>
        <TituloComic size={80}>¿Y la energía? Una montaña rusa 🎢</TituloComic>
      </Pop>
      <MontanaRusa p={p} />
      <Pop desde={120} giro={-1.5}>
        <Sticker style={{ width: 930, padding: "18px 28px", fontSize: 38, fontWeight: 800, textAlign: "center", lineHeight: 1.25 }}>
          Tanta insulina hace <span style={{ background: K.celeste, padding: "0 8px" }}>bajar la glucosa de golpe</span>: llegan el sueño, el cansancio, la falta de concentración…
        </Sticker>
      </Pop>
      <Pop desde={300} giro={1.5}>
        <Sticker color={K.amarillo} style={{ width: 930, padding: "14px 28px", fontSize: 38, fontWeight: 800, textAlign: "center" }}>
          …y el cuerpo pide más dulce. ¡Y vuelta a empezar! 🔁
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 5. Signos tempranos ────────────────────────────────────────────────────
const Signos: React.FC = () => {
  const col = (titulo: string, color: string, items: string[], desde: number, giro: number) => (
    <Pop desde={desde} giro={giro}>
      <Sticker color={color} style={{ width: 455, padding: "18px 20px" }}>
        <div style={{ fontFamily: COMIC, fontSize: 48, letterSpacing: 2, textAlign: "center", marginBottom: 6 }}>{titulo}</div>
        {items.map((t) => (
          <div key={t} style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25, marginTop: 8 }}>
            {t}
          </div>
        ))}
      </Sticker>
    </Pop>
  );
  return (
    <Pagina gap={30}>
      <Pop desde={0}>
        <TituloComic size={80}>Signos tempranos (más allá del peso)</TituloComic>
      </Pop>
      <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
        {col("LO QUE SE VE", K.blanco, ["🌑 Piel oscura y aterciopelada en cuello o axilas", "🔸 Verruguitas en el cuello", "📏 Más cintura que antes", "📅 Ciclos irregulares (SOP)"], 30, -2)}
        {col("LO QUE SE SIENTE", K.amarillo, ["😴 Sueño después de comer", "🍫 Antojos de dulce", "🍽️ Hambre cada 2 horas", "🪫 Cansancio todo el día"], 150, 2)}
      </div>
      <Pop desde={300} giro={-1.5}>
        <Sticker color={K.celeste} style={{ width: 930, padding: "14px 24px", fontSize: 34, fontWeight: 800, textAlign: "center" }}>
          🩸 En el análisis: triglicéridos altos, colesterol “bueno” bajo, hígado graso o presión alta
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 6. Qué la favorece ─────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={30}>
    <Pop desde={0}>
      <TituloComic size={84}>¿Qué la favorece?</TituloComic>
    </Pop>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", width: 950 }}>
      {["🛋️ Moverse poco", "🍟 Ultraprocesados", "🥤 Bebidas azucaradas", "😴 Dormir poco", "😰 Estrés", "🧬 Herencia"].map((t, i) => (
        <Pop key={t} desde={20 + i * 15} giro={i % 2 ? 3 : -3}>
          <Sticker color={[K.rosa, K.lima, K.celeste, K.amarillo, K.naranja, K.blanco][i]} style={{ padding: "14px 24px", fontSize: 40, fontWeight: 800 }}>
            {t}
          </Sticker>
        </Pop>
      ))}
    </div>
  </Pagina>
);

// ─── 7. Cómo se estudia ─────────────────────────────────────────────────────
const Estudio: React.FC = () => (
  <Pagina gap={28}>
    <Pop desde={0}>
      <TituloComic size={84}>¿Cómo saberlo?</TituloComic>
    </Pop>
    <ListaStickers
      items={[
        { emoji: "🩸", texto: "Glucosa e insulina en ayunas (índice HOMA)" },
        { emoji: "📊", texto: "Hemoglobina glicosilada" },
        { emoji: "🧈", texto: "Triglicéridos y colesterol" },
      ]}
      desde={25}
      paso={45}
      colores={[K.blanco, K.amarillo, K.lima]}
      size={38}
    />
    <Pop desde={170}>
      <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: K.negro, textAlign: "center" }}>Pedíselos a tu médico 👩‍⚕️</div>
    </Pop>
  </Pagina>
);

// ─── 8. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={26}>
    <Pop desde={0}>
      <TituloComic size={84}>¡Se puede revertir! 💪</TituloComic>
    </Pop>
    <ListaStickers
      items={[
        { emoji: "🚶", texto: "Caminar 10 minutos después de comer" },
        { emoji: "🏋️", texto: "Fuerza: el músculo usa glucosa" },
        { emoji: "🥗", texto: "Proteína y fibra en cada comida" },
        { emoji: "🚫", texto: "Menos ultraprocesados y gaseosas" },
        { emoji: "😴", texto: "Dormir bien y bajar el estrés" },
      ]}
      desde={25}
      paso={45}
      colores={[K.lima, K.blanco, K.celeste, K.amarillo, K.rosa]}
      size={36}
    />
  </Pagina>
);

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={32} centro>
    <Pop desde={0}>
      <TituloComic size={80}>Detectarla a tiempo previene la diabetes tipo 2</TituloComic>
    </Pop>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={40} emoji="🔖" texto="GUARDALO" color={K.lima} />
      <Boton desde={55} emoji="📲" texto="COMPARTILO" color={K.rosa} />
    </div>
    <Pop desde={75}>
      <Sticker style={{ padding: "8px 22px", fontSize: 28, fontWeight: 700 }}>Esto no reemplaza la consulta con tu médico.</Sticker>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, color: K.amarillo, Escena: Gancho },
  { id: "llave", seg: 12, color: K.celeste, Escena: Llave },
  { id: "trabada", seg: 13, color: K.rosa, Escena: Trabada },
  { id: "energia", seg: 14, color: K.lima, Escena: Energia },
  { id: "signos", seg: 15, color: K.naranja, Escena: Signos },
  { id: "causas", seg: 7, color: K.violeta, Escena: Causas },
  { id: "estudio", seg: 8, color: K.celeste, Escena: Estudio },
  { id: "ayuda", seg: 11, color: K.amarillo, Escena: Ayuda },
  { id: "cierre", seg: 5, color: K.rosa, Escena: Cierre },
];

export const DURACION_INSULINA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const ResistenciaInsulina: React.FC = () => (
  <ReelComic
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,13,14,15,7,8,11,5 --bpm 116 --transponer 2 --estilo energico
    musica={staticFile("audio/insulina-musica.mp3")}
  />
);

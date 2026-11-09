// Reel de 90 s: déjà vu y jamais vu, estilo neón.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave } from "../salud/pop";

const FPS = 30;

// ─── Red de neuronas: familiaridad (izq.) y recuerdo (der.) ────────────────
const NODOS_F = [
  [90, 120],
  [190, 70],
  [210, 200],
  [110, 260],
  [300, 150],
];
const NODOS_R = [
  [600, 150],
  [700, 70],
  [690, 210],
  [800, 130],
  [790, 260],
];
const ENLACES = (n: number[][]) => [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 3],
  [2, 4],
  [1, 4],
].map(([a, b]) => [n[a], n[b]]);

const Red: React.FC<{ fam: number; rec: number; puente?: number }> = ({ fam, rec, puente = 0 }) => {
  const frame = useCurrentFrame();
  const grupo = (nodos: number[][], on: number, color: string, nombre: string, sub: string, cx: number) => (
    <g>
      {ENLACES(nodos).map(([a, b], i) => {
        const t = ((frame / 20 + i * 0.3) % 1);
        return (
          <g key={i}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={on > 0.1 ? color : "#3a4a6e"} strokeWidth={4} opacity={0.4 + 0.6 * on} />
            {on > 0.1 && <circle cx={a[0] + (b[0] - a[0]) * t} cy={a[1] + (b[1] - a[1]) * t} r={7} fill="#fff" opacity={on} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />}
          </g>
        );
      })}
      {nodos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={20} fill={on > 0.1 ? color : "#2a3656"} stroke={color} strokeWidth={3} opacity={0.5 + 0.5 * on} style={{ filter: on > 0.1 ? `drop-shadow(0 0 ${12 * on}px ${color})` : "none" }} />
      ))}
      <text x={cx} y={325} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={color} opacity={0.5 + 0.5 * on}>
        {nombre}
      </text>
      <text x={cx} y={365} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={26} fill={P.texto2}>
        {sub}
      </text>
    </g>
  );
  return (
    <svg width={900} height={390} viewBox="0 0 900 390" style={{ overflow: "visible" }}>
      <line x1={300} y1={150} x2={600} y2={150} stroke={puente > 0.1 ? P.verde : "#3a4a6e"} strokeWidth={5} strokeDasharray="12 10" opacity={0.5 + 0.5 * puente} />
      {grupo(NODOS_F, fam, P.violeta, "Familiaridad", "“esto me suena”", 190)}
      {grupo(NODOS_R, rec, P.cian, "Recuerdo", "“de dónde y cuándo”", 700)}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0} giro={-8}>
      <Emoji e="🌀" size={150} />
    </Golpe>
    <Golpe desde={10}>
      <Grande size={80}>¿Te pasó sentir que ya viviste este momento?</Grande>
    </Golpe>
    <Golpe desde={80} giro={-4}>
      <Grande size={70}>
        <Marcador desde={88} color={P.violeta} texto="#fff">
          ¿Y lo contrario?
        </Marcador>
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 2. Dos sistemas de memoria ─────────────────────────────────────────────
const DosSistemas: React.FC = () => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [180, 210], [0, 1], clamp);
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={78}>
          Tu memoria tiene <Marcador desde={12} color={P.amarillo}>dos sistemas</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={30}>
        <Red fam={interpolate(frame, [60, 80], [0, 1], clamp)} rec={interpolate(frame, [110, 130], [0, 1], clamp)} puente={on} />
      </Golpe>
      <Golpe desde={140}>
        <Chico size={38}>
          Están en el <b style={{ color: P.amarillo }}>lóbulo temporal</b>: la familiaridad en la corteza que rodea al <b style={{ color: P.cian }}>hipocampo</b>, y el recuerdo en el hipocampo.
        </Chico>
      </Golpe>
      <Golpe desde={240}>
        <Chico size={40}>
          Normalmente <b style={{ color: P.verde }}>se encienden juntos</b>: “me suena… porque estuve acá”.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 3. Déjà vu ─────────────────────────────────────────────────────────────
const DejaVu: React.FC = () => {
  const frame = useCurrentFrame();
  const fam = interpolate(frame, [60, 80], [0, 1], clamp);
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={86}>
          <Marcador desde={10} color={P.violeta} texto="#fff">Déjà vu</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={36} color={P.texto2}>
          (francés: “ya visto”)
        </Chico>
      </Golpe>
      <Red fam={fam} rec={0} />
      <Golpe desde={110}>
        <Vidrio color={P.violeta} style={{ width: 940, padding: "16px 26px" }}>
          <Chico size={38}>
            Un grupo de sinapsis dispara la señal de <b style={{ color: P.violeta }}>“conocido”</b> por error… pero el hipocampo <b style={{ color: P.cian }}>no encuentra ningún recuerdo</b>.
          </Chico>
        </Vidrio>
      </Golpe>
      <Golpe desde={300} giro={-4}>
        <Grande size={60}>
          Resultado: “Ya lo viví… <span style={{ color: P.amarillo }}>¿pero cuándo?</span>” 🤔
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. El control de calidad ───────────────────────────────────────────────
const Control: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={78}>
        Tu cerebro <Marcador desde={12} color={P.verde}>detecta el error</Marcador>
      </Grande>
    </Golpe>
    <Fila desde={40} emoji="🧠" color={P.verde} flecha="✓">
      El lóbulo frontal revisa: “esto es imposible, es la primera vez”
    </Fila>
    <Golpe desde={140}>
      <Chico size={38}>
        Por eso el déjà vu se siente <b style={{ color: P.amarillo }}>raro</b>: sabés que no es real. Para muchos científicos, es señal de una memoria que se <b style={{ color: P.verde }}>autocontrola</b>.
      </Chico>
    </Golpe>
    <Golpe desde={250}>
      <Chico size={34} color={P.texto2}>
        Es más común entre los 15 y 25 años, y con cansancio o estrés.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Jamais vu ───────────────────────────────────────────────────────────
const JamaisVu: React.FC = () => {
  const frame = useCurrentFrame();
  const N = 15;
  const visibles = Math.floor(interpolate(frame, [90, 300], [0, N], clamp));
  const senal = interpolate(frame, [90, 300], [1, 0.12], clamp);
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Grande size={86}>
          <Marcador desde={10} color={P.cian}>Jamais vu</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={38}>
          (“nunca visto”): algo <b style={{ color: P.cian }}>conocido</b> de golpe se siente <b style={{ color: P.rojo }}>nuevo</b>.
        </Chico>
      </Golpe>
      <Golpe desde={60}>
        <Chico size={34} color={P.texto2}>
          Probá: repetí una palabra muchas veces…
        </Chico>
      </Golpe>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 34px", justifyContent: "center", width: 940, minHeight: 200 }}>
        {Array.from({ length: visibles }).map((_, i) => (
          <span key={i} style={{ fontFamily: SANS, fontWeight: 800, fontSize: 48, color: P.texto, opacity: 1 - i * 0.045, transform: `rotate(${(i % 3) - 1 + i * 0.4}deg) scaleX(${1 + i * 0.01})`, letterSpacing: i * 0.25 }}>
            casa
          </span>
        ))}
      </div>
      <Vidrio color={senal > 0.4 ? P.cian : P.rojo} style={{ width: 940, padding: "14px 24px", display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: P.texto, whiteSpace: "nowrap" }}>Señal de la sinapsis</span>
        <div style={{ flex: 1, height: 26, borderRadius: 13, background: "rgba(255,255,255,0.12)" }}>
          <div style={{ width: `${senal * 100}%`, height: "100%", borderRadius: 13, background: senal > 0.4 ? P.cian : P.rojo }} />
        </div>
      </Vidrio>
      <Golpe desde={330}>
        <Chico size={36}>
          Las neuronas que disparan una y otra vez <b style={{ color: P.rojo }}>se “cansan”</b> (adaptación neuronal) y la señal de familiaridad se apaga.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 6. Un lugar conocido, como nuevo ───────────────────────────────────────
const Lugar: React.FC = () => {
  const frame = useCurrentFrame();
  const fam = interpolate(frame, [70, 120], [1, 0], clamp);
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={74}>
          Tu calle, tu casa… <Marcador desde={12} color={P.rojo} texto="#fff">como si fuera la primera vez</Marcador>
        </Grande>
      </Golpe>
      <Red fam={fam} rec={1} />
      <Golpe desde={140}>
        <Chico size={38}>
          El hipocampo <b style={{ color: P.cian }}>sabe dónde estás</b>, pero la familiaridad <b style={{ color: P.rojo }}>no se enciende</b>. El lugar se ve extraño por unos segundos.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 7. Cuándo consultar ────────────────────────────────────────────────────
const Consultar: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={76}>
        Es <Marcador desde={12} color={P.verde}>normal</Marcador>… salvo que
      </Grande>
    </Golpe>
    <Fila desde={30} emoji="🔁" color={P.amarillo} flecha="!">
      Te pase muy seguido
    </Fila>
    <Fila desde={70} emoji="😶" color={P.amarillo} flecha="!">
      Venga con desconexión o confusión
    </Fila>
    <Fila desde={110} emoji="👃" color={P.amarillo} flecha="!">
      Aparezcan olores raros o movimientos extraños
    </Fila>
    <Golpe desde={160}>
      <Chico size={34} color={P.texto2}>
        Puede ser una crisis del lóbulo temporal: consultá con neurología.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={80}>
        No es un “error en la Matrix” 😉 <Marcador desde={20} color={P.violeta} texto="#fff">es tu memoria chequeándose</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={45} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={60} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={80}>
      <Chico size={28} color={P.texto2}>
        Contenido informativo. No reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "dosSistemas", seg: 14, Escena: DosSistemas },
  { id: "dejaVu", seg: 16, Escena: DejaVu },
  { id: "control", seg: 12, Escena: Control },
  { id: "jamaisVu", seg: 16, Escena: JamaisVu },
  { id: "lugar", seg: 12, Escena: Lugar },
  { id: "consultar", seg: 10, Escena: Consultar },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_DEJAVU = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const DejaVuJamaisVu: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original en tono menor: scripts/musica_reel.py --paginas 5,14,16,12,16,12,10,5 --bpm 98 --transponer 6 --estilo energico --menor
    musica={staticFile("audio/dejavu-musica.mp3")}
  />
);

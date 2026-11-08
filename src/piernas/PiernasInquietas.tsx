// Reel de 90 s: síndrome de piernas inquietas (SPI), estilo cuaderno.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Emoji, Escribe, Fibron, K, MANUSCRITA, Nota, Pagina, Pop, ReelCuaderno, SANS, Texto, Tilde, clamp } from "../salud/cuaderno";

const FPS = 30;

// ─── Piernas dibujadas a mano con el "cosquilleo" por dentro ────────────────
const Piernas: React.FC<{ molestia: number; mueve?: number; ancho?: number }> = ({ molestia, mueve = 0, ancho = 520 }) => {
  const frame = useCurrentFrame();
  const sacude = (i: number) => mueve * Math.sin(frame / 2.5 + i * 2) * 6;
  const pierna = (x: number, i: number) => (
    <g key={i} transform={`rotate(${sacude(i)} ${x + 60} 20)`}>
      {/* contorno */}
      <path d={`M${x} 20 L${x + 120} 20 L${x + 110} 300 L${x + 105} 520 L${x + 20} 520 L${x + 12} 300 Z`} fill="#fff" stroke={K.tinta} strokeWidth={6} strokeLinejoin="round" />
      {/* pie */}
      <path d={`M${x + 20} 520 L${x + 105} 520 Q${x + 190} 525 ${x + 190} 560 L${x + 20} 560 Z`} fill="#fff" stroke={K.tinta} strokeWidth={6} strokeLinejoin="round" />
      {/* rodilla */}
      <path d={`M${x + 30} 300 q30 -14 60 0`} stroke={K.tinta} strokeWidth={4} fill="none" />
      {/* cosquilleo: zigzags que se mueven */}
      {Array.from({ length: 6 }).map((_, j) => {
        const y = 90 + j * 70 + ((frame * 3 + j * 23) % 40);
        return (
          <path
            key={j}
            d={`M${x + 30} ${y} l12 -10 l12 10 l12 -10 l12 10 l12 -10 l12 10`}
            stroke={K.rojo}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={molestia * (0.5 + 0.5 * Math.sin(frame / 4 + j))}
          />
        );
      })}
    </g>
  );
  return (
    <svg width={ancho} height={ancho * 1.12} viewBox="0 0 500 580" style={{ overflow: "visible" }}>
      {pierna(60, 0)}
      {pierna(260, 1)}
    </svg>
  );
};

// ─── Gráfico del día: los síntomas suben a la noche ────────────────────────
const Grafico: React.FC<{ p: number }> = ({ p }) => {
  const puntos = [
    [0, 230],
    [120, 225],
    [240, 215],
    [360, 190],
    [480, 130],
    [600, 50],
    [700, 30],
  ];
  const d = puntos.map(([x, y], i) => `${i ? "L" : "M"}${x + 60} ${y}`).join(" ");
  return (
    <svg width={800} height={330} viewBox="0 0 800 330" style={{ overflow: "visible" }}>
      <line x1={60} y1={250} x2={780} y2={250} stroke={K.lapiz} strokeWidth={4} />
      <line x1={60} y1={250} x2={60} y2={10} stroke={K.lapiz} strokeWidth={4} />
      <path d={d} stroke={K.rojo} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {[
        { x: 100, t: "☀️ mañana" },
        { x: 400, t: "🌇 tarde" },
        { x: 700, t: "🌙 noche" },
      ].map((e) => (
        <text key={e.t} x={e.x} y={300} textAnchor="middle" fontFamily={MANUSCRITA} fontSize={44} fill={K.tinta}>
          {e.t}
        </text>
      ))}
      <text x={20} y={140} transform="rotate(-90 20 140)" textAnchor="middle" fontFamily={MANUSCRITA} fontSize={36} fill={K.lapiz}>
        molestia
      </text>
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Pop desde={0} giro={-4}>
      <Emoji e="🦵" size={150} />
    </Pop>
    <Escribe desde={8} size={88} dur={30}>
      ¿Te acostás y sentís que TENÉS que mover las piernas?
    </Escribe>
  </Pagina>
);

// ─── 2. La sensación ────────────────────────────────────────────────────────
const Sensacion: React.FC = () => {
  const frame = useCurrentFrame();
  const molestia = interpolate(frame, [30, 60], [0, 1], clamp);
  const mueve = interpolate(frame, [230, 250], [0, 1], clamp);
  return (
    <Pagina gap={18}>
      <Escribe desde={0} size={80}>
        Como <Fibron desde={22}>bichitos por dentro</Fibron>
      </Escribe>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Piernas molestia={mueve > 0.5 ? 0.25 : molestia} mueve={mueve} ancho={360} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 360 }}>
          {["Hormigueo", "Cosquilleo", "Tirantez", "Corriente", "Ardor"].map((s, i) => (
            <Pop key={s} desde={50 + i * 25} giro={i % 2 ? 2 : -2}>
              <div style={{ fontFamily: MANUSCRITA, fontSize: 60, color: K.rojo, lineHeight: 1.05 }}>~ {s}</div>
            </Pop>
          ))}
        </div>
      </div>
      <Pop desde={240} giro={-2}>
        <Nota ancho={820}>
          <Texto size={40} color={K.tinta}>
            Moverlas <b style={{ color: K.verde }}>alivia</b>… pero apenas parás, <b style={{ color: K.rojo }}>vuelve</b>.
          </Texto>
        </Nota>
      </Pop>
    </Pagina>
  );
};

// ─── 3. Tiene nombre ────────────────────────────────────────────────────────
const Nombre: React.FC = () => (
  <Pagina gap={28}>
    <Escribe desde={0} size={72}>
      Tiene nombre médico:
    </Escribe>
    <Escribe desde={30} size={92} color={K.rojo} dur={30}>
      <Fibron desde={65}>Síndrome de Piernas Inquietas</Fibron>
    </Escribe>
    <Pop desde={90}>
      <Texto size={32} color="#6b6f86">
        (también llamado enfermedad de Willis-Ekbom)
      </Texto>
    </Pop>
    <Pop desde={140} giro={2}>
      <Nota color={K.celeste} ancho={800}>
        <Texto size={42} color={K.tinta}>
          Lo tiene hasta <b style={{ color: K.rojo }}>1 de cada 10</b> adultos. Es más frecuente en mujeres y en el embarazo.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={230}>
      <Texto size={38}>Y muchos no saben que se puede tratar.</Texto>
    </Pop>
  </Pagina>
);

// ─── 4. Las 4 claves ────────────────────────────────────────────────────────
const CLAVES = [
  "Ganas incontrolables de mover las piernas, con sensación molesta",
  "Aparece o empeora en reposo: sentado o acostado",
  "Moverte o caminar la alivia",
  "Empeora a la tarde y a la noche",
];

const Claves: React.FC = () => (
  <Pagina gap={24}>
    <Escribe desde={0} size={84}>
      Las <Fibron desde={22}>4 claves</Fibron>
    </Escribe>
    {CLAVES.map((c, i) => (
      <Tilde key={c} desde={35 + i * 80} marca={`${i + 1}.`} color={K.rojo}>
        {c}
      </Tilde>
    ))}
    <Pop desde={380} giro={-2}>
      <Nota color={K.rosa} ancho={800}>
        <Texto size={38} color={K.tinta}>
          Si tenés las 4, <b>contáselo a tu médico</b>.
        </Texto>
      </Nota>
    </Pop>
  </Pagina>
);

// ─── 5. Por qué pasa ────────────────────────────────────────────────────────
const PorQue: React.FC = () => (
  <Pagina gap={22}>
    <Escribe desde={0} size={84}>
      ¿Por qué <Fibron desde={22}>pasa</Fibron>?
    </Escribe>
    <Pop desde={35} giro={-2}>
      <Nota ancho={820}>
        <Texto size={38} color={K.tinta}>
          🧠 La <b style={{ color: K.rojo }}>dopamina</b>, el mensajero que controla el movimiento, funciona distinto, sobre todo a la noche.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={130} giro={2}>
      <Nota color={K.rosa} ancho={820}>
        <Texto size={38} color={K.tinta}>
          🩸 Poco <b style={{ color: K.rojo }}>hierro</b> en el cerebro, y el hierro hace falta para fabricar dopamina.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={230}>
      <Texto size={36}>También influyen:</Texto>
    </Pop>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {["👪 Herencia familiar", "🤰 Embarazo", "🫘 Problemas renales", "💊 Algunos antialérgicos y antidepresivos"].map((t, i) => (
        <Tilde key={t} desde={250 + i * 30} color={K.tinta} marca="•">
          {t}
        </Tilde>
      ))}
    </div>
  </Pagina>
);

// ─── 6. Y el sueño ──────────────────────────────────────────────────────────
const Sueno: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [30, 120], [0, 1], clamp);
  return (
    <Pagina gap={22}>
      <Escribe desde={0} size={80}>
        Por eso <Fibron desde={22} color={K.rosa}>roba el sueño</Fibron>
      </Escribe>
      <Grafico p={p} />
      <Pop desde={150} giro={-2}>
        <Nota color={K.celeste} ancho={820}>
          <Texto size={38} color={K.tinta}>
            Cuesta dormirse, las piernas se sacuden de noche y al otro día <b style={{ color: K.rojo }}>estás agotado</b> 🪫
          </Texto>
        </Nota>
      </Pop>
    </Pagina>
  );
};

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const AYUDA = [
  "Pedí un análisis de hierro (ferritina)",
  "Caminá y estirá las piernas antes de acostarte",
  "Masajes o un baño tibio en las piernas",
  "Menos café, alcohol y cigarrillo a la noche",
  "Horarios de sueño regulares",
  "Revisá tus medicamentos con el médico",
];

const Ayuda: React.FC = () => (
  <Pagina gap={14}>
    <Escribe desde={0} size={84}>
      Qué <Fibron desde={22} color="#c8f7d0">ayuda</Fibron>
    </Escribe>
    {AYUDA.map((a, i) => (
      <Tilde key={a} desde={30 + i * 55} color={K.verde}>
        {a}
      </Tilde>
    ))}
    <Pop desde={380}>
      <Texto size={34} color="#6b6f86">
        Si no alcanza, hay tratamientos que tu médico puede indicar.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={28} centro>
    <Escribe desde={0} size={96}>
      No son nervios. 🦵
    </Escribe>
    <Escribe desde={30} size={84} color={K.rojo}>
      Tiene nombre y tiene tratamiento.
    </Escribe>
    <Pop desde={80}>
      <Texto size={40}>Mandáselo a quien no para de mover las piernas en la cama 📲</Texto>
    </Pop>
    <Pop desde={110}>
      <Texto size={26} color="#8a8fa6" peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "sensacion", seg: 12, Escena: Sensacion },
  { id: "nombre", seg: 10, Escena: Nombre },
  { id: "claves", seg: 16, Escena: Claves },
  { id: "porQue", seg: 14, Escena: PorQue },
  { id: "sueno", seg: 10, Escena: Sueno },
  { id: "ayuda", seg: 16, Escena: Ayuda },
  { id: "cierre", seg: 7, Escena: Cierre },
];

export const DURACION_PIERNAS = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const PiernasInquietas: React.FC = () => (
  <ReelCuaderno
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,10,16,14,10,16,7 --bpm 96 --transponer 3 --estilo suave
    musica={staticFile("audio/piernas-musica.mp3")}
  />
);

// Reel de 3 min: Alzheimer y reserva cognitiva, estilo cuaderno.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Emoji, Escribe, Fibron, K, MANUSCRITA, Nota, Pagina, Pop, ReelCuaderno, SANS, Texto, Tilde, clamp } from "../salud/cuaderno";

const FPS = 30;
const MARRON = "#9a6a3a";

// ─── Red de neuronas que se va dañando ──────────────────────────────────────
const NODOS = [
  [80, 90], [230, 50], [380, 100], [530, 60], [680, 110],
  [130, 230], [290, 200], [450, 240], [610, 210], [740, 260],
  [70, 360], [220, 340], [380, 370], [540, 340], [700, 380],
];
const ENLACES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9], [10, 11], [11, 12], [12, 13], [13, 14],
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 9], [5, 10], [6, 11], [7, 12], [8, 13], [9, 14], [1, 7], [6, 12], [3, 9],
];

const RedNeuronas: React.FC<{ placas: number; corte: number }> = ({ placas, corte }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={800} height={440} viewBox="0 0 800 440" style={{ overflow: "visible" }}>
      {ENLACES.map(([a, b], i) => {
        const roto = (i * 7) % 10 < corte * 10;
        const [x1, y1] = NODOS[a];
        const [x2, y2] = NODOS[b];
        const t = ((frame / 25 + i * 0.37) % 1);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={roto ? "#c9c9d6" : K.tinta} strokeWidth={roto ? 3 : 5} strokeDasharray={roto ? "6 10" : undefined} />
            {!roto && <circle cx={x1 + (x2 - x1) * t} cy={y1 + (y2 - y1) * t} r={7} fill={K.amarillo} stroke={K.tinta} strokeWidth={2} />}
          </g>
        );
      })}
      {NODOS.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={22} fill="#fff" stroke={K.tinta} strokeWidth={5} />
          {/* ovillos de tau dentro de la neurona */}
          {placas > 0.3 && i % 3 === 0 && <path d={`M${x - 10} ${y} q5 -12 10 0 t10 0`} stroke={K.rojo} strokeWidth={4} fill="none" opacity={placas} />}
        </g>
      ))}
      {/* placas de amiloide entre neuronas */}
      {[[160, 150], [340, 290], [520, 160], [640, 300], [260, 280], [450, 60]].map(([x, y], i) => {
        const a = Math.max(0, Math.min(1, placas * 6 - i));
        return <ellipse key={i} cx={x} cy={y} rx={28 * a} ry={20 * a} fill={MARRON} opacity={0.75} />;
      })}
    </svg>
  );
};

// ─── Reserva: la señal busca otro camino ────────────────────────────────────
const Reserva: React.FC<{ rica: boolean; bloqueo: number; titulo: string }> = ({ rica, bloqueo, titulo }) => {
  const frame = useCurrentFrame();
  const A = [40, 160];
  const B = [380, 160];
  const medios = rica ? [[210, 160], [210, 50], [210, 270], [125, 95], [295, 225]] : [[210, 160]];
  const enlaces: number[][][] = rica
    ? [
        [A, medios[0]], [medios[0], B], [A, medios[1]], [medios[1], B], [A, medios[2]], [medios[2], B],
        [A, medios[3]], [medios[3], medios[1]], [medios[2], medios[4]], [medios[4], B],
      ]
    : [[A, medios[0]], [medios[0], B]];
  const bloqueado = bloqueo > 0.5;
  const camino = bloqueado ? (rica ? [A, medios[1], B] : [A, medios[0]]) : [A, medios[0], B];
  const t = (frame % 60) / 60;
  const tramos = camino.length - 1;
  const k = Math.min(tramos - 1, Math.floor(t * tramos));
  const u = t * tramos - k;
  const [px, py] = [camino[k][0] + (camino[k + 1][0] - camino[k][0]) * u, camino[k][1] + (camino[k + 1][1] - camino[k][1]) * u];
  const llega = !bloqueado || rica;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontFamily: MANUSCRITA, fontSize: 52, color: K.tinta, fontWeight: 700 }}>{titulo}</div>
      <svg width={420} height={330} viewBox="0 0 420 330" style={{ overflow: "visible" }}>
        {enlaces.map(([p, q], i) => (
          <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={K.tinta} strokeWidth={4} opacity={0.6} />
        ))}
        {[A, B, ...medios].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={18} fill="#fff" stroke={K.tinta} strokeWidth={4} />
        ))}
        {bloqueo > 0 && (
          <text x={210} y={180} textAnchor="middle" fontFamily={MANUSCRITA} fontWeight={700} fontSize={80} fill={K.rojo} opacity={bloqueo}>
            ✗
          </text>
        )}
        <circle cx={px} cy={py} r={13} fill={llega ? K.verde : K.rojo} stroke={K.tinta} strokeWidth={3} />
      </svg>
      <div style={{ fontFamily: MANUSCRITA, fontSize: 46, color: llega ? K.verde : K.rojo, fontWeight: 700, opacity: bloqueo }}>{llega ? "✔ llega igual" : "✗ se corta"}</div>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Pop desde={0} giro={-4}>
      <Emoji e="🧠" size={150} />
    </Pop>
    <Escribe desde={8} size={78} dur={40}>
      ¿Por qué hay personas con Alzheimer en el cerebro… que nunca tienen síntomas?
    </Escribe>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={28}>
    <Escribe desde={0} size={90}>
      ¿Qué es el <Fibron desde={25}>Alzheimer</Fibron>?
    </Escribe>
    <Pop desde={50} giro={-2}>
      <Nota ancho={820}>
        <Texto size={42} color={K.tinta}>
          Una enfermedad en la que las neuronas se <b style={{ color: K.rojo }}>dañan y mueren</b> de a poco.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={170} giro={2}>
      <Nota color={K.celeste} ancho={820}>
        <Texto size={42} color={K.tinta}>
          Es la causa más frecuente de <b>demencia</b>: entre 6 y 7 de cada 10 casos.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={300}>
      <Texto size={40}>
        Y <b style={{ color: K.rojo }}>no</b> es una parte normal de envejecer.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── 3. Qué pasa en el cerebro ──────────────────────────────────────────────
const Cerebro: React.FC = () => {
  const frame = useCurrentFrame();
  const placas = interpolate(frame, [80, 240], [0, 1], clamp);
  const corte = interpolate(frame, [240, 420], [0, 0.7], clamp);
  return (
    <Pagina gap={20}>
      <Escribe desde={0} size={80}>
        ¿Qué pasa <Fibron desde={22}>adentro</Fibron>?
      </Escribe>
      <RedNeuronas placas={placas} corte={corte} />
      <div style={{ display: "flex", gap: 30 }}>
        <Pop desde={90} giro={-2}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 44, color: MARRON, fontWeight: 700 }}>● placas de amiloide</div>
        </Pop>
        <Pop desde={150} giro={2}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 44, color: K.rojo, fontWeight: 700 }}>〰 ovillos de tau</div>
        </Pop>
      </div>
      <Pop desde={250}>
        <Texto size={38}>
          Las conexiones entre neuronas (<b style={{ color: K.tinta }}>sinapsis</b>) se cortan. Empieza en el <b style={{ color: K.rojo }}>hipocampo</b>, el centro de la memoria reciente.
        </Texto>
      </Pop>
    </Pagina>
  );
};

// ─── 4. Síntomas ────────────────────────────────────────────────────────────
const SINTOMAS = [
  "Olvidar cosas recientes",
  "Repetir la misma pregunta",
  "Perderse en lugares conocidos",
  "No encontrar las palabras",
  "Cambios de humor o de carácter",
  "Dificultad para organizar o planificar",
];

const Sintomas: React.FC = () => (
  <Pagina gap={16}>
    <Escribe desde={0} size={84}>
      Primeras <Fibron desde={22}>señales</Fibron>
    </Escribe>
    {SINTOMAS.map((s, i) => (
      <Tilde key={s} desde={30 + i * 55} color={K.rojo} marca="!">
        {s}
      </Tilde>
    ))}
  </Pagina>
);

// ─── 5. Olvido normal vs señal de alerta ────────────────────────────────────
const Olvido: React.FC = () => (
  <Pagina gap={26}>
    <Escribe desde={0} size={80}>
      ¿Olvido normal o <Fibron desde={22} color={K.rosa}>alerta</Fibron>?
    </Escribe>
    <div style={{ display: "flex", gap: 24 }}>
      <Pop desde={40} giro={-3}>
        <Nota color="#d7f5dd" ancho={400}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 52, color: K.verde, fontWeight: 700, textAlign: "center" }}>Normal ✔</div>
          <Texto size={36} color={K.tinta}>
            No saber dónde dejaste las llaves 🔑… y después acordarte.
          </Texto>
        </Nota>
      </Pop>
      <Pop desde={150} giro={3}>
        <Nota color={K.rosa} ancho={400}>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 52, color: K.rojo, fontWeight: 700, textAlign: "center" }}>Alerta ✗</div>
          <Texto size={36} color={K.tinta}>
            No saber <b>para qué sirven</b> las llaves.
          </Texto>
        </Nota>
      </Pop>
    </div>
  </Pagina>
);

// ─── 6. El estudio de las monjas ────────────────────────────────────────────
const Monjas: React.FC = () => (
  <Pagina gap={26}>
    <Escribe desde={0} size={80}>
      El estudio de las <Fibron desde={22}>monjas</Fibron>
    </Escribe>
    <Pop desde={40} giro={-2}>
      <Nota ancho={820}>
        <Texto size={38} color={K.tinta}>
          En EE.UU. se siguió durante años a cientos de monjas, y al morir se estudiaron sus cerebros.
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={170} giro={2}>
      <Nota color={K.rosa} ancho={820}>
        <Texto size={38} color={K.tinta}>
          Sorpresa: algunas tenían el cerebro <b style={{ color: K.rojo }}>lleno de lesiones de Alzheimer</b>… pero en vida <b style={{ color: K.verde }}>nunca mostraron síntomas</b>. 🤯
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={340}>
      <Escribe desde={340} size={64} color={K.rojo}>
        ¿Cómo puede ser?
      </Escribe>
    </Pop>
  </Pagina>
);

// ─── 7. La reserva cognitiva ────────────────────────────────────────────────
const ReservaCognitiva: React.FC = () => {
  const frame = useCurrentFrame();
  const bloqueo = interpolate(frame, [240, 260], [0, 1], clamp);
  return (
    <Pagina gap={18}>
      <Escribe desde={0} size={82}>
        La <Fibron desde={22}>reserva cognitiva</Fibron>
      </Escribe>
      <Pop desde={40}>
        <Texto size={38}>
          Es la capacidad del cerebro de <b style={{ color: K.tinta }}>usar caminos alternativos</b> cuando algunos se dañan.
        </Texto>
      </Pop>
      <Pop desde={120}>
        <div style={{ display: "flex", gap: 10 }}>
          <Reserva rica={false} bloqueo={bloqueo} titulo="Poca reserva" />
          <Reserva rica bloqueo={bloqueo} titulo="Mucha reserva" />
        </div>
      </Pop>
      <Pop desde={340} giro={-2}>
        <Nota color={K.celeste} ancho={820}>
          <Texto size={36} color={K.tinta}>
            Como una ciudad con muchas calles: si cortan una, <b>llegás igual</b> por otra. 🗺️
          </Texto>
        </Nota>
      </Pop>
    </Pagina>
  );
};

// ─── 8. Cómo construirla ────────────────────────────────────────────────────
const CONSTRUIR = [
  { e: "📚", t: "Aprender cosas nuevas: idiomas, música, oficios" },
  { e: "👥", t: "Vida social: charlar, juntarse, participar" },
  { e: "🏃", t: "Ejercicio físico regular" },
  { e: "😴", t: "Dormir bien" },
  { e: "🩺", t: "Controlar presión, azúcar y colesterol" },
  { e: "👂", t: "Cuidar la audición y la vista" },
  { e: "🚭", t: "No fumar y moderar el alcohol" },
];

const Construir: React.FC = () => (
  <Pagina gap={12}>
    <Escribe desde={0} size={78}>
      ¿Cómo se <Fibron desde={22} color="#c8f7d0">construye</Fibron>?
    </Escribe>
    {CONSTRUIR.map((c, i) => (
      <Tilde key={c.t} desde={30 + i * 55} color={K.verde}>
        {c.e} {c.t}
      </Tilde>
    ))}
    <Pop desde={450} giro={-2}>
      <Nota ancho={820}>
        <Texto size={36} color={K.tinta}>
          Se estima que <b style={{ color: K.rojo }}>casi la mitad</b> de los casos de demencia se relacionan con factores que podemos cambiar.
        </Texto>
      </Nota>
    </Pop>
  </Pagina>
);

// ─── 9. Nunca es tarde ──────────────────────────────────────────────────────
const NuncaTarde: React.FC = () => (
  <Pagina gap={30} centro>
    <Pop desde={0} giro={-3}>
      <Emoji e="🌱" size={140} />
    </Pop>
    <Escribe desde={10} size={92} dur={26}>
      Nunca es tarde
    </Escribe>
    <Pop desde={60}>
      <Texto size={42}>
        El cerebro crea conexiones nuevas <b style={{ color: K.verde }}>toda la vida</b>: se llama <b style={{ color: K.tinta }}>neuroplasticidad</b>.
      </Texto>
    </Pop>
    <Pop desde={170}>
      <Texto size={38} color="#6b6f86">
        Lo que aprendés a los 70 también suma.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── 10. Cuándo consultar ───────────────────────────────────────────────────
const Consultar: React.FC = () => (
  <Pagina gap={22}>
    <Escribe desde={0} size={84}>
      Si notás <Fibron desde={22} color={K.rosa}>cambios</Fibron>
    </Escribe>
    <Tilde desde={30} color={K.tinta} marca="→">
      En vos o en un familiar, consultá con neurología o tu médico de cabecera
    </Tilde>
    <Tilde desde={100} color={K.tinta} marca="→">
      Muchas causas de olvidos se tratan: tiroides, falta de B12, depresión, medicamentos
    </Tilde>
    <Tilde desde={170} color={K.tinta} marca="→">
      Un diagnóstico temprano permite tratar síntomas y planificar
    </Tilde>
  </Pagina>
);

// ─── 11. Mitos ──────────────────────────────────────────────────────────────
const MITOS = [
  { m: "“Es normal con la edad”", r: "Envejecer no es tener demencia." },
  { m: "“Solo les pasa a los muy mayores”", r: "Puede empezar antes de los 65." },
  { m: "“Si mi papá lo tuvo, yo también”", r: "Aumenta el riesgo, pero no es una sentencia." },
];

const Mitos: React.FC = () => (
  <Pagina gap={22}>
    <Escribe desde={0} size={88}>
      <Fibron desde={20} color={K.rosa}>Mitos</Fibron> ✋
    </Escribe>
    {MITOS.map((x, i) => (
      <Pop key={x.m} desde={30 + i * 130} giro={i % 2 ? 1.5 : -1.5}>
        <Nota color={i % 2 ? K.celeste : "#fff3a6"} ancho={820}>
          <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 700, color: "#6b6f86", textDecoration: "line-through", textDecorationColor: K.rojo, textDecorationThickness: 4, textAlign: "center" }}>{x.m}</div>
          <div style={{ fontFamily: MANUSCRITA, fontSize: 50, fontWeight: 700, color: K.verde, textAlign: "center", marginTop: 6 }}>✔ {x.r}</div>
        </Nota>
      </Pop>
    ))}
  </Pagina>
);

// ─── 12. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Escribe desde={0} size={88}>
      Tu cerebro se entrena 🧠
    </Escribe>
    <Escribe desde={35} size={76} color={K.rojo}>
      Cada cosa que aprendés es un camino más.
    </Escribe>
    <Pop desde={90}>
      <Texto size={40}>Guardalo y mandáselo a alguien que quieras 📲</Texto>
    </Pop>
    <Pop desde={120}>
      <Texto size={26} color="#8a8fa6" peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 6, Escena: Gancho },
  { id: "queEs", seg: 16, Escena: QueEs },
  { id: "cerebro", seg: 18, Escena: Cerebro },
  { id: "sintomas", seg: 16, Escena: Sintomas },
  { id: "olvido", seg: 12, Escena: Olvido },
  { id: "monjas", seg: 16, Escena: Monjas },
  { id: "reserva", seg: 22, Escena: ReservaCognitiva },
  { id: "construir", seg: 24, Escena: Construir },
  { id: "nuncaTarde", seg: 10, Escena: NuncaTarde },
  { id: "consultar", seg: 14, Escena: Consultar },
  { id: "mitos", seg: 16, Escena: Mitos },
  { id: "cierre", seg: 10, Escena: Cierre },
];

export const DURACION_ALZHEIMER = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const AlzheimerReserva: React.FC = () => (
  <ReelCuaderno
    paginas={PAGINAS}
    fps={FPS}
    // Música original suave: scripts/musica_reel.py --paginas 6,16,18,16,12,16,22,24,10,14,16,10 --bpm 84 --transponer 2 --estilo suave
    musica={staticFile("audio/alzheimer-musica.mp3")}
  />
);

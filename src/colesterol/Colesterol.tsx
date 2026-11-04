import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, Boton, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { BAJAR, FPS, PAGINAS, PaginaId, SUBE } from "./datos";

// ─── 1. Gancho: LDL vs HDL chocan ───────────────────────────────────────────
const Chapa: React.FC<{ texto: string; color: string; desde: number; lado: 1 | -1; revela: string; revelaDesde: number }> = ({
  texto,
  color,
  desde,
  lado,
  revela,
  revelaDesde,
}) => {
  const frame = useCurrentFrame();
  const p = useGolpe(desde, 11);
  const x = (1 - p) * 700 * lado;
  const r = useGolpe(revelaDesde, 10);
  const flota = Math.sin(frame / 7 + lado) * 8;
  return (
    <div
      style={{
        transform: `translate(${x}px, ${flota}px) rotate(${lado * -5}deg)`,
        background: color,
        borderRadius: 44,
        width: 400,
        padding: "34px 0",
        textAlign: "center",
        fontFamily: SANS,
        color: "#071630",
        boxShadow: `0 0 70px ${color}aa`,
      }}
    >
      <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>{texto}</div>
      <div style={{ fontSize: 46, fontWeight: 800, height: 56, transform: `scale(${frame >= revelaDesde ? r : 1})` }}>
        {frame >= revelaDesde ? revela : "¿ ? ?"}
      </div>
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const choque = 16;
  const sac = useSacudida(choque, 18);
  const vs = useGolpe(choque, 7);
  const flash = interpolate(frame, [choque, choque + 2, choque + 10], [0, 0.7, 0], clamp);
  return (
    <>
      <Pagina gap={36}>
        <Golpe desde={0}>
          <Grande size={78}>¿Colesterol bueno o malo?</Grande>
        </Golpe>
        <div style={{ position: "relative", display: "flex", gap: 40, marginTop: 30, transform: `translateX(${sac}px)` }}>
          <Chapa texto="LDL" color={P.rojo} desde={0} lado={-1} revela="EL MALO" revelaDesde={70} />
          <Chapa texto="HDL" color={P.verde} desde={0} lado={1} revela="EL BUENO" revelaDesde={80} />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${vs}) rotate(-10deg)`,
              background: P.amarillo,
              color: "#071630",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 70,
              borderRadius: 999,
              width: 140,
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 50px ${P.amarillo}`,
            }}
          >
            VS
          </div>
        </div>
        <Golpe desde={34} giro={-6}>
          <Grande size={128}>
            <Marcador desde={44} color={P.amarillo}>
              ¿Cuál es cuál?
            </Marcador>
          </Grande>
        </Golpe>
      </Pagina>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </>
  );
};

// ─── 2. Qué es: arteria neón que se tapa ────────────────────────────────────
const Arteria: React.FC<{ placaDesde: number }> = ({ placaDesde }) => {
  const frame = useCurrentFrame();
  const W = 940;
  const H = 380;
  const placa = interpolate(frame, [placaDesde, placaDesde + 90], [0, 1], { ...clamp, easing: suave });
  const velocidad = 9 - 6 * placa;
  const alto = 110 * placa;
  const alarma = placa > 0.6 ? (Math.floor(frame / 6) % 2 === 0 ? 1 : 0.35) : 0;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="pared" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff7a86" />
          <stop offset="1" stopColor="#c7344a" />
        </linearGradient>
      </defs>
      <rect x={0} y={30} width={W} height={H - 60} rx={30} fill="#3a0d22" />
      <rect x={0} y={10} width={W} height={30} rx={14} fill="url(#pared)" />
      <rect x={0} y={H - 40} width={W} height={30} rx={14} fill="url(#pared)" />
      {Array.from({ length: 11 }).map((_, i) => {
        const x = ((frame * velocidad + i * 100) % (W + 120)) - 60;
        const cerca = Math.exp(-Math.pow((x - W / 2) / 150, 2));
        const y = H / 2 + Math.sin(i * 1.9) * (100 - 70 * placa * cerca);
        return <ellipse key={i} cx={x} cy={y} rx={28} ry={19} fill={P.rojo} stroke="#ffb3ba" strokeWidth={3} />;
      })}
      <path
        d={`M${W / 2 - 240} 40 Q ${W / 2} ${40 + alto * 2} ${W / 2 + 240} 40 Z`}
        fill={P.amarillo}
        stroke="#fff3b0"
        strokeWidth={4}
        style={{ filter: `drop-shadow(0 0 ${12 * placa}px ${P.amarillo})` }}
      />
      <path
        d={`M${W / 2 - 180} ${H - 40} Q ${W / 2 + 30} ${H - 40 - alto * 1.7} ${W / 2 + 260} ${H - 40} Z`}
        fill={P.amarillo}
        stroke="#fff3b0"
        strokeWidth={4}
      />
      <g opacity={alarma} transform={`translate(${W - 90} ${-30})`}>
        <circle r={46} fill={P.rojo} />
        <text textAnchor="middle" y={22} fontSize={64} fontWeight={800} fill="#fff" fontFamily={SANS}>
          !
        </text>
      </g>
    </svg>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={36}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Qué es el <Marcador desde={8} color={P.amarillo}>colesterol</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={24}>
      <Chico size={48}>
        Una grasa que tu cuerpo <b style={{ color: P.verde }}>necesita</b>, por ejemplo para fabricar hormonas.
      </Chico>
    </Golpe>
    <Golpe desde={40}>
      <Arteria placaDesde={140} />
    </Golpe>
    <Golpe desde={130} giro={4}>
      <Grande size={64}>
        El problema: cuando <Marcador desde={140} color={P.rojo} texto="#fff">sobra</Marcador> y se{" "}
        <Marcador desde={160} color={P.rojo} texto="#fff">pega</Marcador> en las arterias
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 3. Bueno vs. malo ──────────────────────────────────────────────────────
const Bando: React.FC<{ desde: number; color: string; sigla: string; apodo: string; emoji: string; texto: string; lado: 1 | -1 }> = ({
  desde,
  color,
  sigla,
  apodo,
  emoji,
  texto,
  lado,
}) => {
  const p = useGolpe(desde, 10);
  const frame = useCurrentFrame();
  const latido = 1 + 0.05 * Math.max(0, Math.sin((frame - desde) / 6));
  return (
    <div style={{ transform: `translateX(${(1 - p) * 900 * lado}px)`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={color} style={{ width: 940, padding: "30px 36px", display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ transform: `scale(${latido})` }}>
          <Emoji e={emoji} size={130} />
        </div>
        <div style={{ flex: 1, fontFamily: SANS }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ fontSize: 100, fontWeight: 800, color, letterSpacing: -3, textShadow: `0 0 30px ${color}` }}>{sigla}</span>
            <span style={{ fontSize: 44, fontWeight: 800, color: P.texto, background: color + "33", borderRadius: 12, padding: "4px 14px" }}>
              {apodo}
            </span>
          </div>
          <div style={{ fontSize: 42, fontWeight: 600, color: P.texto, lineHeight: 1.3, marginTop: 6 }}>{texto}</div>
        </div>
      </Vidrio>
    </div>
  );
};

const BuenoMalo: React.FC = () => (
  <Pagina gap={44}>
    <Golpe desde={0}>
      <Grande>
        <span style={{ color: P.verde }}>Bueno</span> vs. <span style={{ color: P.rojo }}>malo</span>
      </Grande>
    </Golpe>
    <Bando desde={22} color={P.rojo} sigla="LDL" apodo="EL MALO" emoji="👎" texto="Lleva colesterol a las arterias y las tapa." lado={-1} />
    <Bando desde={160} color={P.verde} sigla="HDL" apodo="EL BUENO" emoji="👍" texto="Lo saca de las arterias y lo lleva al hígado." lado={1} />
  </Pagina>
);

// ─── 4. Valores: números grandes que cuentan ────────────────────────────────
const Cifra: React.FC<{ desde: number; color: string; nombre: string; signo: string; valor: number; extra?: string; nota: string }> = ({
  desde,
  color,
  nombre,
  signo,
  valor,
  extra,
  nota,
}) => {
  const frame = useCurrentFrame();
  const p = useGolpe(desde, 12);
  const n = Math.round(interpolate(frame, [desde, desde + 30], [0, valor], { ...clamp, easing: suave }));
  const aro = interpolate(frame, [desde, desde + 30], [0, 1], { ...clamp, easing: suave });
  return (
    <div style={{ transform: `scale(${p})`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={color} style={{ width: 940, padding: "22px 32px", display: "flex", alignItems: "center", gap: 28 }}>
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={50} stroke="rgba(255,255,255,0.15)" strokeWidth={12} fill="none" />
          <circle
            cx={60}
            cy={60}
            r={50}
            stroke={color}
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={314}
            strokeDashoffset={314 * (1 - aro)}
            transform="rotate(-90 60 60)"
          />
          <text x={60} y={74} textAnchor="middle" fontSize={44} fontWeight={800} fill={color} fontFamily={SANS}>
            {signo}
          </text>
        </svg>
        <div style={{ flex: 1, fontFamily: SANS }}>
          <div style={{ fontSize: 38, fontWeight: 800, color, letterSpacing: 2, textTransform: "uppercase" }}>{nombre}</div>
          <div style={{ fontSize: 96, fontWeight: 800, color: P.texto, lineHeight: 1, letterSpacing: -3, fontVariantNumeric: "tabular-nums" }}>
            {n}
            {extra && <span style={{ fontSize: 60 }}>{extra}</span>}
            <span style={{ fontSize: 32, fontWeight: 600, color: P.texto2, letterSpacing: 0 }}> mg/dL</span>
          </div>
          <div style={{ fontSize: 28, color: P.texto2, marginTop: 4 }}>{nota}</div>
        </div>
      </Vidrio>
    </div>
  );
};

const Valores: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={100}>
        ¿Cuánto es <Marcador desde={10} color={P.cian}>normal</Marcador>?
      </Grande>
    </Golpe>
    <Cifra desde={30} color={P.cian} nombre="Colesterol total" signo="<" valor={200} nota="Menos de 200" />
    <Cifra desde={130} color={P.rojo} nombre="LDL · el malo" signo="<" valor={100} nota="Menos de 100 · tu médico define tu meta" />
    <Cifra desde={230} color={P.verde} nombre="HDL · el bueno" signo=">" valor={40} extra=" / 50" nota="Más de 40 en hombres, más de 50 en mujeres" />
  </Pagina>
);

// ─── 5. Por qué importa ─────────────────────────────────────────────────────
const Ecg: React.FC<{ desde: number }> = ({ desde }) => {
  const frame = useCurrentFrame();
  const largo = 1400;
  const p = interpolate(frame, [desde, desde + 40], [0, 1], clamp);
  return (
    <svg width={940} height={140} viewBox="0 0 940 140">
      <path
        d="M0 70 H260 L290 20 L320 120 L350 40 L370 70 H560 L590 10 L620 130 L650 50 L670 70 H940"
        fill="none"
        stroke={P.rojo}
        strokeWidth={8}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={largo}
        strokeDashoffset={largo * (1 - p)}
        style={{ filter: `drop-shadow(0 0 10px ${P.rojo})` }}
      />
    </svg>
  );
};

const Importa: React.FC = () => {
  const sac = useSacudida(200, 16, 18);
  return (
    <Pagina gap={34}>
      <Golpe desde={0}>
        <Grande size={100}>¿Por qué importa?</Grande>
      </Golpe>
      <Golpe desde={25}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Emoji e="🤫" size={110} />
          <Grande size={70}>
            No da <Marcador desde={35} color={P.amarillo}>síntomas</Marcador>
          </Grande>
        </div>
      </Golpe>
      <Golpe desde={110}>
        <Chico size={50}>
          Con los años forma <b style={{ color: P.amarillo }}>placas</b> en las arterias
        </Chico>
      </Golpe>
      <Golpe desde={195}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <Chico size={46} color={P.texto2}>
            Y puede causar un
          </Chico>
          <Grande size={120} color={P.rojo} style={{ textShadow: `0 0 40px ${P.rojo}` }}>
            INFARTO
          </Grande>
          <Grande size={60}>o un</Grande>
          <Grande size={120} color={P.rojo} style={{ textShadow: `0 0 40px ${P.rojo}` }}>
            ACV
          </Grande>
        </div>
      </Golpe>
      <Ecg desde={200} />
    </Pagina>
  );
};

const Sube: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande>
        ¿Qué lo <Marcador desde={10} color={P.rojo} texto="#fff">sube</Marcador>?
      </Grande>
    </Golpe>
    {SUBE.map((s, i) => (
      <Fila key={s.texto} desde={28 + i * 45} emoji={s.emoji} color={P.rojo} flecha="↑">
        {s.texto}
      </Fila>
    ))}
  </Pagina>
);

const Bajar: React.FC = () => {
  const caja = useGolpe(380, 9);
  const frame = useCurrentFrame();
  const pulso = 1 + 0.03 * Math.sin(frame / 5);
  return (
    <Pagina gap={18}>
      <Golpe desde={0}>
        <Grande size={100}>
          Cómo <Marcador desde={10} color={P.verde}>bajarlo</Marcador>
        </Grande>
      </Golpe>
      {BAJAR.map((b, i) => (
        <Fila key={b.texto} desde={30 + i * 65} emoji={b.emoji} color={P.verde} flecha="↓" numero={i + 1}>
          {b.texto}
        </Fila>
      ))}
      <div style={{ marginTop: 8, transform: `scale(${caja * (frame > 400 ? pulso : 1)})` }}>
        <div
          style={{
            width: 940,
            background: P.amarillo,
            borderRadius: 30,
            padding: "22px 30px",
            display: "flex",
            alignItems: "center",
            gap: 22,
            boxShadow: `0 0 50px ${P.amarillo}88`,
            fontFamily: SANS,
          }}
        >
          <Emoji e="💊" size={80} />
          <div style={{ fontSize: 40, fontWeight: 800, color: "#071630", lineHeight: 1.2 }}>
            Si te dieron medicación, no la dejes sin hablar con tu médico
          </div>
        </div>
      </div>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🩸" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={90}>
        Pedí un <Marcador desde={20} color={P.amarillo}>perfil lipídico</Marcador> en tu próximo control
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
  buenoMalo: BuenoMalo,
  valores: Valores,
  importa: Importa,
  sube: Sube,
  bajar: Bajar,
  cierre: Cierre,
};

export const Colesterol: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --estilo energico (ver README)
    musica={staticFile("audio/colesterol-musica.mp3")}
  />
);

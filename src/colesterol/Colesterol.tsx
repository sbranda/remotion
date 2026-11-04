import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Entra, Item, Pagina, ReelSalud, SANS, T, Texto, Titulo, clamp, suave, usePop } from "../salud/comun";
import { Icono } from "../salud/iconos";
import { BAJAR, FPS, PAGINAS, PaginaId, ROJO, SUBE, VALORES, VERDE } from "./datos";

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Pastilla: React.FC<{ texto: string; sub: string; color: string; desde: number; lado: 1 | -1 }> = ({ texto, sub, color, desde, lado }) => {
  const frame = useCurrentFrame();
  const p = usePop(desde);
  const flota = Math.sin((frame + desde * 3) / 9) * 10;
  return (
    <div
      style={{
        transform: `translateY(${flota}px) rotate(${lado * 6 * p}deg) scale(${p})`,
        background: color,
        color: "#fff",
        borderRadius: 40,
        padding: "34px 40px",
        width: 360,
        textAlign: "center",
        fontFamily: SANS,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1 }}>{texto}</div>
      <div style={{ fontSize: 36, fontWeight: 600, marginTop: 10, opacity: 0.95 }}>{sub}</div>
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const signo = usePop(30);
  const revela = frame > 75;
  return (
    <Pagina gap={50}>
      <Entra desde={0}>
        <Texto size={76} color={T.azul} peso={800}>
          ¿Colesterol bueno y colesterol malo?
        </Texto>
      </Entra>
      <div style={{ display: "flex", gap: 50, marginTop: 30 }}>
        <Pastilla texto="LDL" sub={revela ? "el malo" : "¿?"} color={ROJO} desde={10} lado={-1} />
        <Pastilla texto="HDL" sub={revela ? "el bueno" : "¿?"} color={VERDE} desde={18} lado={1} />
      </div>
      <div style={{ transform: `scale(${signo})`, fontFamily: SANS, fontWeight: 800, fontSize: 130, color: T.azul, letterSpacing: -3 }}>
        ¿Cuál es cuál?
      </div>
    </Pagina>
  );
};

// ─── 2. Qué es: arteria que se va tapando ───────────────────────────────────
const Arteria: React.FC<{ placaDesde: number }> = ({ placaDesde }) => {
  const frame = useCurrentFrame();
  const W = 900;
  const H = 360;
  const placa = interpolate(frame, [placaDesde, placaDesde + 120], [0, 1], { ...clamp, easing: suave });
  // glóbulos que avanzan; se frenan un poco cuando la arteria se angosta
  const velocidad = 6 - 3 * placa;
  const globulos = Array.from({ length: 9 }).map((_, i) => {
    const x = ((frame * velocidad + i * 120) % (W + 120)) - 60;
    const enPlaca = Math.exp(-Math.pow((x - W / 2) / 140, 2));
    const y = H / 2 + Math.sin(i * 1.7) * (90 - 60 * placa * enPlaca);
    return { x, y, i };
  });
  const alto = 92 * placa;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect x={0} y={30} width={W} height={H - 60} fill="#fde4e0" />
      <rect x={0} y={10} width={W} height={26} rx={8} fill="#e9a29a" />
      <rect x={0} y={H - 36} width={W} height={26} rx={8} fill="#e9a29a" />
      {globulos.map((g) => (
        <ellipse key={g.i} cx={g.x} cy={g.y} rx={26} ry={18} fill="#d64a3f" stroke="#a8322b" strokeWidth={3} />
      ))}
      {/* placas de colesterol */}
      <path d={`M${W / 2 - 220} 36 Q ${W / 2} ${36 + alto * 2} ${W / 2 + 220} 36 Z`} fill="#f2c94c" stroke="#d9a92b" strokeWidth={3} />
      <path d={`M${W / 2 - 160} ${H - 36} Q ${W / 2 + 40} ${H - 36 - alto * 1.6} ${W / 2 + 240} ${H - 36} Z`} fill="#f2c94c" stroke="#d9a92b" strokeWidth={3} />
    </svg>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={40}>
    <Titulo size={96}>¿Qué es el colesterol?</Titulo>
    <Entra desde={20}>
      <Texto size={48}>Es una grasa que tu cuerpo necesita, por ejemplo para fabricar hormonas.</Texto>
    </Entra>
    <Entra desde={130}>
      <Texto size={48}>
        El problema es cuando <span style={{ color: ROJO, fontWeight: 800 }}>sobra y se pega en las arterias</span>.
      </Texto>
    </Entra>
    <Entra desde={40}>
      <div style={{ borderRadius: 30, overflow: "hidden", boxShadow: "0 10px 30px rgba(14,90,109,0.12)" }}>
        <Arteria placaDesde={140} />
      </div>
    </Entra>
  </Pagina>
);

// ─── 3. Bueno vs. malo ──────────────────────────────────────────────────────
const Tarjeta: React.FC<{ desde: number; color: string; sigla: string; apodo: string; texto: string; icono: string }> = ({
  desde,
  color,
  sigla,
  apodo,
  texto,
  icono,
}) => {
  const p = usePop(desde);
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: 920,
        background: "#fff",
        borderRadius: 30,
        borderLeft: `14px solid ${color}`,
        padding: "34px 36px",
        display: "flex",
        gap: 30,
        alignItems: "center",
        opacity: interpolate(frame, [desde, desde + 10], [0, 1], clamp),
        transform: `translateY(${(1 - p) * 60}px)`,
        boxShadow: "0 8px 24px rgba(14,90,109,0.1)",
        fontFamily: SANS,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 84, fontWeight: 800, color }}>{sigla}</span>
          <span style={{ fontSize: 44, fontWeight: 800, color: T.texto }}>{apodo}</span>
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, color: T.texto, lineHeight: 1.3, marginTop: 8 }}>{texto}</div>
      </div>
      <div style={{ background: T.menta2, borderRadius: 24, padding: 14, transform: `scale(${p})` }}>
        <Icono nombre={icono} size={110} />
      </div>
    </div>
  );
};

const BuenoMalo: React.FC = () => (
  <Pagina gap={44}>
    <Titulo>Bueno vs. malo</Titulo>
    <Tarjeta desde={25} color={ROJO} sigla="LDL" apodo="el malo" texto="Lleva colesterol a las arterias y las tapa." icono="arteria" />
    <Tarjeta desde={170} color={VERDE} sigla="HDL" apodo="el bueno" texto="Lo saca de las arterias y lo lleva al hígado." icono="corazon" />
  </Pagina>
);

// ─── 4. Valores ─────────────────────────────────────────────────────────────
const Valores: React.FC = () => (
  <Pagina gap={30}>
    <Titulo>¿Cuánto es normal?</Titulo>
    {VALORES.map((v, i) => {
      const desde = 30 + i * 100;
      return (
        <Entra key={v.nombre} desde={desde} dx={-60} dy={0}>
          <div
            style={{
              width: 920,
              background: "#fff",
              borderRadius: 26,
              padding: "26px 34px",
              boxShadow: "0 6px 20px rgba(14,90,109,0.08)",
              fontFamily: SANS,
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800, color: v.color }}>{v.nombre}</div>
            <div style={{ fontSize: 70, fontWeight: 800, color: T.texto, lineHeight: 1.1 }}>
              {v.meta} <span style={{ fontSize: 34, fontWeight: 600, color: T.gris }}>mg/dL</span>
            </div>
            {v.nota && <div style={{ fontSize: 30, color: T.gris, marginTop: 4 }}>{v.nota}</div>}
          </div>
        </Entra>
      );
    })}
    <Entra desde={330}>
      <Texto size={28} color={T.gris} peso={400}>
        Valores de referencia para adultos
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 5. Por qué importa ─────────────────────────────────────────────────────
const Importa: React.FC = () => (
  <Pagina gap={36}>
    <Titulo>¿Por qué importa?</Titulo>
    <Item desde={25} icono="silencio">
      No da síntomas.
    </Item>
    <Item desde={110} icono="arteria">
      Con los años forma placas en las arterias.
    </Item>
    <Item desde={200} icono="cerebro">
      Puede causar un <b style={{ color: ROJO }}>infarto</b> o un <b style={{ color: ROJO }}>ACV</b>.
    </Item>
  </Pagina>
);

// ─── 6. Qué lo sube ─────────────────────────────────────────────────────────
const Sube: React.FC = () => (
  <Pagina gap={26}>
    <Titulo>¿Qué lo sube?</Titulo>
    {SUBE.map((s, i) => (
      <Item key={s.texto} desde={30 + i * 50} icono={s.icono}>
        {s.texto}
      </Item>
    ))}
  </Pagina>
);

// ─── 7. Cómo bajarlo ────────────────────────────────────────────────────────
const Bajar: React.FC = () => {
  const caja = usePop(390);
  return (
    <Pagina gap={20}>
      <Titulo size={96}>Cómo bajarlo</Titulo>
      {BAJAR.map((b, i) => (
        <Item key={b.texto} desde={30 + i * 70} icono={b.icono} numero={i + 1}>
          {b.texto}
        </Item>
      ))}
      <div
        style={{
          marginTop: 10,
          width: 920,
          background: T.azul,
          borderRadius: 26,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 26,
          transform: `scale(${caja})`,
          fontFamily: SANS,
        }}
      >
        <div style={{ background: "#fff", borderRadius: 20, padding: 8, flexShrink: 0 }}>
          <Icono nombre="pastilla" size={80} />
        </div>
        <div style={{ fontSize: 38, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
          Si te dieron medicación, <b style={{ color: T.menta }}>no la dejes</b> sin hablar con tu médico.
        </div>
      </div>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const p = usePop(6);
  const rebote = frame > 30 ? Math.abs(Math.sin((frame - 30) / 7)) * Math.max(0, 1 - (frame - 30) / 60) * 24 : 0;
  return (
    <Pagina gap={44}>
      <div style={{ marginTop: 80, transform: `scale(${p}) translateY(${-rebote}px)` }}>
        <Icono nombre="marcador" size={180} />
      </div>
      <Entra desde={14}>
        <div
          style={{
            border: `6px solid ${T.menta}`,
            borderRadius: 40,
            padding: "36px 46px",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 74,
            lineHeight: 1.1,
            color: T.azul,
            textAlign: "center",
          }}
        >
          Pedí un perfil lipídico en tu próximo control
        </div>
      </Entra>
      <Entra desde={50}>
        <Texto size={52} color={T.azul2} peso={800}>
          Guardalo y compartilo
        </Texto>
      </Entra>
      <Entra desde={80}>
        <Texto size={34} color={T.gris} peso={400}>
          Esto no reemplaza la consulta con tu médico.
        </Texto>
      </Entra>
    </Pagina>
  );
};

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
  <ReelSalud
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,10,12,14,12,13,17,8 --transponer 2 --bpm 100
    musica={staticFile("audio/colesterol-musica.mp3")}
  />
);

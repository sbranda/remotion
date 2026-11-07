import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { AYUDA, FPS, PAGINAS, PaginaId, SINTOMAS } from "./datos";

// ─── Cuerpo con puntos de dolor ─────────────────────────────────────────────
const PUNTOS: [number, number][] = [
  [150, 110], // nuca
  [105, 150], // hombro izq
  [195, 150], // hombro der
  [70, 235], // codo izq
  [230, 235], // codo der
  [150, 220], // espalda
  [120, 300], // cadera izq
  [180, 300], // cadera der
  [125, 400], // rodilla izq
  [175, 400], // rodilla der
];

const Cuerpo: React.FC<{ desde: number; paso?: number; escala?: number }> = ({ desde, paso = 8, escala = 1.3 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={300 * escala} height={520 * escala} viewBox="0 0 300 520">
      {/* silueta */}
      <g fill="rgba(255,255,255,0.75)" stroke={C.violeta} strokeWidth={4}>
        <circle cx={150} cy={60} r={42} />
        <rect x={100} y={110} width={100} height={200} rx={40} />
        <rect x={52} y={125} width={42} height={170} rx={21} transform="rotate(10 73 125)" />
        <rect x={206} y={125} width={42} height={170} rx={21} transform="rotate(-10 227 125)" />
        <rect x={104} y={290} width={42} height={210} rx={21} />
        <rect x={154} y={290} width={42} height={210} rx={21} />
      </g>
      {/* puntos de dolor que laten */}
      {PUNTOS.map(([x, y], i) => {
        const d = desde + i * paso;
        const on = interpolate(frame, [d, d + 10], [0, 1], clamp);
        const pulso = (Math.sin((frame + i * 7) / 6) + 1) / 2;
        return (
          <g key={i} opacity={on}>
            <circle cx={x} cy={y} r={14 + 10 * pulso} fill={C.coral} opacity={0.3} />
            <circle cx={x} cy={y} r={10} fill={C.coral} />
          </g>
        );
      })}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={20} centro>
    <Cuerpo desde={0} paso={6} escala={1.05} />
    <Entra desde={10}>
      <Titulo size={74}>¿Te duele todo el cuerpo… y los análisis dan bien?</Titulo>
    </Entra>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Qué es la <Resalta color={C.coral}>fibromialgia</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={25}>
      <Tarjeta color={C.coral} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={44}>
          Un <b style={{ color: C.coral }}>dolor crónico</b> en muchas partes del cuerpo, que dura meses, con mucho cansancio.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={150}>
      <Tarjeta color={C.verde} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={44}>
          <b style={{ color: C.verde }}>Es real.</b> No es “psicológico” ni exageración, aunque no se vea en los estudios.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 3. El volumen del dolor ────────────────────────────────────────────────
const Volumen: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [40, 140], [0.2, 1], { ...clamp, easing: suave });
  const ang = -135 + 270 * v;
  const barras = 10;
  return (
    <Pagina gap={28} centro>
      <Entra desde={0}>
        <Titulo size={80}>
          El cerebro <Resalta color={C.coral}>sube el volumen</Resalta> del dolor 🔊
        </Titulo>
      </Entra>
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        <svg width={260} height={260} viewBox="0 0 260 260">
          <circle cx={130} cy={130} r={110} fill="rgba(255,255,255,0.85)" stroke={C.violeta} strokeWidth={6} />
          <g transform={`rotate(${ang} 130 130)`}>
            <rect x={124} y={34} width={12} height={60} rx={6} fill={C.coral} />
          </g>
          <circle cx={130} cy={130} r={18} fill={C.violeta} />
        </svg>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 260 }}>
          {Array.from({ length: barras }).map((_, i) => {
            const on = i / barras < v;
            return <div key={i} style={{ width: 26, height: 40 + i * 22, borderRadius: 8, background: on ? (i > 6 ? C.coral : C.amarillo) : "rgba(255,255,255,0.6)" }} />;
          })}
        </div>
      </div>
      <Entra desde={150}>
        <Texto size={42}>
          El sistema nervioso <b style={{ color: C.coral }}>amplifica</b> las señales: cosas que no deberían doler, duelen.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Cómo se <Resalta>siente</Resalta>?
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 450px)", gap: 18 }}>
      {SINTOMAS.map((s, i) => (
        <Entra key={s.texto} desde={25 + i * 45}>
          <Tarjeta color={C.violeta} style={{ height: 160, padding: "0 22px", display: "flex", alignItems: "center", gap: 18 }}>
            <Emoji e={s.emoji} size={62} />
            <div style={{ fontFamily: SANS, fontSize: 33, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

// ─── 5. A quién le pasa ─────────────────────────────────────────────────────
const Quien: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          ¿A quién le <Resalta color={C.azul}>pasa</Resalta>?
        </Titulo>
      </Entra>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 44px)", gap: 10 }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const marca = [23, 56, 81].includes(i) && frame > 60;
          return (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                opacity: interpolate(frame, [12 + i * 0.4, 18 + i * 0.4], [0, 1], clamp),
                background: marca ? C.coral : "rgba(255,255,255,0.75)",
                transform: `scale(${marca ? 1.25 : 1})`,
                boxShadow: marca ? `0 0 16px ${C.coral}` : "none",
              }}
            />
          );
        })}
      </div>
      <Entra desde={60}>
        <Texto size={46}>
          Entre <b style={{ color: C.azul }}>2 y 4 de cada 100 personas</b>
        </Texto>
      </Entra>
      <Entra desde={120}>
        <Texto size={40} color={C.texto2}>
          Sobre todo mujeres, muchas veces entre los 30 y los 50 años.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 6. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Cómo se <Resalta color={C.azul}>diagnostica</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={25}>
      <Tarjeta color={C.coral} style={{ width: 920, padding: "20px 28px" }}>
        <Texto size={42}>🩸 No hay un análisis que la detecte.</Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={110}>
      <Tarjeta color={C.azul} style={{ width: 920, padding: "20px 28px" }}>
        <Texto size={42}>
          🩺 Se diagnostica por los síntomas y <b style={{ color: C.azul }}>descartando otras causas</b>.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={210}>
      <Texto size={38} color={C.texto2}>
        Suele hacerlo un reumatólogo o el médico clínico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        No tiene cura, pero <Resalta color={C.verde}>se puede mejorar</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDA} desde={35} paso={90} color={C.verde} size={38} />
    <Entra desde={500}>
      <Texto size={34} color={C.texto2}>
        Lo que mejor funciona es combinar varias cosas.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const late = 1 + 0.06 * Math.sin(frame / 10);
  return (
    <Pagina gap={30} centro>
      <Entra desde={0}>
        <div style={{ transform: `scale(${late})` }}>
          <Emoji e="💜" size={140} />
        </div>
      </Entra>
      <Entra desde={10}>
        <Titulo size={84}>
          Que no se vea <Resalta>no significa que no exista</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={60}>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { e: "🔖", t: "Guardalo", c: C.verde },
            { e: "📲", t: "Compartilo", c: C.azul },
          ].map((b) => (
            <div key={b.t} style={{ background: b.c, color: C.blanco, borderRadius: 999, padding: "14px 32px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
              <Emoji e={b.e} size={44} />
              {b.t}
            </div>
          ))}
        </div>
      </Entra>
      <Entra desde={85}>
        <Texto size={28} color={C.texto2} peso={500}>
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
  volumen: Volumen,
  sintomas: Sintomas,
  quien: Quien,
  diagnostico: Diagnostico,
  ayuda: Ayuda,
  cierre: Cierre,
};

export const Fibromialgia: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 4,12,10,14,8,12,22,8 --bpm 74 --transponer -1 --estilo suave
    musica={staticFile("audio/fibromialgia-musica.mp3")}
  />
);

import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { CUANDO, CUERPO, FPS, HABITOS, LINEA_AYUDA, MENTE, PAGINAS, PENSAMIENTOS, PaginaId, SENTIDOS } from "./datos";

// ─── 1. Gancho: pensamientos que dan vueltas ────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30} centro>
      <div style={{ position: "relative", width: 940, height: 560 }}>
        {PENSAMIENTOS.map((t, i) => {
          const ang = (i / PENSAMIENTOS.length) * Math.PI * 2 + frame / 40;
          const r = (i % 2 ? 165 : 265) + Math.sin(frame / 15 + i) * 8; // dos anillos para que no se pisen
          const op = interpolate(frame, [i * 6, i * 6 + 12], [0, 1], clamp);
          return (
            <div
              key={t}
              style={{
                position: "absolute",
                left: 470 + Math.cos(ang) * r * 1.45,
                top: 280 + Math.sin(ang) * r * 1.15,
                transform: "translate(-50%, -50%)",
                opacity: op,
                background: "rgba(255,255,255,0.9)",
                borderRadius: 999,
                padding: "12px 26px",
                fontFamily: SANS,
                fontSize: 34,
                fontWeight: 700,
                color: C.texto2,
                whiteSpace: "nowrap",
                boxShadow: "0 10px 30px rgba(123,97,255,0.2)",
              }}
            >
              {t}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 470, top: 280, transform: "translate(-50%, -50%)" }}>
          <Emoji e="😵‍💫" size={150} />
        </div>
      </div>
      <Entra desde={20}>
        <Titulo size={100}>¿Tu cabeza no para nunca?</Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Qué es: la alarma del cuerpo ────────────────────────────────────────
const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  const prendida = frame > 380;
  const vibra = prendida ? Math.sin(frame * 1.6) * 6 : Math.sin(frame / 8) * 2;
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Titulo>
          ¿Qué es la <Resalta>ansiedad</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <div style={{ transform: `rotate(${vibra}deg)` }}>
          <Emoji e="🚨" size={170} />
        </div>
      </Entra>
      <Entra desde={50}>
        <Texto size={48}>
          Es la <b style={{ color: C.violeta }}>alarma natural</b> de tu cuerpo ante un peligro o un desafío.
        </Texto>
      </Entra>
      <Entra desde={200}>
        <Tarjeta color={C.verde} style={{ width: 920, padding: "20px 28px" }}>
          <Texto size={42}>En dosis justas te ayuda: te pone alerta para rendir un examen o cruzar la calle 💡</Texto>
        </Tarjeta>
      </Entra>
      <Entra desde={380}>
        <Tarjeta color={C.coral} style={{ width: 920, padding: "20px 28px" }}>
          <Texto size={44}>
            El problema es cuando la alarma <b style={{ color: C.coral }}>se queda prendida</b>.
          </Texto>
        </Tarjeta>
      </Entra>
    </Pagina>
  );
};

// ─── 3. Cuándo es un problema ───────────────────────────────────────────────
const Problema: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Cuándo es un <Resalta color={C.coral}>problema</Resalta>?
      </Titulo>
    </Entra>
    <Lista items={CUANDO} desde={30} paso={60} color={C.coral} />
    <Entra desde={300}>
      <Texto size={36} color={C.texto2}>
        Los trastornos de ansiedad son los problemas de salud mental más frecuentes del mundo (OMS).
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 4. En el cuerpo ────────────────────────────────────────────────────────
const Cuerpo: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={88}>
        Se siente en el <Resalta color={C.azul}>cuerpo</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 450px)", gap: 20 }}>
      {CUERPO.map((c, i) => (
        <Entra key={c.texto} desde={30 + i * 45}>
          <Tarjeta color={C.azul} style={{ height: 150, padding: "0 24px", display: "flex", alignItems: "center", gap: 20 }}>
            <Emoji e={c.emoji} size={70} />
            <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{c.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

// ─── 5. En la mente ─────────────────────────────────────────────────────────
const Mente: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={88}>
        Y en la <Resalta>mente</Resalta>
      </Titulo>
    </Entra>
    <Lista items={MENTE} desde={30} paso={70} />
  </Pagina>
);

// ─── 6. Ataque de pánico ────────────────────────────────────────────────────
const Ola: React.FC<{ desde: number }> = ({ desde }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 120], [0, 1], { ...clamp, easing: suave });
  const ancho = 900;
  const d = Array.from({ length: 61 })
    .map((_, i) => {
      const x = (i / 60) * ancho;
      const t = i / 60;
      // sube rápido, pico, baja de a poco
      const y = 230 - 190 * (t < 0.3 ? Math.sin((t / 0.3) * (Math.PI / 2)) : Math.exp(-(t - 0.3) * 4));
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={ancho} height={260} viewBox={`0 0 ${ancho} 260`}>
      <line x1={0} y1={232} x2={ancho} y2={232} stroke={C.texto2} strokeWidth={3} opacity={0.3} />
      <path d={d} fill="none" stroke={C.coral} strokeWidth={10} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)} />
      <text x={270} y={30} fontFamily={SANS} fontSize={30} fontWeight={800} fill={C.coral} opacity={p > 0.35 ? 1 : 0}>
        pico en minutos
      </text>
      <text x={ancho - 10} y={215} textAnchor="end" fontFamily={SANS} fontSize={30} fontWeight={800} fill={C.verde} opacity={p > 0.95 ? 1 : 0}>
        y pasa
      </text>
    </svg>
  );
};

const Panico: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Y un <Resalta color={C.coral}>ataque de pánico</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={25}>
      <Texto size={44}>Un miedo muy intenso que llega de golpe, con:</Texto>
    </Entra>
    <div style={{ display: "flex", gap: 20 }}>
      {[
        { e: "💓", t: "Palpitaciones fuertes" },
        { e: "😮‍💨", t: "Sensación de que falta el aire" },
        { e: "😱", t: "Miedo a morir o perder el control" },
      ].map((s, i) => (
        <Entra key={s.t} desde={70 + i * 40}>
          <Tarjeta color={C.coral} style={{ width: 293, height: 230, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center" }}>
            <Emoji e={s.e} size={70} />
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.t}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={230}>
      <Ola desde={240} />
    </Entra>
    <Entra desde={420}>
      <Texto size={34} color={C.texto2}>
        La primera vez, consultá para descartar otras causas. Si hay dolor de pecho, llamá al 107 o al 911.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7. Respiración guiada ──────────────────────────────────────────────────
const INICIO = 70;
const INHALA = 120; // 4 s
const EXHALA = 180; // 6 s
const CICLO = INHALA + EXHALA;
const CICLOS = 2;

const Respirar: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame - INICIO;
  const enCiclos = t >= 0 && t < CICLO * CICLOS;
  const fase = ((t % CICLO) + CICLO) % CICLO;
  const inhalando = fase < INHALA;
  let escala = 0.55;
  let etiqueta = "";
  let cuenta = 0;
  if (enCiclos) {
    if (inhalando) {
      escala = interpolate(fase, [0, INHALA], [0.55, 1], { easing: (x) => (1 - Math.cos(x * Math.PI)) / 2 });
      etiqueta = "Inhalá";
      cuenta = 4 - Math.floor(fase / 30);
    } else {
      escala = interpolate(fase - INHALA, [0, EXHALA], [1, 0.55], { easing: (x) => (1 - Math.cos(x * Math.PI)) / 2 });
      etiqueta = "Exhalá";
      cuenta = 6 - Math.floor((fase - INHALA) / 30);
    }
  } else if (t >= CICLO * CICLOS) {
    escala = 0.55 + 0.03 * Math.sin(frame / 20);
  }
  const color = inhalando && enCiclos ? C.azul : C.violeta;
  const terminado = t >= CICLO * CICLOS;
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Titulo size={88}>
          Respirá <Resalta color={C.azul}>conmigo</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <Texto size={40} color={C.texto2}>
          Exhalar más largo de lo que inhalás le avisa al cuerpo que puede calmarse.
        </Texto>
      </Entra>
      <div style={{ position: "relative", width: 620, height: 620, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: "50%", border: `4px dashed ${color}55` }} />
        <div
          style={{
            width: 620,
            height: 620,
            borderRadius: "50%",
            transform: `scale(${escala})`,
            background: `radial-gradient(circle, ${color}cc 0%, ${color}66 70%, ${color}22 100%)`,
            boxShadow: `0 0 80px ${color}88`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ transform: `scale(${1 / escala})`, textAlign: "center", fontFamily: SANS, color: C.blanco }}>
            {enCiclos ? (
              <>
                <div style={{ fontSize: 70, fontWeight: 800 }}>{etiqueta}</div>
                <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1 }}>{cuenta}</div>
              </>
            ) : (
              <div style={{ fontSize: 60, fontWeight: 800 }}>{terminado ? "💜" : "Preparate…"}</div>
            )}
          </div>
        </div>
      </div>
      {terminado && (
        <Entra desde={INICIO + CICLO * CICLOS}>
          <Texto size={44}>Repetilo las veces que lo necesites.</Texto>
        </Entra>
      )}
    </Pagina>
  );
};

// ─── 8. Técnica 5-4-3-2-1 ───────────────────────────────────────────────────
const Tecnica: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        Volvé al presente: <Resalta color={C.verde}>5-4-3-2-1</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Texto size={38} color={C.texto2}>
        Nombrá en voz baja:
      </Texto>
    </Entra>
    {SENTIDOS.map((s, i) => (
      <Entra key={s.n} desde={50 + i * 80} dx={-40}>
        <Tarjeta color={C.verde} style={{ width: 920, padding: "14px 28px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontFamily: SANS, fontSize: 80, fontWeight: 800, color: C.verde, width: 70, textAlign: "center" }}>{s.n}</div>
          <Emoji e={s.emoji} size={64} />
          <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 700, color: C.texto }}>{s.texto}</div>
        </Tarjeta>
      </Entra>
    ))}
  </Pagina>
);

// ─── 9. Hábitos ─────────────────────────────────────────────────────────────
const Habitos: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={88}>
        Lo que ayuda <Resalta color={C.verde}>día a día</Resalta>
      </Titulo>
    </Entra>
    <Lista items={HABITOS} desde={30} paso={70} color={C.verde} />
  </Pagina>
);

// ─── 10. Pedir ayuda ────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0}>
      <Titulo size={96}>
        Pedir ayuda <Resalta>no es debilidad</Resalta> 💜
      </Titulo>
    </Entra>
    <Entra desde={60}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={42}>
          La <b style={{ color: C.violeta }}>terapia</b> funciona muy bien para la ansiedad.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={150}>
      <Tarjeta color={C.azul} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={40}>A veces también se suma medicación, siempre indicada por un profesional.</Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 11. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const late = 1 + 0.06 * Math.sin(frame / 10);
  return (
    <Pagina gap={28} centro>
      <Entra desde={0}>
        <div style={{ transform: `scale(${late})` }}>
          <Emoji e="💜" size={130} />
        </div>
      </Entra>
      <Entra desde={10}>
        <Titulo size={100}>No estás solo ni sola</Titulo>
      </Entra>
      <Entra desde={40}>
        <Tarjeta color={C.coral} style={{ width: 920, padding: "18px 28px" }}>
          <Texto size={34}>
            Si pensás en hacerte daño, pedí ayuda ya: <b style={{ color: C.coral }}>{LINEA_AYUDA}</b>
          </Texto>
        </Tarjeta>
      </Entra>
      <Entra desde={90}>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { e: "🔖", t: "Guardalo", c: C.verde },
            { e: "📲", t: "Compartilo", c: C.azul },
          ].map((b) => (
            <div key={b.t} style={{ background: b.c, color: C.blanco, borderRadius: 999, padding: "16px 34px", fontFamily: SANS, fontSize: 44, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
              <Emoji e={b.e} size={46} />
              {b.t}
            </div>
          ))}
        </div>
      </Entra>
      <Entra desde={110}>
        <Texto size={28} color={C.texto2} peso={500}>
          Esto no reemplaza la consulta con un profesional.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  problema: Problema,
  cuerpo: Cuerpo,
  mente: Mente,
  panico: Panico,
  respirar: Respirar,
  tecnica54321: Tecnica,
  habitos: Habitos,
  ayuda: Ayuda,
  cierre: Cierre,
};

export const Ansiedad: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --estilo suave --bpm 72 (ver README)
    musica={staticFile("audio/ansiedad-musica.mp3")}
  />
);

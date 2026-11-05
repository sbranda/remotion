import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Ola, Respirar } from "../ansiedad/Ansiedad";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp } from "../salud/calma";
import { AYUDAR, CIRCULO, FPS, PAGINAS, PaginaId, QUE_HACER, SINTOMAS } from "./datos";

// ─── 1. Gancho: el corazón que se acelera ───────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  // el pulso sube de 72 a 150 latidos por minuto (a 30 cuadros por segundo, un latido dura 1800/bpm cuadros)
  const pulso = (f: number) => interpolate(f, [0, 150], [72, 150], clamp);
  let fase = 0;
  for (let f = 0; f < frame; f++) fase += pulso(f) / 1800;
  const latido = 1 + 0.18 * Math.pow(Math.max(0, Math.sin(fase * Math.PI * 2)), 6);
  const bpm = Math.round(pulso(frame));
  return (
    <Pagina gap={30} centro>
      <div style={{ transform: `scale(${latido})` }}>
        <Emoji e="❤️" size={200} />
      </div>
      <div style={{ fontFamily: SANS, fontSize: 70, fontWeight: 800, color: C.coral, fontVariantNumeric: "tabular-nums" }}>{bpm} latidos/min</div>
      <Entra desde={10}>
        <Titulo size={84}>De repente, el corazón a mil y sentís que te morís…</Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={30}>
    <Entra desde={0}>
      <Titulo>
        ¿Qué es un <Resalta color={C.coral}>ataque de pánico</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Tarjeta color={C.coral} style={{ width: 920, padding: "24px 30px" }}>
        <Texto size={46}>
          Un <b style={{ color: C.coral }}>miedo muy intenso</b> que aparece de golpe, con síntomas fuertes en el cuerpo.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={180}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "24px 30px" }}>
        <Texto size={44}>Muchas veces llega sin aviso, incluso estando tranquilo o durmiendo 🌙</Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={330}>
      <Texto size={42} color={C.texto2}>
        Le puede pasar a cualquiera. <b style={{ color: C.texto }}>No estás loco ni loca.</b>
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. Qué se siente ───────────────────────────────────────────────────────
const Siente: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Qué se <Resalta color={C.coral}>siente</Resalta>?
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 450px)", gap: 18 }}>
      {SINTOMAS.map((s, i) => (
        <Entra key={s.texto} desde={30 + i * 45}>
          <Tarjeta color={C.coral} style={{ height: 126, padding: "0 22px", display: "flex", alignItems: "center", gap: 18 }}>
            <Emoji e={s.emoji} size={62} />
            <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

// ─── 4. La ola ──────────────────────────────────────────────────────────────
const LaOla: React.FC = () => (
  <Pagina gap={30}>
    <Entra desde={0}>
      <Titulo size={88}>
        Es como una <Resalta color={C.azul}>ola</Resalta> 🌊
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Ola desde={30} />
    </Entra>
    <Entra desde={170}>
      <Texto size={44}>
        Suele llegar a su pico en <b style={{ color: C.coral }}>unos 10 minutos</b> y después baja.
      </Texto>
    </Entra>
    <Entra desde={280}>
      <Tarjeta color={C.verde} style={{ width: 920, padding: "20px 28px" }}>
        <Texto size={42}>
          Aunque se sienta terrible, <b style={{ color: C.verde }}>el ataque en sí no te hace daño</b>.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 5. Por qué pasa ────────────────────────────────────────────────────────
const PorQue: React.FC = () => {
  const frame = useCurrentFrame();
  const vibra = frame > 40 ? Math.sin(frame * 1.4) * 5 : 0;
  return (
    <Pagina gap={28}>
      <Entra desde={0}>
        <Titulo size={88}>
          ¿Por qué <Resalta>pasa</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={25}>
        <div style={{ transform: `rotate(${vibra}deg)` }}>
          <Emoji e="🚨" size={140} />
        </div>
      </Entra>
      <Entra desde={40}>
        <Texto size={46}>
          La <b style={{ color: C.violeta }}>alarma del cuerpo</b> se dispara… <b>sin un peligro real</b>.
        </Texto>
      </Entra>
      <Entra desde={170}>
        <Tarjeta color={C.azul} style={{ width: 920, padding: "20px 28px" }}>
          <Texto size={40}>
            Sale <b style={{ color: C.azul }}>adrenalina</b>: el corazón se acelera y respirás rápido. Eso da mareo y hormigueo.
          </Texto>
        </Tarjeta>
      </Entra>
      <Entra desde={320}>
        <Texto size={36} color={C.texto2}>
          A veces influyen el estrés, dormir poco, el café o el alcohol. Otras veces, no hay un motivo claro.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 6. El círculo del miedo ────────────────────────────────────────────────
const Circulo: React.FC = () => {
  const frame = useCurrentFrame();
  const R = 300;
  const activo = frame < 40 ? -1 : Math.floor((frame - 40) / 45) % CIRCULO.length;
  const giro = frame * 0.6;
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={84}>
          El <Resalta color={C.coral}>círculo del miedo</Resalta>
        </Titulo>
      </Entra>
      <div style={{ position: "relative", width: 900, height: 820 }}>
        {/* flechas que giran alrededor */}
        <svg width={900} height={820} viewBox="0 0 900 820" style={{ position: "absolute", inset: 0 }}>
          <g transform={`rotate(${giro} 450 410)`}>
            <circle cx={450} cy={410} r={R} fill="none" stroke={C.coral} strokeWidth={8} strokeDasharray="30 22" opacity={0.5} />
          </g>
        </svg>
        <div style={{ position: "absolute", left: 450, top: 410, transform: "translate(-50%, -50%)" }}>
          <Emoji e="🔁" size={110} />
        </div>
        {CIRCULO.map((c, i) => {
          const ang = (i / CIRCULO.length) * Math.PI * 2 - Math.PI / 2;
          const on = i === activo;
          return (
            <div
              key={c.texto}
              style={{
                position: "absolute",
                left: 450 + Math.cos(ang) * R,
                top: 410 + Math.sin(ang) * R,
                transform: `translate(-50%, -50%) scale(${on ? 1.12 : 1})`,
                opacity: interpolate(frame, [15 + i * 10, 30 + i * 10], [0, 1], clamp),
              }}
            >
              <Tarjeta color={on ? C.coral : C.violeta} style={{ width: 330, padding: "16px 18px", textAlign: "center", border: on ? `4px solid ${C.coral}` : undefined }}>
                <Emoji e={c.emoji} size={56} />
                <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto, lineHeight: 1.2, marginTop: 6 }}>{c.texto}</div>
              </Tarjeta>
            </div>
          );
        })}
      </div>
      <Entra desde={380}>
        <Texto size={40}>
          Entender que es pánico <b style={{ color: C.verde }}>corta el círculo</b> ✂️
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 7. Qué hacer en el momento ─────────────────────────────────────────────
const QueHacer: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        Qué hacer <Resalta color={C.verde}>en el momento</Resalta>
      </Titulo>
    </Entra>
    <Lista items={QUE_HACER} desde={35} paso={120} color={C.verde} size={40} />
  </Pagina>
);

// ─── 9. Cómo ayudar a alguien ───────────────────────────────────────────────
const Ayudar: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        Si le pasa a <Resalta color={C.azul}>alguien más</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDAR} desde={30} paso={90} color={C.azul} />
  </Pagina>
);

// ─── 10. Tratamiento ────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => (
  <Pagina gap={28} centro>
    <Entra desde={0}>
      <Titulo size={92}>
        Tiene <Resalta color={C.verde}>tratamiento</Resalta> 💚
      </Titulo>
    </Entra>
    <Entra desde={40}>
      <Tarjeta color={C.verde} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={42}>
          La <b style={{ color: C.verde }}>terapia</b> funciona muy bien. A veces se suma medicación indicada por un profesional.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={150}>
      <Texto size={38} color={C.texto2}>
        Si los ataques se repiten o vivís con miedo a que vuelvan, consultá.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 11. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const late = 1 + 0.06 * Math.sin(frame / 10);
  return (
    <Pagina gap={26} centro>
      <Entra desde={0}>
        <Tarjeta color={C.coral} style={{ width: 920, padding: "20px 28px" }}>
          <Texto size={36}>
            🚨 Si es la primera vez, tenés dolor fuerte en el pecho o problemas del corazón: <b style={{ color: C.coral }}>llamá al 107 o al 911</b>.
          </Texto>
        </Tarjeta>
      </Entra>
      <Entra desde={90}>
        <div style={{ transform: `scale(${late})` }}>
          <Emoji e="💜" size={110} />
        </div>
      </Entra>
      <Entra desde={100}>
        <Titulo size={84}>Va a pasar. No estás solo ni sola.</Titulo>
      </Entra>
      <Entra desde={150}>
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
      <Entra desde={170}>
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
  siente: Siente,
  ola: LaOla,
  porQue: PorQue,
  circulo: Circulo,
  queHacer: QueHacer,
  respirar: Respirar,
  ayudar: Ayudar,
  tratamiento: Tratamiento,
  cierre: Cierre,
};

export const Panico: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --estilo suave --bpm 70 (ver README)
    musica={staticFile("audio/panico-musica.mp3")}
  />
);

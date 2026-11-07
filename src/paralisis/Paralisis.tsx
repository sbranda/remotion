// Reel de 90 s: parálisis del sueño, estilo noche.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelNoche, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/noche";

const FPS = 30;

// ─── Habitación: persona acostada, ventana y "sombra" ──────────────────────
const Habitacion: React.FC<{ sombra: number; presion: number; ojos?: boolean }> = ({ sombra, presion, ojos = true }) => {
  const frame = useCurrentFrame();
  const parpadeo = 0.6 + 0.4 * Math.abs(Math.sin(frame / 9));
  const oprime = presion * (2 + 2 * Math.sin(frame / 6));
  return (
    <svg width={900} height={560} viewBox="0 0 900 560" style={{ overflow: "visible" }}>
      {/* pared y ventana */}
      <rect x={0} y={0} width={900} height={560} rx={36} fill="#141a40" stroke="#2c3570" strokeWidth={4} />
      <rect x={620} y={50} width={200} height={170} rx={12} fill="#0b1030" stroke="#3d4790" strokeWidth={6} />
      <line x1={720} y1={50} x2={720} y2={220} stroke="#3d4790" strokeWidth={5} />
      <circle cx={770} cy={100} r={28} fill="#fff3c4" opacity={0.9} />
      {/* sombra */}
      <g opacity={sombra * parpadeo} style={{ filter: "blur(3px)" }}>
        <ellipse cx={190} cy={150} rx={46} ry={54} fill="#000" />
        <path d="M120 200 Q190 175 260 200 L290 470 L90 470 Z" fill="#000" />
        <circle cx={175} cy={145} r={6} fill={C.coral} opacity={0.8} />
        <circle cx={205} cy={145} r={6} fill={C.coral} opacity={0.8} />
      </g>
      {/* cama */}
      <rect x={300} y={380} width={540} height={70} rx={16} fill="#3a2f6b" />
      <rect x={300} y={450} width={20} height={70} fill="#2a2150" />
      <rect x={820} y={450} width={20} height={70} fill="#2a2150" />
      <rect x={300} y={310} width={30} height={140} rx={10} fill="#2a2150" />
      {/* almohada y persona */}
      <ellipse cx={380} cy={360} rx={60} ry={24} fill="#e8e6ff" />
      <circle cx={390} cy={330} r={38} fill="#f2c7a5" />
      {ojos && (
        <>
          <circle cx={378} cy={326} r={7} fill="#fff" />
          <circle cx={404} cy={326} r={7} fill="#fff" />
          <circle cx={378} cy={326} r={3.5} fill="#111" />
          <circle cx={404} cy={326} r={3.5} fill="#111" />
        </>
      )}
      <path d={`M430 ${355 + oprime} Q600 ${330 + oprime} 800 ${360} L800 390 L430 390 Z`} fill="#6c5ce7" />
      {/* presión en el pecho */}
      {presion > 0 &&
        [0, 1, 2].map((i) => {
          const t = ((frame + i * 10) % 30) / 30;
          return <path key={i} d={`M${470 + i * 40} ${230 + t * 70} l0 40 m-14 -16 l14 16 l14 -16`} stroke={C.coral} strokeWidth={6} fill="none" strokeLinecap="round" opacity={presion * (1 - t)} />;
        })}
    </svg>
  );
};

// ─── Interruptor cerebro → cuerpo ───────────────────────────────────────────
const Interruptor: React.FC<{ apagado: number }> = ({ apagado }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
    <Emoji e="🧠" size={130} />
    <div style={{ width: 200, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${C.violeta}, ${apagado > 0.5 ? "#444a70" : C.verde})` }} />
    <div style={{ width: 150, height: 80, borderRadius: 40, background: apagado > 0.5 ? "#444a70" : C.verde, position: "relative", boxShadow: `0 0 30px ${apagado > 0.5 ? C.coral : C.verde}66` }}>
      <div style={{ position: "absolute", top: 8, left: 8 + 70 * apagado, width: 64, height: 64, borderRadius: 32, background: "#fff" }} />
    </div>
    <div style={{ position: "relative" }}>
      <div style={{ opacity: 1 - 0.5 * apagado }}>
        <Emoji e="🧍" size={130} />
      </div>
      <div style={{ position: "absolute", right: -20, bottom: 0, opacity: apagado }}>
        <Emoji e="🔒" size={64} />
      </div>
    </div>
  </div>
);

// ─── Barra de estado ────────────────────────────────────────────────────────
const Estado: React.FC<{ emoji: string; nombre: string; texto: string; color: string; desde: number }> = ({ emoji, nombre, texto, color, desde }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 20], [0, 1], { ...clamp, easing: suave });
  return (
    <Tarjeta color={color} style={{ width: 900, padding: "18px 26px", display: "flex", alignItems: "center", gap: 22, opacity: 0.3 + 0.7 * p }}>
      <Emoji e={emoji} size={86} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color }}>{nombre}</div>
        <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 600, color: C.texto }}>{texto}</div>
      </div>
    </Tarjeta>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0}>
      <Emoji e="👁️" size={150} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={84}>Te despertás… y no te podés mover.</Titulo>
    </Entra>
    <Entra desde={70}>
      <Texto size={44} color={C.coral}>
        Y sentís que hay alguien en la habitación.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={84}>
        Es la <Resalta color={C.violeta}>parálisis del sueño</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Tarjeta color={C.azul} style={{ width: 900, padding: "20px 30px" }}>
        <Texto size={42}>
          Estás <b style={{ color: C.azul }}>consciente</b>, pero tu cuerpo <b style={{ color: C.coral }}>no responde</b>. Dura de segundos a un par de minutos.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={150}>
      <Texto size={40} color={C.texto2}>
        Asusta mucho, pero <b style={{ color: C.verde }}>no es peligrosa</b>. Y muchas personas la viven alguna vez.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. El interruptor del REM ──────────────────────────────────────────────
const Rem: React.FC = () => {
  const frame = useCurrentFrame();
  const apagado = interpolate(frame, [150, 180], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Titulo size={80}>
          Mientras soñás, el cerebro <Resalta color={C.amarillo}>apaga</Resalta> los músculos
        </Titulo>
      </Entra>
      <Entra desde={40}>
        <Texto size={40}>
          En la fase <b style={{ color: C.amarillo }}>REM</b> soñás con todo: corrés, peleás, volás… 💭
        </Texto>
      </Entra>
      <Entra desde={100}>
        <Interruptor apagado={apagado} />
      </Entra>
      <Entra desde={220}>
        <Texto size={40}>
          Para que no hagas los movimientos del sueño, <b style={{ color: C.coral }}>bloquea el cuerpo</b>. Se llama atonía muscular.
        </Texto>
      </Entra>
      <Entra desde={340}>
        <Texto size={34} color={C.texto2}>
          Solo siguen funcionando los ojos y la respiración.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. El desfase ──────────────────────────────────────────────────────────
const Desfase: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={80}>
        El cerebro despierta <Resalta color={C.coral}>antes</Resalta> que el cuerpo
      </Titulo>
    </Entra>
    <Estado desde={60} emoji="🧠" nombre="Cerebro: despierto ✅" texto="Ves, oís y pensás" color={C.verde} />
    <Estado desde={130} emoji="🔒" nombre="Cuerpo: todavía en REM ❌" texto="El bloqueo no se desactivó" color={C.coral} />
    <Entra desde={220}>
      <Texto size={42}>
        Quedás <b style={{ color: C.amarillo }}>a mitad de camino</b>: despierto adentro de un cuerpo dormido.
      </Texto>
    </Entra>
    <Entra desde={320}>
      <Texto size={34} color={C.texto2}>
        Por eso podés abrir los ojos, pero no mover los brazos ni hablar.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 5. Presión y alucinaciones ─────────────────────────────────────────────
const Sensaciones: React.FC = () => {
  const frame = useCurrentFrame();
  const presion = interpolate(frame, [60, 90], [0, 1], clamp);
  const sombra = interpolate(frame, [300, 360], [0, 1], { ...clamp, easing: suave });
  const fase2 = frame >= 280;
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={76}>
          ¿Por qué la <Resalta color={C.coral}>presión</Resalta> y las <Resalta color={C.violeta}>sombras</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <div style={{ transform: "scale(0.9)" }}>
          <Habitacion sombra={sombra} presion={presion} />
        </div>
      </Entra>
      {!fase2 ? (
        <Entra desde={100}>
          <Tarjeta color={C.coral} style={{ width: 900, padding: "16px 26px" }}>
            <Texto size={36}>
              😮‍💨 <b style={{ color: C.coral }}>Presión en el pecho:</b> los músculos del pecho siguen relajados y solo trabaja el diafragma. Respirás bien, pero se siente como un peso encima.
            </Texto>
          </Tarjeta>
        </Entra>
      ) : (
        <Entra desde={300}>
          <Tarjeta color={C.violeta} style={{ width: 900, padding: "16px 26px" }}>
            <Texto size={36}>
              👤 <b style={{ color: C.violeta }}>Alucinaciones:</b> el cerebro sigue “soñando” con los ojos abiertos y mezcla el sueño con tu habitación real. El miedo le da forma de sombra o presencia.
            </Texto>
          </Tarjeta>
        </Entra>
      )}
    </Pagina>
  );
};

// ─── 6. Qué la favorece ─────────────────────────────────────────────────────
const Factores: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={80}>
        Qué la <Resalta color={C.amarillo}>favorece</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🥱", texto: "Dormir poco" },
        { emoji: "🔀", texto: "Horarios de sueño desordenados" },
        { emoji: "😰", texto: "Estrés y ansiedad" },
        { emoji: "🛌", texto: "Dormir boca arriba" },
        { emoji: "✈️", texto: "Jet lag o turnos de noche" },
      ]}
      desde={20}
      paso={40}
      color={C.amarillo}
      size={40}
    />
  </Pagina>
);

// ─── 7. Qué hacer ───────────────────────────────────────────────────────────
const QueHacer: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Si te <Resalta color={C.verde}>pasa</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🧘", texto: "Recordá: es el REM, va a pasar" },
        { emoji: "👣", texto: "Intentá mover un dedo o los ojos" },
        { emoji: "🌬️", texto: "Respirá lento, no pelees" },
        { emoji: "⏰", texto: "Dormí lo suficiente y en horario fijo" },
        { emoji: "👩‍⚕️", texto: "Si es muy seguido, consultá" },
      ]}
      desde={20}
      paso={45}
      color={C.verde}
      size={40}
    />
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Emoji e="🌙" size={130} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={80}>
        No hay nadie en tu cuarto. <Resalta color={C.violeta}>Es tu cerebro soñando despierto.</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={50}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: C.azul },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: C.oscuro, borderRadius: 999, padding: "12px 30px", fontFamily: SANS, fontSize: 40, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={40} />
            {b.t}
          </div>
        ))}
      </div>
    </Entra>
    <Entra desde={70}>
      <Texto size={28} color={C.texto2} peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "queEs", seg: 10, Escena: QueEs },
  { id: "rem", seg: 16, Escena: Rem },
  { id: "desfase", seg: 14, Escena: Desfase },
  { id: "sensaciones", seg: 20, Escena: Sensaciones },
  { id: "factores", seg: 10, Escena: Factores },
  { id: "queHacer", seg: 10, Escena: QueHacer },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_PARALISIS = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const ParalisisSueno: React.FC = () => (
  <ReelNoche
    paginas={PAGINAS}
    fps={FPS}
    // Música original, tono menor: scripts/musica_reel.py --paginas 5,10,16,14,20,10,10,5 --bpm 66 --transponer 2 --estilo suave --menor
    musica={staticFile("audio/paralisis-musica.mp3")}
  />
);

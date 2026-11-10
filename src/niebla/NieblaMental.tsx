// Reel de 90 s: niebla mental (brain fog), estilo calma.
import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";

const FPS = 30;
const GRIS = "#8a8fa6";

// ─── Niebla: manchas blancas borrosas que se mueven ────────────────────────
const Niebla: React.FC<{ densidad: number }> = ({ densidad }) => {
  const frame = useCurrentFrame();
  if (densidad <= 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 7 }).map((_, i) => {
        const x = ((i * 190 + frame * (0.6 + i * 0.15)) % 1500) - 300;
        const y = 250 + ((i * 173) % 1000);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 620, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.85)", filter: "blur(60px)", opacity: densidad }} />;
      })}
    </AbsoluteFill>
  );
};

// ─── Memoria de trabajo: una mesa con 4 lugares ────────────────────────────
const COSAS = ["📧", "📅", "🧮", "📝", "📱", "💬"];

const Mesa: React.FC<{ llegan: number; caen: boolean }> = ({ llegan, caen }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 900, height: 330 }}>
      {/* tabla */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 220, height: 30, borderRadius: 15, background: C.violeta }} />
      <div style={{ position: "absolute", left: 120, top: 250, width: 24, height: 80, background: C.violeta, borderRadius: 8 }} />
      <div style={{ position: "absolute", right: 120, top: 250, width: 24, height: 80, background: C.violeta, borderRadius: 8 }} />
      {COSAS.slice(0, llegan).map((e, i) => {
        const sobra = i >= 4;
        const x = sobra ? 150 + (i - 4) * 180 + 330 : 110 + i * 180;
        const cae = sobra && caen;
        const t = Math.max(0, (frame % 45) / 45);
        return (
          <div key={e} style={{ position: "absolute", left: x, top: cae ? 130 + t * 200 : sobra ? 20 : 110, transform: `rotate(${cae ? t * 120 : 0}deg)`, opacity: cae ? 1 - t : 1 }}>
            <Tarjeta color={sobra ? C.coral : C.violeta} style={{ width: 120, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Emoji e={e} size={66} />
            </Tarjeta>
          </div>
        );
      })}
    </div>
  );
};

// ─── Barra de concentración con notificaciones ─────────────────────────────
const Foco: React.FC = () => {
  const frame = useCurrentFrame();
  const ciclo = 110;
  const t = frame % ciclo;
  const nivel = interpolate(t, [0, 80, 84, ciclo], [0.1, 0.85, 0.05, 0.1], clamp);
  const noti = t >= 80 && t < 105;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: 920 }}>
      <div style={{ height: 120, display: "flex", alignItems: "center" }}>
        {noti && (
          <Tarjeta color={C.coral} style={{ padding: "14px 28px", display: "flex", alignItems: "center", gap: 14, transform: `scale(${interpolate(t, [80, 86], [0.6, 1], clamp)})` }}>
            <Emoji e="🔔" size={54} />
            <span style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: C.texto }}>Nuevo mensaje</span>
          </Tarjeta>
        )}
      </div>
      <Tarjeta color={C.azul} style={{ width: 920, padding: "18px 26px", display: "flex", alignItems: "center", gap: 20 }}>
        <Emoji e="🎯" size={56} />
        <span style={{ fontFamily: SANS, fontSize: 34, fontWeight: 700, color: C.texto, whiteSpace: "nowrap" }}>Concentración</span>
        <div style={{ flex: 1, height: 30, borderRadius: 15, background: "#e3e6f2" }}>
          <div style={{ width: `${nivel * 100}%`, height: "100%", borderRadius: 15, background: nivel > 0.4 ? C.verde : C.coral }} />
        </div>
      </Tarjeta>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const borroso = interpolate(frame, [20, 110], [0, 6], clamp);
  return (
    <>
      <Pagina gap={30} centro>
        <Entra desde={0}>
          <Emoji e="😶‍🌫️" size={140} />
        </Entra>
        <Entra desde={10}>
          <div style={{ filter: `blur(${borroso}px)` }}>
            <Titulo size={78}>Leés la misma línea tres veces… y no entendés nada.</Titulo>
          </div>
        </Entra>
      </Pagina>
      <Niebla densidad={interpolate(frame, [40, 120], [0, 0.6], clamp)} />
    </>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <>
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={84}>
          Es la <Resalta color={GRIS}>niebla mental</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={25}>
        <Texto size={38} color={C.texto2}>
          (en inglés, “brain fog”). No es una enfermedad: es un conjunto de síntomas.
        </Texto>
      </Entra>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: 920 }}>
        {[
          { e: "🐢", t: "Pensar más lento" },
          { e: "🎯", t: "No poder concentrarte" },
          { e: "❓", t: "Olvidos de cosas recientes" },
          { e: "🪨", t: "Cabeza pesada" },
        ].map((x, i) => (
          <Entra key={x.t} desde={70 + i * 35}>
            <Tarjeta color={GRIS} style={{ height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: 14 }}>
              <Emoji e={x.e} size={70} />
              <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto }}>{x.t}</div>
            </Tarjeta>
          </Entra>
        ))}
      </div>
    </Pagina>
    <Niebla densidad={0.35} />
  </>
);

// ─── 3. Memoria de trabajo ──────────────────────────────────────────────────
const Memoria: React.FC = () => {
  const frame = useCurrentFrame();
  const llegan = Math.min(6, Math.floor(interpolate(frame, [60, 300], [0, 6.99], clamp)));
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={78}>
          Tu memoria de trabajo es una <Resalta color={C.violeta}>mesa chica</Resalta>
        </Titulo>
      </Entra>
      <Mesa llegan={llegan} caen={frame > 320} />
      <Entra desde={60}>
        <Texto size={38}>
          Ahí tenés lo que estás pensando <b style={{ color: C.violeta }}>ahora</b>: entran pocas cosas a la vez, más o menos 4.
        </Texto>
      </Entra>
      <Entra desde={320}>
        <Texto size={38} color={C.coral}>
          Si la cargás de más, <b>algo se cae</b>. La maneja la corteza prefrontal, la parte de adelante del cerebro.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. El estrés ───────────────────────────────────────────────────────────
const Estres: React.FC = () => {
  const frame = useCurrentFrame();
  const cortisol = interpolate(frame, [60, 200], [0.2, 0.95], { ...clamp, easing: suave });
  return (
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={80}>
          😰 El <Resalta color={C.coral}>estrés</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={40}>
        <Tarjeta color={C.coral} style={{ width: 920, padding: "18px 26px", display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: C.texto, whiteSpace: "nowrap" }}>Cortisol</span>
          <div style={{ flex: 1, height: 30, borderRadius: 15, background: "#f3e3e0" }}>
            <div style={{ width: `${cortisol * 100}%`, height: "100%", borderRadius: 15, background: C.coral }} />
          </div>
        </Tarjeta>
      </Entra>
      <Entra desde={90}>
        <Texto size={40}>
          Con estrés sostenido, el cuerpo vive en <b style={{ color: C.coral }}>modo alarma</b>.
        </Texto>
      </Entra>
      <Entra desde={200}>
        <Texto size={40}>
          El cerebro prioriza sobrevivir y la corteza prefrontal (concentrarse, planificar, recordar) <b style={{ color: C.coral }}>funciona peor</b>.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. La falta de sueño ───────────────────────────────────────────────────
const Sueno: React.FC = () => {
  const frame = useCurrentFrame();
  const bateria = interpolate(frame, [40, 200], [1, 0.15], clamp);
  return (
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={80}>
          😴 Dormir <Resalta color={C.azul}>poco</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={30}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 360, height: 150, border: `10px solid ${C.texto}`, borderRadius: 30, padding: 10 }}>
            <div style={{ width: `${bateria * 100}%`, height: "100%", borderRadius: 14, background: bateria > 0.4 ? C.verde : C.coral }} />
          </div>
          <div style={{ width: 22, height: 60, background: C.texto, borderRadius: 6 }} />
        </div>
      </Entra>
      <Entra desde={90}>
        <Texto size={38}>
          Mientras dormís, el cerebro <b style={{ color: C.azul }}>guarda lo que aprendiste</b> y hace una <b style={{ color: C.azul }}>limpieza</b> de desechos.
        </Texto>
      </Entra>
      <Entra desde={230}>
        <Texto size={38} color={C.texto2}>
          Si no dormís, al otro día cuesta prestar atención y retener información nueva.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 6. Las pantallas ───────────────────────────────────────────────────────
const Pantallas: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        📱 Las <Resalta color={C.amarillo}>pantallas</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Foco />
    </Entra>
    <Entra desde={130}>
      <Texto size={38}>
        Cada notificación corta tu foco, y <b style={{ color: C.amarillo }}>volver a concentrarte lleva varios minutos</b>.
      </Texto>
    </Entra>
    <Entra desde={260}>
      <Texto size={36} color={C.texto2}>
        El cerebro no hace multitarea: salta de una cosa a otra, y cada salto lo cansa.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7. Otras causas ────────────────────────────────────────────────────────
const Otras: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={76}>
        También <Resalta color={C.verde}>influyen</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", width: 940 }}>
      {["💧 Tomar poca agua", "🍔 Comer mal", "🛋️ Moverte poco", "🩸 Anemia", "🦋 Tiroides", "🦠 Post-COVID", "🌧️ Ansiedad o depresión"].map((t, i) => (
        <Entra key={t} desde={20 + i * 12}>
          <Tarjeta color={C.verde} style={{ padding: "14px 24px", fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto }}>
            {t}
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

// ─── 8. Cómo despejarla ─────────────────────────────────────────────────────
const Despejar: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Pagina gap={16}>
        <Entra desde={0}>
          <Titulo size={78}>
            Cómo <Resalta color={C.verde}>despejarla</Resalta>
          </Titulo>
        </Entra>
        <Lista
          items={[
            { emoji: "😴", texto: "Dormí 7 a 9 horas" },
            { emoji: "⏱️", texto: "Bloques de 25 min sin celular" },
            { emoji: "🚶", texto: "Pausas cortas y moverte" },
            { emoji: "💧", texto: "Tomá agua" },
            { emoji: "☝️", texto: "Una tarea a la vez" },
          ]}
          desde={20}
          paso={40}
          color={C.verde}
          size={38}
        />
      </Pagina>
      <Niebla densidad={interpolate(frame, [0, 150], [0.4, 0], clamp)} />
    </>
  );
};

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Emoji e="☀️" size={120} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={74}>
        Si la niebla dura semanas, <Resalta color={C.violeta}>consultá</Resalta>.
      </Titulo>
    </Entra>
    <Entra desde={45}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: C.violeta },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: "#fff", borderRadius: 999, padding: "14px 34px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={42} />
            {b.t}
          </div>
        ))}
      </div>
    </Entra>
    <Entra desde={65}>
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
  { id: "memoria", seg: 14, Escena: Memoria },
  { id: "estres", seg: 13, Escena: Estres },
  { id: "sueno", seg: 13, Escena: Sueno },
  { id: "pantallas", seg: 13, Escena: Pantallas },
  { id: "otras", seg: 7, Escena: Otras },
  { id: "despejar", seg: 10, Escena: Despejar },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_NIEBLA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const NieblaMental: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS}
    fps={FPS}
    // Música original suave: scripts/musica_reel.py --paginas 5,10,14,13,13,13,7,10,5 --bpm 88 --transponer 3 --estilo suave
    musica={staticFile("audio/niebla-musica.mp3")}
  />
);

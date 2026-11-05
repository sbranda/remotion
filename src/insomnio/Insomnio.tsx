import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { CONSULTAR, EMPEORA, FORMAS, FPS, HABITOS, PAGINAS, PaginaId } from "./datos";

// ─── 1. Gancho: las 3 de la mañana y las ovejas ─────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const dosPuntos = Math.floor(frame / 15) % 2 === 0;
  const SALTO = 30; // una oveja por segundo
  const ovejas = Math.floor(frame / SALTO) + 1;
  const t = (frame % SALTO) / SALTO;
  return (
    <Pagina gap={26} centro>
      <Tarjeta color={C.violeta} style={{ padding: "16px 50px", background: "#1d1b3a" }}>
        <div style={{ fontFamily: SANS, fontSize: 150, fontWeight: 800, color: "#ff8a7a", letterSpacing: 4, fontVariantNumeric: "tabular-nums" }}>
          03<span style={{ opacity: dosPuntos ? 1 : 0.2 }}>:</span>00
        </div>
      </Tarjeta>
      <div style={{ position: "relative", width: 800, height: 230 }}>
        {/* valla */}
        <div style={{ position: "absolute", left: 370, bottom: 0, width: 60, height: 90, borderLeft: `8px solid ${C.texto2}`, borderRight: `8px solid ${C.texto2}` }}>
          <div style={{ marginTop: 20, height: 8, background: C.texto2 }} />
          <div style={{ marginTop: 22, height: 8, background: C.texto2 }} />
        </div>
        <div style={{ position: "absolute", left: 40 + 640 * t, bottom: 10 + Math.sin(t * Math.PI) * 150 }}>
          <Emoji e="🐑" size={100} />
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, fontFamily: SANS, fontSize: 40, fontWeight: 800, color: C.texto2 }}>
          {ovejas} 🐑
        </div>
      </div>
      <Entra desde={6}>
        <Titulo size={80}>¿Son las 3 de la mañana y seguís mirando el techo? 👀</Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo>
        ¿Qué es el <Resalta>insomnio</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Texto size={44}>Dormir mal de alguna de estas formas:</Texto>
    </Entra>
    <Lista items={FORMAS} desde={45} paso={60} />
    <Entra desde={260}>
      <Texto size={40}>
        …y al otro día estás <b style={{ color: C.coral }}>cansado, irritable o sin concentración</b>.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. Cuántas horas ───────────────────────────────────────────────────────
const Horas: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [30, 110], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={34} centro>
      <Entra desde={0}>
        <Titulo size={88}>
          ¿Cuánto hay que <Resalta color={C.azul}>dormir</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <div style={{ fontFamily: SANS, fontSize: 170, fontWeight: 800, color: C.azul, lineHeight: 1 }}>7 a 9 h</div>
      </Entra>
      <div style={{ width: 880, height: 46, borderRadius: 23, background: "rgba(255,255,255,0.6)", overflow: "hidden" }}>
        <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 23, background: `linear-gradient(90deg, ${C.violeta}, ${C.azul})` }} />
      </div>
      <Entra desde={120}>
        <Texto size={40} color={C.texto2}>
          Para la mayoría de los adultos. Cada persona tiene su número.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. Qué lo empeora ──────────────────────────────────────────────────────
const Empeora: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Qué lo <Resalta color={C.coral}>empeora</Resalta>?
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 296px)", gap: 20 }}>
      {EMPEORA.map((s, i) => (
        <Entra key={s.texto} desde={30 + i * 40}>
          <Tarjeta color={C.coral} style={{ height: 240, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center" }}>
            <Emoji e={s.emoji} size={80} />
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={300}>
      <Texto size={36} color={C.texto2}>
        Ojo: el mate también tiene cafeína 🧉
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 5. Hábitos ─────────────────────────────────────────────────────────────
const Habitos: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        Hábitos para <Resalta color={C.verde}>dormir mejor</Resalta>
      </Titulo>
    </Entra>
    <Lista items={HABITOS} desde={30} paso={100} color={C.verde} size={38} />
  </Pagina>
);

// ─── 6. La regla de los 20 minutos ──────────────────────────────────────────
const Regla20: React.FC = () => {
  const frame = useCurrentFrame();
  const minutos = Math.floor(interpolate(frame, [20, 110], [0, 20], clamp));
  const aro = interpolate(frame, [20, 110], [0, 1], clamp);
  const fase = frame < 115 ? 0 : frame < 200 ? 1 : 2;
  const escena = ["🛏️😳", "🛋️📖", "🛏️😴"][fase];
  const texto = ["¿No te dormís en unos 20 minutos?", "Levantate y hacé algo tranquilo, con poca luz", "Volvé a la cama cuando tengas sueño"][fase];
  return (
    <Pagina gap={26} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          La regla de los <Resalta color={C.azul}>20 minutos</Resalta>
        </Titulo>
      </Entra>
      <div style={{ position: "relative", width: 300, height: 300 }}>
        <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: "absolute", inset: 0 }}>
          <circle cx={150} cy={150} r={130} stroke="rgba(255,255,255,0.7)" strokeWidth={18} fill="none" />
          <circle cx={150} cy={150} r={130} stroke={C.azul} strokeWidth={18} fill="none" strokeLinecap="round" strokeDasharray={817} strokeDashoffset={817 * (1 - aro)} transform="rotate(-90 150 150)" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 90, fontWeight: 800, color: C.azul }}>
          {minutos}′
        </div>
      </div>
      <div key={fase} style={{ textAlign: "center" }}>
        <Entra desde={[0, 115, 200][fase]}>
          <Emoji e={escena} size={110} />
          <Texto size={46}>{texto}</Texto>
        </Entra>
      </div>
    </Pagina>
  );
};

// ─── 7. Cuándo consultar ────────────────────────────────────────────────────
const Consultar: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Cuándo <Resalta color={C.coral}>consultar</Resalta>?
      </Titulo>
    </Entra>
    <Lista items={CONSULTAR} desde={25} paso={60} color={C.coral} size={38} />
    <Entra desde={220}>
      <Tarjeta color={C.verde} style={{ width: 920, padding: "18px 28px" }}>
        <Texto size={36}>
          La <b style={{ color: C.verde }}>terapia para el insomnio</b> funciona muy bien. Y no tomes pastillas para dormir sin indicación médica 💊
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const z = (frame / 3) % 60;
  return (
    <Pagina gap={30} centro>
      <div style={{ position: "relative" }}>
        <Entra desde={0}>
          <Emoji e="😴" size={150} />
        </Entra>
        <div style={{ position: "absolute", right: -50, top: -20 - z, opacity: 1 - z / 60, fontFamily: SANS, fontSize: 60, fontWeight: 800, color: C.violeta }}>z</div>
      </div>
      <Entra desde={10}>
        <Titulo size={84}>
          Dormir bien también es <Resalta color={C.verde}>salud</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={50}>
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
      <Entra desde={75}>
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
  horas: Horas,
  empeora: Empeora,
  habitos: Habitos,
  regla20: Regla20,
  consultar: Consultar,
  cierre: Cierre,
};

export const Insomnio: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 4,12,8,14,22,10,12,8 --bpm 66 --transponer -4 --estilo suave
    musica={staticFile("audio/insomnio-musica.mp3")}
  />
);

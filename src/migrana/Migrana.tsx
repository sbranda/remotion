import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp } from "../salud/calma";
import { ALARMAS, AYUDA, DESENCADENANTES, FPS, PAGINAS, PaginaId, SINTOMAS } from "./datos";

/** Grilla de tarjetas con emoji (3 columnas) */
const Grilla: React.FC<{ items: { emoji: string; texto: string }[]; desde: number; paso: number; color: string }> = ({ items, desde, paso, color }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 296px)", gap: 20 }}>
    {items.map((s, i) => (
      <Entra key={s.texto} desde={desde + i * paso}>
        <Tarjeta color={color} style={{ height: 230, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center" }}>
          <Emoji e={s.emoji} size={76} />
          <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.texto}</div>
        </Tarjeta>
      </Entra>
    ))}
  </div>
);

// ─── 1. Gancho: la cabeza que late, despacio ────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const late = Math.pow(Math.max(0, Math.sin((frame / 22) * Math.PI)), 4);
  return (
    <Pagina gap={30} centro>
      <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 15) % 45) / 45;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 220 + 200 * t,
                height: 220 + 200 * t,
                borderRadius: "50%",
                border: `5px solid ${C.violeta}`,
                opacity: (1 - t) * 0.6,
              }}
            />
          );
        })}
        <div style={{ transform: `scale(${1 + 0.08 * late})` }}>
          <Emoji e="🤕" size={190} />
        </div>
      </div>
      <Entra desde={8}>
        <Titulo size={78}>¿Te duele tanto la cabeza que hasta la luz te molesta?</Titulo>
      </Entra>
      <Entra desde={60}>
        <Titulo size={90}>
          Puede ser <Resalta>migraña</Resalta>
        </Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={30}>
    <Entra desde={0}>
      <Titulo size={90}>
        ¿Qué es la <Resalta>migraña</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={25}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={44}>
          <b style={{ color: C.violeta }}>No es un dolor de cabeza común:</b> es una enfermedad neurológica que da crisis de dolor.
        </Texto>
      </Tarjeta>
    </Entra>
    <div style={{ display: "flex", gap: 24 }}>
      <Entra desde={130}>
        <Tarjeta color={C.azul} style={{ width: 448, height: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16 }}>
          <div style={{ fontFamily: SANS, fontSize: 84, fontWeight: 800, color: C.azul }}>4 a 72 h</div>
          <Texto size={32}>puede durar una crisis sin tratamiento</Texto>
        </Tarjeta>
      </Entra>
      <Entra desde={200}>
        <Tarjeta color={C.coral} style={{ width: 448, height: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16 }}>
          <div style={{ fontFamily: SANS, fontSize: 84, fontWeight: 800, color: C.coral }}>👩 × 3</div>
          <Texto size={32}>es unas 3 veces más común en mujeres</Texto>
        </Tarjeta>
      </Entra>
    </div>
  </Pagina>
);

// ─── 3. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={90}>
        ¿Cómo se <Resalta color={C.coral}>siente</Resalta>?
      </Titulo>
    </Entra>
    <Grilla items={SINTOMAS} desde={30} paso={35} color={C.violeta} />
  </Pagina>
);

// ─── 4. El aura: zigzag de luz suave que crece despacio ─────────────────────
const Zigzag: React.FC<{ desde: number }> = ({ desde }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - desde);
  const crece = interpolate(t, [0, 220], [0.35, 1], clamp);
  const puntos = 22;
  const R = 230 * crece;
  const r = R - 36;
  const d = Array.from({ length: puntos + 1 })
    .map((_, i) => {
      const a = (-100 + (200 * i) / puntos) * (Math.PI / 180) - Math.PI / 2 + t / 150;
      const rr = i % 2 ? r : R;
      return `${i ? "L" : "M"}${(300 + Math.cos(a) * rr).toFixed(1)} ${(260 + Math.sin(a) * rr).toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={600} height={520} viewBox="0 0 600 520">
      <defs>
        <linearGradient id="aura-calma" x1="0" x2="1">
          <stop offset="0" stopColor={C.azul} />
          <stop offset="0.5" stopColor={C.violeta} />
          <stop offset="1" stopColor={C.coral} />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#aura-calma)" strokeWidth={10} strokeLinejoin="round" opacity={0.85} />
      <circle cx={300} cy={260} r={10} fill={C.texto2} opacity={0.5} />
    </svg>
  );
};

const Aura: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={90}>
        El <Resalta color={C.azul}>aura</Resalta> ✨
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Texto size={44}>Algunas personas, antes del dolor, ven luces, zigzags o manchas.</Texto>
    </Entra>
    <Entra desde={40}>
      <Zigzag desde={40} />
    </Entra>
    <Entra desde={230}>
      <Texto size={38} color={C.texto2}>
        Suele durar menos de una hora. También puede dar hormigueo.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 5. Desencadenantes ─────────────────────────────────────────────────────
const Desencadenantes: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Qué la <Resalta color={C.coral}>dispara</Resalta>?
      </Titulo>
    </Entra>
    <Grilla items={DESENCADENANTES} desde={30} paso={35} color={C.coral} />
    <Entra desde={290}>
      <Texto size={38} color={C.texto2}>
        Cada persona tiene los suyos.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 6. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={90}>
        Qué <Resalta color={C.verde}>ayuda</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDA} desde={28} paso={55} color={C.verde} size={40} />
    <Entra desde={280}>
      <Tarjeta color={C.amarillo} style={{ width: 920, padding: "18px 28px", display: "flex", alignItems: "center", gap: 20, background: "#fff4e6" }}>
        <Emoji e="⚠️" size={60} />
        <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto, lineHeight: 1.25 }}>
          Tomar analgésicos muchos días al mes puede empeorar los dolores. Consultá.
        </div>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 7. Señales de alarma ───────────────────────────────────────────────────
const Alarmas: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        🚨 <Resalta color={C.coral}>Urgente</Resalta> si el dolor es…
      </Titulo>
    </Entra>
    <Lista items={ALARMAS} desde={28} paso={55} color={C.coral} size={40} />
    <Entra desde={280}>
      <div style={{ width: 920, background: C.coral, borderRadius: 36, padding: "18px 30px", fontFamily: SANS, fontSize: 50, fontWeight: 800, color: C.blanco, textAlign: "center" }}>
        Llamá al 107 o al 911
      </div>
    </Entra>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={36} centro>
    <Entra desde={0}>
      <Emoji e="🧠" size={140} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={84}>
        La migraña <Resalta color={C.verde}>tiene tratamiento</Resalta>: consultá a un neurólogo
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

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  sintomas: Sintomas,
  aura: Aura,
  desencadenantes: Desencadenantes,
  ayuda: Ayuda,
  alarmas: Alarmas,
  cierre: Cierre,
};

export const Migrana: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 4,12,12,12,14,14,14,8 --bpm 74 --transponer 6 --estilo suave
    musica={staticFile("audio/migrana-musica.mp3")}
  />
);

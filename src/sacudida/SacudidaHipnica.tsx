// Reel de 90 s: la sacudida al dormir (mioclonía hípnica), estilo noche.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelNoche, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/noche";

const FPS = 30;

/** Sacudida corta a partir de `desde` */
const sacudida = (frame: number, desde: number, fuerza = 18, dur = 16) => {
  const t = frame - desde;
  if (t < 0 || t > dur) return 0;
  return Math.sin(t * 2.4) * fuerza * (1 - t / dur);
};

// ─── Persona que cae al vacío ───────────────────────────────────────────────
const Caida: React.FC<{ desdeSalto: number }> = ({ desdeSalto }) => {
  const frame = useCurrentFrame();
  const cayendo = frame < desdeSalto;
  const dx = sacudida(frame, desdeSalto, 26, 20);
  const flota = cayendo ? Math.sin(frame / 8) * 10 : 0;
  return (
    <svg width={900} height={520} viewBox="0 0 900 520" style={{ overflow: "visible" }}>
      {/* líneas de velocidad que suben */}
      {cayendo &&
        Array.from({ length: 12 }).map((_, i) => {
          const x = 60 + ((i * 137) % 780);
          const y = 520 - ((frame * 14 + i * 61) % 600);
          return <line key={i} x1={x} y1={y} x2={x} y2={y + 70} stroke={C.texto2} strokeWidth={5} strokeLinecap="round" opacity={0.5} />;
        })}
      {/* estrellas que pasan */}
      {cayendo &&
        Array.from({ length: 8 }).map((_, i) => {
          const x = 90 + ((i * 211) % 720);
          const y = 520 - ((frame * 9 + i * 83) % 600);
          return (
            <text key={`e${i}`} x={x} y={y} fontSize={34} opacity={0.8}>
              ✦
            </text>
          );
        })}
      {/* persona acostada con almohada */}
      <g transform={`translate(${450 + dx} ${250 + flota}) rotate(${cayendo ? Math.sin(frame / 10) * 8 : dx * 0.6})`}>
        <ellipse cx={-170} cy={8} rx={70} ry={26} fill="#e8e6ff" />
        <circle cx={-150} cy={-20} r={40} fill="#f2c7a5" />
        {/* ojos: cerrados al caer, bien abiertos al saltar */}
        {cayendo ? (
          <>
            <path d="M-166 -24 q8 6 16 0" stroke="#3b2416" strokeWidth={4} fill="none" />
            <path d="M-140 -24 q8 6 16 0" stroke="#3b2416" strokeWidth={4} fill="none" />
          </>
        ) : (
          <>
            <circle cx={-158} cy={-24} r={9} fill="#fff" />
            <circle cx={-132} cy={-24} r={9} fill="#fff" />
            <circle cx={-158} cy={-24} r={4} fill="#111" />
            <circle cx={-132} cy={-24} r={4} fill="#111" />
            <ellipse cx={-145} cy={-2} rx={7} ry={9} fill="#5a2a2a" />
          </>
        )}
        <rect x={-110} y={-40} width={300} height={70} rx={34} fill="#6c5ce7" />
        {/* brazos y piernas: estirados cuando salta */}
        <path d={cayendo ? "M-60 25 q20 30 50 30" : "M-60 -30 l-20 -70"} stroke="#f2c7a5" strokeWidth={18} strokeLinecap="round" fill="none" />
        <path d={cayendo ? "M190 -5 l70 10" : "M190 -10 l80 -50"} stroke="#3a2f6b" strokeWidth={22} strokeLinecap="round" fill="none" />
        <path d={cayendo ? "M190 15 l70 15" : "M190 15 l85 40"} stroke="#3a2f6b" strokeWidth={22} strokeLinecap="round" fill="none" />
      </g>
      {!cayendo && (
        <text x={450} y={140} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={110} fill={C.amarillo} style={{ filter: `drop-shadow(0 0 20px ${C.amarillo})` }} transform={`rotate(-6 450 140)`}>
          ¡ZAS!
        </text>
      )}
    </svg>
  );
};

// ─── Interruptor despierto → dormido que tironea ───────────────────────────
const Interruptor: React.FC<{ p: number }> = ({ p }) => {
  const frame = useCurrentFrame();
  const tirón = Math.sin(frame / 5) * 30;
  const x = 12 + p * 640 + tirón * (1 - Math.abs(p - 0.5));
  return (
    <div style={{ width: 900, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontWeight: 800, fontSize: 38 }}>
        <span style={{ color: C.amarillo }}>☀️ Despierto</span>
        <span style={{ color: C.violeta }}>Dormido 🌙</span>
      </div>
      <div style={{ position: "relative", height: 100, borderRadius: 50, background: `linear-gradient(90deg, ${C.amarillo}55, ${C.violeta}88)`, border: `4px solid ${C.texto2}` }}>
        <div style={{ position: "absolute", top: 8, left: x, width: 230, height: 76, borderRadius: 38, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: SANS, fontWeight: 800, fontSize: 30, whiteSpace: "nowrap", color: C.oscuro }}>
          🧠 {p < 0.5 ? "despierto" : "apagando"}
        </div>
      </div>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const dx = sacudida(frame, 70, 30, 20);
  return (
    <Pagina gap={30} centro>
      <div style={{ transform: `translateX(${dx}px)` }}>
        <Entra desde={0}>
          <Emoji e={frame < 70 ? "😴" : "😳"} size={150} />
        </Entra>
      </div>
      <Entra desde={10}>
        <Titulo size={78}>Te estás quedando dormido…</Titulo>
      </Entra>
      <div style={{ transform: `translateX(${dx}px)` }}>
        <Entra desde={60}>
          <Titulo size={96} color={C.coral}>
            ¡y caés al vacío!
          </Titulo>
        </Entra>
      </div>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={80}>
        Se llama <Resalta color={C.violeta}>mioclonía hípnica</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Texto size={36} color={C.texto2}>
        (o “sacudida hípnica”; en inglés, <i>hypnic jerk</i>)
      </Texto>
    </Entra>
    <Entra desde={70}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "20px 28px" }}>
        <Texto size={42}>
          Una contracción <b style={{ color: C.amarillo }}>breve e involuntaria</b> de los músculos justo cuando te estás durmiendo.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={200}>
      <Texto size={44}>
        La viven <b style={{ color: C.verde }}>7 de cada 10 personas</b>. Sí: es normal. 🙌
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. La transición ───────────────────────────────────────────────────────
const Transicion: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [60, 330], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Titulo size={78}>
          Dormirse no es <Resalta color={C.amarillo}>apagar un botón</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={40}>
        <Interruptor p={p} />
      </Entra>
      <Entra desde={90}>
        <Texto size={40}>
          Hay sistemas del cerebro que te mantienen <b style={{ color: C.amarillo }}>despierto</b> y otros que te <b style={{ color: C.violeta }}>apagan</b>.
        </Texto>
      </Entra>
      <Entra desde={230}>
        <Texto size={38} color={C.texto2}>
          Al dormirte, “tironean” un rato hasta que gana el sueño.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. ¡Nos caemos! ────────────────────────────────────────────────────────
const NosCaemos: React.FC = () => {
  const frame = useCurrentFrame();
  const SALTO = 300;
  return (
    <Pagina gap={18}>
      <Entra desde={0}>
        <Titulo size={74}>
          El cerebro <Resalta color={C.coral}>se confunde</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={10}>
        <Caida desdeSalto={SALTO} />
      </Entra>
      {frame < 170 ? (
        <Entra desde={40}>
          <Texto size={40}>
            Los músculos se relajan de golpe, y bajan el pulso y la respiración…
          </Texto>
        </Entra>
      ) : frame < SALTO ? (
        <Entra desde={170}>
          <Tarjeta color={C.coral} style={{ width: 920, padding: "16px 26px" }}>
            <Texto size={42}>
              🧠 <b style={{ color: C.coral }}>“¡Nos caemos!”</b> El cerebro interpreta esa relajación como una caída…
            </Texto>
          </Tarjeta>
        </Entra>
      ) : (
        <Entra desde={SALTO}>
          <Texto size={40}>
            …y manda una orden urgente a los músculos para “probar” si responden: <b style={{ color: C.amarillo }}>¡la sacudida!</b>
          </Texto>
        </Entra>
      )}
    </Pagina>
  );
};

// ─── 5. El mini-sueño ───────────────────────────────────────────────────────
const MiniSueno: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={76}>
        Por eso a veces <Resalta color={C.azul}>soñás que te caés</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "flex", gap: 22 }}>
      {[
        { e: "🪜", t: "Un escalón que no está" },
        { e: "🦶", t: "Un tropezón" },
        { e: "🕳️", t: "Un pozo" },
      ].map((x, i) => (
        <Entra key={x.t} desde={40 + i * 30}>
          <Tarjeta color={C.azul} style={{ width: 290, height: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: 14 }}>
            <Emoji e={x.e} size={80} />
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto }}>{x.t}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={150}>
      <Texto size={36} color={C.texto2}>
        Una teoría: viene de nuestros antepasados que dormían en los árboles. Un reflejo para agarrarse y no caer. 🐒
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 6. Qué la hace más frecuente ───────────────────────────────────────────
const Factores: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={76}>
        Aparece <Resalta color={C.amarillo}>más seguido</Resalta> con
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "☕", texto: "Café o energizantes a la tarde" },
        { emoji: "😰", texto: "Estrés y ansiedad" },
        { emoji: "🥱", texto: "Dormir poco o estar agotado" },
        { emoji: "🏋️", texto: "Ejercicio intenso a la noche" },
        { emoji: "🚬", texto: "Nicotina" },
      ]}
      desde={20}
      paso={40}
      color={C.amarillo}
      size={38}
    />
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={76}>
        Para dormirte <Resalta color={C.verde}>más suave</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🕑", texto: "Último café antes de las 14 h" },
        { emoji: "🌬️", texto: "Respiración lenta al acostarte" },
        { emoji: "🛁", texto: "Rutina tranquila antes de dormir" },
        { emoji: "⏰", texto: "Horarios de sueño regulares" },
      ]}
      desde={20}
      paso={45}
      color={C.verde}
      size={38}
    />
  </Pagina>
);

// ─── 8. Cuándo consultar ────────────────────────────────────────────────────
const Consultar: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={74}>
        Es inofensiva… <Resalta color={C.coral}>salvo que</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🔁", texto: "Pase muchas veces cada noche" },
        { emoji: "😣", texto: "No te deje dormir" },
        { emoji: "☀️", texto: "Tengas sacudidas también de día" },
      ]}
      desde={20}
      paso={40}
      color={C.coral}
      size={38}
    />
    <Entra desde={150}>
      <Texto size={34} color={C.texto2}>
        En esos casos, consultá con tu médico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Titulo size={74}>
        No te caíste: <Resalta color={C.violeta}>tu cerebro chequeó que estés bien</Resalta> 😌
      </Titulo>
    </Entra>
    <Entra desde={45}>
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
  { id: "queEs", seg: 12, Escena: QueEs },
  { id: "transicion", seg: 13, Escena: Transicion },
  { id: "nosCaemos", seg: 18, Escena: NosCaemos },
  { id: "miniSueno", seg: 8, Escena: MiniSueno },
  { id: "factores", seg: 11, Escena: Factores },
  { id: "ayuda", seg: 10, Escena: Ayuda },
  { id: "consultar", seg: 8, Escena: Consultar },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_SACUDIDA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const SacudidaHipnica: React.FC = () => (
  <ReelNoche
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,13,18,8,11,10,8,5 --bpm 76 --transponer 3 --estilo suave
    musica={staticFile("audio/sacudida-musica.mp3")}
  />
);

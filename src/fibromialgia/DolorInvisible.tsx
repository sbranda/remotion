// Reel de 90 s: fibromialgia y el "dolor invisible" (neurología y empatía), estilo noche.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelNoche, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/noche";

const FPS = 30;

// ─── Alarma demasiado sensible: una tostada hace sonar todo ────────────────
const Alarma: React.FC<{ suena: number }> = ({ suena }) => {
  const frame = useCurrentFrame();
  const sac = suena * Math.sin(frame / 1.5) * 8;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 60, height: 260 }}>
      <div style={{ position: "relative" }}>
        <Emoji e="🍞" size={130} />
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 15) % 45) / 45;
          return <div key={i} style={{ position: "absolute", left: 40 + i * 20, top: -20 - t * 90, width: 36, height: 36, borderRadius: "50%", background: "#c9c9d6", opacity: 0.6 * (1 - t), filter: "blur(4px)" }} />;
        })}
        <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 700, color: C.texto2, textAlign: "center" }}>un poco de humo</div>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 70, color: C.texto2 }}>→</div>
      <div style={{ position: "relative", transform: `rotate(${sac}deg) scale(${1 + 0.08 * suena})` }}>
        {suena > 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: 65, top: 65, width: 40, height: 6, background: C.coral, borderRadius: 3, transformOrigin: "0 50%", transform: `rotate(${i * 45}deg) translateX(${78 + 8 * Math.sin(frame / 3)}px)`, opacity: suena }} />
          ))}
        <Emoji e="🚨" size={130} />
        <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 800, color: C.coral, textAlign: "center", opacity: suena }}>¡INCENDIO!</div>
      </div>
    </div>
  );
};

// ─── Amplificador de señales nerviosas ─────────────────────────────────────
const Amplificador: React.FC<{ ganancia: number }> = ({ ganancia }) => {
  const frame = useCurrentFrame();
  const onda = (x0: number, amp: number, color: string, ancho: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= ancho; x += 6) pts.push(`${x === 0 ? "M" : "L"}${x0 + x} ${110 + amp * Math.sin((x + frame * 6) / 18)}`);
    return <path d={pts.join(" ")} stroke={color} strokeWidth={6} fill="none" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />;
  };
  return (
    <svg width={900} height={260} viewBox="0 0 900 260" style={{ overflow: "visible" }}>
      {onda(0, 12, C.azul, 260)}
      <rect x={300} y={40} width={260} height={140} rx={24} fill="#1b2350" stroke={C.violeta} strokeWidth={5} />
      <text x={430} y={100} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.texto}>
        Sistema
      </text>
      <text x={430} y={138} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.texto}>
        nervioso
      </text>
      <circle cx={430} cy={210} r={26} fill="#1b2350" stroke={C.violeta} strokeWidth={4} />
      <line x1={430} y1={210} x2={430 + 20 * Math.cos(Math.PI * (0.8 + 1.4 * ganancia))} y2={210 + 20 * Math.sin(Math.PI * (0.8 + 1.4 * ganancia))} stroke={C.coral} strokeWidth={6} strokeLinecap="round" />
      {onda(600, 12 + 80 * ganancia, ganancia > 0.5 ? C.coral : C.azul, 300)}
      <text x={130} y={240} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.texto2}>
        roce suave
      </text>
      <text x={750} y={250} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={ganancia > 0.5 ? C.coral : C.texto2}>
        {ganancia > 0.5 ? "¡DOLOR!" : "roce"}
      </text>
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0}>
      <Emoji e="🫥" size={140} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={84}>Te duele todo… y los análisis salen perfectos.</Titulo>
    </Entra>
  </Pagina>
);

// ─── 2. Dolor invisible ─────────────────────────────────────────────────────
const Invisible: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={84}>
        El <Resalta color={C.violeta}>dolor invisible</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "20px 28px" }}>
        <Texto size={42}>
          La <b style={{ color: C.violeta }}>fibromialgia</b> causa dolor en todo el cuerpo, pero <b style={{ color: C.coral }}>no aparece</b> en radiografías ni en análisis.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={150}>
      <Texto size={44}>
        Que no se vea <b style={{ color: C.amarillo }}>no significa que no sea real</b>.
      </Texto>
    </Entra>
    <Entra desde={220}>
      <Texto size={34} color={C.texto2}>
        La tiene entre 2 y 4 de cada 100 personas, la mayoría mujeres.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. Una alarma demasiado sensible ──────────────────────────────────────
const Sensible: React.FC = () => {
  const frame = useCurrentFrame();
  const suena = interpolate(frame, [90, 100], [0, 1], clamp);
  const ganancia = interpolate(frame, [300, 360], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={76}>
          Una alarma <Resalta color={C.coral}>demasiado sensible</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <Alarma suena={suena} />
      </Entra>
      <Entra desde={110}>
        <Texto size={38}>
          Es como una alarma de incendio que suena a todo volumen por el humo de una tostada.
        </Texto>
      </Entra>
      <Entra desde={250}>
        <Amplificador ganancia={ganancia} />
      </Entra>
      <Entra desde={300}>
        <Texto size={36} color={C.texto2}>
          La médula y el cerebro <b style={{ color: C.coral }}>amplifican</b> las señales: se llama <b style={{ color: C.violeta }}>sensibilización central</b>.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. El cerebro lo muestra ───────────────────────────────────────────────
const Cerebro: React.FC = () => {
  const frame = useCurrentFrame();
  const brillo = interpolate(frame, [60, 120], [0, 1], clamp);
  const cabeza = (fuerte: boolean, titulo: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 420 }}>
      <div style={{ position: "relative", width: 220, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: fuerte ? -30 : 50, borderRadius: "50%", background: `radial-gradient(circle, ${fuerte ? C.coral : C.amarillo}cc 0%, transparent 70%)`, opacity: brillo * (0.7 + 0.3 * Math.sin(frame / 6)) }} />
        <Emoji e="🧠" size={150} />
      </div>
      <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: fuerte ? C.coral : C.texto, textAlign: "center" }}>{titulo}</div>
    </div>
  );
  return (
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={76}>
          Y el cerebro <Resalta color={C.amarillo}>lo muestra</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={25}>
        <Texto size={36} color={C.texto2}>
          Mismo toque suave, en resonancia magnética:
        </Texto>
      </Entra>
      <Entra desde={50}>
        <div style={{ display: "flex", gap: 40 }}>
          {cabeza(false, "Sin fibromialgia")}
          {cabeza(true, "Con fibromialgia")}
        </div>
      </Entra>
      <Entra desde={170}>
        <Texto size={38}>
          Las zonas del dolor se activan <b style={{ color: C.coral }}>mucho más</b>. No es imaginación: es cómo el sistema nervioso procesa las señales.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Lo que tampoco se ve ────────────────────────────────────────────────
const Mas: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={76}>
        Lo que <Resalta color={C.azul}>tampoco se ve</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🪫", texto: "Cansancio que no se va durmiendo" },
        { emoji: "😴", texto: "Sueño que no descansa" },
        { emoji: "🌫️", texto: "“Fibroniebla”: olvidos y poca concentración" },
        { emoji: "🔊", texto: "Molestia con ruidos, luces o frío" },
      ]}
      desde={25}
      paso={55}
      color={C.azul}
      size={38}
    />
  </Pagina>
);

// ─── 6. Empatía: frases ─────────────────────────────────────────────────────
const FRASES = [
  { mal: "“Es todo psicológico”", bien: "“Te creo”" },
  { mal: "“Pero si no tenés nada”", bien: "“¿Qué necesitás hoy?”" },
  { mal: "“Yo también estoy cansado”", bien: "“Si hoy no podés, está bien”" },
];

const Empatia: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={76}>
          Lo que <Resalta color={C.coral}>duele</Resalta> escuchar… y lo que <Resalta color={C.verde}>ayuda</Resalta>
        </Titulo>
      </Entra>
      {FRASES.map((f, i) => {
        const d = 40 + i * 140;
        const cambia = interpolate(frame, [d + 60, d + 80], [0, 1], clamp);
        return (
          <Entra key={f.mal} desde={d}>
            <Tarjeta color={cambia > 0.5 ? C.verde : C.coral} style={{ width: 920, padding: "18px 26px", display: "flex", alignItems: "center", gap: 20 }}>
              <Emoji e={cambia > 0.5 ? "💚" : "🚫"} size={60} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto2, textDecoration: cambia > 0 ? "line-through" : "none", textDecorationColor: C.coral, textDecorationThickness: 4 }}>{f.mal}</div>
                <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: C.verde, opacity: cambia, marginTop: 4 }}>{f.bien}</div>
              </div>
            </Tarjeta>
          </Entra>
        );
      })}
    </Pagina>
  );
};

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={76}>
        Qué <Resalta color={C.verde}>ayuda</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🚶‍♀️", texto: "Ejercicio suave y gradual: el más estudiado" },
        { emoji: "🧠", texto: "Entender cómo funciona el dolor" },
        { emoji: "💬", texto: "Terapia psicológica para manejarlo" },
        { emoji: "😴", texto: "Cuidar el sueño" },
        { emoji: "💊", texto: "Medicación, si tu médico la indica" },
      ]}
      desde={20}
      paso={40}
      color={C.verde}
      size={36}
    />
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Emoji e="💜" size={120} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={78}>
        Que no se vea <Resalta color={C.violeta}>no significa que no exista</Resalta>.
      </Titulo>
    </Entra>
    <Entra desde={50}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: C.violeta },
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
  { id: "invisible", seg: 10, Escena: Invisible },
  { id: "sensible", seg: 16, Escena: Sensible },
  { id: "cerebro", seg: 12, Escena: Cerebro },
  { id: "mas", seg: 12, Escena: Mas },
  { id: "empatia", seg: 18, Escena: Empatia },
  { id: "ayuda", seg: 11, Escena: Ayuda },
  { id: "cierre", seg: 6, Escena: Cierre },
];

export const DURACION_DOLOR_INVISIBLE = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const DolorInvisible: React.FC = () => (
  <ReelNoche
    paginas={PAGINAS}
    fps={FPS}
    // Música original suave en tono menor: scripts/musica_reel.py --paginas 5,10,16,12,12,18,11,6 --bpm 72 --transponer 7 --estilo suave --menor
    musica={staticFile("audio/dolor-invisible-musica.mp3")}
  />
);

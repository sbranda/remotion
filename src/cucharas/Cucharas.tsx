// Reel de 90 s: ¿qué es la fatiga crónica?, contado con la "teoría de las cucharas".
// Estilo cuaderno (src/salud/cuaderno.tsx).
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Emoji, Escribe, Fibron, K, MANUSCRITA, Nota, Pagina, Pop, ReelCuaderno, SANS, Texto, Tilde, clamp } from "../salud/cuaderno";

export const FPS = 30;

const CUCHARAS = 12;

/** Tareas del día y cuántas cucharas gasta cada una (suman 12) */
const TAREAS = [
  { emoji: "🚿", texto: "Bañarte", gasta: 2 },
  { emoji: "👕", texto: "Vestirte", gasta: 1 },
  { emoji: "🚌", texto: "Viajar", gasta: 3 },
  { emoji: "💻", texto: "Trabajar", gasta: 4 },
  { emoji: "🍳", texto: "Cocinar", gasta: 2 },
];

/** Fila de cucharas; las gastadas quedan tachadas y transparentes */
const Cucharas: React.FC<{ total?: number; gastadas: number; prestadas?: number; size?: number }> = ({ total = CUCHARAS, gastadas, prestadas = 0, size = 70 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(6, ${size + 18}px)`, gap: 10, justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => {
      const usada = i >= total - gastadas;
      const prestada = i < prestadas;
      return (
        <div key={i} style={{ position: "relative", width: size + 18, height: size + 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: usada || prestada ? 0.25 : 1 }}>
          <Emoji e="🥄" size={size} style={{ transform: "rotate(-30deg)" }} />
          {prestada && <div style={{ position: "absolute", inset: 6, border: `5px dashed ${K.rojo}`, borderRadius: 18 }} />}
          {usada && <div style={{ position: "absolute", fontFamily: MANUSCRITA, fontSize: size, color: K.rojo }}>✗</div>}
        </div>
      );
    })}
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Pop desde={0} giro={-4}>
      <Emoji e="🪫" size={150} />
    </Pop>
    <Escribe desde={8} size={92} dur={30}>
      ¿Dormís 10 horas y te levantás como si no hubieras dormido?
    </Escribe>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={30}>
    <Escribe desde={0} size={96}>
      ¿Qué es la <Fibron desde={25}>fatiga crónica</Fibron>?
    </Escribe>
    <Pop desde={40}>
      <Texto size={34} color="#6b6f86">
        (síndrome de fatiga crónica o encefalomielitis miálgica)
      </Texto>
    </Pop>
    <Pop desde={80} giro={-2}>
      <Nota>
        <Texto size={44} color={K.tinta}>
          Una <b style={{ color: K.rojo }}>enfermedad</b> con un cansancio extremo que dura <b>6 meses o más</b>…
        </Texto>
      </Nota>
    </Pop>
    <Pop desde={200} giro={2}>
      <Nota color={K.celeste}>
        <Texto size={44} color={K.tinta}>
          …y que <b style={{ color: K.rojo }}>no se va descansando</b>.
        </Texto>
      </Nota>
    </Pop>
  </Pagina>
);

// ─── 3. La teoría de las cucharas ───────────────────────────────────────────
const Teoria: React.FC = () => {
  const frame = useCurrentFrame();
  const visibles = Math.floor(interpolate(frame, [100, 220], [0, CUCHARAS], clamp));
  return (
    <Pagina gap={28}>
      <Escribe desde={0} size={92}>
        La teoría de las <Fibron desde={25}>cucharas</Fibron> 🥄
      </Escribe>
      <Pop desde={40}>
        <Texto size={44}>Imaginá que cada día arrancás con</Texto>
      </Pop>
      <div style={{ fontFamily: MANUSCRITA, fontSize: 130, color: K.rojo, lineHeight: 1, opacity: interpolate(frame, [70, 90], [0, 1], clamp) }}>{visibles || ""} cucharas</div>
      <Cucharas total={visibles} gastadas={0} />
      <Pop desde={260}>
        <Texto size={40}>
          Cada una es un poquito de <b style={{ color: K.tinta }}>energía</b>.
        </Texto>
      </Pop>
      <Pop desde={340}>
        <Texto size={26} color="#8a8fa6">
          Idea de Christine Miserandino, que vive con lupus
        </Texto>
      </Pop>
    </Pagina>
  );
};

// ─── 4. Un día ──────────────────────────────────────────────────────────────
const Dia: React.FC = () => {
  const frame = useCurrentFrame();
  const PASO = 90;
  const INICIO = 40;
  let gastadas = 0;
  TAREAS.forEach((t, i) => {
    if (frame >= INICIO + i * PASO + 30) gastadas += t.gasta;
  });
  const quedan = CUCHARAS - gastadas;
  const fin = frame > INICIO + TAREAS.length * PASO + 20;
  return (
    <Pagina gap={20}>
      <Escribe desde={0} size={86}>
        Un día cualquiera
      </Escribe>
      <Cucharas gastadas={gastadas} size={58} />
      <div style={{ fontFamily: MANUSCRITA, fontSize: 70, color: quedan > 3 ? K.tinta : K.rojo }}>
        Te quedan: {quedan} 🥄
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TAREAS.map((t, i) => (
          <Tilde key={t.texto} desde={INICIO + i * PASO} color={K.rojo} marca={`−${t.gasta}`}>
            {t.emoji} {t.texto}
          </Tilde>
        ))}
      </div>
      {fin && (
        <Pop desde={INICIO + TAREAS.length * PASO + 20} giro={-3}>
          <Nota color={K.rosa} ancho={820}>
            <Texto size={42} color={K.tinta}>
              Y son las 7 de la tarde. <b style={{ color: K.rojo }}>No queda nada</b> para ver a tus amigos 💔
            </Texto>
          </Nota>
        </Pop>
      )}
    </Pagina>
  );
};

// ─── 5. Gastar de más ───────────────────────────────────────────────────────
const Crash: React.FC = () => {
  const frame = useCurrentFrame();
  const prestadas = Math.floor(interpolate(frame, [120, 200], [0, 6], clamp));
  return (
    <Pagina gap={26}>
      <Escribe desde={0} size={84}>
        ¿Y si gastás <Fibron desde={25} color={K.rosa}>de más</Fibron>?
      </Escribe>
      <Pop desde={40}>
        <Texto size={44}>Le pedís prestado al día siguiente…</Texto>
      </Pop>
      <div style={{ fontFamily: MANUSCRITA, fontSize: 60, color: prestadas >= 6 ? K.rojo : K.tinta, opacity: interpolate(frame, [100, 120], [0, 1], clamp) }}>
        Mañana arrancás con {CUCHARAS - prestadas} 🥄
      </div>
      <Cucharas gastadas={0} prestadas={prestadas} size={58} />
      <Pop desde={230} giro={2}>
        <Nota color={K.celeste} ancho={820}>
          <Texto size={40} color={K.tinta}>
            Es la señal clave: <b style={{ color: K.rojo }}>después de un esfuerzo, los síntomas empeoran</b> por días.
          </Texto>
        </Nota>
      </Pop>
    </Pagina>
  );
};

// ─── 6. Síntomas ────────────────────────────────────────────────────────────
const SINTOMAS = [
  "Cansancio que no mejora durmiendo",
  "Empeora después de un esfuerzo",
  "Sueño que no repara",
  "“Niebla mental”: memoria y concentración",
  "Mareo al estar mucho de pie",
  "Dolores musculares o de cabeza",
];

const Sintomas: React.FC = () => (
  <Pagina gap={16}>
    <Escribe desde={0} size={86}>
      ¿Cómo se <Fibron desde={22}>siente</Fibron>?
    </Escribe>
    {SINTOMAS.map((s, i) => (
      <Tilde key={s} desde={30 + i * 45}>
        {s}
      </Tilde>
    ))}
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const AYUDA = [
  "Dosificá las cucharas: planificá y descansá antes de agotarte",
  "No te fuerces a hacer más ejercicio",
  "Consultá: hay que descartar otras causas",
];

const Ayuda: React.FC = () => (
  <Pagina gap={18}>
    <Escribe desde={0} size={86}>
      Qué <Fibron desde={22} color="#c8f7d0">ayuda</Fibron>
    </Escribe>
    {AYUDA.map((a, i) => (
      <Tilde key={a} desde={30 + i * 70} color={K.verde}>
        {a}
      </Tilde>
    ))}
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={28} centro>
    <Escribe desde={0} size={100}>
      No es pereza. 💜
    </Escribe>
    <Escribe desde={30} size={84} color={K.rojo}>
      Es una enfermedad.
    </Escribe>
    <Pop desde={70}>
      <Texto size={40}>Mandáselo a alguien que necesite entenderlo 📲</Texto>
    </Pop>
    <Pop desde={95}>
      <Texto size={26} color="#8a8fa6" peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Pop>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
export const PAGINAS_CUCHARAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "queEs", seg: 12, Escena: QueEs },
  { id: "teoria", seg: 14, Escena: Teoria },
  { id: "dia", seg: 20, Escena: Dia },
  { id: "crash", seg: 12, Escena: Crash },
  { id: "sintomas", seg: 12, Escena: Sintomas },
  { id: "ayuda", seg: 10, Escena: Ayuda },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_CUCHARAS = PAGINAS_CUCHARAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const FatigaCucharas: React.FC = () => (
  <ReelCuaderno
    paginas={PAGINAS_CUCHARAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,14,20,12,12,10,5 --bpm 92 --transponer 5 --estilo suave
    musica={staticFile("audio/cucharas-musica.mp3")}
  />
);

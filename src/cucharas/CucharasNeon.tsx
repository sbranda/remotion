// Versión NEÓN del Reel de fatiga crónica con la "teoría de las cucharas".
// Mismo contenido que Cucharas.tsx (cuaderno), con el estilo neón de la serie (src/salud/pop.tsx).
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, useGolpe, useSacudida } from "../salud/pop";

const FPS = 30;
const CUCHARAS = 12;

const TAREAS = [
  { emoji: "🚿", texto: "Bañarte", gasta: 2 },
  { emoji: "👕", texto: "Vestirte", gasta: 1 },
  { emoji: "🚌", texto: "Viajar", gasta: 3 },
  { emoji: "💻", texto: "Trabajar", gasta: 4 },
  { emoji: "🍳", texto: "Cocinar", gasta: 2 },
];

/** Cucharas con brillo neón; las gastadas se apagan */
const Cucharas: React.FC<{ total?: number; gastadas: number; prestadas?: number; size?: number }> = ({ total = CUCHARAS, gastadas, prestadas = 0, size = 64 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(6, ${size + 26}px)`, gap: 12, justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => {
      const apagada = i >= total - gastadas || i < prestadas;
      const color = i < prestadas ? P.rojo : apagada ? P.borde : P.cian;
      return (
        <div
          key={i}
          style={{
            width: size + 26,
            height: size + 26,
            borderRadius: 20,
            border: `3px solid ${color}`,
            background: P.vidrio,
            boxShadow: apagada ? "none" : `0 0 18px ${P.cian}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: apagada ? 0.35 : 1,
            filter: apagada ? "grayscale(1)" : "none",
          }}
        >
          <Emoji e="🥄" size={size} style={{ transform: "rotate(-30deg)" }} />
        </div>
      );
    })}
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const sac = useSacudida(60, 10);
  const parpadea = frame > 40 && Math.floor(frame / 8) % 2 === 0 ? 0.35 : 1;
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)`, opacity: parpadea }}>
          <Emoji e="🪫" size={170} />
        </div>
      </Golpe>
      <Golpe desde={8}>
        <Grande size={80}>¿Dormís 10 horas y te levantás como si no hubieras dormido?</Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={88}>
        ¿Qué es la <Marcador desde={10} color={P.violeta} texto="#fff">fatiga crónica</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={25}>
      <Chico size={34} color={P.texto2}>
        (síndrome de fatiga crónica o encefalomielitis miálgica)
      </Chico>
    </Golpe>
    <Golpe desde={70}>
      <Vidrio color={P.violeta} style={{ width: 940, padding: "22px 30px" }}>
        <Chico size={44}>
          Una <b style={{ color: P.violeta }}>enfermedad</b> con un cansancio extremo que dura <b>6 meses o más</b>…
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={190}>
      <Vidrio color={P.rojo} style={{ width: 940, padding: "22px 30px" }}>
        <Chico size={44}>
          …y que <b style={{ color: P.rojo }}>no se va descansando</b>.
        </Chico>
      </Vidrio>
    </Golpe>
  </Pagina>
);

// ─── 3. La teoría de las cucharas ───────────────────────────────────────────
const Teoria: React.FC = () => {
  const frame = useCurrentFrame();
  const visibles = Math.floor(interpolate(frame, [100, 220], [0, CUCHARAS], clamp));
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={84}>
          La teoría de las <Marcador desde={10} color={P.cian}>cucharas</Marcador> 🥄
        </Grande>
      </Golpe>
      <Golpe desde={40}>
        <Chico size={44}>Imaginá que cada día arrancás con</Chico>
      </Golpe>
      <div style={{ fontFamily: SANS, fontSize: 130, fontWeight: 800, color: P.cian, textShadow: `0 0 30px ${P.cian}`, lineHeight: 1, opacity: interpolate(frame, [70, 90], [0, 1], clamp) }}>
        {visibles || ""} <span style={{ fontSize: 60 }}>cucharas</span>
      </div>
      <Cucharas total={visibles} gastadas={0} />
      <Golpe desde={260}>
        <Chico size={40}>
          Cada una es un poquito de <b style={{ color: P.cian }}>energía</b>.
        </Chico>
      </Golpe>
      <Golpe desde={340}>
        <Chico size={26} color={P.texto2}>
          Idea de Christine Miserandino, que vive con lupus
        </Chico>
      </Golpe>
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
  const finDesde = INICIO + TAREAS.length * PASO + 20;
  const alerta = useGolpe(finDesde, 9);
  return (
    <Pagina gap={16}>
      <Golpe desde={0}>
        <Grande size={80}>Un día cualquiera</Grande>
      </Golpe>
      <Cucharas gastadas={gastadas} size={54} />
      <div style={{ fontFamily: SANS, fontSize: 60, fontWeight: 800, color: quedan > 3 ? P.cian : P.rojo, textShadow: `0 0 24px ${quedan > 3 ? P.cian : P.rojo}` }}>
        Te quedan: {quedan} 🥄
      </div>
      {TAREAS.map((t, i) => (
        <Fila key={t.texto} desde={INICIO + i * PASO} emoji={t.emoji} color={P.rojo} flecha={`−${t.gasta}`}>
          {t.texto}
        </Fila>
      ))}
      <div style={{ transform: `scale(${alerta})`, opacity: frame >= finDesde ? 1 : 0, marginTop: 6 }}>
        <div style={{ width: 940, background: P.rojo, borderRadius: 30, padding: "18px 28px", boxShadow: `0 0 50px ${P.rojo}88`, fontFamily: SANS, fontSize: 38, fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.25 }}>
          Y son las 7 de la tarde. No queda nada para ver a tus amigos 💔
        </div>
      </div>
    </Pagina>
  );
};

// ─── 5. Gastar de más ───────────────────────────────────────────────────────
const Crash: React.FC = () => {
  const frame = useCurrentFrame();
  const prestadas = Math.floor(interpolate(frame, [120, 200], [0, 6], clamp));
  const sac = useSacudida(200, 14);
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={84}>
          ¿Y si gastás <Marcador desde={10} color={P.rojo} texto="#fff">de más</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={40}>
        <Chico size={44}>Le pedís prestado al día siguiente…</Chico>
      </Golpe>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 56,
          fontWeight: 800,
          color: prestadas >= 6 ? P.rojo : P.texto,
          textShadow: prestadas >= 6 ? `0 0 24px ${P.rojo}` : "none",
          opacity: interpolate(frame, [100, 120], [0, 1], clamp),
          transform: `translateX(${sac}px)`,
        }}
      >
        Mañana arrancás con {CUCHARAS - prestadas} 🥄
      </div>
      <Cucharas gastadas={0} prestadas={prestadas} size={54} />
      <Golpe desde={230}>
        <Vidrio color={P.amarillo} style={{ width: 940, padding: "20px 28px" }}>
          <Chico size={40}>
            Es la señal clave: <b style={{ color: P.amarillo }}>después de un esfuerzo, los síntomas empeoran</b> por días.
          </Chico>
        </Vidrio>
      </Golpe>
    </Pagina>
  );
};

// ─── 6. Síntomas ────────────────────────────────────────────────────────────
const SINTOMAS = [
  { emoji: "🛏️", texto: "Cansancio que no mejora durmiendo" },
  { emoji: "📉", texto: "Empeora después de un esfuerzo" },
  { emoji: "😴", texto: "Sueño que no repara" },
  { emoji: "🌫️", texto: "“Niebla mental”: memoria y concentración" },
  { emoji: "💫", texto: "Mareo al estar mucho de pie" },
  { emoji: "🤕", texto: "Dolores musculares o de cabeza" },
];

const Sintomas: React.FC = () => (
  <Pagina gap={16}>
    <Golpe desde={0}>
      <Grande size={84}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    {SINTOMAS.map((s, i) => (
      <Fila key={s.texto} desde={30 + i * 45} emoji={s.emoji} color={P.violeta} flecha="✓">
        {s.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const AYUDA = [
  { emoji: "🥄", texto: "Dosificá las cucharas: planificá y descansá antes de agotarte" },
  { emoji: "🚫", texto: "No te fuerces a hacer más ejercicio" },
  { emoji: "🩺", texto: "Consultá: hay que descartar otras causas" },
];

const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={88}>
        Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    {AYUDA.map((a, i) => (
      <Fila key={a.texto} desde={30 + i * 70} emoji={a.emoji} color={P.verde} flecha="✓">
        {a.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={96}>No es pereza. 💜</Grande>
    </Golpe>
    <Golpe desde={20} giro={-4}>
      <Grande size={84}>
        <Marcador desde={30} color={P.rojo} texto="#fff">Es una enfermedad.</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={60} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={72} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={95}>
      <Chico size={28} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "queEs", seg: 12, Escena: QueEs },
  { id: "teoria", seg: 14, Escena: Teoria },
  { id: "dia", seg: 20, Escena: Dia },
  { id: "crash", seg: 12, Escena: Crash },
  { id: "sintomas", seg: 12, Escena: Sintomas },
  { id: "ayuda", seg: 10, Escena: Ayuda },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_CUCHARAS_NEON = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const FatigaCucharasNeon: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,14,20,12,12,10,5 --bpm 110 --transponer 5 --estilo energico
    musica={staticFile("audio/cucharas-neon-musica.mp3")}
  />
);

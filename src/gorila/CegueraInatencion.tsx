// Reel de 90 s: ceguera por inatención (el gorila invisible), estilo neón.
// La prueba es una animación original inspirada en el experimento de Simons y Chabris (1999).
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave } from "../salud/pop";

const FPS = 30;

// ─── La cancha: dos equipos que se pasan la pelota y un gorila que cruza ───
const ANCHO = 940;
const ALTO = 760;
const PASES = 11;
const T_PASE = 1.4; // segundos por pase
const T_INICIO_PASES = 1.2;

/** Posición de cada jugador en el tiempo t (en segundos) */
const jugador = (i: number, t: number): [number, number] => {
  const base: [number, number][] = [
    [220, 260], [700, 230], [470, 560], // blancos
    [330, 500], [620, 470], [480, 220], // negros
  ];
  const [bx, by] = base[i];
  const r = 60 + (i % 3) * 15;
  const v = 0.55 + (i % 4) * 0.12;
  const s = i % 2 ? 1 : -1;
  return [bx + Math.cos(t * v * s + i) * r, by + Math.sin(t * v + i * 2) * r * 0.6];
};

/** Pelota que va de un jugador a otro con un arco */
const pelota = (equipo: number[], t: number, desfase: number, n: number): [number, number] => {
  const tt = t - T_INICIO_PASES - desfase;
  if (tt < 0) {
    const [x, y] = jugador(equipo[0], t);
    return [x + 40, y - 10];
  }
  const k = Math.min(n - 1, Math.floor(tt / T_PASE));
  const u = tt >= n * T_PASE ? 1 : clamp01((tt - k * T_PASE) / (T_PASE * 0.6));
  const a = equipo[k % equipo.length];
  const b = equipo[(k + 1) % equipo.length];
  const [ax, ay] = jugador(a, t);
  const [bx, by] = jugador(b, t);
  const e = suave(u);
  return [ax + 40 + (bx - ax) * e, ay - 10 + (by - ay) * e - Math.sin(u * Math.PI) * 90];
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Gorila: entra por la derecha, se queda en el medio y sale por la izquierda */
const gorila = (t: number): { x: number; y: number; visible: boolean; saluda: boolean } => {
  const x = interpolate(t, [6, 9.5, 12.5, 16], [ANCHO + 120, 470, 470, -140], clamp);
  return { x, y: 400 + Math.sin(t * 6) * 6, visible: t > 5.8 && t < 16.2, saluda: t > 9.5 && t < 12.5 };
};

const Cancha: React.FC<{ t: number; marcar?: boolean; mostrarConteo?: boolean }> = ({ t, marcar = false, mostrarConteo = false }) => {
  const g = gorila(t);
  const [wx, wy] = pelota([0, 1, 2], t, 0, PASES);
  const [nx, ny] = pelota([3, 4, 5], t, 0.6, PASES);
  const pases = Math.max(0, Math.min(PASES, Math.floor((t - T_INICIO_PASES) / T_PASE + 0.6)));
  return (
    <div style={{ position: "relative", width: ANCHO, height: ALTO, borderRadius: 36, overflow: "hidden", background: "linear-gradient(180deg, #e9eef4 0%, #cfd8e3 100%)", border: `5px solid ${P.cian}`, boxShadow: `0 0 40px ${P.cian}55` }}>
      {/* gorila (detrás de los jugadores) */}
      {g.visible && (
        <div style={{ position: "absolute", left: g.x - 95, top: g.y - 110, transform: g.saluda ? `scale(${1 + 0.06 * Math.sin(t * 14)})` : undefined }}>
          <Emoji e="🦍" size={190} />
        </div>
      )}
      {marcar && g.visible && (
        <div style={{ position: "absolute", left: g.x - 150, top: g.y - 160, width: 300, height: 300, borderRadius: "50%", border: `8px dashed ${P.rojo}`, boxShadow: `0 0 30px ${P.rojo}` }} />
      )}
      {/* jugadores */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const [x, y] = jugador(i, t);
        const blanco = i < 3;
        return (
          <div key={i} style={{ position: "absolute", left: x - 40, top: y - 80 }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#f2c7a5", margin: "0 auto", border: "3px solid #8a6a52" }} />
            <div style={{ width: 80, height: 100, borderRadius: "30px 30px 14px 14px", marginTop: 4, background: blanco ? "#ffffff" : "#1b1b1f", border: `4px solid ${blanco ? "#9aa6b5" : "#000"}` }} />
          </div>
        );
      })}
      {/* pelotas */}
      {[
        [wx, wy],
        [nx, ny],
      ].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffb36b, #e0661c)", border: "3px solid #8a3a0c" }} />
      ))}
      {mostrarConteo && (
        <div style={{ position: "absolute", right: 20, top: 16, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: "#071630", background: "#ffffffcc", borderRadius: 16, padding: "4px 16px" }}>
          Pases: {pases}
        </div>
      )}
    </div>
  );
};

// ─── La atención como una linterna ──────────────────────────────────────────
const Linterna: React.FC<{ revela: number }> = ({ revela }) => {
  const frame = useCurrentFrame();
  const fx = 300 + Math.sin(frame / 25) * 90;
  const fy = 360 + Math.cos(frame / 31) * 60;
  const radio = 170 + revela * 900;
  const objetos = [
    { e: "📱", x: 290, y: 360, s: 120 },
    { e: "☕", x: 150, y: 560, s: 80 },
    { e: "🔑", x: 420, y: 560, s: 70 },
    { e: "🐘", x: 700, y: 330, s: 260 },
    { e: "🚗", x: 160, y: 170, s: 90 },
  ];
  return (
    <div style={{ position: "relative", width: ANCHO, height: 680, borderRadius: 36, overflow: "hidden", background: "#2a3550", border: `5px solid ${P.amarillo}` }}>
      {objetos.map((o) => (
        <div key={o.e} style={{ position: "absolute", left: o.x - o.s / 2, top: o.y - o.s / 2 }}>
          <Emoji e={o.e} size={o.s} />
        </div>
      ))}
      {/* oscuridad con un círculo de luz */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle ${radio}px at ${fx}px ${fy}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(3,8,20,0.97) 100%)` }} />
      {revela > 0.5 && (
        <div style={{ position: "absolute", left: 560, top: 470, fontFamily: SANS, fontWeight: 800, fontSize: 46, color: P.amarillo, textShadow: `0 0 20px ${P.amarillo}`, transform: "rotate(-5deg)" }}>
          ¡Había un elefante!
        </div>
      )}
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0} giro={-8}>
      <Emoji e="👀" size={170} />
    </Golpe>
    <Golpe desde={12}>
      <Grande size={92}>
        Hagamos una <Marcador desde={25} color={P.amarillo}>prueba</Marcador>
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 2. Consigna ────────────────────────────────────────────────────────────
const Consigna: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={80}>
        Contá cuántas veces se pasan la pelota los de remera <Marcador desde={15} color="#ffffff">BLANCA</Marcador>
      </Grande>
    </Golpe>
    <Golpe desde={50}>
      <Chico size={40} color={P.texto2}>
        ¡Concentrate! 🧠
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 3. La prueba ───────────────────────────────────────────────────────────
const Prueba: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Chico size={40}>Contá los pases de los de <b>blanco</b> ⚪</Chico>
      </Golpe>
      <Cancha t={frame / FPS} />
    </Pagina>
  );
};

// ─── 4. La respuesta ────────────────────────────────────────────────────────
const Respuesta: React.FC = () => (
  <Pagina gap={36} centro>
    <Golpe desde={0}>
      <Grande size={80}>
        Fueron <Marcador desde={12} color={P.verde}>11 pases</Marcador>
      </Grande>
    </Golpe>
    <Golpe desde={70} giro={-6}>
      <Grande size={96}>Pero… ¿viste al gorila? 🦍</Grande>
    </Golpe>
  </Pagina>
);

// ─── 5. Repetición ──────────────────────────────────────────────────────────
const Repeticion: React.FC = () => {
  const frame = useCurrentFrame();
  const t = 5.5 + (frame / FPS) * 1.35;
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Chico size={42}>
          🔁 Mirá otra vez: <b style={{ color: P.rojo }}>cruzó caminando</b> y se quedó en el medio
        </Chico>
      </Golpe>
      <Cancha t={t} marcar />
    </Pagina>
  );
};

// ─── 6. El experimento original ─────────────────────────────────────────────
const Experimento: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={78}>
        El experimento del <Marcador desde={12} color={P.violeta} texto="#fff">gorila invisible</Marcador>
      </Grande>
    </Golpe>
    <Golpe desde={40}>
      <Vidrio color={P.violeta} style={{ width: 940, padding: "18px 28px" }}>
        <Chico size={40}>
          En 1999, los psicólogos <b style={{ color: P.cian }}>Daniel Simons</b> y <b style={{ color: P.cian }}>Christopher Chabris</b> mostraron un video así… con una persona disfrazada de gorila.
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={180} giro={-4}>
      <Grande size={84}>
        <span style={{ color: P.amarillo }}>Casi la mitad</span> no lo vio. 😱
      </Grande>
    </Golpe>
    <Golpe desde={260}>
      <Chico size={38} color={P.texto2}>
        Se llama <b style={{ color: P.texto }}>ceguera por inatención</b>.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. La atención es una linterna ─────────────────────────────────────────
const Atencion: React.FC = () => {
  const frame = useCurrentFrame();
  const revela = interpolate(frame, [330, 370], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={74}>
          Tu atención es una <Marcador desde={12} color={P.amarillo}>linterna</Marcador> 🔦
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Linterna revela={revela} />
      </Golpe>
      <Golpe desde={90}>
        <Chico size={38}>
          Tus ojos ven todo, pero el cerebro <b style={{ color: P.amarillo }}>solo procesa a fondo lo que ilumina tu atención</b>. El resto se filtra.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 8. En la vida real ─────────────────────────────────────────────────────
const VidaReal: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={78}>
        Pasa en la <Marcador desde={12} color={P.rojo} texto="#fff">vida real</Marcador>
      </Grande>
    </Golpe>
    <Fila desde={30} emoji="🚗" color={P.rojo} flecha="!">
      Manejando con el celular: “miré… y no vi la moto”
    </Fila>
    <Fila desde={130} emoji="🩻" color={P.amarillo} flecha="!">
      Escondieron un gorila en una tomografía: 8 de cada 10 radiólogos no lo vieron
    </Fila>
    <Fila desde={240} emoji="🎩" color={P.violeta} flecha="✨">
      Los magos lo usan: te hacen mirar donde ellos quieren
    </Fila>
  </Pagina>
);

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={82}>
        <Marcador desde={12} color={P.cian}>Mirar no es lo mismo que ver</Marcador>
      </Grande>
    </Golpe>
    <Golpe desde={40}>
      <Chico size={42}>¿Viste al gorila la primera vez? Contame 👇</Chico>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={70} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={85} emoji="📲" texto="Compartilo" color={P.violeta} />
    </div>
    <Golpe desde={100}>
      <Chico size={30} color={P.texto2}>
        Y al manejar: celular guardado. 🚗
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "consigna", seg: 4, Escena: Consigna },
  { id: "prueba", seg: 18, Escena: Prueba },
  { id: "respuesta", seg: 6, Escena: Respuesta },
  { id: "repeticion", seg: 9, Escena: Repeticion },
  { id: "experimento", seg: 13, Escena: Experimento },
  { id: "atencion", seg: 14, Escena: Atencion },
  { id: "vidaReal", seg: 12, Escena: VidaReal },
  { id: "cierre", seg: 9, Escena: Cierre },
];

export const DURACION_GORILA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const CegueraInatencion: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,4,18,6,9,13,14,12,9 --bpm 104 --transponer 0 --estilo energico
    musica={staticFile("audio/gorila-musica.mp3")}
  />
);

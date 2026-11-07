// Reel de 90 s: bruxismo (apretar o rechinar los dientes), estilo noche.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Personaje } from "../salud/personajes";
import { C, Emoji, Entra, Lista, Pagina, ReelNoche, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/noche";

const FPS = 30;

// ─── Dientes que aprietan y rechinan ────────────────────────────────────────
const Dientes: React.FC<{ aprieta: number; rechina?: number; ancho?: number }> = ({ aprieta, rechina = 0, ancho = 640 }) => {
  const frame = useCurrentFrame();
  const n = 8;
  const w = 64;
  const separacion = 70 * (1 - aprieta);
  const lado = Math.sin(frame / 3) * 10 * rechina;
  const fila = (y: number, abajo: boolean, dx: number) =>
    Array.from({ length: n }).map((_, i) => {
      const x = 32 + i * (w + 6) + dx;
      const alto = i === 0 || i === n - 1 ? 60 : i === 3 || i === 4 ? 80 : 70;
      return <rect key={`${abajo}${i}`} x={x} y={abajo ? y : y - alto} width={w} height={alto} rx={18} fill="#fbfbf6" stroke="#cfd2dc" strokeWidth={3} />;
    });
  const medio = 220;
  return (
    <svg width={ancho} height={ancho * 0.7} viewBox="0 0 620 440" style={{ overflow: "visible" }}>
      {/* encías */}
      <rect x={10} y={medio - separacion / 2 - 150} width={600} height={70} rx={35} fill="#e07a8a" />
      <rect x={10} y={medio + separacion / 2 + 80} width={600} height={70} rx={35} fill="#e07a8a" transform={`translate(${lado} 0)`} />
      {fila(medio - separacion / 2 - 80 + 80, false, 0)}
      <g transform={`translate(${lado} 0)`}>{fila(medio + separacion / 2, true, 0)}</g>
      {/* presión */}
      {aprieta > 0.8 &&
        [0, 1, 2].map((i) => {
          const t = ((frame + i * 6) % 18) / 18;
          return (
            <g key={i} opacity={1 - t} stroke={C.coral} strokeWidth={6} strokeLinecap="round">
              <line x1={-20 - 40 * t} y1={medio} x2={-60 - 40 * t} y2={medio} />
              <line x1={640 + 40 * t} y1={medio} x2={680 + 40 * t} y2={medio} />
              <line x1={310} y1={medio - 190 - 30 * t} x2={310} y2={medio - 220 - 30 * t} />
            </g>
          );
        })}
      {aprieta > 0.8 && <rect x={20} y={medio - 6} width={580} height={12} rx={6} fill={C.coral} opacity={0.35 + 0.3 * Math.abs(Math.sin(frame / 4))} style={{ filter: "blur(6px)" }} />}
    </svg>
  );
};

// ─── Persona con puntos de dolor ────────────────────────────────────────────
/** Coordenadas en el viewBox del personaje (300 × 412) */
const ZONAS = [
  { id: "sienes", puntos: [[96, 112], [204, 112]], nombre: "Sienes" },
  { id: "mandibula", puntos: [[98, 182], [202, 182]], nombre: "Mandíbula" },
  { id: "cuello", puntos: [[150, 236]], nombre: "Cuello" },
  { id: "hombros", puntos: [[96, 278], [204, 278]], nombre: "Hombros" },
];

const PersonaDolor: React.FC<{ activas: number; size?: number }> = ({ activas, size = 460 }) => {
  const frame = useCurrentFrame();
  const k = size / 300;
  const pulso = (Math.sin(frame / 6) + 1) / 2;
  return (
    <div style={{ position: "relative", width: size, height: size * 1.373 }}>
      <Personaje tipo="chica" expresion={activas > 0 ? "dolor" : "feliz"} size={size} pelo="#3b2416" ropa="#6c5ce7" />
      {ZONAS.slice(0, activas).flatMap((z) =>
        z.puntos.map(([x, y], j) => (
          <div key={`${z.id}${j}`} style={{ position: "absolute", left: x * k - 26, top: y * k - 26, width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle, ${C.coral} 0%, ${C.coral}aa 40%, transparent 70%)`, transform: `scale(${0.8 + 0.5 * pulso})` }} />
        )),
      )}
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const aprieta = interpolate(frame, [10, 30], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={20} centro>
      <Dientes aprieta={aprieta} rechina={frame > 40 ? 1 : 0} ancho={560} />
      <Entra desde={8}>
        <Titulo size={78}>¿Te levantás con la mandíbula cansada o dolor de cabeza?</Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={88}>
        ¿Qué es el <Resalta color={C.coral}>bruxismo</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Texto size={44}>
        Apretar o rechinar los dientes <b style={{ color: C.coral }}>sin darte cuenta</b>.
      </Texto>
    </Entra>
    <div style={{ display: "flex", gap: 22 }}>
      {[
        { e: "😴", t: "Dormido", d: "De noche, mientras dormís", c: C.violeta, desde: 90 },
        { e: "💻", t: "Despierto", d: "De día, al concentrarte o estresarte", c: C.azul, desde: 150 },
      ].map((x) => (
        <Entra key={x.t} desde={x.desde}>
          <Tarjeta color={x.c} style={{ width: 449, height: 300, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center" }}>
            <Emoji e={x.e} size={90} />
            <div style={{ fontFamily: SANS, fontSize: 46, fontWeight: 800, color: x.c }}>{x.t}</div>
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 600, color: C.texto, lineHeight: 1.2 }}>{x.d}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

// ─── 3. Por qué pasa ────────────────────────────────────────────────────────
const PorQue: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Por qué <Resalta color={C.amarillo}>apretamos</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Tarjeta color={C.coral} style={{ width: 920, padding: "18px 28px" }}>
        <Texto size={40}>
          😰 El <b style={{ color: C.coral }}>estrés y la ansiedad</b>: la mandíbula es uno de los lugares donde el cuerpo descarga la tensión.
        </Texto>
      </Tarjeta>
    </Entra>
    <Entra desde={130}>
      <Texto size={38} color={C.texto2}>
        Al dormir hay pequeños “microdespertares”: el cuerpo se activa un instante y la mandíbula se aprieta.
      </Texto>
    </Entra>
    <Lista
      items={[
        { emoji: "☕", texto: "Café, alcohol y cigarrillo" },
        { emoji: "😮‍💨", texto: "Ronquidos o apnea del sueño" },
        { emoji: "💊", texto: "Algunos medicamentos" },
      ]}
      desde={230}
      paso={40}
      color={C.amarillo}
      size={38}
    />
  </Pagina>
);

// ─── 4. La fuerza ───────────────────────────────────────────────────────────
const Fuerza: React.FC = () => {
  const frame = useCurrentFrame();
  const aprieta = interpolate(frame, [30, 60], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={26} centro>
      <Entra desde={0}>
        <Titulo size={80}>
          Dormido, apretás <Resalta color={C.coral}>más fuerte</Resalta> que al masticar
        </Titulo>
      </Entra>
      <Dientes aprieta={aprieta} rechina={frame > 120 ? 1 : 0} ancho={600} />
      <Entra desde={150}>
        <Texto size={40} color={C.texto2}>
          Y durante minutos, no un segundo como al comer.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Cómo afecta ─────────────────────────────────────────────────────────
const EFECTOS = [
  { titulo: "Cabeza", texto: "Dolor en las sienes al despertar", color: C.violeta },
  { titulo: "Mandíbula", texto: "Dolor, chasquidos, cuesta abrir la boca", color: C.coral },
  { titulo: "Cuello", texto: "Contracturas y rigidez", color: C.amarillo },
  { titulo: "Hombros", texto: "Tensión que baja por la espalda", color: C.azul },
];

const Efectos: React.FC = () => {
  const frame = useCurrentFrame();
  const PASO = 110;
  const activas = Math.min(4, Math.max(0, Math.floor((frame - 40) / PASO) + 1));
  return (
    <Pagina gap={14}>
      <Entra desde={0}>
        <Titulo size={80}>
          ¿Cómo <Resalta color={C.coral}>afecta</Resalta>?
        </Titulo>
      </Entra>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PersonaDolor activas={frame < 40 ? 0 : activas} size={400} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 480 }}>
          {EFECTOS.map((e, i) => {
            const d = 40 + i * PASO;
            const op = interpolate(frame, [d, d + 18], [0, 1], { ...clamp, easing: suave });
            return (
              <div key={e.titulo} style={{ opacity: op, transform: `translateX(${(1 - op) * 30}px)` }}>
                <Tarjeta color={e.color} style={{ padding: "14px 20px" }}>
                  <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 800, color: e.color }}>{e.titulo}</div>
                  <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 600, color: C.texto, lineHeight: 1.2 }}>{e.texto}</div>
                </Tarjeta>
              </div>
            );
          })}
        </div>
      </div>
      <Entra desde={480}>
        <Texto size={36} color={C.texto2}>
          🦷 Y en los dientes: desgaste, sensibilidad y hasta fisuras.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 6. Señales ─────────────────────────────────────────────────────────────
const Senales: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Señales de que <Resalta color={C.amarillo}>apretás</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🌅", texto: "Te despertás con la mandíbula cansada" },
        { emoji: "🤕", texto: "Dolor de cabeza a la mañana" },
        { emoji: "🦷", texto: "Dientes gastados o sensibles" },
        { emoji: "👂", texto: "Alguien te escuchó rechinar de noche" },
        { emoji: "👅", texto: "Marcas de los dientes en la lengua o las mejillas" },
      ]}
      desde={25}
      paso={55}
      color={C.amarillo}
      size={36}
    />
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={18}>
    <Entra desde={0}>
      <Titulo size={80}>
        Qué <Resalta color={C.verde}>ayuda</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🦷", texto: "Placa de descanso hecha por tu odontólogo" },
        { emoji: "🌬️", texto: "Bajar el estrés: respiración, ejercicio, terapia" },
        { emoji: "☕", texto: "Menos café y alcohol a la noche" },
        { emoji: "♨️", texto: "Calor y masajes suaves en la mandíbula" },
        { emoji: "😮‍💨", texto: "Si roncás fuerte, consultá por apnea" },
      ]}
      desde={25}
      paso={75}
      color={C.verde}
      size={36}
    />
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Emoji e="😌" size={130} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={80}>
        Durante el día: <Resalta color={C.verde}>labios juntos, dientes separados</Resalta>
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
        Esto no reemplaza la consulta con tu odontólogo o médico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 4, Escena: Gancho },
  { id: "queEs", seg: 10, Escena: QueEs },
  { id: "porQue", seg: 14, Escena: PorQue },
  { id: "fuerza", seg: 10, Escena: Fuerza },
  { id: "efectos", seg: 18, Escena: Efectos },
  { id: "senales", seg: 12, Escena: Senales },
  { id: "ayuda", seg: 16, Escena: Ayuda },
  { id: "cierre", seg: 6, Escena: Cierre },
];

export const DURACION_BRUXISMO = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const Bruxismo: React.FC = () => (
  <ReelNoche
    paginas={PAGINAS}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 4,10,14,10,18,12,16,6 --bpm 70 --transponer 4 --estilo suave
    musica={staticFile("audio/bruxismo-musica.mp3")}
  />
);

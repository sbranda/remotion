import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { AYUDA_BURNOUT, AYUDA_FATIGA, BURNOUT, COMPARACION, DESCARTAR, FATIGA, FPS, PAGINAS, PaginaId } from "./datos";

// ─── Batería ────────────────────────────────────────────────────────────────
const Bateria: React.FC<{ carga: number; ancho?: number; cargando?: boolean }> = ({ carga, ancho = 360, cargando = false }) => {
  const frame = useCurrentFrame();
  const alto = ancho * 0.45;
  const color = carga > 0.5 ? C.verde : carga > 0.2 ? C.amarillo : C.coral;
  const parpadea = carga < 0.15 && Math.floor(frame / 10) % 2 === 0 ? 0.35 : 1;
  return (
    <div style={{ position: "relative", width: ancho, height: alto, border: `10px solid ${C.texto2}`, borderRadius: 30, padding: 12 }}>
      <div style={{ width: `${Math.max(0.03, carga) * 100}%`, height: "100%", borderRadius: 14, background: color, opacity: parpadea }} />
      <div style={{ position: "absolute", right: -34, top: alto / 2 - 30, width: 22, height: 60, borderRadius: 8, background: C.texto2 }} />
      {cargando && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Emoji e="⚡" size={ancho * 0.28} />
        </div>
      )}
    </div>
  );
};

// ─── Vela que se consume ────────────────────────────────────────────────────
const Vela: React.FC<{ consumo: number }> = ({ consumo }) => {
  const frame = useCurrentFrame();
  const alto = 300 - 230 * consumo;
  const llama = 1 - 0.7 * Math.max(0, consumo - 0.7) / 0.3;
  const tiembla = Math.sin(frame / 3) * 4;
  return (
    <svg width={260} height={420} viewBox="0 0 260 420">
      {/* charco de cera */}
      <ellipse cx={130} cy={398} rx={40 + 70 * consumo} ry={12 + 8 * consumo} fill="#f6e7c8" />
      <rect x={85} y={400 - alto} width={90} height={alto} rx={12} fill="#fff4dc" stroke="#e3c99a" strokeWidth={4} />
      {/* gotas de cera */}
      <path d={`M95 ${400 - alto + 10} q6 ${20 + 30 * consumo} 12 0`} fill="#fff4dc" stroke="#e3c99a" strokeWidth={3} />
      <path d={`M150 ${400 - alto + 10} q6 ${30 + 40 * consumo} 12 0`} fill="#fff4dc" stroke="#e3c99a" strokeWidth={3} />
      <line x1={130} y1={400 - alto} x2={130} y2={400 - alto - 16} stroke="#3a3a3a" strokeWidth={4} />
      <g transform={`translate(${130 + tiembla * 0.5} ${400 - alto - 16}) scale(${Math.max(0.15, llama)})`}>
        <path d={`M0 0 C-26 -30 -14 -70 ${tiembla} -100 C14 -70 26 -30 0 0 Z`} fill="#ffb347" />
        <path d="M0 -4 C-12 -22 -6 -46 0 -60 C6 -46 12 -22 0 -4 Z" fill="#fff1a8" />
      </g>
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const carga = interpolate(frame, [0, 70], [0.6, 0.04], { ...clamp, easing: suave });
  return (
    <Pagina gap={36} centro>
      <Bateria carga={carga} />
      <Entra desde={8}>
        <Titulo size={84}>¿Estás cansado siempre, aunque duermas?</Titulo>
      </Entra>
    </Pagina>
  );
};

// ─── 2. Son distintos ───────────────────────────────────────────────────────
const Distintos: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0}>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <Emoji e="🪫" size={140} />
        <Texto size={60} peso={800} color={C.texto2}>
          vs.
        </Texto>
        <Emoji e="🕯️" size={140} />
      </div>
    </Entra>
    <Entra desde={15}>
      <Titulo size={84}>
        <Resalta>Fatiga crónica</Resalta> y <Resalta color={C.coral}>burnout</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={60}>
      <Texto size={46} color={C.texto2}>
        Se parecen, pero no son lo mismo.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. Fatiga crónica ──────────────────────────────────────────────────────
const Fatiga: React.FC = () => {
  const frame = useCurrentFrame();
  // la batería intenta cargar y no sube: descansa, sube un poco y vuelve a caer
  const ciclo = (frame % 120) / 120;
  const carga = 0.12 + 0.12 * Math.sin(ciclo * Math.PI);
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={80}>
          <Resalta>Fatiga crónica</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={15}>
        <Texto size={34} color={C.texto2}>
          (síndrome de fatiga crónica o encefalomielitis miálgica)
        </Texto>
      </Entra>
      <Entra desde={25}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Bateria carga={carga} ancho={260} cargando />
          <Texto size={36} peso={700}>
            Cargás… <br />y no se llena.
          </Texto>
        </div>
      </Entra>
      <Lista items={FATIGA} desde={60} paso={70} size={36} />
    </Pagina>
  );
};

// ─── 4. Burnout ─────────────────────────────────────────────────────────────
const Burnout: React.FC = () => {
  const frame = useCurrentFrame();
  const consumo = interpolate(frame, [20, 360], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={80}>
          <Resalta color={C.coral}>Burnout</Resalta>: estar “quemado”
        </Titulo>
      </Entra>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Vela consumo={consumo} />
        <div style={{ width: 600 }}>
          <Entra desde={30}>
            <Texto size={38}>
              Desgaste por <b style={{ color: C.coral }}>estrés crónico en el trabajo</b>. La OMS lo reconoce como un fenómeno laboral.
            </Texto>
          </Entra>
        </div>
      </div>
      <Lista items={BURNOUT} desde={140} paso={70} color={C.coral} size={38} />
    </Pagina>
  );
};

// ─── 5. Comparación ─────────────────────────────────────────────────────────
const Comparacion: React.FC = () => {
  const frame = useCurrentFrame();
  const celda = (color: string, peso = 700): React.CSSProperties => ({
    fontFamily: SANS,
    fontSize: 30,
    fontWeight: peso,
    color,
    textAlign: "center",
    padding: "12px 8px",
    lineHeight: 1.2,
  });
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={78}>
          <Resalta>Fatiga crónica</Resalta> vs. <Resalta color={C.coral}>burnout</Resalta>
        </Titulo>
      </Entra>
      <Tarjeta color={C.violeta} style={{ width: 960, padding: "8px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr 1fr" }}>
          <div />
          <div style={celda(C.violeta, 800)}>Fatiga crónica</div>
          <div style={celda(C.coral, 800)}>Burnout</div>
          {COMPARACION.map((f, i) => {
            const op = interpolate(frame, [30 + i * 85, 45 + i * 85], [0, 1], clamp);
            const borde = `2px solid ${C.violeta}22`;
            return (
              <React.Fragment key={f.tema}>
                <div style={{ ...celda(C.texto, 800), textAlign: "left", opacity: op, borderTop: borde }}>{f.tema}</div>
                <div style={{ ...celda(C.texto), opacity: op, borderTop: borde }}>{f.fatiga}</div>
                <div style={{ ...celda(C.texto), opacity: op, borderTop: borde }}>{f.burnout}</div>
              </React.Fragment>
            );
          })}
        </div>
      </Tarjeta>
    </Pagina>
  );
};

// ─── 6. Descartar otras causas ──────────────────────────────────────────────
const Descartar: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={78}>
        Ojo: el cansancio tiene <Resalta color={C.azul}>muchas causas</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 296px)", gap: 16 }}>
      {DESCARTAR.map((d, i) => (
        <Entra key={d.texto} desde={25 + i * 25}>
          <Tarjeta color={C.azul} style={{ height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Emoji e={d.emoji} size={64} />
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto }}>{d.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={200}>
      <Texto size={40}>
        Por eso, antes que nada: <b style={{ color: C.azul }}>consultá y pedí análisis</b>.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7 y 8. Qué ayuda ───────────────────────────────────────────────────────
const AyudaFatiga: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={78}>
        Si es <Resalta>fatiga crónica</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDA_FATIGA} desde={25} paso={65} size={38} />
  </Pagina>
);

const AyudaBurnout: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={78}>
        Si es <Resalta color={C.coral}>burnout</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDA_BURNOUT} desde={25} paso={65} color={C.coral} size={38} />
  </Pagina>
);

// ─── 9. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const carga = interpolate(frame, [10, 90], [0.1, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={26} centro>
      <Bateria carga={carga} ancho={300} />
      <Entra desde={15}>
        <Titulo size={80}>
          Descansar <Resalta color={C.verde}>no es de vagos</Resalta> 💜
        </Titulo>
      </Entra>
      <Entra desde={60}>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { e: "🔖", t: "Guardalo", c: C.verde },
            { e: "📲", t: "Compartilo", c: C.azul },
          ].map((b) => (
            <div key={b.t} style={{ background: b.c, color: C.blanco, borderRadius: 999, padding: "12px 30px", fontFamily: SANS, fontSize: 40, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
              <Emoji e={b.e} size={40} />
              {b.t}
            </div>
          ))}
        </div>
      </Entra>
      <Entra desde={80}>
        <Texto size={28} color={C.texto2} peso={500}>
          Esto no reemplaza la consulta con un profesional.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  distintos: Distintos,
  fatiga: Fatiga,
  burnout: Burnout,
  comparacion: Comparacion,
  descartar: Descartar,
  ayudaFatiga: AyudaFatiga,
  ayudaBurnout: AyudaBurnout,
  cierre: Cierre,
};

export const FatigaBurnout: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 4,6,14,14,14,10,10,12,6 --bpm 74 --transponer 2 --estilo suave
    musica={staticFile("audio/fatiga-musica.mp3")}
  />
);

import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { CAUSAS, COMPARACION, FPS, PAGINAS, PaginaId, SINTOMAS, TRATAMIENTOS } from "./datos";

// ─── 1. Gancho: velocímetro que se pasa de rosca ────────────────────────────
const Velocimetro: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [0, 45], [0, 1], { ...clamp, easing: suave });
  const vibra = frame > 45 ? Math.sin(frame * 2.2) * 3 : 0;
  const ang = -90 + 180 * v + vibra; // de verde (izquierda) a rojo (derecha)
  return (
    <svg width={420} height={260} viewBox="0 0 420 260">
      <defs>
        <linearGradient id="vel" x1="0" x2="1">
          <stop offset="0" stopColor={P.verde} />
          <stop offset="0.55" stopColor={P.amarillo} />
          <stop offset="1" stopColor={P.rojo} />
        </linearGradient>
      </defs>
      <path d="M40 230 A170 170 0 0 1 380 230" fill="none" stroke="url(#vel)" strokeWidth={28} strokeLinecap="round" />
      <g transform={`translate(210 230) rotate(${ang})`}>
        <line x1={0} y1={0} x2={0} y2={-150} stroke={P.texto} strokeWidth={10} strokeLinecap="round" />
      </g>
      <circle cx={210} cy={230} r={18} fill={P.texto} />
    </svg>
  );
};

const Gancho: React.FC = () => {
  const sac = useSacudida(46, 14);
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <Velocimetro />
        </div>
      </Golpe>
      <Golpe desde={6}>
        <Grande size={76}>¿Corazón a mil, nervios y bajás de peso sin hacer dieta?</Grande>
      </Golpe>
      <Golpe desde={50} giro={-6}>
        <Grande size={92}>
          Podría ser la <Marcador desde={60} color={P.rojo} texto="#fff">tiroides</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es: la mariposa del cuello ──────────────────────────────────────
/** Tiroides "mariposa". En modo hiper se pone roja y late rápido; en modo hipo se apaga y late lento. */
export const Mariposa: React.FC<{ aceleraDesde: number; modo?: "hiper" | "hipo" }> = ({ aceleraDesde, modo = "hiper" }) => {
  const frame = useCurrentFrame();
  const cambio = interpolate(frame, [aceleraDesde, aceleraDesde + 30], [0, 1], clamp);
  const hiper = modo === "hiper";
  const latido = hiper
    ? 1 + (0.03 + 0.07 * cambio) * Math.sin(frame / (6 - 4 * cambio))
    : 1 + (0.03 - 0.015 * cambio) * Math.sin(frame / (6 + 14 * cambio));
  const color = cambio > 0.5 ? (hiper ? P.rojo : "#5b7ba6") : P.cian;
  const brillo = hiper ? 20 + 30 * cambio : 20 - 14 * cambio;
  return (
    <svg width={460} height={300} viewBox="0 0 460 300" style={{ overflow: "visible" }}>
      {/* cuello */}
      <path d="M130 0 V300 M330 0 V300" stroke={P.texto2} strokeWidth={6} opacity={0.4} />
      <g transform={`translate(230 160) scale(${latido}) translate(-230 -160)`} style={{ filter: `drop-shadow(0 0 ${brillo}px ${color})` }}>
        <path d="M230 150 C200 60 90 60 100 160 C110 240 200 250 225 190 Z" fill={color} />
        <path d="M230 150 C260 60 370 60 360 160 C350 240 260 250 235 190 Z" fill={color} />
        <rect x={205} y={150} width={50} height={46} rx={20} fill={color} />
      </g>
      {cambio > 0 &&
        [0, 1, 2].map((i) => (
          <text
            key={i}
            x={60 + i * 170}
            y={(hiper ? 40 : 30 - ((frame / 2 + i * 20) % 40)) - i * 10}
            fontSize={60}
            opacity={cambio}
            fontFamily="'Noto Color Emoji', sans-serif"
          >
            {hiper ? "⚡" : "💤"}
          </text>
        ))}
    </svg>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={32}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Qué es la <Marcador desde={8} color={P.cian}>tiroides</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={46}>
        Una glándula en el cuello con forma de <b style={{ color: P.cian }}>mariposa</b> 🦋 que regula el <b style={{ color: P.amarillo }}>motor</b> de tu cuerpo
      </Chico>
    </Golpe>
    <Golpe desde={30}>
      <Mariposa aceleraDesde={190} />
    </Golpe>
    <Golpe desde={180} giro={4}>
      <Grande size={64}>
        En el hipertiroidismo fabrica hormonas <Marcador desde={195} color={P.rojo} texto="#fff">de más</Marcador>: todo se acelera ⚡
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 3. Síntomas: grilla 3×3 ────────────────────────────────────────────────
export const Sintoma: React.FC<{ desde: number; emoji: string; texto: string; color?: string }> = ({ desde, emoji, texto, color = P.rojo }) => {
  const p = useGolpe(desde, 9);
  const frame = useCurrentFrame();
  return (
    <div style={{ transform: `scale(${p})`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={color} style={{ width: 290, height: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <Emoji e={emoji} size={92} />
        <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: P.texto, textAlign: "center", lineHeight: 1.15, padding: "0 10px" }}>{texto}</div>
      </Vidrio>
    </div>
  );
};

const Sintomas: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={30 + i * 40} emoji={s.emoji} texto={s.texto} />
      ))}
    </div>
  </Pagina>
);

// ─── 4. Hiper vs. hipo ──────────────────────────────────────────────────────
export const HiperHipo: React.FC<{ primero?: "hiper" | "hipo" }> = ({ primero = "hiper" }) => {
  const frame = useCurrentFrame();
  const columnas = [
    { titulo: "HIPER", emoji: "⚡", sub: "Todo se acelera", color: P.rojo, lado: "hiper" as const },
    { titulo: "HIPO", emoji: "🐢", sub: "Todo se enlentece", color: P.cian, lado: "hipo" as const },
  ];
  if (primero === "hipo") columnas.reverse();
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={96}>
          {columnas.map((c, i) => (
            <React.Fragment key={c.titulo}>
              {i > 0 && " vs. "}
              <span style={{ color: c.color, textShadow: `0 0 30px ${c.color}` }}>{i === 0 ? c.titulo[0] + c.titulo.slice(1).toLowerCase() : c.titulo.toLowerCase()}</span>
            </React.Fragment>
          ))}
        </Grande>
      </Golpe>
      <div style={{ display: "flex", gap: 24 }}>
        {columnas.map((c, ci) => {
          const desde = 20 + ci * 20;
          const p = useGolpe(desde, 10);
          return (
            <div key={c.titulo} style={{ transform: `translateY(${(1 - p) * 300}px)`, opacity: frame >= desde ? 1 : 0 }}>
              <Vidrio color={c.color} style={{ width: 458, padding: "24px 22px", textAlign: "center", fontFamily: SANS }}>
                <Emoji e={c.emoji} size={90} />
                <div style={{ fontSize: 70, fontWeight: 800, color: c.color, textShadow: `0 0 24px ${c.color}`, letterSpacing: 2 }}>{c.titulo}</div>
                <div style={{ fontSize: 34, fontWeight: 700, color: P.texto2, marginBottom: 16 }}>{c.sub}</div>
                {COMPARACION.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 38,
                      fontWeight: 800,
                      color: P.texto,
                      padding: "10px 0",
                      borderTop: `2px solid ${P.borde}`,
                      opacity: interpolate(frame, [80 + i * 45, 92 + i * 45], [0, 1], clamp),
                    }}
                  >
                    {f[c.lado]}
                  </div>
                ))}
              </Vidrio>
            </div>
          );
        })}
      </div>
    </Pagina>
  );
};

// ─── 5. Causas ──────────────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={96}>
        ¿Por qué <Marcador desde={10} color={P.rojo} texto="#fff">pasa</Marcador>?
      </Grande>
    </Golpe>
    {CAUSAS.map((c, i) => (
      <Fila key={c.texto} desde={28 + i * 55} emoji={c.emoji} color={P.rojo} flecha="!">
        {c.texto}
      </Fila>
    ))}
    <Golpe desde={270}>
      <Chico size={44}>
        👩 Es más frecuente en <b style={{ color: P.amarillo }}>mujeres</b>
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Diagnóstico ─────────────────────────────────────────────────────────
export const Hormona: React.FC<{ desde: number; nombre: string; estado: string; flecha: string; color: string }> = ({ desde, nombre, estado, flecha, color }) => {
  const frame = useCurrentFrame();
  const p = useGolpe(desde, 10);
  const y = interpolate(frame, [desde + 10, desde + 30], [0, flecha === "↓" ? 18 : -18], { ...clamp, easing: suave });
  return (
    <div style={{ transform: `scale(${p})`, opacity: frame >= desde ? 1 : 0 }}>
      <Vidrio color={color} style={{ width: 440, padding: "24px 20px", textAlign: "center", fontFamily: SANS }}>
        <div style={{ fontSize: 66, fontWeight: 800, color: P.texto, letterSpacing: 1 }}>{nombre}</div>
        <div style={{ fontSize: 130, fontWeight: 800, color, lineHeight: 1, textShadow: `0 0 30px ${color}`, transform: `translateY(${y}px)` }}>{flecha}</div>
        <div style={{ fontSize: 46, fontWeight: 800, color }}>{estado}</div>
      </Vidrio>
    </div>
  );
};

const Diagnostico: React.FC = () => (
  <Pagina gap={34}>
    <Golpe desde={0}>
      <Grande size={86}>
        Se detecta con un <Marcador desde={10} color={P.amarillo}>análisis de sangre</Marcador> 🩸
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Hormona desde={40} nombre="TSH" estado="BAJA" flecha="↓" color={P.cian} />
      <Hormona desde={100} nombre="T4 libre" estado="ALTA" flecha="↑" color={P.rojo} />
    </div>
    <Golpe desde={200}>
      <Chico size={42} color={P.texto2}>
        Después, tu médico puede pedir una ecografía u otros estudios.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. Tratamiento ─────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => {
  const frame = useCurrentFrame();
  const alerta = useGolpe(260, 9);
  return (
    <Pagina gap={28}>
      <Golpe desde={0}>
        <Grande size={92}>
          ¿Tiene tratamiento? <Marcador desde={12} color={P.verde}>¡Sí!</Marcador>
        </Grande>
      </Golpe>
      <div style={{ display: "flex", gap: 24 }}>
        {TRATAMIENTOS.map((t, i) => {
          const d = 40 + i * 40;
          const p = useGolpe(d, 9);
          return (
            <div key={t.texto} style={{ transform: `scale(${p})`, opacity: frame >= d ? 1 : 0 }}>
              <Vidrio color={P.verde} style={{ width: 296, height: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <Emoji e={t.emoji} size={96} />
                <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 800, color: P.texto, textAlign: "center" }}>{t.texto}</div>
              </Vidrio>
            </div>
          );
        })}
      </div>
      <Golpe desde={170}>
        <Chico size={44}>
          Lo decide el <b style={{ color: P.verde }}>endocrinólogo</b> según tu caso.
        </Chico>
      </Golpe>
      <div style={{ transform: `scale(${alerta})`, marginTop: 10 }}>
        <div
          style={{
            width: 940,
            background: P.amarillo,
            borderRadius: 30,
            padding: "22px 30px",
            display: "flex",
            alignItems: "center",
            gap: 22,
            boxShadow: `0 0 50px ${P.amarillo}88`,
            fontFamily: SANS,
          }}
        >
          <Emoji e="⚠️" size={80} />
          <div style={{ fontSize: 40, fontWeight: 800, color: "#071630", lineHeight: 1.2 }}>
            Sin tratar puede causar arritmias y huesos más frágiles
          </div>
        </div>
      </div>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🦋" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={86}>
        Si te sentís así, pedí un <Marcador desde={20} color={P.amarillo}>análisis de tiroides</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 30 }}>
      <Boton desde={45} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={58} emoji="📲" texto="Compartilo" color={P.cian} />
    </div>
    <Golpe desde={80}>
      <Chico size={32} color={P.texto2}>
        Esto no reemplaza la consulta con tu médico.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  sintomas: Sintomas,
  hiperHipo: HiperHipo,
  causas: Causas,
  diagnostico: Diagnostico,
  tratamiento: Tratamiento,
  cierre: Cierre,
};

export const Hipertiroidismo: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,16,12,12,12,14,8 --transponer -5 --bpm 120 --estilo energico
    musica={staticFile("audio/hipertiroidismo-musica.mp3")}
  />
);

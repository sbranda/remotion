import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Pie } from "../pies/Pies";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { AYUDA, FPS, PAGINAS, PaginaId, SINTOMAS, SUBE, VALORES } from "./datos";

// ─── Pie con cristales en el dedo gordo ─────────────────────────────────────
/** Articulación del dedo gordo, en coordenadas del pie (ancho 520) */
const ARTICULACION = { x: 430, y: 268 };

const PieGota: React.FC<{ cristales: number; dolor: number; ancho?: number }> = ({ cristales, dolor, ancho = 600 }) => {
  const frame = useCurrentFrame();
  const k = ancho / 520;
  const pulso = dolor > 0 ? (Math.sin(frame / 4) + 1) / 2 : 0;
  return (
    <div style={{ position: "relative", width: ancho, height: ancho * 0.62 }}>
      <Pie hinchazon={0.15 * dolor} ancho={ancho} />
      <svg width={ancho} height={ancho * 0.62} viewBox="0 0 520 320" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {/* brillo rojo del dolor */}
        <circle cx={ARTICULACION.x} cy={ARTICULACION.y} r={40 + 20 * pulso} fill={P.rojo} opacity={dolor * (0.35 + 0.35 * pulso)} style={{ filter: `blur(${8 / k}px)` }} />
        {/* cristales como agujitas */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2 + i;
          const r = 8 + ((i * 7) % 22);
          const x = ARTICULACION.x + Math.cos(a) * r;
          const y = ARTICULACION.y + Math.sin(a) * r * 0.6;
          const largo = 14 + ((i * 5) % 12);
          const op = Math.max(0, Math.min(1, cristales * 16 - i));
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + Math.cos(a * 2) * largo}
              y2={y + Math.sin(a * 2) * largo}
              stroke="#e9f6ff"
              strokeWidth={3}
              strokeLinecap="round"
              opacity={op}
              style={{ filter: "drop-shadow(0 0 4px #bfe9ff)" }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const dolor = interpolate(frame, [10, 50], [0, 1], clamp);
  const sac = useSacudida(50, 14);
  return (
    <Pagina gap={26} centro>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <PieGota cristales={dolor} dolor={dolor} />
        </div>
      </Golpe>
      <Golpe desde={8}>
        <Grande size={76}>Un dolor tan fuerte en el dedo gordo que no soportás ni la sábana 😖</Grande>
      </Golpe>
      <Golpe desde={65} giro={-5}>
        <Grande size={88}>
          Puede ser <Marcador desde={75} color={P.rojo} texto="#fff">gota</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es el ácido úrico ───────────────────────────────────────────────
const Recorrido: React.FC = () => {
  const frame = useCurrentFrame();
  const pasos = [
    { e: "🥩", t: "Comida", d: 40 },
    { e: "🟡", t: "Ácido úrico", d: 100 },
    { e: "🫘", t: "Riñones", d: 160 },
    { e: "🚽", t: "Orina", d: 220 },
  ];
  return (
    <div style={{ position: "relative", width: 940, height: 280 }}>
      <svg width={940} height={280} style={{ position: "absolute", inset: 0 }}>
        <line x1={110} y1={110} x2={830} y2={110} stroke={P.borde} strokeWidth={6} strokeDasharray="14 12" />
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 110 + (((frame - 100) * 5 + i * 120) % 720);
          return frame > 100 ? <circle key={i} cx={x} cy={110} r={12} fill={P.amarillo} style={{ filter: `drop-shadow(0 0 8px ${P.amarillo})` }} /> : null;
        })}
      </svg>
      {pasos.map((p, i) => {
        const g = useGolpe(p.d, 10);
        return (
          <div key={p.t} style={{ position: "absolute", left: 30 + i * 240, top: 30, width: 160, textAlign: "center", transform: `scale(${g})`, opacity: frame >= p.d ? 1 : 0 }}>
            <Vidrio color={P.amarillo} style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <Emoji e={p.e} size={80} />
            </Vidrio>
            <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: P.texto, marginTop: 10 }}>{p.t}</div>
          </div>
        );
      })}
    </div>
  );
};

const AcidoUrico: React.FC = () => (
  <Pagina gap={30}>
    <Golpe desde={0}>
      <Grande size={86}>
        ¿Qué es el <Marcador desde={10} color={P.amarillo}>ácido úrico</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={44}>
        Un <b style={{ color: P.amarillo }}>desecho</b> que fabrica el cuerpo al procesar algunas comidas. Los riñones lo eliminan por la orina.
      </Chico>
    </Golpe>
    <Recorrido />
    <Golpe desde={280}>
      <Chico size={40}>
        El problema es cuando <b style={{ color: P.rojo }}>se acumula</b> en la sangre.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 3. Valores ─────────────────────────────────────────────────────────────
const Valores: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26} centro>
      <Golpe desde={0}>
        <Grande size={84}>
          ¿Cuándo está <Marcador desde={10} color={P.rojo} texto="#fff">alto</Marcador>?
        </Grande>
      </Golpe>
      {VALORES.map((v, i) => {
        const d = 30 + i * 60;
        const p = useGolpe(d, 11);
        const n = interpolate(frame, [d, d + 25], [0, v.valor], { ...clamp, easing: suave });
        return (
          <div key={v.quien} style={{ opacity: frame >= d ? 1 : 0, transform: `scale(${p})` }}>
            <Vidrio color={P.rojo} style={{ width: 940, padding: "18px 32px", display: "flex", alignItems: "center", gap: 26 }}>
              <Emoji e={v.emoji} size={80} />
              <div style={{ flex: 1, fontFamily: SANS, fontSize: 46, fontWeight: 800, color: P.texto }}>{v.quien}</div>
              <div style={{ fontFamily: SANS, fontWeight: 800, color: P.rojo, textShadow: `0 0 24px ${P.rojo}`, fontSize: 80 }}>
                {"> "}
                {Math.round(n)}
                <span style={{ fontSize: 32, color: P.texto2, textShadow: "none" }}> mg/dL</span>
              </div>
            </Vidrio>
          </div>
        );
      })}
      <Golpe desde={170}>
        <Chico size={34} color={P.texto2}>
          Valores orientativos: cada laboratorio tiene los suyos. Tener el ácido úrico alto no siempre da gota.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. La gota ─────────────────────────────────────────────────────────────
const LaGota: React.FC = () => {
  const frame = useCurrentFrame();
  const cristales = interpolate(frame, [90, 220], [0, 1], clamp);
  const dolor = interpolate(frame, [220, 250], [0, 1], clamp);
  const sac = useSacudida(250, 16);
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={86}>
          ¿Y la <Marcador desde={10} color={P.rojo} texto="#fff">gota</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={25}>
        <Chico size={44}>
          Con mucho ácido úrico se forman <b style={{ color: "#bfe9ff" }}>cristales como agujitas</b> en las articulaciones.
        </Chico>
      </Golpe>
      <div style={{ transform: `translateX(${sac}px)` }}>
        <Golpe desde={60}>
          <PieGota cristales={cristales} dolor={dolor} ancho={640} />
        </Golpe>
      </div>
      <Golpe desde={260}>
        <Chico size={44}>
          El cuerpo los ataca y la articulación se <b style={{ color: P.rojo }}>inflama</b>: eso es una crisis de gota.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 5. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={88}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={25 + i * 30} emoji={s.emoji} texto={s.texto} color={P.rojo} />
      ))}
    </div>
    <Golpe desde={240}>
      <Vidrio color={P.cian} style={{ width: 940, padding: "16px 26px" }}>
        <Chico size={36}>
          🧊 En una crisis: reposo, hielo envuelto en un trapo y <b style={{ color: P.cian }}>consultá</b>. Hay tratamiento para el dolor.
        </Chico>
      </Vidrio>
    </Golpe>
  </Pagina>
);

// ─── 6. Qué lo sube ─────────────────────────────────────────────────────────
const Sube: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={88}>
        ¿Qué lo <Marcador desde={10} color={P.rojo} texto="#fff">sube</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
      {SUBE.map((s, i) => (
        <Sintoma key={s.texto} desde={25 + i * 35} emoji={s.emoji} texto={s.texto} color={P.amarillo} />
      ))}
    </div>
    <Golpe desde={290}>
      <Chico size={36} color={P.texto2}>
        También algunos medicamentos y problemas en los riñones. Es más común en hombres.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={92}>
        Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    {AYUDA.map((a, i) => (
      <Fila key={a.texto} desde={30 + i * 75} emoji={a.emoji} color={P.verde} flecha="" numero={i + 1}>
        {a.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🩸" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={84}>
        En tu próximo análisis, <Marcador desde={20} color={P.amarillo}>pedí el ácido úrico</Marcador>
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
  acidoUrico: AcidoUrico,
  valores: Valores,
  gota: LaGota,
  sintomas: Sintomas,
  sube: Sube,
  ayuda: Ayuda,
  cierre: Cierre,
};

export const Gota: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,10,14,12,14,16,8 --transponer -2 --bpm 108 --estilo energico
    musica={staticFile("audio/gota-musica.mp3")}
  />
);

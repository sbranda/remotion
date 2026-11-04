import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, useGolpe, useSacudida } from "../salud/pop";
import { CAUSAS, FPS, PAGINAS, PaginaId, SINTOMAS, TRATAMIENTOS } from "./datos";

// ─── Electrocardiograma que corre ───────────────────────────────────────────
type Ritmo = "normal" | "rapido" | "lento" | "irregular" | "fibrilacion";

/** Un latido (onda P, complejo QRS y onda T) que empieza en x0 */
const latido = (x0: number, base: number, alto: number) =>
  `L${x0} ${base} ` +
  `Q${x0 + 12} ${base - alto * 0.12} ${x0 + 24} ${base} ` + // P
  `L${x0 + 34} ${base} L${x0 + 40} ${base + alto * 0.12} L${x0 + 50} ${base - alto} L${x0 + 60} ${base + alto * 0.3} L${x0 + 66} ${base} ` + // QRS
  `L${x0 + 82} ${base} Q${x0 + 100} ${base - alto * 0.22} ${x0 + 118} ${base} `; // T

const SEPARACION: Record<Ritmo, number[]> = {
  normal: [190],
  rapido: [120],
  lento: [330],
  irregular: [190, 120, 260, 150, 300, 110, 210],
  fibrilacion: [140, 95, 180, 110, 160, 90, 200],
};

const Ecg: React.FC<{ ritmo: Ritmo; ancho?: number; alto?: number; color?: string; velocidad?: number }> = ({
  ritmo,
  ancho = 900,
  alto = 220,
  color = P.verde,
  velocidad = 6,
}) => {
  const frame = useCurrentFrame();
  const base = alto * 0.62;
  const sep = SEPARACION[ritmo];
  // trazo largo que se desplaza hacia la izquierda
  const largo = ancho * 3;
  let x = 0;
  let d = `M0 ${base} `;
  let i = 0;
  while (x < largo) {
    if (ritmo === "fibrilacion") {
      // línea de base temblorosa entre latidos
      const fin = x + sep[i % sep.length] - 70;
      for (let k = x; k < fin; k += 10) d += `L${k} ${base + Math.sin(k * 0.9) * 6 + Math.cos(k * 0.37) * 4} `;
      x = fin;
      d += `L${x} ${base} L${x + 6} ${base + alto * 0.12} L${x + 16} ${base - alto} L${x + 26} ${base + alto * 0.3} L${x + 32} ${base} `;
      x += 70;
    } else {
      d += latido(x + 20, base, alto * 0.8);
      x += sep[i % sep.length];
    }
    i++;
  }
  const desplazamiento = (frame * velocidad) % ancho;
  return (
    <svg width={ancho} height={alto} viewBox={`0 0 ${ancho} ${alto}`} style={{ overflow: "hidden", display: "block" }}>
      {/* cuadrícula de papel de electro */}
      {Array.from({ length: Math.ceil(ancho / 40) }).map((_, k) => (
        <line key={`v${k}`} x1={k * 40} y1={0} x2={k * 40} y2={alto} stroke="rgba(255,255,255,0.06)" strokeWidth={2} />
      ))}
      {Array.from({ length: Math.ceil(alto / 40) }).map((_, k) => (
        <line key={`h${k}`} x1={0} y1={k * 40} x2={ancho} y2={k * 40} stroke="rgba(255,255,255,0.06)" strokeWidth={2} />
      ))}
      <g transform={`translate(${-desplazamiento} 0)`}>
        <path d={d} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </g>
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const salto = frame % 40 > 30 ? 1.25 : 1;
  const sac = useSacudida(30, 14);
  return (
    <Pagina gap={34} centro>
      <Golpe desde={0}>
        <div style={{ transform: `scale(${salto}) translateX(${sac}px)` }}>
          <Emoji e="💓" size={150} />
        </div>
      </Golpe>
      <Golpe desde={4}>
        <Vidrio color={P.rojo} style={{ padding: 10, overflow: "hidden" }}>
          <Ecg ritmo="irregular" color={P.rojo} ancho={880} alto={200} />
        </Vidrio>
      </Golpe>
      <Golpe desde={10}>
        <Grande size={80}>¿Sentiste que el corazón se salta un latido?</Grande>
      </Golpe>
      <Golpe desde={55} giro={-6}>
        <Grande size={92}>
          Hablemos de <Marcador desde={65} color={P.rojo} texto="#fff">arritmias</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es: los cuatro ritmos ───────────────────────────────────────────
const RITMOS: { ritmo: Ritmo; titulo: string; detalle: string; color: string; desde: number }[] = [
  { ritmo: "normal", titulo: "Normal", detalle: "60 a 100 latidos por minuto", color: P.verde, desde: 60 },
  { ritmo: "rapido", titulo: "Muy rápido", detalle: "Taquicardia", color: P.rojo, desde: 160 },
  { ritmo: "lento", titulo: "Muy lento", detalle: "Bradicardia", color: P.cian, desde: 240 },
  { ritmo: "irregular", titulo: "Irregular", detalle: "Sin un ritmo parejo", color: P.amarillo, desde: 320 },
];

const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Grande size={88}>
          ¿Qué es una <Marcador desde={8} color={P.rojo} texto="#fff">arritmia</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={42}>Cuando el corazón late fuera de su ritmo:</Chico>
      </Golpe>
      {RITMOS.map((r) => {
        const p = useGolpe(r.desde, 11);
        return (
          <div key={r.ritmo} style={{ opacity: frame >= r.desde ? 1 : 0, transform: `translateX(${(1 - p) * -400}px)` }}>
            <Vidrio color={r.color} style={{ width: 940, padding: "8px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 250, fontFamily: SANS }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: r.color, lineHeight: 1.1 }}>{r.titulo}</div>
                <div style={{ fontSize: 26, fontWeight: 600, color: P.texto2 }}>{r.detalle}</div>
              </div>
              <Ecg ritmo={r.ritmo} color={r.color} ancho={630} alto={130} velocidad={5} />
            </Vidrio>
          </div>
        );
      })}
    </Pagina>
  );
};

// ─── 3. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Cómo se <Marcador desde={10} color={P.amarillo}>siente</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={30 + i * 35} emoji={s.emoji} texto={s.texto} color={P.rojo} />
      ))}
    </div>
    <Golpe desde={260}>
      <Chico size={40} color={P.texto2}>
        Ojo: algunas arritmias no dan ningún síntoma.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 4. Fibrilación auricular ───────────────────────────────────────────────
const Fibrilacion: React.FC = () => {
  const alerta = useGolpe(200, 9);
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <Grande size={80}>
          La más común: <Marcador desde={10} color={P.amarillo}>fibrilación auricular</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={30}>
        <Vidrio color={P.amarillo} style={{ padding: 10 }}>
          <Ecg ritmo="fibrilacion" color={P.amarillo} ancho={900} alto={220} />
        </Vidrio>
      </Golpe>
      <Golpe desde={70}>
        <Chico size={46}>
          El corazón late de forma <b style={{ color: P.amarillo }}>desordenada</b>, y es más frecuente después de los 60.
        </Chico>
      </Golpe>
      <div style={{ transform: `scale(${alerta})` }}>
        <div
          style={{
            width: 940,
            background: P.rojo,
            borderRadius: 30,
            padding: "22px 30px",
            display: "flex",
            alignItems: "center",
            gap: 22,
            boxShadow: `0 0 50px ${P.rojo}88`,
            fontFamily: SANS,
          }}
        >
          <Emoji e="🧠" size={80} />
          <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
            Puede formar coágulos y aumenta el riesgo de ACV
          </div>
        </div>
      </div>
    </Pagina>
  );
};

// ─── 5. Causas ──────────────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Qué la puede <Marcador desde={10} color={P.rojo} texto="#fff">causar</Marcador>?
      </Grande>
    </Golpe>
    {CAUSAS.map((c, i) => (
      <Fila key={c.texto} desde={28 + i * 55} emoji={c.emoji} color={P.rojo} flecha="!">
        {c.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 6. Tomate el pulso ─────────────────────────────────────────────────────
const Pulso: React.FC = () => {
  const frame = useCurrentFrame();
  // cuenta de 30 segundos acelerada
  const cuenta = Math.floor(interpolate(frame, [120, 240], [0, 30], clamp));
  const latidoVisible = frame > 120 && frame < 245 && frame % 8 < 3;
  return (
    <Pagina gap={28}>
      <Golpe desde={0}>
        <Grande size={92}>
          Tomate el <Marcador desde={10} color={P.verde}>pulso</Marcador>
        </Grande>
      </Golpe>
      {[
        { n: 1, e: "✌️", t: "Apoyá dos dedos en la muñeca, debajo del pulgar", d: 30 },
        { n: 2, e: "⏱️", t: "Contá los latidos durante 30 segundos", d: 80 },
        { n: 3, e: "✖️", t: "Multiplicá por 2", d: 250 },
      ].map((s) => (
        <Fila key={s.n} desde={s.d} emoji={s.e} color={P.verde} flecha="" numero={s.n}>
          {s.t}
        </Fila>
      ))}
      <Golpe desde={120}>
        <Vidrio color={P.verde} style={{ width: 600, padding: "16px 30px", display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <div style={{ transform: `scale(${latidoVisible ? 1.3 : 1})` }}>
            <Emoji e="💚" size={70} />
          </div>
          <div style={{ fontFamily: SANS, fontSize: 64, fontWeight: 800, color: P.texto, fontVariantNumeric: "tabular-nums" }}>
            {cuenta} s
          </div>
        </Vidrio>
      </Golpe>
      <Golpe desde={290}>
        <Chico size={40}>
          ¿Es muy irregular o está fuera de 60 a 100 en reposo? <b style={{ color: P.amarillo }}>Consultá</b>
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 7. Diagnóstico y tratamiento ───────────────────────────────────────────
const Tratamiento: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={84}>
          Se detecta con un <Marcador desde={10} color={P.cian}>electrocardiograma</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={30}>
        <Chico size={40} color={P.texto2}>
          A veces con un Holter: un electro que llevás puesto 24 horas ⌚
        </Chico>
      </Golpe>
      <Golpe desde={110}>
        <Chico size={46}>
          Y se trata según el tipo de arritmia:
        </Chico>
      </Golpe>
      <div style={{ display: "flex", gap: 24 }}>
        {TRATAMIENTOS.map((t, i) => {
          const d = 140 + i * 40;
          const p = useGolpe(d, 9);
          return (
            <div key={t.texto} style={{ transform: `scale(${p})`, opacity: frame >= d ? 1 : 0 }}>
              <Vidrio color={P.verde} style={{ width: 296, height: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <Emoji e={t.emoji} size={90} />
                <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: P.texto, textAlign: "center", padding: "0 10px" }}>{t.texto}</div>
              </Vidrio>
            </div>
          );
        })}
      </div>
    </Pagina>
  );
};

// ─── 8. Urgencias y cierre ──────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const sirena = Math.floor(frame / 8) % 2 === 0;
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <div
          style={{
            width: 940,
            background: sirena ? P.rojo : "#c9303f",
            borderRadius: 30,
            padding: "24px 30px",
            boxShadow: `0 0 60px ${P.rojo}${sirena ? "cc" : "55"}`,
            fontFamily: SANS,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800, color: "#fff" }}>🚨 Llamá al 107 o al 911</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff", marginTop: 8, lineHeight: 1.3 }}>
            si tenés dolor de pecho, te desmayás o te falta mucho el aire
          </div>
        </div>
      </Golpe>
      <Golpe desde={70}>
        <Grande size={78}>
          Y si notás el pulso raro, <Marcador desde={85} color={P.amarillo}>consultá</Marcador> 🩺
        </Grande>
      </Golpe>
      <div style={{ display: "flex", gap: 30 }}>
        <Boton desde={130} emoji="🔖" texto="Guardalo" color={P.verde} />
        <Boton desde={143} emoji="📲" texto="Compartilo" color={P.cian} />
      </div>
      <Golpe desde={165}>
        <Chico size={32} color={P.texto2}>
          Esto no reemplaza la consulta con tu médico.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  sintomas: Sintomas,
  fibrilacion: Fibrilacion,
  causas: Causas,
  pulso: Pulso,
  tratamiento: Tratamiento,
  cierre: Cierre,
};

export const Arritmia: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,14,12,12,14,12,12,10 --transponer 3 --bpm 112 --estilo energico
    musica={staticFile("audio/arritmia-musica.mp3")}
  />
);

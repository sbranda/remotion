import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { AYUDA, COMIDAS, COMPLICACIONES, FPS, PAGINAS, PaginaId, QUIEN, RANGOS, SINTOMAS, TIPOS } from "./datos";

// ─── Piezas animadas ────────────────────────────────────────────────────────

/** Bolitas de glucosa amarillas */
const Bolita: React.FC<{ x: number; y: number; r?: number; op?: number }> = ({ x, y, r = 16, op = 1 }) => (
  <circle cx={x} cy={y} r={r} fill={P.amarillo} opacity={op} style={{ filter: `drop-shadow(0 0 8px ${P.amarillo})` }} />
);

/**
 * Célula con puerta. Modo "normal": llega la llave (insulina), abre la puerta y entra la glucosa.
 * Modo "diabetes": la llave no llega (o no funciona) y la glucosa se junta afuera.
 */
const Celula: React.FC<{ modo: "normal" | "diabetes"; desde: number }> = ({ modo, desde }) => {
  const frame = useCurrentFrame();
  const t = frame - desde;
  const W = 940;
  const H = 560;
  const cx = 620;
  const cy = 280;
  const R = 200;
  const normal = modo === "normal";
  // llave: viaja de la izquierda a la puerta
  const llave = interpolate(t, [20, 70], [0, 1], { ...clamp, easing: suave });
  const abre = normal ? interpolate(t, [75, 95], [0, 1], clamp) : 0;
  const energia = normal ? interpolate(t, [190, 230], [0, 1], clamp) : 0;
  const llaveFalla = !normal && t > 70 ? Math.sin(t * 1.5) * 8 : 0;
  // bolitas de glucosa en la sangre (a la izquierda)
  const bolitas = Array.from({ length: normal ? 10 : 22 }).map((_, i) => {
    const baseX = 60 + ((i * 97) % 300);
    const baseY = 80 + ((i * 173) % 400);
    if (normal) {
      // después de abrir, cada bolita entra a la célula
      const entra = interpolate(t, [100 + i * 8, 140 + i * 8], [0, 1], { ...clamp, easing: suave });
      const destX = cx - 60 + ((i * 41) % 120);
      const destY = cy - 70 + ((i * 59) % 140);
      return { x: baseX + (destX - baseX) * entra, y: baseY + (destY - baseY) * entra + Math.sin(frame / 10 + i) * 6 * (1 - entra) };
    }
    // diabetes: se acumulan y aparecen más
    return { x: baseX + Math.sin(frame / 12 + i) * 8, y: baseY + Math.cos(frame / 14 + i) * 8, op: interpolate(t, [i * 10, i * 10 + 15], [0, 1], clamp) };
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      {/* sangre */}
      <rect x={0} y={20} width={400} height={H - 40} rx={40} fill="#3a0d22" stroke="#ff7a86" strokeWidth={4} opacity={0.9} />
      <text x={200} y={60} textAnchor="middle" fontFamily={SANS} fontSize={30} fontWeight={800} fill="#ffb3ba">
        SANGRE
      </text>
      {/* célula */}
      <circle cx={cx} cy={cy} r={R} fill={normal ? `rgba(46,229,157,${0.1 + 0.3 * energia})` : "rgba(58,215,255,0.08)"} stroke={normal ? P.verde : P.cian} strokeWidth={8} style={{ filter: `drop-shadow(0 0 ${10 + 30 * energia}px ${P.verde})` }} />
      <text x={cx} y={cy + R - 30} textAnchor="middle" fontFamily={SANS} fontSize={30} fontWeight={800} fill={P.texto}>
        CÉLULA
      </text>
      {/* puerta en el borde izquierdo de la célula */}
      <g transform={`translate(${cx - R} ${cy})`}>
        <rect x={-14} y={-50} width={28} height={100} rx={8} fill={P.fondo1} />
        <g transform={`rotate(${-80 * abre} 0 -50)`}>
          <rect x={-10} y={-50} width={20} height={100} rx={6} fill={normal ? P.verde : P.cian} />
        </g>
      </g>
      {bolitas.map((b, i) => (
        <Bolita key={i} x={b.x} y={b.y} op={"op" in b ? (b.op as number) : 1} />
      ))}
      {/* llave = insulina */}
      <g transform={`translate(${40 + (cx - R - 110) * llave + llaveFalla} ${cy - 150 + 120 * llave})`} opacity={t > 15 ? 1 : 0}>
        <text fontSize={80} fontFamily="'Noto Color Emoji', sans-serif">
          🔑
        </text>
      </g>
      {!normal && t > 80 && (
        <text x={cx - R - 50} y={cy - 70} fontSize={70} fontFamily="'Noto Color Emoji', sans-serif">
          ❌
        </text>
      )}
      {normal && energia > 0 && (
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize={90} opacity={energia} fontFamily="'Noto Color Emoji', sans-serif">
          ⚡
        </text>
      )}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const sac = useSacudida(100, 12);
  return (
    <Pagina gap={30} centro>
      <div style={{ display: "flex", gap: 30, transform: `translateX(${sac}px)` }}>
        {["🥤", "🚽", "😴"].map((e, i) => (
          <Golpe key={e} desde={i * 10}>
            <Vidrio color={P.amarillo} style={{ padding: 20 }}>
              <Emoji e={e} size={110} />
            </Vidrio>
          </Golpe>
        ))}
      </div>
      <Golpe desde={30}>
        <Grande size={74}>¿Mucha sed, vas al baño a cada rato y estás siempre cansado?</Grande>
      </Golpe>
      <Golpe desde={100} giro={-5}>
        <Grande size={92}>
          Hablemos de <Marcador desde={110} color={P.amarillo}>diabetes</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. La glucosa ──────────────────────────────────────────────────────────
const Glucosa: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={92}>
          ¿Qué es la <Marcador desde={10} color={P.amarillo}>glucosa</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={25}>
        <Chico size={46}>
          Es el <b style={{ color: P.amarillo }}>azúcar de tu sangre</b>: el combustible de tu cuerpo ⛽
        </Chico>
      </Golpe>
      <div style={{ position: "relative", width: 940, height: 520 }}>
        {COMIDAS.map((c, i) => {
          const d = 120 + i * 25;
          const baja = interpolate(frame, [d, d + 60], [0, 1], { ...clamp, easing: suave });
          const x = 80 + i * 150;
          return (
            <div key={c} style={{ position: "absolute", left: x, top: 20 + 250 * baja, opacity: frame >= d ? 1 - 0.9 * baja : 0, transform: `scale(${1 - 0.5 * baja})` }}>
              <Emoji e={c} size={100} />
            </div>
          );
        })}
        <svg width={940} height={520} style={{ position: "absolute", inset: 0 }}>
          <rect x={20} y={330} width={900} height={170} rx={60} fill="#3a0d22" stroke="#ff7a86" strokeWidth={5} />
          {Array.from({ length: 14 }).map((_, i) => {
            const aparece = interpolate(frame, [170 + i * 10, 190 + i * 10], [0, 1], clamp);
            const x = ((frame * 4 + i * 70) % 860) + 40;
            return <Bolita key={i} x={x} y={415 + Math.sin(i * 1.7 + frame / 10) * 40} op={aparece} />;
          })}
        </svg>
      </div>
      <Golpe desde={300}>
        <Chico size={40} color={P.texto2}>
          Sale de lo que comés: pan, pastas, papa, frutas y dulces.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 3. La insulina, la llave ───────────────────────────────────────────────
const Insulina: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={92}>
        La <Marcador desde={10} color={P.verde}>insulina</Marcador> es la llave 🔑
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={42}>La fabrica el páncreas y abre las células para que la glucosa entre y se use como energía.</Chico>
    </Golpe>
    <Golpe desde={40}>
      <Celula modo="normal" desde={60} />
    </Golpe>
  </Pagina>
);

// ─── 4. Qué es la diabetes ──────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={24}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Y la <Marcador desde={10} color={P.rojo} texto="#fff">diabetes</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={42}>La llave falta o no funciona bien: la glucosa no entra y se acumula en la sangre.</Chico>
    </Golpe>
    <Golpe desde={40}>
      <Celula modo="diabetes" desde={60} />
    </Golpe>
    <Golpe desde={300}>
      <Grande size={60} color={P.rojo} style={{ textShadow: `0 0 30px ${P.rojo}` }}>
        Glucosa alta ↑
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 5. Tipos ───────────────────────────────────────────────────────────────
const Tipos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={92}>
          Los <Marcador desde={10} color={P.cian}>tipos</Marcador>
        </Grande>
      </Golpe>
      {TIPOS.map((t, i) => {
        const d = 30 + i * 170;
        const p = useGolpe(d, 11);
        const color = [P.cian, P.amarillo, P.violeta][i];
        return (
          <div key={t.nombre} style={{ opacity: frame >= d ? 1 : 0, transform: `translateX(${(1 - p) * -500}px)` }}>
            <Vidrio color={color} style={{ width: 940, padding: "20px 28px", display: "flex", alignItems: "center", gap: 24 }}>
              <Emoji e={t.emoji} size={90} />
              <div style={{ fontFamily: SANS }}>
                <div style={{ fontSize: 50, fontWeight: 800, color, textShadow: `0 0 20px ${color}` }}>{t.nombre}</div>
                <div style={{ fontSize: 34, fontWeight: 600, color: P.texto, lineHeight: 1.3 }}>{t.texto}</div>
              </div>
            </Vidrio>
          </div>
        );
      })}
    </Pagina>
  );
};

// ─── 6. Valores ─────────────────────────────────────────────────────────────
const Valores: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={86}>
          Glucosa <Marcador desde={10} color={P.cian}>en ayunas</Marcador>
        </Grande>
      </Golpe>
      {RANGOS.map((r, i) => {
        const d = 30 + i * 80;
        const p = useGolpe(d, 11);
        return (
          <div key={r.nombre} style={{ opacity: frame >= d ? 1 : 0, transform: `scale(${p})` }}>
            <Vidrio color={r.color} style={{ width: 940, padding: "18px 30px", display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: r.color, boxShadow: `0 0 24px ${r.color}`, flexShrink: 0 }} />
              <div style={{ fontFamily: SANS }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: r.color }}>{r.nombre}</div>
                <div style={{ fontSize: 58, fontWeight: 800, color: P.texto, lineHeight: 1.1 }}>{r.valor}</div>
              </div>
            </Vidrio>
          </div>
        );
      })}
      <Golpe desde={300}>
        <Chico size={34} color={P.texto2}>
          El diagnóstico se confirma con dos análisis. También se usa la hemoglobina glicosilada (6,5 % o más).
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 7. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={92}>
        Las <Marcador desde={10} color={P.amarillo}>señales</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
      {SINTOMAS.map((s, i) => (
        <Sintoma key={s.texto} desde={30 + i * 40} emoji={s.emoji} texto={s.texto} color={i === SINTOMAS.length - 1 ? P.cian : P.amarillo} />
      ))}
    </div>
  </Pagina>
);

// ─── 8. Prediabetes ─────────────────────────────────────────────────────────
const Prediabetes: React.FC = () => (
  <Pagina gap={30}>
    <Golpe desde={0}>
      <Grande size={86}>
        La <Marcador desde={10} color={P.amarillo}>prediabetes</Marcador> es una alarma 🚦
      </Grande>
    </Golpe>
    <Golpe desde={40}>
      <Chico size={46}>La glucosa ya está alta, pero todavía no es diabetes.</Chico>
    </Golpe>
    <Golpe desde={130}>
      <Vidrio color={P.verde} style={{ width: 940, padding: "24px 30px" }}>
        <Chico size={46}>
          <b style={{ color: P.verde }}>La buena noticia:</b> moverte y bajar un poco de peso puede frenarla o hacerla retroceder 💪
        </Chico>
      </Vidrio>
    </Golpe>
  </Pagina>
);

// ─── 9. Complicaciones ──────────────────────────────────────────────────────
const Complicaciones: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={84}>
        Si no se controla, <Marcador desde={10} color={P.rojo} texto="#fff">daña</Marcador>…
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
      {COMPLICACIONES.map((c, i) => (
        <Sintoma key={c.texto} desde={30 + i * 35} emoji={c.emoji} texto={c.texto} color={P.rojo} />
      ))}
    </div>
    <Golpe desde={290}>
      <Chico size={38} color={P.texto2}>
        Con buen control, se puede vivir muy bien.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 10. Quién debería medirse ──────────────────────────────────────────────
const Quien: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={84}>
        ¿Quién debería <Marcador desde={10} color={P.cian}>medirse</Marcador>?
      </Grande>
    </Golpe>
    {QUIEN.map((q, i) => (
      <Fila key={q.texto} desde={25 + i * 45} emoji={q.emoji} color={P.cian} flecha="✓">
        {q.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 11. Qué ayuda ──────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={18}>
    <Golpe desde={0}>
      <Grande size={92}>
        Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    {AYUDA.map((a, i) => (
      <Fila key={a.texto} desde={30 + i * 95} emoji={a.emoji} color={P.verde} flecha="" numero={i + 1}>
        {a.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 12. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🩸" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={84}>
        Un análisis de glucosa <Marcador desde={20} color={P.amarillo}>puede cambiarte la vida</Marcador>
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
  glucosa: Glucosa,
  insulina: Insulina,
  queEs: QueEs,
  tipos: Tipos,
  valores: Valores,
  sintomas: Sintomas,
  prediabetes: Prediabetes,
  complicaciones: Complicaciones,
  quien: Quien,
  ayuda: Ayuda,
  cierre: Cierre,
};

export const Diabetes: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 6,16,18,16,20,18,18,14,14,10,22,8 --transponer 2 --bpm 110 --estilo energico
    musica={staticFile("audio/diabetes-musica.mp3")}
  />
);

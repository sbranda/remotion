import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { ALARMAS, ALGO_MAS, COMUNES, FPS, PAGINAS, PaginaId, TIPS } from "./datos";

// ─── Pie de perfil que se hincha ────────────────────────────────────────────
export const Pie: React.FC<{ hinchazon: number; ancho?: number }> = ({ hinchazon, ancho = 520 }) => {
  // hinchazon 0..1: tobillo y empeine se agrandan
  const h = hinchazon;
  const tobillo = 70 + 30 * h;
  const empeine = 40 * h;
  const color = h > 0.5 ? P.rojo : P.cian;
  const d = `
    M ${200 - tobillo} 20
    L ${200 - tobillo - 6 * h} 170
    C ${190 - tobillo - 20 * h} 230 ${120 - 10 * h} 250 ${60 - 10 * h} 262
    C ${20 - 10 * h} 272 ${20 - 10 * h} 310 ${60} 312
    L 470 312
    C ${500 + 10 * h} 312 ${505 + 10 * h} 282 ${470} ${262 - empeine * 0.4}
    C 400 ${236 - empeine} ${300 + 10 * h} ${210 - empeine} ${200 + tobillo} 170
    L ${200 + tobillo} 20 Z`;
  return (
    <svg width={ancho} height={ancho * 0.62} viewBox="0 0 520 320" style={{ overflow: "visible" }}>
      <path d={d} fill={`${color}33`} stroke={color} strokeWidth={8} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 ${10 + 20 * h}px ${color})` }} />
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [10, 70], [0, 1], { ...clamp, easing: suave });
  const sac = useSacudida(72, 10);
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <Pie hinchazon={h} />
        </div>
      </Golpe>
      <Golpe desde={8}>
        <Grande size={84}>¿Llegás a la noche con los pies como globos? 🎈</Grande>
      </Golpe>
      <Golpe desde={60} giro={-6}>
        <Grande size={80}>
          <Marcador desde={70} color={P.cian}>Te cuento por qué</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es: el líquido baja por la gravedad ─────────────────────────────
const Gotas: React.FC = () => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [60, 300], [0, 1], clamp);
  return (
    <div style={{ position: "relative", width: 560, height: 420 }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const y = ((frame * 3 + i * 45) % 260) - 20;
        const x = 150 + ((i * 53) % 230);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: 1 - y / 280 }}>
            <Emoji e="💧" size={40} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 20, bottom: 0 }}>
        <Pie hinchazon={h} ancho={520} />
      </div>
    </div>
  );
};

const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={92}>
        ¿Por qué se <Marcador desde={8} color={P.cian}>hinchan</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Chico size={46}>
        Se junta <b style={{ color: P.cian }}>líquido</b> en los tejidos. Por la gravedad, va a parar a los pies y los tobillos.
      </Chico>
    </Golpe>
    <Golpe desde={40}>
      <Gotas />
    </Golpe>
    <Golpe desde={240}>
      <Chico size={42} color={P.texto2}>
        Se llama <b style={{ color: P.texto }}>edema</b>.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 3. La prueba del dedo (fóvea) ──────────────────────────────────────────
const Fovea: React.FC = () => {
  const frame = useCurrentFrame();
  // el dedo baja, aprieta 5 segundos (acelerado) y sube; el hoyito tarda en irse
  const baja = interpolate(frame, [60, 80], [0, 1], { ...clamp, easing: suave });
  const sube = interpolate(frame, [170, 185], [0, 1], { ...clamp, easing: suave });
  const dedo = baja - sube;
  const hoyo = frame < 80 ? 0 : interpolate(frame, [80, 100, 190, 360], [0, 1, 1, 0.45], clamp);
  const cuenta = Math.min(5, Math.max(0, Math.floor(interpolate(frame, [80, 170], [0, 5.99], clamp))));
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={88}>
          La prueba del <Marcador desde={10} color={P.amarillo}>dedo</Marcador>
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Chico size={42}>Apretá 5 segundos sobre el tobillo o la canilla y soltá.</Chico>
      </Golpe>
      <div style={{ position: "relative", width: 700, height: 360 }}>
        <svg width={700} height={360} viewBox="0 0 700 360" style={{ position: "absolute", inset: 0 }}>
          <path
            d={`M0 200 L250 200 Q350 ${200 + 70 * hoyo} 450 200 L700 200 L700 360 L0 360 Z`}
            fill="#f2b9a0"
            stroke={P.amarillo}
            strokeWidth={6}
            style={{ filter: `drop-shadow(0 0 16px ${P.amarillo}66)` }}
          />
        </svg>
        <div style={{ position: "absolute", left: 300, top: -60 + 170 * dedo, transform: "rotate(180deg)", opacity: 1 - sube }}>
          <Emoji e="👆" size={120} />
        </div>
        {frame >= 80 && frame < 175 && (
          <div style={{ position: "absolute", right: 30, top: 20, fontFamily: SANS, fontSize: 80, fontWeight: 800, color: P.amarillo, textShadow: `0 0 20px ${P.amarillo}` }}>
            {cuenta}s
          </div>
        )}
      </div>
      <Golpe desde={200}>
        <Vidrio color={P.amarillo} style={{ width: 920, padding: "20px 28px" }}>
          <Chico size={42}>
            ¿Quedó un <b style={{ color: P.amarillo }}>hoyito</b> que tarda en irse? Es edema. Contáselo a tu médico.
          </Chico>
        </Vidrio>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. Causas comunes ──────────────────────────────────────────────────────
const Comunes: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={88}>
        Lo más <Marcador desde={10} color={P.verde}>común</Marcador>
      </Grande>
    </Golpe>
    {COMUNES.map((c, i) => (
      <Fila key={c.texto} desde={28 + i * 50} emoji={c.emoji} color={P.verde} flecha="✓">
        {c.texto}
      </Fila>
    ))}
    <Golpe desde={300}>
      <Chico size={40} color={P.texto2}>
        En estos casos suele mejorar con descanso y piernas en alto.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Cuando puede ser algo más ───────────────────────────────────────────
const AlgoMas: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={84}>
        A veces es una señal de <Marcador desde={10} color={P.amarillo}>algo más</Marcador>
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 22 }}>
      {ALGO_MAS.map((a, i) => (
        <Sintoma key={a.texto} desde={30 + i * 35} emoji={a.emoji} texto={a.texto} color={P.amarillo} />
      ))}
    </div>
    <Golpe desde={280}>
      <Chico size={42}>
        Si se repite o no baja, <b style={{ color: P.amarillo }}>consultá</b>.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 6. Señales de alarma ───────────────────────────────────────────────────
const Alarmas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={92}>
          🚨 <Marcador desde={10} color={P.rojo} texto="#fff">Urgente</Marcador> si:
        </Grande>
      </Golpe>
      {ALARMAS.map((a, i) => {
        const d = 30 + i * 110;
        const p = useGolpe(d, 10);
        const titila = frame > d + 20 && Math.floor(frame / 10) % 2 === 0;
        return (
          <div key={a.titulo} style={{ opacity: frame >= d ? 1 : 0, transform: `scale(${p})` }}>
            <Vidrio color={P.rojo} style={{ width: 940, padding: "20px 26px", display: "flex", alignItems: "center", gap: 22, boxShadow: `0 0 ${titila ? 50 : 25}px ${P.rojo}88` }}>
              <Emoji e={a.emoji} size={80} />
              <div style={{ fontFamily: SANS, flex: 1 }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: P.texto, lineHeight: 1.2 }}>{a.titulo}</div>
                <div style={{ fontSize: 34, fontWeight: 700, color: P.rojo, marginTop: 6 }}>{a.texto}</div>
              </div>
            </Vidrio>
          </div>
        );
      })}
    </Pagina>
  );
};

// ─── 7. Tips ────────────────────────────────────────────────────────────────
const Tips: React.FC = () => (
  <Pagina gap={18}>
    <Golpe desde={0}>
      <Grande size={92}>
        Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    {TIPS.map((t, i) => (
      <Fila key={t.texto} desde={28 + i * 55} emoji={t.emoji} color={P.verde} flecha="" numero={i + 1}>
        {t.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🦶" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={86}>
        Si se repite seguido, <Marcador desde={20} color={P.amarillo}>consultá</Marcador> a tu médico
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
  fovea: Fovea,
  comunes: Comunes,
  algoMas: AlgoMas,
  alarmas: Alarmas,
  tips: Tips,
  cierre: Cierre,
};

export const Pies: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,12,14,14,14,12,8 --transponer 1 --bpm 108 --estilo energico
    musica={staticFile("audio/pies-musica.mp3")}
  />
);

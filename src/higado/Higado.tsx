import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe } from "../salud/pop";
import { AYUDA, ETAPAS, FPS, PAGINAS, PaginaId, RIESGOS } from "./datos";

// ─── El hígado ──────────────────────────────────────────────────────────────
const CONTORNO = "M40 120 C40 60 120 30 230 34 C330 38 420 40 470 70 C500 90 488 130 450 150 C400 178 340 200 280 236 C230 266 170 270 120 250 C70 230 40 180 40 120 Z";

/** Gotitas de grasa repartidas dentro del hígado */
const GOTAS = Array.from({ length: 26 }).map((_, i) => ({
  x: 90 + ((i * 71) % 330),
  y: 70 + ((i * 47) % 150),
  r: 9 + ((i * 13) % 12),
}));

const Higado: React.FC<{ grasa: number; cicatriz?: number; color?: string; ancho?: number; latido?: number }> = ({ grasa, cicatriz = 0, color = P.verde, ancho = 520, latido = 0 }) => (
  <svg width={ancho} height={ancho * 0.58} viewBox="0 0 520 300" style={{ overflow: "visible" }}>
    <defs>
      <clipPath id={`higado-${ancho}`}>
        <path d={CONTORNO} />
      </clipPath>
    </defs>
    <path d={CONTORNO} fill="#7a2a3a" stroke={color} strokeWidth={8} style={{ filter: `drop-shadow(0 0 ${14 + latido * 10}px ${color})` }} />
    <g clipPath={`url(#higado-${ancho})`}>
      {GOTAS.map((g, i) => {
        const aparece = Math.max(0, Math.min(1, grasa * GOTAS.length - i));
        return <circle key={i} cx={g.x} cy={g.y + ((i * 17) % 40)} r={g.r * aparece} fill={P.amarillo} opacity={0.85} />;
      })}
      {/* cicatrices: líneas grises */}
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={`c${i}`}
          d={`M${70 + i * 55} ${60 + ((i * 37) % 60)} l40 ${50 + ((i * 11) % 40)} l-20 50`}
          stroke="#c9c9d6"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          opacity={Math.max(0, Math.min(1, cicatriz * 7 - i))}
        />
      ))}
    </g>
  </svg>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const grasa = interpolate(frame, [5, 80], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <Higado grasa={grasa} color={grasa > 0.5 ? P.amarillo : P.verde} />
      </Golpe>
      <Golpe desde={10}>
        <Grande size={80}>Tu hígado se puede llenar de grasa…</Grande>
      </Golpe>
      <Golpe desde={60} giro={-5}>
        <Grande size={88}>
          <Marcador desde={70} color={P.amarillo}>y no te avisa</Marcador>
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  const grasa = interpolate(frame, [80, 260], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <Grande size={86}>
          ¿Qué es el <Marcador desde={10} color={P.amarillo}>hígado graso</Marcador>?
        </Grande>
      </Golpe>
      <Golpe desde={25}>
        <Chico size={46}>
          Es cuando se acumula <b style={{ color: P.amarillo }}>grasa de más</b> dentro del hígado.
        </Chico>
      </Golpe>
      <Golpe desde={50}>
        <Higado grasa={grasa} color={grasa > 0.5 ? P.amarillo : P.verde} ancho={600} />
      </Golpe>
      <Golpe desde={270}>
        <Chico size={36} color={P.texto2}>
          Hoy los médicos también lo llaman enfermedad hepática asociada a disfunción metabólica.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 3. Es muy común ────────────────────────────────────────────────────────
const Comun: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30} centro>
      <div style={{ display: "flex", gap: 40 }}>
        {[0, 1, 2].map((i) => {
          const p = useGolpe(10 + i * 10, 10);
          const marca = frame > 60 && i === 2;
          return (
            <div key={i} style={{ transform: `scale(${p * (marca ? 1.15 : 1)})`, filter: marca ? `drop-shadow(0 0 30px ${P.amarillo})` : "grayscale(1) opacity(0.5)" }}>
              <Emoji e="🧍" size={170} />
            </div>
          );
        })}
      </div>
      <Golpe desde={65}>
        <Grande size={70}>
          Lo tiene <span style={{ color: P.amarillo }}>1 de cada 3 adultos</span>
        </Grande>
      </Golpe>
      <Golpe desde={130}>
        <Chico size={44}>
          Y casi nunca da síntomas. A veces, cansancio o molestia arriba a la derecha de la panza.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. Factores de riesgo ──────────────────────────────────────────────────
const Riesgos: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={84}>
        ¿Qué lo <Marcador desde={10} color={P.rojo} texto="#fff">favorece</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
      {RIESGOS.map((r, i) => (
        <Sintoma key={r.texto} desde={30 + i * 35} emoji={r.emoji} texto={r.texto} color={P.rojo} />
      ))}
    </div>
    <Golpe desde={290}>
      <Chico size={36} color={P.texto2}>
        Ojo: también puede aparecer en personas flacas.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Las etapas ──────────────────────────────────────────────────────────
const Etapas: React.FC = () => {
  const frame = useCurrentFrame();
  const paso = Math.min(ETAPAS.length - 1, Math.max(0, Math.floor((frame - 30) / 80)));
  const e = ETAPAS[paso];
  const revierte = frame > 360;
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={86}>
          Si no se trata, <Marcador desde={10} color={P.rojo} texto="#fff">avanza</Marcador>
        </Grande>
      </Golpe>
      <Higado grasa={e.grasa} cicatriz={e.cicatriz} color={e.color} ancho={560} latido={paso === 2 ? (Math.sin(frame / 4) + 1) / 2 : 0} />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {ETAPAS.map((et, i) => (
          <React.Fragment key={et.nombre}>
            {i > 0 && <span style={{ fontFamily: SANS, fontSize: 40, color: P.texto2 }}>→</span>}
            <div
              style={{
                fontFamily: SANS,
                fontSize: 34,
                fontWeight: 800,
                padding: "10px 16px",
                borderRadius: 16,
                color: i <= paso ? "#071630" : P.texto2,
                background: i <= paso ? et.color : "rgba(255,255,255,0.08)",
                boxShadow: i === paso ? `0 0 30px ${et.color}` : "none",
                transform: `scale(${i === paso ? 1.1 : 1})`,
              }}
            >
              {et.nombre}
            </div>
          </React.Fragment>
        ))}
      </div>
      <Golpe desde={360}>
        <Vidrio color={P.verde} style={{ width: 940, padding: "20px 28px", opacity: revierte ? 1 : 0 }}>
          <Chico size={44}>
            ✅ <b style={{ color: P.verde }}>La buena noticia:</b> en las primeras etapas se puede revertir.
          </Chico>
        </Vidrio>
      </Golpe>
    </Pagina>
  );
};

// ─── 6. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={30}>
    <Golpe desde={0}>
      <Grande size={86}>
        ¿Cómo se <Marcador desde={10} color={P.cian}>detecta</Marcador>?
      </Grande>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      {[
        { e: "🖥️", t: "Ecografía de abdomen", d: 30 },
        { e: "🩸", t: "Análisis de sangre del hígado", d: 80 },
      ].map((x) => (
        <Golpe key={x.t} desde={x.d}>
          <Vidrio color={P.cian} style={{ width: 448, height: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 16 }}>
            <Emoji e={x.e} size={100} />
            <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: P.texto, textAlign: "center", lineHeight: 1.2 }}>{x.t}</div>
          </Vidrio>
        </Golpe>
      ))}
    </div>
    <Golpe desde={160}>
      <Chico size={38} color={P.texto2}>
        Muchas veces se descubre de casualidad, en un chequeo.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => {
  const frame = useCurrentFrame();
  const caja = useGolpe(360, 9);
  const pct = Math.round(interpolate(frame, [375, 420], [0, 10], { ...clamp, easing: suave }));
  return (
    <Pagina gap={18}>
      <Golpe desde={0}>
        <Grande size={92}>
          Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
        </Grande>
      </Golpe>
      {AYUDA.map((a, i) => (
        <Fila key={a.texto} desde={30 + i * 60} emoji={a.emoji} color={P.verde} flecha="✓">
          {a.texto}
        </Fila>
      ))}
      <div style={{ marginTop: 6, transform: `scale(${caja})` }}>
        <div
          style={{
            width: 940,
            background: P.verde,
            borderRadius: 30,
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            gap: 26,
            boxShadow: `0 0 50px ${P.verde}88`,
            fontFamily: SANS,
          }}
        >
          <div style={{ fontSize: 100, fontWeight: 800, color: "#071630", lineHeight: 1 }}>−{pct}%</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#071630", lineHeight: 1.2 }}>
            Bajar entre 7 % y 10 % del peso puede reducir mucho la grasa del hígado
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
      <Higado grasa={0} color={P.verde} ancho={360} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={84}>
        Cuidá tu hígado: <Marcador desde={20} color={P.amarillo}>pedí un chequeo</Marcador>
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
  comun: Comun,
  riesgos: Riesgos,
  etapas: Etapas,
  diagnostico: Diagnostico,
  ayuda: Ayuda,
  cierre: Cierre,
};

export const HigadoGraso: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,8,14,16,10,18,8 --transponer 4 --bpm 112 --estilo energico
    musica={staticFile("audio/higado-musica.mp3")}
  />
);

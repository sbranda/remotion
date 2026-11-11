// Reel de 90 s: alopecia areata y vitiligo (respuesta autoinmune y estigma estético), estilo calma.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";

const FPS = 30;
const PIEL = "#b07a52";
const PIEL_CLARA = "#f3e3d3";

// ─── Defensas que atacan a una célula propia ───────────────────────────────
const Ataque: React.FC<{ confunde: number }> = ({ confunde }) => {
  const frame = useCurrentFrame();
  const N = 7;
  return (
    <svg width={760} height={360} viewBox="0 0 760 360" style={{ overflow: "visible" }}>
      {/* virus (enemigo real), a la izquierda */}
      <g opacity={1 - confunde}>
        <circle cx={130} cy={180} r={50} fill="#9be37a" stroke="#4a9a3a" strokeWidth={5} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={130 + Math.cos(a) * 62} cy={180 + Math.sin(a) * 62} r={10} fill="#4a9a3a" />;
        })}
        <text x={130} y={290} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.texto}>
          virus
        </text>
      </g>
      {/* célula propia, a la derecha */}
      <circle cx={600} cy={180} r={70} fill="#ffd9c7" stroke={C.coral} strokeWidth={6} />
      <circle cx={615} cy={170} r={24} fill={C.coral} opacity={0.6} />
      <text x={600} y={300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.texto}>
        célula propia
      </text>
      {/* defensas */}
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2 + frame / 30;
        const objetivo = confunde > 0.5 ? [600, 180] : [130, 180];
        const r = 110 - 10 * Math.sin(frame / 5 + i);
        const x = 365 + (objetivo[0] - 365) * suave(Math.min(1, confunde > 0.5 ? (confunde - 0.5) * 2 : 1 - confunde * 2)) + Math.cos(a) * (r * 0.4);
        const y = objetivo[1] + Math.sin(a) * (r * 0.8);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={20} fill={C.violeta} />
            <text x={x} y={y + 8} textAnchor="middle" fontSize={22}>
              🛡️
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Piel: los melanocitos se apagan y aparece la mancha ───────────────────
const Piel: React.FC<{ mancha: number }> = ({ mancha }) => {
  const radio = 210 * mancha;
  const cx = 430;
  const cy = 180;
  return (
    <svg width={860} height={360} viewBox="0 0 860 360" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="piel-clip">
          <rect x={0} y={0} width={860} height={360} rx={40} />
        </clipPath>
      </defs>
      <g clipPath="url(#piel-clip)">
        <rect x={0} y={0} width={860} height={360} fill={PIEL} />
        <path
          d={`M${cx - radio} ${cy} C${cx - radio} ${cy - radio * 0.9} ${cx + radio * 0.7} ${cy - radio} ${cx + radio} ${cy - radio * 0.2} C${cx + radio * 1.1} ${cy + radio * 0.6} ${cx - radio * 0.3} ${cy + radio * 0.95} ${cx - radio} ${cy} Z`}
          fill={PIEL_CLARA}
        />
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 30 + ((i * 97) % 800);
          const y = 30 + ((i * 53) % 300);
          const dentro = Math.hypot(x - cx, y - cy) < radio * 0.85;
          return <circle key={i} cx={x} cy={y} r={8} fill="#5a3418" opacity={dentro ? 0 : 0.8} />;
        })}
      </g>
    </svg>
  );
};

// ─── Cuero cabelludo: el pelo cae en un círculo y vuelve a crecer ──────────
const Cabeza: React.FC<{ cae: number; vuelve: number }> = ({ cae, vuelve }) => {
  const r = 95 * Math.min(1, cae);
  const cx = 380;
  const cy = 150;
  return (
    <svg width={760} height={380} viewBox="0 0 760 380" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="pelo-clip">
          <path d="M90 330 Q80 50 380 40 Q680 50 670 330 Z" />
        </clipPath>
      </defs>
      {/* cara y orejas */}
      <ellipse cx={95} cy={300} rx={30} ry={48} fill="#f2c7a5" />
      <ellipse cx={665} cy={300} rx={30} ry={48} fill="#f2c7a5" />
      <path d="M100 380 L100 260 Q380 230 660 260 L660 380 Z" fill="#f2c7a5" />
      {/* pelo */}
      <path d="M90 330 Q80 50 380 40 Q680 50 670 330 Q600 270 380 265 Q160 270 90 330 Z" fill="#3b2416" />
      <g clipPath="url(#pelo-clip)" stroke="#5a3a26" strokeWidth={4} strokeLinecap="round">
        {Array.from({ length: 26 }).map((_, i) => (
          <path key={i} d={`M${110 + i * 22} 300 Q${130 + i * 22} 170 ${200 + i * 14} 60`} fill="none" opacity={0.6} />
        ))}
      </g>
      {/* calva redonda */}
      {r > 0 && (
        <g>
          <circle cx={cx} cy={cy} r={r} fill="#f2c7a5" stroke="#3b2416" strokeWidth={6} strokeDasharray="4 6" />
          {/* pelitos que vuelven a crecer */}
          {vuelve > 0 &&
            Array.from({ length: 40 }).map((_, i) => {
              const a = i * 2.4;
              const d = Math.sqrt(i / 40) * (r - 12);
              const x = cx + Math.cos(a) * d;
              const y = cy + Math.sin(a) * d;
              return <line key={i} x1={x} y1={y} x2={x + 6 * vuelve} y2={y - 26 * vuelve} stroke="#3b2416" strokeWidth={5} strokeLinecap="round" />;
            })}
        </g>
      )}
      {cae > 0.9 && vuelve < 0.2 && (
        <text x={cx + r + 30} y={cy - r + 10} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.coral}>
          ← calva
        </text>
      )}
      {vuelve > 0.5 && (
        <text x={cx + r + 30} y={cy - r + 10} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.verde}>
          ← ¡vuelve!
        </text>
      )}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Titulo size={70}>Manchas blancas en la piel.</Titulo>
    </Entra>
    <Entra desde={30}>
      <Titulo size={70}>Calvas redondas en el pelo.</Titulo>
    </Entra>
    <Entra desde={70}>
      <Texto size={50} color={C.violeta}>
        <b>¿Qué tienen en común?</b>
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 2. La respuesta autoinmune ─────────────────────────────────────────────
const Autoinmune: React.FC = () => {
  const frame = useCurrentFrame();
  const confunde = interpolate(frame, [150, 220], [0, 1], clamp);
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={78}>
          Una defensa <Resalta color={C.violeta}>confundida</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <Ataque confunde={confunde} />
      </Entra>
      <Entra desde={40}>
        <Texto size={38}>
          Tu sistema inmune existe para atacar <b style={{ color: C.verde }}>virus y bacterias</b>.
        </Texto>
      </Entra>
      <Entra desde={200}>
        <Texto size={38}>
          En las enfermedades <b style={{ color: C.violeta }}>autoinmunes</b> se confunde y ataca <b style={{ color: C.coral }}>partes del propio cuerpo</b>.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 3. Vitiligo ────────────────────────────────────────────────────────────
const Vitiligo: React.FC = () => {
  const frame = useCurrentFrame();
  const mancha = interpolate(frame, [90, 260], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={84}>
          <Resalta color={C.amarillo}>Vitiligo</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <Piel mancha={mancha} />
      </Entra>
      <Entra desde={40}>
        <Texto size={38}>
          Las defensas atacan a los <b style={{ color: C.amarillo }}>melanocitos</b>, las células que le dan color a la piel.
        </Texto>
      </Entra>
      <Entra desde={240}>
        <Texto size={36} color={C.texto2}>
          Sin ellos, aparecen manchas blancas. Lo tiene alrededor de 1 de cada 100 personas.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. Alopecia areata ─────────────────────────────────────────────────────
const Alopecia: React.FC = () => {
  const frame = useCurrentFrame();
  const cae = interpolate(frame, [70, 150], [0, 1], { ...clamp, easing: suave });
  const vuelve = interpolate(frame, [280, 380], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={84}>
          <Resalta color={C.coral}>Alopecia areata</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <Cabeza cae={cae} vuelve={vuelve} />
      </Entra>
      <Entra desde={40}>
        <Texto size={38}>
          Las defensas atacan el <b style={{ color: C.coral }}>folículo</b>, la raíz del pelo, y aparecen calvas redondas.
        </Texto>
      </Entra>
      <Entra desde={270}>
        <Texto size={38}>
          Pero el folículo <b style={{ color: C.verde }}>no muere</b>: el pelo puede volver a crecer. 🌱
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Lo que NO es ────────────────────────────────────────────────────────
const NoEs: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={80}>
        Lo que <Resalta color={C.azul}>NO</Resalta> es
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: 920 }}>
      {[
        { e: "🤝", t: "No se contagia" },
        { e: "🧼", t: "No es falta de higiene" },
        { e: "🙅", t: "No es culpa de nadie" },
        { e: "🩹", t: "No es solo “nervios”" },
      ].map((x, i) => (
        <Entra key={x.t} desde={25 + i * 35}>
          <Tarjeta color={C.azul} style={{ height: 190, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: 14 }}>
            <Emoji e={x.e} size={70} />
            <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto }}>{x.t}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={200}>
      <Texto size={34} color={C.texto2}>
        El estrés puede desencadenar brotes, pero el origen es inmune y genético.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 6. El estigma ──────────────────────────────────────────────────────────
const Estigma: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={78}>
        Lo que más duele <Resalta color={C.violeta}>no se ve en la piel</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "👀", texto: "Miradas y preguntas incómodas" },
        { emoji: "💬", texto: "Comentarios y burlas" },
        { emoji: "🪞", texto: "Golpes a la autoestima" },
      ]}
      desde={30}
      paso={45}
      color={C.violeta}
      size={40}
    />
    <Entra desde={200}>
      <Tarjeta color={C.verde} style={{ width: 920, padding: "18px 28px" }}>
        <Texto size={38}>
          ✨ Modelos como <b style={{ color: C.verde }}>Winnie Harlow</b> mostraron su vitiligo en las pasarelas: <b>la diferencia también es belleza</b>.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 7. Tratamiento ─────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={76}>
        Hay <Resalta color={C.verde}>opciones</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🧴", texto: "Cremas que calman la inflamación" },
        { emoji: "💡", texto: "Fototerapia (luz ultravioleta)" },
        { emoji: "💊", texto: "Medicamentos nuevos para ambas" },
        { emoji: "🧠", texto: "Acompañamiento psicológico" },
      ]}
      desde={20}
      paso={40}
      color={C.verde}
      size={38}
    />
    <Entra desde={200}>
      <Texto size={34} color={C.texto2}>
        Consultá con dermatología. Y elegir no tratarse también es válido. ☀️ En el vitiligo, siempre protector solar.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Entra desde={0}>
      <Emoji e="🤍" size={120} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={80}>
        La diferencia <Resalta color={C.violeta}>no es un defecto</Resalta>.
      </Titulo>
    </Entra>
    <Entra desde={50}>
      <Texto size={40}>Mirá a la persona, no la mancha.</Texto>
    </Entra>
    <Entra desde={80}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: C.violeta },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: "#fff", borderRadius: 999, padding: "14px 34px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={42} />
            {b.t}
          </div>
        ))}
      </div>
    </Entra>
    <Entra desde={105}>
      <Texto size={28} color={C.texto2} peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "autoinmune", seg: 14, Escena: Autoinmune },
  { id: "vitiligo", seg: 14, Escena: Vitiligo },
  { id: "alopecia", seg: 14, Escena: Alopecia },
  { id: "noEs", seg: 10, Escena: NoEs },
  { id: "estigma", seg: 14, Escena: Estigma },
  { id: "tratamiento", seg: 11, Escena: Tratamiento },
  { id: "cierre", seg: 8, Escena: Cierre },
];

export const DURACION_ALOPECIA_VITILIGO = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const AlopeciaVitiligo: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS}
    fps={FPS}
    // Música original suave: scripts/musica_reel.py --paginas 5,14,14,14,10,14,11,8 --bpm 86 --transponer 4 --estilo suave
    musica={staticFile("audio/alopecia-vitiligo-musica.mp3")}
  />
);

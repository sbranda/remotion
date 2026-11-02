import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS } from "../fuente";
import { BAJAR, FPS, PAGINAS, PaginaId, RANGOS, SUBEN, VALOR_EJEMPLO } from "./datos";
import { Icono, T } from "./iconos";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/** 0 → 1 con resorte, a partir de `desde` */
const usePop = (desde: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
};

const Entra: React.FC<{ desde: number; children: React.ReactNode; style?: React.CSSProperties; dx?: number; dy?: number }> = ({
  desde,
  children,
  style,
  dx = 0,
  dy = 40,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 18], [0, 1], { ...clamp, easing: suave });
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`, ...style }}>{children}</div>;
};

const Titulo: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 104 }) => {
  const p = usePop(0);
  return (
    <div
      style={{
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.05,
        color: T.azul,
        textAlign: "center",
        letterSpacing: -2,
        opacity: Math.min(1, p * 1.5),
        transform: `scale(${0.9 + 0.1 * p})`,
        textWrap: "balance",
      }}
    >
      {children}
    </div>
  );
};

/** Zona útil: libre arriba (cabecera de Instagram) y el tercio inferior (descripción y botones) */
const Pagina: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 56 }) => (
  <AbsoluteFill
    style={{
      top: 210,
      bottom: 520,
      left: 80,
      right: 80,
      width: "auto",
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Texto: React.FC<{ children: React.ReactNode; size?: number; color?: string; peso?: number }> = ({
  children,
  size = 48,
  color = T.texto,
  peso = 600,
}) => (
  <div style={{ fontFamily: SANS, fontSize: size, fontWeight: peso, color, lineHeight: 1.3, textAlign: "center", textWrap: "balance" }}>
    {children}
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const FILAS_ANALISIS = [
  ["Glucosa", "92", "70 – 99"],
  ["Colesterol total", "182", "< 200"],
  ["HDL colesterol", "52", "> 40"],
  ["LDL colesterol", "102", "< 130"],
];

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const pregunta = usePop(40);
  const hoja = interpolate(frame, [8, 34], [0, 1], { ...clamp, easing: suave });
  const latido = 1 + 0.06 * Math.max(0, Math.sin((frame - 50) / 5)) * (frame > 50 ? 1 : 0);
  return (
    <Pagina gap={40}>
      <Entra desde={0}>
        <Texto size={66} color={T.azul} peso={600}>
          En tu análisis dice:
        </Texto>
      </Entra>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Entra desde={6}>
          <Texto size={84} color={T.azul} peso={800}>
            Triglicéridos
          </Texto>
        </Entra>
        <div
          style={{
            transform: `scale(${usePop(14) * latido})`,
            background: T.menta,
            borderRadius: 24,
            padding: "6px 30px",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 92,
            color: T.azul,
          }}
        >
          {VALOR_EJEMPLO}
        </div>
      </div>
      <div style={{ transform: `scale(${pregunta})`, fontFamily: SANS, fontWeight: 800, fontSize: 150, color: T.azul, letterSpacing: -4 }}>
        ¿Es mucho?
      </div>
      <div
        style={{
          width: 860,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 20px 50px rgba(14,90,109,0.18)",
          overflow: "hidden",
          opacity: hoja,
          transform: `translateY(${(1 - hoja) * 120}px) rotate(${-3 * hoja}deg)`,
          fontFamily: SANS,
        }}
      >
        <div style={{ background: T.azul, color: "#fff", fontWeight: 800, fontSize: 34, padding: "22px 34px", letterSpacing: 1 }}>
          ✚ ANÁLISIS DE SANGRE
        </div>
        <div style={{ padding: "16px 34px 26px" }}>
          {FILAS_ANALISIS.map(([n, v, r]) => (
            <div key={n} style={{ display: "flex", fontSize: 28, color: T.gris, padding: "8px 0" }}>
              <div style={{ flex: 1.4 }}>{n}</div>
              <div style={{ flex: 1, fontWeight: 600, color: T.texto }}>{v} mg/dL</div>
              <div style={{ flex: 0.9, textAlign: "right" }}>{r}</div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 34,
              fontWeight: 800,
              color: T.azul,
              marginTop: 10,
              padding: "14px 18px",
              border: `4px solid ${T.menta}`,
              borderRadius: 16,
            }}
          >
            <div style={{ flex: 1.4 }}>Triglicéridos</div>
            <div style={{ flex: 1, color: T.rojo }}>{VALOR_EJEMPLO} mg/dL</div>
            <div style={{ flex: 0.9, textAlign: "right", fontSize: 28, fontWeight: 600 }}>{"< 150"}</div>
          </div>
        </div>
      </div>
    </Pagina>
  );
};

// ─── 2. Qué son ─────────────────────────────────────────────────────────────
const Gota: React.FC = () => {
  const frame = useCurrentFrame();
  const p = usePop(70);
  const bolitas = [
    [0, 210, 22],
    [1.7, 160, 16],
    [3.1, 250, 14],
    [4.4, 190, 18],
    [5.5, 280, 12],
  ];
  return (
    <svg width={420} height={520} viewBox="0 0 420 520" style={{ transform: `scale(${p}) translateY(${Math.sin(frame / 18) * 8}px)` }}>
      <defs>
        <radialGradient id="g" cx="0.38" cy="0.55" r="0.65">
          <stop offset="0" stopColor="#ff6b5e" />
          <stop offset="1" stopColor="#a8151a" />
        </radialGradient>
      </defs>
      <path d="M210 20C150 140 70 230 70 330a140 140 0 0 0 280 0c0-100-80-190-140-310z" fill="url(#g)" />
      <ellipse cx="150" cy="300" rx="22" ry="48" fill="#fff" opacity="0.35" transform="rotate(20 150 300)" />
      {bolitas.map(([fase, x, r], i) => {
        const y = 340 + Math.sin(frame / 14 + fase) * 34 + i * 6;
        const op = interpolate(frame, [110 + i * 10, 130 + i * 10], [0, 1], clamp);
        return <circle key={i} cx={x + Math.cos(frame / 20 + fase) * 16} cy={y} r={r} fill="#ffd25e" stroke="#e7a92a" strokeWidth={3} opacity={op} />;
      })}
    </svg>
  );
};

const QueSon: React.FC = () => (
  <Pagina gap={40}>
    <Titulo>¿Qué son?</Titulo>
    <Entra desde={20}>
      <Texto size={50}>Son la grasa que circula en tu sangre.</Texto>
    </Entra>
    <Entra desde={130}>
      <Texto size={50}>
        Lo que comés y no gastás, tu cuerpo lo guarda como <span style={{ color: T.azul, fontWeight: 800 }}>triglicéridos</span>.
      </Texto>
    </Entra>
    <Gota />
  </Pagina>
);

// ─── 3. Valores ─────────────────────────────────────────────────────────────
const Valores: React.FC = () => {
  const frame = useCurrentFrame();
  const fila = (i: number) => 30 + i * 30;
  const iEjemplo = RANGOS.findIndex((r) => VALOR_EJEMPLO >= r.desde && VALOR_EJEMPLO < r.hasta);
  const marca = usePop(200);
  return (
    <Pagina gap={50}>
      <Titulo>¿Cuánto es normal?</Titulo>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, width: 900 }}>
        {RANGOS.map((r, i) => {
          const w = interpolate(frame, [fila(i), fila(i) + 22], [0, 1], { ...clamp, easing: suave });
          const resaltado = i === iEjemplo && frame > 200;
          return (
            <div
              key={r.nombre}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                background: "#fff",
                borderRadius: 22,
                padding: 18,
                boxShadow: resaltado ? `0 0 0 6px ${r.color}` : "0 6px 20px rgba(14,90,109,0.08)",
                opacity: Math.min(1, w * 2),
              }}
            >
              <div style={{ width: 150 * w, height: 120, borderRadius: 16, background: r.color, flexShrink: 0 }} />
              <div style={{ fontFamily: SANS, flex: 1 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: r.color }}>{r.nombre}</div>
                <div style={{ fontSize: 40, fontWeight: 600, color: T.texto }}>{r.texto}</div>
              </div>
              {i === iEjemplo && (
                <div
                  style={{
                    transform: `scale(${marca})`,
                    background: T.azul,
                    color: "#fff",
                    fontFamily: SANS,
                    fontWeight: 800,
                    fontSize: 36,
                    borderRadius: 999,
                    padding: "12px 26px",
                    marginRight: 10,
                  }}
                >
                  ← tu {VALOR_EJEMPLO}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Entra desde={150}>
        <Texto size={30} color={T.gris} peso={400}>
          Valores de referencia para adultos, en mg/dL
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── Lista con íconos (páginas 4, 5 y 6) ─────────────────────────────────────
const Item: React.FC<{ desde: number; icono: string; numero?: number; children: React.ReactNode }> = ({ desde, icono, numero, children }) => {
  const p = usePop(desde);
  const frame = useCurrentFrame();
  const op = interpolate(frame, [desde, desde + 10], [0, 1], clamp);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        width: 920,
        background: "#fff",
        borderRadius: 26,
        padding: "18px 26px",
        boxShadow: "0 6px 20px rgba(14,90,109,0.08)",
        opacity: op,
        transform: `translateX(${(1 - p) * -80}px)`,
      }}
    >
      {numero !== undefined && (
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            background: T.azul,
            color: "#fff",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {numero}
        </div>
      )}
      <div style={{ flex: 1, fontFamily: SANS, fontSize: 40, fontWeight: 600, color: T.texto, lineHeight: 1.25 }}>{children}</div>
      <div style={{ background: T.menta2, borderRadius: 20, padding: 10, flexShrink: 0, transform: `scale(${p})` }}>
        <Icono nombre={icono} size={80} />
      </div>
    </div>
  );
};

const Importan: React.FC = () => (
  <Pagina gap={36}>
    <Titulo>¿Por qué importan?</Titulo>
    <Item desde={25} icono="silencio">
      No duelen ni dan síntomas.
    </Item>
    <Item desde={120} icono="corazon">
      <b style={{ color: "#e07b1f" }}>Altos:</b> más riesgo de enfermedad del corazón.
    </Item>
    <Item desde={220} icono="pancreas">
      <b style={{ color: T.rojo }}>Muy altos:</b> pueden inflamar el páncreas.
    </Item>
  </Pagina>
);

const Suben: React.FC = () => (
  <Pagina gap={26}>
    <Titulo>¿Qué los sube?</Titulo>
    {SUBEN.map((s, i) => (
      <Item key={s.texto} desde={30 + i * 55} icono={s.icono}>
        {s.texto}
      </Item>
    ))}
    <Entra desde={330}>
      <Texto size={34} color={T.gris} peso={400}>
        También: diabetes, tiroides, genética y algunos medicamentos.
      </Texto>
    </Entra>
  </Pagina>
);

const Bajar: React.FC = () => {
  const frame = useCurrentFrame();
  const caja = usePop(500);
  const pct = Math.round(interpolate(frame, [520, 580], [0, 20], { ...clamp, easing: suave }));
  return (
    <Pagina gap={20}>
      <Titulo size={96}>Cómo bajarlos</Titulo>
      {BAJAR.map((b, i) => (
        <Item key={b.texto} desde={30 + i * 90} icono={b.icono} numero={i + 1}>
          {b.texto}
        </Item>
      ))}
      <div
        style={{
          marginTop: 10,
          width: 920,
          background: T.azul,
          borderRadius: 26,
          padding: "26px 34px",
          display: "flex",
          alignItems: "center",
          gap: 30,
          transform: `scale(${caja})`,
          fontFamily: SANS,
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 800, color: T.menta, lineHeight: 1 }}>−{pct}%</div>
        <div style={{ fontSize: 36, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
          Bajar entre 5 % y 10 % de tu peso puede bajarlos cerca de un 20 %
        </div>
      </div>
    </Pagina>
  );
};

// ─── 7. Cómo se miden ───────────────────────────────────────────────────────
const Medir: React.FC = () => {
  const frame = useCurrentFrame();
  const llenado = interpolate(frame, [20, 80], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={44}>
      <Titulo>¿Cómo se miden?</Titulo>
      <div style={{ position: "relative", width: 300, height: 300 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `6px solid ${T.menta}`, background: "#fff" }} />
        <div style={{ position: "absolute", left: 50, top: 40 }}>
          <Icono nombre="tubo" size={200} />
        </div>
        <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: "absolute", inset: 0 }}>
          <path d={`M132 ${214 - 100 * llenado} H168 V${Math.max(214 - 100 * llenado, 196)} A18 18 0 0 1 132 ${Math.max(214 - 100 * llenado, 196)} Z`} fill={T.rojo} opacity={0.85} />
        </svg>
      </div>
      <Entra desde={40}>
        <Texto size={52}>
          Con un análisis de sangre: <span style={{ color: T.azul, fontWeight: 800 }}>el perfil lipídico</span>.
        </Texto>
      </Entra>
      <Entra desde={100}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, background: T.menta2, borderRadius: 22, padding: "20px 30px" }}>
          <div style={{ fontSize: 50, color: T.azul }}>✓</div>
          <Texto size={42}>Preguntale a tu médico si tenés que ir en ayunas.</Texto>
        </div>
      </Entra>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const p = usePop(6);
  const rebote = frame > 30 ? Math.abs(Math.sin((frame - 30) / 7)) * Math.max(0, 1 - (frame - 30) / 60) * 24 : 0;
  return (
    <Pagina gap={50}>
      <div style={{ marginTop: 120, transform: `scale(${p}) translateY(${-rebote}px)` }}>
        <Icono nombre="marcador" size={200} />
      </div>
      <Entra desde={14}>
        <div
          style={{
            border: `6px solid ${T.menta}`,
            borderRadius: 40,
            padding: "40px 50px",
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 84,
            lineHeight: 1.1,
            color: T.azul,
            textAlign: "center",
          }}
        >
          Guardalo para tu próximo análisis
        </div>
      </Entra>
      <Entra desde={40}>
        <Texto size={34} color={T.gris} peso={400}>
          Esto no reemplaza la consulta con tu médico.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queSon: QueSon,
  valores: Valores,
  importan: Importan,
  suben: Suben,
  bajar: Bajar,
  medir: Medir,
  cierre: Cierre,
};

const Transicion: React.FC<{ dur: number; children: React.ReactNode; primera: boolean }> = ({ dur, children, primera }) => {
  const frame = useCurrentFrame();
  const entra = primera ? 1 : interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: suave });
  const sale = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: Math.min(entra, sale), transform: `translateY(${(1 - entra) * 40}px)` }}>{children}</AbsoluteFill>
  );
};

/** Barra de progreso fina arriba, segmentada por página */
const Progreso: React.FC = () => {
  const frame = useCurrentFrame();
  let acc = 0;
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, display: "flex", gap: 8 }}>
      {PAGINAS.map((p) => {
        const ini = acc;
        acc += p.seg * FPS;
        const v = interpolate(frame, [ini, acc], [0, 1], clamp);
        return (
          <div key={p.id} style={{ flex: p.seg, height: 8, borderRadius: 4, background: "rgba(14,90,109,0.15)", overflow: "hidden" }}>
            <div style={{ width: `${v * 100}%`, height: "100%", background: T.azul2 }} />
          </div>
        );
      })}
    </div>
  );
};

export const Trigliceridos: React.FC = () => {
  let desde = 0;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #ffffff 0%, ${T.fondo} 70%)` }}>
      {/* ondas suaves de fondo */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M-50 ${1500 + i * 40} C 300 ${1380 + i * 40}, 700 ${1640 + i * 40}, 1130 ${1480 + i * 40}`} stroke={T.menta} strokeWidth={3} fill="none" />
        ))}
      </svg>
      {PAGINAS.map((p, i) => {
        const dur = p.seg * FPS;
        const Escena = ESCENAS[p.id];
        const seq = (
          <Sequence key={p.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${p.id}`}>
            <Transicion dur={dur} primera={i === 0}>
              <Escena />
            </Transicion>
          </Sequence>
        );
        desde += dur;
        return seq;
      })}
      <Progreso />
    </AbsoluteFill>
  );
};

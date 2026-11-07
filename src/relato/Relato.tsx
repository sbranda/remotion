// "La arquitectura del vacío": relato ilustrado de 5 minutos.
import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MANUSCRITA, SANS } from "../fuente";
import { Personaje } from "../salud/personajes";
import { FIRMA } from "../salud/pop";
import { ELENCO, ESCENAS, Escena, EnEscena, FPS, Hora } from "./datos";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = (t: number) => 1 - Math.pow(1 - t, 3);
const PISO = 1420;
const ALTO = 1.373;
const SERIF = "Georgia, 'DejaVu Serif', serif";

const Emoji: React.FC<{ e: string; size?: number; style?: React.CSSProperties }> = ({ e, size = 80, style }) => (
  <span style={{ fontSize: size, lineHeight: 1, fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif", ...style }}>{e}</span>
);

// ─── La oficina en Puerto Madero ────────────────────────────────────────────
const VENTANA = { x: 60, y: 520, w: 960, h: 760 };

const COLORES: Record<Hora, { pared: string; cielo: [string, string]; torres: string; luces: number; rio: string }> = {
  dia: { pared: "#e6e3de", cielo: ["#9cc9f0", "#e9f3fb"], torres: "#8796ab", luces: 0, rio: "#6f9cc2" },
  noche: { pared: "#232634", cielo: ["#0a0f24", "#26304f"], torres: "#161b2e", luces: 1, rio: "#1b2442" },
  amanecer: { pared: "#efe1d3", cielo: ["#ffb88a", "#ffe6c4"], torres: "#7a6f88", luces: 0.2, rio: "#e8a37d" },
};

const TORRES = [
  { x: 40, w: 110, h: 520 },
  { x: 170, w: 90, h: 380 },
  { x: 280, w: 130, h: 600 },
  { x: 430, w: 80, h: 300 },
  { x: 640, w: 120, h: 560 },
  { x: 780, w: 90, h: 420 },
  { x: 880, w: 60, h: 250 },
];

const Oficina: React.FC<{ hora: Hora }> = ({ hora }) => {
  const frame = useCurrentFrame();
  const c = COLORES[hora];
  const { x, y, w, h } = VENTANA;
  const base = y + h - 120; // línea del río
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={`cielo-${hora}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={c.cielo[0]} />
          <stop offset="1" stopColor={c.cielo[1]} />
        </linearGradient>
        <clipPath id="vidrio">
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <rect width={1080} height={1920} fill={c.pared} />
      <g clipPath="url(#vidrio)">
        <rect x={x} y={y} width={w} height={h} fill={`url(#cielo-${hora})`} />
        {hora === "noche" &&
          Array.from({ length: 30 }).map((_, i) => (
            <circle key={i} cx={x + ((i * 157) % w)} cy={y + ((i * 83) % 260)} r={2} fill="#fff" opacity={0.3 + 0.5 * ((Math.sin(frame / 25 + i) + 1) / 2)} />
          ))}
        {hora === "amanecer" && <circle cx={x + 720} cy={base - 120 - frame * 0.25} r={110} fill="#ffd27a" style={{ filter: "drop-shadow(0 0 50px #ffb347)" }} />}
        {TORRES.map((t, i) => (
          <g key={i}>
            <rect x={x + t.x} y={base - t.h} width={t.w} height={t.h} fill={c.torres} />
            {c.luces > 0 &&
              Array.from({ length: Math.floor(t.h / 40) * 3 }).map((_, k) => {
                const fila = Math.floor(k / 3);
                const col = k % 3;
                const on = (i * 7 + k * 13 + Math.floor(frame / 45)) % 5 !== 0;
                return <rect key={k} x={x + t.x + 14 + col * ((t.w - 28) / 3)} y={base - t.h + 20 + fila * 40} width={12} height={16} fill="#ffd77a" opacity={on ? c.luces * 0.9 : 0.1} />;
              })}
          </g>
        ))}
        {/* Puente de la Mujer, esquemático */}
        <path d={`M${x + 520} ${base} L${x + 600} ${base - 260}`} stroke={hora === "noche" ? "#d9e4ff" : "#ffffff"} strokeWidth={8} />
        <path d={`M${x + 480} ${base - 10} L${x + 760} ${base - 10}`} stroke={hora === "noche" ? "#d9e4ff" : "#ffffff"} strokeWidth={10} />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={x + 600 - i * 10} y1={base - 260 + i * 40} x2={x + 500 + i * 45} y2={base - 10} stroke={hora === "noche" ? "#d9e4ff" : "#ffffff"} strokeWidth={2} opacity={0.8} />
        ))}
        <rect x={x} y={base} width={w} height={120} fill={c.rio} />
        {hora === "noche" &&
          Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x={x + 30 + i * 68} y={base + 20 + (i % 3) * 25} width={30 + (i % 4) * 10} height={4} fill="#ffd77a" opacity={0.25 + 0.25 * Math.sin(frame / 10 + i)} />
          ))}
      </g>
      {/* marco del ventanal */}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={hora === "noche" ? "#3a3f55" : "#c9c4bc"} strokeWidth={16} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={hora === "noche" ? "#3a3f55" : "#c9c4bc"} strokeWidth={10} />
      {/* piso */}
      <rect y={PISO} width={1080} height={500} fill={hora === "noche" ? "#2e2420" : "#6b4e3a"} />
      <rect y={PISO} width={1080} height={12} fill={hora === "noche" ? "#1f1815" : "#4e3829"} />
    </svg>
  );
};

// ─── Personajes, globos y narración ─────────────────────────────────────────
type Datos = { tipo: Parameters<typeof Personaje>[0]["tipo"]; piel?: string; pelo?: string; ropa?: string };

const Actor: React.FC<{ a: EnEscena; i: number; latido?: number }> = ({ a, i, latido = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = a.desde === 0 ? 1 : spring({ frame: frame - a.desde, fps, config: { damping: 16, stiffness: 100 } });
  if (frame < a.desde) return null;
  const d = ELENCO[a.quien] as Datos;
  const expr = a.exprLuego && frame >= a.exprLuego.desde ? a.exprLuego.expr : a.expr ?? "feliz";
  return (
    <div
      style={{
        position: "absolute",
        left: a.x - a.size / 2,
        top: PISO - a.size * ALTO,
        opacity: Math.min(1, p * 2),
        transform: `translateY(${(1 - p) * 60}px) scale(${latido})`,
        transformOrigin: "50% 100%",
      }}
    >
      <Personaje tipo={d.tipo} piel={d.piel} pelo={d.pelo} ropa={d.ropa} expresion={expr} size={a.size} fase={i * 29} />
    </div>
  );
};

const Globo: React.FC<{ a: EnEscena; texto: string; desde: number; hasta?: number }> = ({ a, texto, desde, hasta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < desde || (hasta !== undefined && frame >= hasta)) return null;
  const p = spring({ frame: frame - desde, fps, config: { damping: 14, stiffness: 160 } });
  const sale = hasta !== undefined ? interpolate(frame, [hasta - 8, hasta], [1, 0], clamp) : 1;
  const ancho = 600;
  const cx = Math.max(ancho / 2 + 30, Math.min(1080 - ancho / 2 - 30, a.x));
  return (
    <div style={{ position: "absolute", left: cx - ancho / 2, top: PISO - a.size * ALTO - 20, width: ancho, transform: `translateY(-100%) scale(${p})`, transformOrigin: `${a.x - (cx - ancho / 2)}px 100%`, opacity: sale }}>
      <div style={{ background: "#ffffff", border: "4px solid #1f2433", borderRadius: 34, padding: "18px 26px", fontFamily: SANS, fontSize: 36, fontWeight: 800, color: "#1f2433", textAlign: "center", lineHeight: 1.25, boxShadow: "6px 6px 0 rgba(0,0,0,0.25)" }}>
        —{texto}
      </div>
      <svg width={60} height={40} style={{ position: "absolute", left: Math.max(30, Math.min(ancho - 90, a.x - (cx - ancho / 2) - 30)), bottom: -34 }}>
        <path d="M4 0 L56 0 L20 38 Z" fill="#ffffff" stroke="#1f2433" strokeWidth={4} strokeLinejoin="round" />
        <rect x={6} y={-6} width={48} height={10} fill="#ffffff" />
      </svg>
    </div>
  );
};

const Narracion: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  if (!e.narracion.length) return null;
  const dur = e.seg * FPS;
  const total = e.narracion.join(" ").length;
  const size = total > 380 ? 32 : total > 250 ? 35 : 38;
  const paso = Math.min(240, (dur * 0.55) / Math.max(1, e.narracion.length - 1 || 1));
  const oscuro = e.hora === "noche";
  return (
    <div style={{ position: "absolute", top: 190, left: 50, right: 50 }}>
      <div
        style={{
          background: oscuro ? "rgba(12,15,30,0.82)" : "rgba(255,253,248,0.93)",
          border: oscuro ? "1px solid rgba(255,255,255,0.15)" : "none",
          borderRadius: 26,
          padding: "22px 30px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        {e.narracion.map((t, i) => {
          const d = 12 + i * paso;
          const p = interpolate(frame, [d, d + 20], [0, 1], { ...clamp, easing: suave });
          return (
            <div
              key={i}
              style={{
                fontFamily: SERIF,
                fontSize: size,
                lineHeight: 1.38,
                color: oscuro ? "#eef0f8" : "#1f2433",
                opacity: p,
                transform: `translateY(${(1 - p) * 10}px)`,
                marginTop: i ? 12 : 0,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Detalles de cada escena ────────────────────────────────────────────────
const Maqueta: React.FC<{ x: number; y: number; w: number; h: number; desde: number }> = ({ x, y, w, h, desde }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 20], [0, 1], { ...clamp, easing: suave });
  return (
    <div style={{ position: "absolute", left: x, top: y + h * (1 - p), width: w, height: h * p, background: "linear-gradient(90deg, #ffffff 60%, #d9dde6)", border: "2px solid #b9c0cf", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}>
      {Array.from({ length: Math.floor((h * p) / 22) }).map((_, i) => (
        <div key={i} style={{ height: 1, marginTop: 21, background: "#c9cfdb" }} />
      ))}
    </div>
  );
};

const Pedestal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    {/* conos de luz cenital */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {[700, 840, 960].map((cx) => (
        <path key={cx} d={`M${cx - 10} 520 L${cx + 10} 520 L${cx + 70} 1180 L${cx - 70} 1180 Z`} fill="#fff6d6" opacity={0.18} />
      ))}
    </svg>
    <div style={{ position: "absolute", left: 610, top: 1180, width: 420, height: 240, background: "#2b2f3d", borderTop: "10px solid #3d4256" }} />
    {children}
  </>
);

const FormaOrganica: React.FC<{ w: number }> = ({ w }) => {
  const frame = useCurrentFrame();
  const ola = Math.sin(frame / 30) * 8;
  return (
    <svg width={w} height={w * 0.7} viewBox="0 0 300 210">
      <defs>
        <linearGradient id="org" x1="0" x2="1">
          <stop offset="0" stopColor="#7ee0c3" />
          <stop offset="1" stopColor="#b69cff" />
        </linearGradient>
      </defs>
      <path d={`M10 200 C30 ${80 + ola} 90 ${20 - ola} 150 ${60 + ola} C210 ${100 - ola} 250 ${10 + ola} 290 ${70 - ola} L290 200 Z`} fill="url(#org)" stroke="#ffffff" strokeWidth={4} />
      <path d={`M40 200 C70 ${120 + ola} 120 ${80 - ola} 170 ${110 + ola}`} stroke="#ffffff" strokeWidth={3} fill="none" opacity={0.6} />
    </svg>
  );
};

const Extra: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  const dur = e.seg * FPS;
  switch (e.extra) {
    case "maquetas":
      return (
        <Pedestal>
          <Maqueta x={650} y={1000} w={100} h={180} desde={10} />
          <Maqueta x={780} y={880} w={110} h={300} desde={25} />
          <Maqueta x={915} y={1040} w={90} h={140} desde={40} />
        </Pedestal>
      );
    case "notificacion": {
      const p = spring({ frame: frame - 40, fps: FPS, config: { damping: 12, stiffness: 140 } });
      return (
        <div style={{ position: "absolute", left: 520, top: 900, width: 500, transform: `scale(${frame >= 40 ? p : 0})`, transformOrigin: "100% 0" }}>
          <div style={{ background: "#ffffff", borderRadius: 28, padding: "22px 26px", boxShadow: "0 16px 40px rgba(0,0,0,0.25)", fontFamily: SANS }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#6b7280" }}>📩 Notificación oficial · martes</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#1f2433", marginTop: 8, lineHeight: 1.2 }}>Concurso Museo de Arte Urbano</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#b23a48", marginTop: 8, opacity: interpolate(frame, [280, 300], [0, 1], clamp) }}>
              Proyecto seleccionado: otra propuesta
            </div>
          </div>
        </div>
      );
    }
    case "comparacion":
      return (
        <div style={{ position: "absolute", left: 60, right: 60, top: 860, display: "flex", gap: 30, justifyContent: "center", alignItems: "flex-end" }}>
          <div style={{ textAlign: "center", opacity: interpolate(frame, [200, 230], [0, 1], clamp) }}>
            <div style={{ position: "relative", width: 420, height: 320 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: "absolute", left: 20 + i * 95, bottom: 0, width: 85, height: 160 + (i % 2) * 120, background: "#c9ced8", border: "3px solid #8b93a5" }} />
              ))}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: "#1f2433", marginTop: 12 }}>La suya</div>
          </div>
          <div style={{ textAlign: "center", opacity: interpolate(frame, [330, 360], [0, 1], clamp) }}>
            <FormaOrganica w={440} />
            <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: "#1f2433", marginTop: 12 }}>La ganadora</div>
          </div>
        </div>
      );
    case "whisky":
      return (
        <div style={{ position: "absolute", left: 560, top: PISO - 300, opacity: interpolate(frame, [300, 330], [0, 1], clamp) }}>
          <Emoji e="🥃" size={110} />
        </div>
      );
    case "reflejo": {
      // reflejo en el vidrio: primero el hombre de traje, después el niño asustado
      const cambio = interpolate(frame, [520, 600], [0, 1], clamp);
      const aparece = interpolate(frame, [20, 80], [0, 1], clamp);
      return (
        <div style={{ position: "absolute", left: 140, top: 760, width: 420, height: 520, opacity: aparece, filter: "saturate(0.5) brightness(1.15)" }}>
          <div style={{ position: "absolute", left: 40, bottom: 0, opacity: 0.6 * (1 - cambio) }}>
            <Personaje tipo="ejecutivo" expresion="triste" size={320} />
          </div>
          <div style={{ position: "absolute", left: 90, bottom: 0, opacity: 0.85 * cambio }}>
            <Personaje tipo="chico" piel="#e9c3a1" pelo="#3b2a20" ropa="#6c7a96" expresion="triste" size={230} />
          </div>
        </div>
      );
    }
    case "panico": {
      const pulso = (Math.sin(frame / 4) + 1) / 2;
      const intensidad = interpolate(frame, [0, 60, dur - 120, dur - 40], [0.3, 1, 1, 0.2], clamp);
      return <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, transparent 35%, rgba(90,0,20,${(0.45 + 0.3 * pulso) * intensidad}) 100%)`, pointerEvents: "none" }} />;
    }
    case "vaso": {
      const cae = interpolate(frame, [70, 100], [0, 1], { easing: (t) => t * t, ...clamp });
      const mancha = interpolate(frame, [100, 260], [0, 1], { ...clamp, easing: suave });
      return (
        <>
          <svg width={1080} height={300} style={{ position: "absolute", left: 0, top: PISO - 40 }}>
            <path
              d="M420 60 C380 30 330 40 340 70 C300 80 310 120 360 118 C380 150 450 140 470 120 C520 140 580 120 560 90 C600 70 560 30 520 44 C500 20 450 24 420 60 Z"
              fill="#c98a2b"
              opacity={0.85 * mancha}
              transform={`translate(450 75) scale(${0.2 + 1.4 * mancha}) translate(-450 -75)`}
            />
          </svg>
          <div style={{ position: "absolute", left: 450 + 40 * cae, top: 1080 + 300 * cae, transform: `rotate(${110 * cae}deg)` }}>
            <Emoji e="🥃" size={100} />
          </div>
        </>
      );
    }
    case "alivio": {
      const luz = interpolate(frame, [300, 600], [0, 1], { ...clamp, easing: suave });
      return (
        <>
          <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 70%, rgba(255,214,140,${0.45 * luz}) 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 820, top: 1000, opacity: luz }}>
            <Emoji e="🔓" size={110} />
          </div>
        </>
      );
    }
    case "telefono":
      return (
        <>
          <div style={{ position: "absolute", left: 590, top: 980, width: 420, height: 280, background: "#1f2433", borderRadius: 18, border: "10px solid #3a3f55", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FormaOrganica w={340} />
          </div>
          <div style={{ position: "absolute", left: 770, top: 1270, width: 60, height: 150, background: "#3a3f55" }} />
          <div style={{ position: "absolute", left: 420, top: PISO - 330, opacity: interpolate(frame, [250, 280], [0, 1], clamp) }}>
            <Emoji e="📱" size={90} />
          </div>
        </>
      );
    default:
      return null;
  }
};

// ─── Título y cierre ────────────────────────────────────────────────────────
const Titulo: React.FC<{ fin?: boolean }> = ({ fin }) => {
  const frame = useCurrentFrame();
  const op = (d: number) => interpolate(frame, [d, d + 25], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 70px 560px" }}>
      <div style={{ background: fin ? "rgba(255,253,248,0.92)" : "rgba(12,15,30,0.85)", borderRadius: 34, padding: "46px 50px", textAlign: "center" }}>
        <div style={{ fontFamily: SERIF, fontSize: 92, fontStyle: "italic", color: fin ? "#1f2433" : "#f3eee4", lineHeight: 1.1, opacity: op(10) }}>La arquitectura del vacío</div>
        {fin ? (
          <>
            <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: "#b23a48", marginTop: 24, opacity: op(30) }}>¿Alguna vez te costó admitir un error?</div>
            <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 600, color: "#4a5568", marginTop: 12, opacity: op(55) }}>Contalo en los comentarios 💬</div>
          </>
        ) : (
          <div style={{ fontFamily: MANUSCRITA, fontSize: 56, color: "#ffd27a", marginTop: 18, opacity: op(50) }}>Un relato en cinco minutos</div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ─── Escena ─────────────────────────────────────────────────────────────────
const VistaEscena: React.FC<{ e: Escena }> = ({ e }) => {
  const frame = useCurrentFrame();
  const dur = e.seg * FPS;
  const negro = interpolate(frame, [0, 16, dur - 16, dur], [1, 0, 0, 1], clamp);
  const latido = e.extra === "panico" ? 1 + 0.02 * Math.max(0, Math.sin(frame / 4)) : 1;
  return (
    <AbsoluteFill>
      <Oficina hora={e.hora} />
      {e.id === "titulo" ? (
        <Titulo />
      ) : e.id === "cierre" ? (
        <Titulo fin />
      ) : (
        <>
          {e.extra !== "panico" && e.extra !== "alivio" && <Extra e={e} />}
          {e.personajes.map((a, i) => (
            <Actor key={a.quien + i} a={a} i={i} latido={latido} />
          ))}
          {(e.extra === "panico" || e.extra === "alivio") && <Extra e={e} />}
          {(e.dialogos ?? []).map((d, i) => (
            <Globo key={i} a={e.personajes[d.quien]} texto={d.texto} desde={d.desde} hasta={d.hasta} />
          ))}
          <Narracion e={e} />
        </>
      )}
      <AbsoluteFill style={{ background: "#000", opacity: negro, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

export const Relato: React.FC = () => {
  let desde = 0;
  const secuencias = ESCENAS.map((e, i) => {
    const dur = e.seg * FPS;
    const seq = (
      <Sequence key={e.id} from={desde} durationInFrames={dur} name={`${i + 1}. ${e.id}`}>
        <VistaEscena e={e} />
      </Sequence>
    );
    desde += dur;
    return seq;
  });
  const total = desde;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {secuencias}
      <ProgresoRelato total={total} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: "#ffffff", background: "rgba(12,15,30,0.6)", borderRadius: 999, padding: "8px 28px" }}>{FIRMA}</div>
      </div>
      {/* Música original: tono menor y lenta hasta el vaso; mayor desde el alivio (ver README) */}
      <Html5Audio src={staticFile("audio/relato-musica.mp3")} volume={0.75} />
    </AbsoluteFill>
  );
};

const ProgresoRelato: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.3)" }}>
      <div style={{ width: `${(frame / total) * 100}%`, height: "100%", borderRadius: 3, background: "#ffd27a" }} />
    </div>
  );
};

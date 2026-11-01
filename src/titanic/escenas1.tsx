import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import {
  Barco,
  Beats,
  C,
  Centro,
  Cielo,
  Contador,
  Dato,
  Estrellas,
  MAQUINA,
  Mar,
  Reloj,
  SANS,
  SERIF,
  SERIF_IT,
  Titular,
  clamp,
  miles,
  prog,
  useSpring,
} from "./graficos";
import { Mapa } from "./mapa";
import { capitulo, cueDe } from "./tiempos";

// =====================================================================
// 1. PRÓLOGO
// =====================================================================
const Ondas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <svg width={1920} height={1080}>
        {Array.from({ length: 6 }).map((_, i) => {
          const t = ((frame + i * 25) % 150) / 150;
          return (
            <ellipse
              key={i}
              cx={960}
              cy={470}
              rx={60 + t * 900}
              ry={(60 + t * 900) * 0.22}
              fill="none"
              stroke={C.hielo}
              strokeWidth={2}
              opacity={(1 - t) * 0.5}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Prologo: React.FC = () => {
  const ID = "prologo";
  const frame = useCurrentFrame();
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Beats
        total={total}
        beats={[
          {
            desde: 0,
            render: (
              <Centro>
                <div style={{ fontFamily: SERIF_IT, fontSize: 46, color: C.crema2, opacity: prog(frame, 20, 45) }}>
                  Una recreación basada en testimonios reales de supervivientes
                </div>
              </Centro>
            ),
          },
          { desde: k("Todavía hoy"), render: <Ondas /> },
          {
            desde: k("Mucha gente"),
            render: <BarcoNocturno />,
          },
          {
            desde: k("Yo estuve ahí"),
            render: (
              <>
                <Cielo arriba="#000" abajo="#071222" />
                <Estrellas opacidad={0.6} />
                <Mar y={820} />
                <Centro top={60} gap={10}>
                  <Titular size={56} italic color={C.oro}>
                    Yo estuve en el
                  </Titular>
                  <Titular size={210} delay={8}>
                    TITANIC
                  </Titular>
                  <Titular size={46} delay={20} color={C.crema2}>
                    14 y 15 de abril de 1912
                  </Titular>
                </Centro>
              </>
            ),
          },
        ]}
      />
    </AbsoluteFill>
  );
};

const BarcoNocturno: React.FC = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, 400], [1, 1.12]);
  const a = useSpring(0);
  return (
    <AbsoluteFill>
      <Cielo arriba="#01040a" abajo="#0b1a2e" />
      <Estrellas />
      <AbsoluteFill style={{ transform: `scale(${z})` }}>
        <div style={{ position: "absolute", left: 260, top: 380, opacity: a }}>
          <Barco ancho={1400} />
        </div>
        <Mar y={757} opacidad={0.92} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// =====================================================================
// 2. EMBARQUE
// =====================================================================
const Muelle: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute" }}>
      <rect x={0} y={840} width={1920} height={240} fill="#3a2c1e" />
      <rect x={0} y={832} width={1920} height={12} fill="#5a4630" />
      {Array.from({ length: 140 }).map((_, i) => {
        const x = (i * 14 + random(`m${i}`) * 10) % 1920;
        const y = 860 + random(`my${i}`) * 50;
        const bob = Math.sin(frame / 8 + i) * 1.5;
        return (
          <g key={i} transform={`translate(0 ${bob})`}>
            <circle cx={x} cy={y} r={7} fill="#1d150d" />
            <rect x={x - 7} y={y + 6} width={14} height={22} rx={5} fill="#1d150d" />
            {random(`h${i}`) > 0.6 && <rect x={x - 10} y={y - 9} width={20} height={5} fill="#1d150d" />}
          </g>
        );
      })}
    </svg>
  );
};

const Dia: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <Cielo arriba="#cdb48c" abajo="#8f7a5c" />
    <Mar y={780} color="#4a4f52" lineas="#f1e6d0" />
    {children}
  </AbsoluteFill>
);

const LlegadaBarco: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 200], [700, 180], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Dia>
      <div style={{ position: "absolute", left: x, top: 430 }}>
        <Barco ancho={1560} humo={0.8} luces={0} />
      </div>
      <Mar y={835} color="#4a4f52" lineas="#f1e6d0" opacidad={0.95} />
      <Muelle />
    </Dia>
  );
};

const Medidas: React.FC<{ chimeneas: number }> = ({ chimeneas }) => {
  const frame = useCurrentFrame();
  const linea = prog(frame, 10, 50);
  const ancho = 1560;
  const left = 180;
  const esc = ancho / 1000;
  return (
    <Dia>
      <div style={{ position: "absolute", left, top: 430 }}>
        <Barco ancho={ancho} humo={0.8} luces={0} />
      </div>
      <Mar y={835} color="#4a4f52" lineas="#f1e6d0" opacidad={0.95} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* línea de cota de eslora */}
        <g opacity={linea > 0 ? 1 : 0}>
          <line x1={left + 30 * esc} x2={left + (30 + 945 * linea) * esc} y1={900} y2={900} stroke={C.sepia} strokeWidth={4} />
          <line x1={left + 30 * esc} x2={left + 30 * esc} y1={880} y2={920} stroke={C.sepia} strokeWidth={4} />
          <line x1={left + 975 * esc} x2={left + 975 * esc} y1={880} y2={920} stroke={C.sepia} strokeWidth={4} opacity={linea >= 1 ? 1 : 0} />
        </g>
        {/* números en las chimeneas */}
        {[300, 410, 520, 630].map((fx, i) => {
          const a = prog(frame, chimeneas + i * 8, chimeneas + i * 8 + 10);
          return (
            <g key={fx} opacity={a}>
              <circle cx={left + (fx + 12) * esc} cy={430 - 50} r={34} fill={C.sepia} />
              <text x={left + (fx + 12) * esc} y={430 - 38} textAnchor="middle" fontFamily={SERIF} fontWeight={900} fontSize={36} fill={C.crema}>
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 930,
          width: 1920,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 70,
          color: C.sepia,
          opacity: prog(frame, 30, 50),
        }}
      >
        <Contador de={0} a={269} dur={40} delay={10} /> metros
      </div>
    </Dia>
  );
};

const Billete: React.FC = () => {
  const a = useSpring(0, 16);
  const frame = useCurrentFrame();
  const sello = prog(frame, 70, 80, clamp);
  return (
    <AbsoluteFill style={{ background: "#2b2016" }}>
      <Centro>
        <div
          style={{
            width: 1100,
            height: 520,
            background: "#efe3c8",
            borderRadius: 16,
            transform: `rotate(${(1 - a) * -8 - 2}deg) scale(${0.8 + 0.2 * a})`,
            opacity: a,
            boxShadow: "0 30px 80px #0008",
            padding: 50,
            boxSizing: "border-box",
            border: "3px dashed #8a6a43",
            position: "relative",
            color: "#3b2a1a",
          }}
        >
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, letterSpacing: 8 }}>BILLETE DE PASAJE</div>
          <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 96, marginTop: 10 }}>R.M.S. Titanic</div>
          <div style={{ height: 3, background: "#8a6a43", margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MAQUINA, fontSize: 40 }}>
            <div>
              Southampton → Nueva York
              <br />
              10 de abril de 1912
            </div>
            <div style={{ textAlign: "right" }}>
              SEGUNDA CLASE
              <br />
              Un pasaje
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 60,
              bottom: 40,
              border: "6px solid #a33",
              color: "#a33",
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 40,
              padding: "8px 24px",
              borderRadius: 10,
              transform: `rotate(-12deg) scale(${interpolate(sello, [0, 1], [2.2, 1])})`,
              opacity: sello,
            }}
          >
            EMBARCADO
          </div>
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const Diario: React.FC = () => {
  const frame = useCurrentFrame();
  const golpe = interpolate(frame, [12, 20], [2.4, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const op = prog(frame, 12, 16, clamp);
  return (
    <AbsoluteFill style={{ background: "#1c140c" }}>
      <Centro>
        <div
          style={{
            width: 1300,
            height: 700,
            background: "#e9dfc9",
            padding: 50,
            boxSizing: "border-box",
            color: "#222",
            transform: `rotate(-1.5deg) scale(${interpolate(frame, [0, 300], [1, 1.06])})`,
            boxShadow: "0 30px 80px #000a",
          }}
        >
          <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 64, textAlign: "center", borderBottom: "4px double #222", paddingBottom: 10 }}>
            EL DIARIO DEL PUERTO
          </div>
          <div style={{ fontFamily: SANS, fontSize: 22, textAlign: "center", marginTop: 8, letterSpacing: 4 }}>
            SOUTHAMPTON · MIÉRCOLES 10 DE ABRIL DE 1912
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 150,
              textAlign: "center",
              marginTop: 40,
              transform: `scale(${golpe})`,
              opacity: op,
            }}
          >
            “INSUMERGIBLE”
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 40 }}>
            {[0, 1, 2].map((c) => (
              <div key={c} style={{ flex: 1 }}>
                {Array.from({ length: 7 }).map((_, l) => (
                  <div key={l} style={{ height: 12, background: "#00000030", marginBottom: 14, width: `${70 + random(`d${c}${l}`) * 30}%` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

/** Vista cenital del casi-choque con el New York */
const CasiChoque: React.FC<{ tension: number }> = ({ tension }) => {
  const frame = useCurrentFrame();
  const xT = interpolate(frame, [0, 360], [-500, 900], clamp);
  const tir = prog(frame, tension - 60, tension + 30);
  const yNY = interpolate(tir, [0, 1], [700, 575]);
  const rot = interpolate(tir, [0, 1], [0, -7]);
  return (
    <AbsoluteFill style={{ background: "#3d4a52" }}>
      <svg width={1920} height={1080}>
        {/* muelle */}
        <rect x={0} y={800} width={1920} height={280} fill="#5a4630" />
        {/* estela */}
        <path d={`M${xT - 600},430 L${xT},400 L${xT},460 Z`} fill="#ffffff22" />
        {/* Titanic desde arriba */}
        <g transform={`translate(${xT} 430)`}>
          <path d="M0,-45 L620,-45 Q720,0 620,45 L0,45 Q-30,0 0,-45 Z" fill="#141414" />
          <rect x={60} y={-30} width={500} height={60} rx={8} fill="#e6dfd0" />
          {[150, 250, 350, 450].map((x) => (
            <ellipse key={x} cx={x} cy={0} rx={30} ry={20} fill="#d9a441" />
          ))}
          <text x={300} y={-70} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={40} fill={C.crema}>
            Titanic
          </text>
        </g>
        {/* New York, amarrado, arrastrado hacia el Titanic */}
        <g transform={`translate(900 ${yNY}) rotate(${rot})`}>
          <path d="M0,-30 L380,-30 Q440,0 380,30 L0,30 Q-20,0 0,-30 Z" fill="#2a2a2a" />
          <rect x={60} y={-18} width={260} height={36} rx={6} fill="#cfc6b3" />
          <text x={190} y={80} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={36} fill={C.crema}>
            New York
          </text>
        </g>
        {/* amarras que se rompen */}
        {tir < 0.4 && (
          <g stroke="#d9c7a6" strokeWidth={3}>
            <line x1={960} y1={yNY + 25} x2={960} y2={800} />
            <line x1={1220} y1={yNY + 25} x2={1220} y2={800} />
          </g>
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 120,
          width: 1920,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 80,
          color: C.crema,
          opacity: prog(frame, tension + 20, tension + 40),
        }}
      >
        ¡A un par de metros!
      </div>
    </AbsoluteFill>
  );
};

const Viaje: React.FC<{ personas: number }> = ({ personas }) => {
  const frame = useCurrentFrame();
  // Southampton → Cherburgo → Queenstown → océano
  const p = interpolate(frame, [0, 70, 150, 300], [0, 0.07, 0.15, 0.78], clamp);
  return (
    <AbsoluteFill>
      <Mapa progreso={p} prevista={0} />
      <div style={{ position: "absolute", left: 120, top: 120, opacity: prog(frame, personas, personas + 20) }}>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 130, color: C.crema, lineHeight: 1 }}>
          +<Contador de={0} a={2200} delay={personas} dur={50} formato={miles} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 40, color: C.crema2 }}>personas a bordo</div>
      </div>
    </AbsoluteFill>
  );
};

export const Embarque: React.FC = () => {
  const ID = "embarque";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <LlegadaBarco /> },
        { desde: k("269 metros"), render: <Medidas chimeneas={45} /> },
        { desde: k("billete de segunda"), render: <Billete /> },
        { desde: k("insumergible"), render: <Diario /> },
        { desde: k("A mediodía"), render: <CasiChoque tension={k("Faltaron") - k("A mediodía")} /> },
        { desde: k("Cherburgo"), render: <Viaje personas={k("Más de 2.200") - k("Cherburgo")} /> },
      ]}
    />
  );
};

// =====================================================================
// 3. VIDA A BORDO
// =====================================================================
const Icono: React.FC<{ tipo: "comedor" | "biblioteca" | "cubierta" }> = ({ tipo }) => (
  <svg width={200} height={200} viewBox="0 0 200 200" fill="none" stroke={C.oro} strokeWidth={8} strokeLinecap="round">
    {tipo === "comedor" && (
      <>
        <circle cx={100} cy={100} r={56} />
        <circle cx={100} cy={100} r={36} strokeWidth={4} />
        <line x1={24} y1={50} x2={24} y2={160} />
        <line x1={176} y1={50} x2={176} y2={160} />
        <path d="M14,50 L14,80 Q24,92 34,80 L34,50" strokeWidth={5} />
      </>
    )}
    {tipo === "biblioteca" && (
      <>
        <path d="M100,50 Q60,30 20,45 L20,160 Q60,145 100,165 Q140,145 180,160 L180,45 Q140,30 100,50 Z" />
        <line x1={100} y1={50} x2={100} y2={165} />
      </>
    )}
    {tipo === "cubierta" && (
      <>
        <path d="M40,160 L80,90 L160,90" />
        <path d="M60,125 L150,125 L160,160" />
        <circle cx={150} cy={40} r={22} />
      </>
    )}
  </svg>
);

const Comodidades: React.FC = () => {
  const frame = useCurrentFrame();
  const items: [Parameters<typeof Icono>[0]["tipo"], string][] = [
    ["comedor", "Comedor"],
    ["biblioteca", "Biblioteca"],
    ["cubierta", "Paseo por cubierta"],
  ];
  return (
    <AbsoluteFill>
      <Cielo arriba="#1a2438" abajo="#3d2f2a" />
      <Centro gap={70}>
        <div style={{ display: "flex", gap: 90 }}>
          {items.map(([t, n], i) => {
            const a = prog(frame, 20 + i * 18, 45 + i * 18);
            return (
              <div
                key={t}
                style={{
                  width: 400,
                  height: 380,
                  borderRadius: 24,
                  border: `2px solid ${C.oro}66`,
                  background: "#ffffff08",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  opacity: a,
                  transform: `translateY(${(1 - a) * 40}px)`,
                }}
              >
                <Icono tipo={t} />
                <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 44, color: C.crema }}>{n}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: SERIF_IT, fontSize: 52, color: C.oro, opacity: prog(frame, 260, 290) }}>…y eso era la segunda clase</div>
      </Centro>
    </AbsoluteFill>
  );
};

const Velocidad: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [10, 70], [0, 41], { ...clamp, easing: Easing.out(Easing.cubic) });
  const ang = -120 + (v / 50) * 240;
  return (
    <AbsoluteFill>
      <Cielo arriba="#7d8fa8" abajo="#e5c9a0" />
      <Mar y={700} color="#56708a" quieto lineas="#fff" />
      <Centro top={40} gap={10}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 8, color: "#1b2433" }}>DOMINGO 14 DE ABRIL</div>
        <svg width={520} height={340} viewBox="-260 -260 520 340">
          <path d="M-220,0 A220,220 0 1 1 220,0" fill="none" stroke="#1b243333" strokeWidth={26} transform="rotate(-30)" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1={0} y1={-205} x2={0} y2={-180} stroke="#1b2433" strokeWidth={5} transform={`rotate(${-120 + i * 24})`} />
          ))}
          <line x1={0} y1={0} x2={0} y2={-190} stroke={C.rojo} strokeWidth={10} strokeLinecap="round" transform={`rotate(${ang})`} />
          <circle r={18} fill="#1b2433" />
        </svg>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 110, color: "#1b2433", lineHeight: 1 }}>
          {Math.round(v)} km/h
        </div>
        <div style={{ fontFamily: SANS, fontSize: 36, color: "#1b2433aa" }}>unos 22 nudos · mar en calma</div>
      </Centro>
    </AbsoluteFill>
  );
};

const AVISOS = ["Caronia", "Noordam", "Baltic", "Amerika", "Californian", "Mesaba"];

const Telegramas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#14100c" }}>
      {AVISOS.map((b, i) => {
        const t = 15 + i * 38;
        const a = prog(frame, t, t + 14, { ...clamp, easing: Easing.out(Easing.back(1.4)) });
        const rot = (random(`r${i}`) - 0.5) * 14;
        const dx = (random(`x${i}`) - 0.5) * 500;
        const dy = (random(`y${i}`) - 0.5) * 220;
        return (
          <div
            key={b}
            style={{
              position: "absolute",
              left: 960 - 380 + dx,
              top: 400 - 150 + dy,
              width: 760,
              padding: "36px 44px",
              background: "#efe5cc",
              boxShadow: "0 20px 60px #000a",
              transform: `rotate(${rot}deg) scale(${interpolate(a, [0, 1], [1.4, 1])})`,
              opacity: a,
              fontFamily: MAQUINA,
              color: "#2a2018",
            }}
          >
            <div style={{ fontSize: 26, letterSpacing: 6 }}>MARCONIGRAMA · AVISO {i + 1} DE 6</div>
            <div style={{ fontSize: 30, marginTop: 10 }}>DESDE: {b.toUpperCase()}</div>
            <div style={{ fontSize: 60, marginTop: 18, color: "#8a1f1f" }}>HIELO EN LA RUTA</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Termometro: React.FC<{ de: number; a: number; titulo: string; nota: string; frio?: boolean }> = ({ de, a, titulo, nota, frio }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [15, 120], [de, a], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const h = interpolate(t, [-5, 15], [30, 520]);
  return (
    <AbsoluteFill>
      <Cielo arriba={frio ? "#03101f" : "#1a2a44"} abajo={frio ? "#0a2238" : "#5a3c3a"} />
      <Centro top={20}>
        <div style={{ display: "flex", alignItems: "center", gap: 120 }}>
          <svg width={160} height={680} viewBox="0 0 160 680">
            <rect x={50} y={20} width={60} height={560} rx={30} fill="#ffffff14" stroke="#ffffff55" strokeWidth={4} />
            <circle cx={80} cy={600} r={60} fill={C.hielo} />
            <rect x={62} y={580 - h} width={36} height={h + 10} rx={18} fill={C.hielo} />
          </svg>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, letterSpacing: 6, color: C.crema2 }}>{titulo}</div>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 200, color: C.crema, lineHeight: 1 }}>
              {Math.round(t) < 0 ? "−" : ""}
              {Math.abs(Math.round(t))}
              <span style={{ fontFamily: SANS, fontWeight: 400, fontSize: 120 }}> °C</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 38, color: C.crema2 }}>{nota}</div>
          </div>
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const Himno: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Cielo arriba="#1c1410" abajo="#3a2618" />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: 14 }).map((_, i) => {
          const t = ((frame + i * 37) % 260) / 260;
          const x = 200 + random(`n${i}`) * 1520 + Math.sin(t * 6 + i) * 30;
          const y = 900 - t * 800;
          return (
            <text key={i} x={x} y={y} fontSize={60 + random(`s${i}`) * 40} fill={C.oro} opacity={Math.sin(t * Math.PI) * 0.6}>
              {i % 2 ? "♪" : "♫"}
            </text>
          );
        })}
      </svg>
      <Centro>
        <Titular size={44} color={C.crema2}>
          DOMINGO POR LA NOCHE · COMEDOR DE SEGUNDA CLASE
        </Titular>
        <div style={{ height: 20 }} />
        <Titular size={88} italic delay={10}>
          “Por los que están
          <br />
          en peligro en el mar”
        </Titular>
      </Centro>
    </AbsoluteFill>
  );
};

const NocheSinLuna: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 400], [1150, 760]);
  return (
    <AbsoluteFill>
      <Cielo arriba="#000" abajo="#071426" />
      <Estrellas n={320} alto={760} />
      <div style={{ position: "absolute", left: x, top: 640 }}>
        <Barco ancho={480} />
      </div>
      <Mar y={763} quieto opacidad={0.95} />
      <div style={{ position: "absolute", top: 120, width: 1920, textAlign: "center", fontFamily: SERIF_IT, fontSize: 56, color: C.crema2 }}>
        Sin luna · Mar como un espejo
      </div>
    </AbsoluteFill>
  );
};

export const ABordo: React.FC = () => {
  const ID = "aBordo";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <Comodidades /> },
        { desde: k("domingo 14"), render: <Velocidad /> },
        { desde: k("sala de radio"), render: <Telegramas /> },
        {
          desde: k("Al atardecer"),
          render: <Termometro de={10} a={0} titulo="TEMPERATURA DEL AIRE" nota="Cerca del punto de congelación al anochecer" />,
        },
        { desde: k("cantar himnos"), render: <Himno /> },
        { desde: k("dormir temprano"), render: <NocheSinLuna /> },
      ]}
    />
  );
};

// =====================================================================
// 4. EL CHOQUE
// =====================================================================
const RelojEscena: React.FC<{ h: number; m: number; desdeH?: number; desdeM?: number; fondo?: [string, string] }> = ({
  h,
  m,
  desdeH,
  desdeM,
  fondo = ["#02060d", "#0b1a2e"],
}) => (
  <AbsoluteFill>
    <Cielo arriba={fondo[0]} abajo={fondo[1]} />
    <Estrellas opacidad={0.5} />
    <Centro top={30}>
      <Reloj h={h} m={m} desdeH={desdeH} desdeM={desdeM} size={420} dur={70} />
    </Centro>
  </AbsoluteFill>
);

const Iceberg: React.FC<{ escala: number; x?: number; y?: number; color?: string }> = ({ escala, x = 960, y = 760, color = "#d8eef7" }) => (
  <svg width={1920} height={1080} style={{ position: "absolute" }}>
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <path d="M-260,0 L-200,-120 L-140,-150 L-90,-260 L-20,-210 L40,-300 L110,-180 L170,-160 L240,-40 L280,0 Z" fill={color} />
      <path d="M-90,-260 L-20,-210 L-40,-90 L-140,-150 Z" fill="#ffffff" opacity={0.5} />
      <path d="M40,-300 L110,-180 L60,-60 L-20,-210 Z" fill="#9cc3d6" opacity={0.6} />
    </g>
  </svg>
);

const Vigia: React.FC = () => {
  const frame = useCurrentFrame();
  const esc = interpolate(frame, [0, 170], [0.35, 1.15], { ...clamp, easing: Easing.in(Easing.quad) });
  const toques = [15, 30, 45];
  const flash = Math.max(...toques.map((t) => interpolate(frame, [t, t + 3, t + 10], [0, 0.35, 0], clamp)));
  const grito = prog(frame, 95, 110, clamp);
  return (
    <AbsoluteFill>
      <Cielo arriba="#000" abajo="#08162a" />
      <Estrellas />
      <Iceberg escala={esc} />
      <Mar y={758} opacidad={0.96} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
      <div style={{ position: "absolute", left: 120, top: 110, display: "flex", gap: 22 }}>
        {toques.map((t, i) => (
          <div
            key={i}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              border: `4px solid ${C.oro}`,
              background: frame > t ? C.oro : "transparent",
            }}
          />
        ))}
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, color: C.crema2, alignSelf: "center", marginLeft: 10 }}>
          3 campanadas
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          width: 1920,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 120,
          color: C.crema,
          opacity: grito,
          transform: `scale(${interpolate(grito, [0, 1], [1.3, 1])})`,
        }}
      >
        “¡ICEBERG, JUSTO AL FRENTE!”
      </div>
    </AbsoluteFill>
  );
};

/** Vista cenital: el barco gira a babor demasiado tarde */
const Giro: React.FC = () => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [10, 160], [37, 0], clamp);
  const t = prog(frame, 10, 160, { ...clamp, easing: Easing.linear });
  const y = interpolate(t, [0, 1], [900, 470]);
  const rot = interpolate(t, [0, 0.35, 1], [0, 0, -13]);
  const choque = interpolate(frame, [160, 164, 190], [0, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: "#06101e" }}>
      <svg width={1920} height={1080}>
        {/* iceberg desde arriba */}
        <path d="M1000,230 L1080,200 L1150,240 L1160,300 L1100,340 L1020,330 L980,280 Z" fill="#d8eef7" />
        {/* barco */}
        <g transform={`translate(960 ${y}) rotate(${rot})`}>
          <path d="M-40,0 Q0,-90 40,0 L40,560 Q0,600 -40,560 Z" fill="#141414" stroke="#444" strokeWidth={2} transform="translate(0 -40)" />
          <rect x={-26} y={40} width={52} height={420} rx={8} fill="#e6dfd0" />
          {[120, 200, 280, 360].map((yy) => (
            <ellipse key={yy} cx={0} cy={yy} rx={16} ry={24} fill="#d9a441" />
          ))}
        </g>
        <circle cx={1010} cy={360} r={choque * 120} fill="#fff" opacity={choque * 0.6} />
      </svg>
      <div style={{ position: "absolute", right: 140, top: 160, textAlign: "right" }}>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 180, color: C.crema, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {Math.ceil(s)}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 40, color: C.crema2 }}>segundos para el impacto</div>
      </div>
      <div style={{ position: "absolute", left: 140, top: 180, fontFamily: SANS, fontSize: 36, color: C.crema2, opacity: prog(frame, 40, 60) }}>
        ← Giro a babor
      </div>
    </AbsoluteFill>
  );
};

const Vaso: React.FC = () => {
  const frame = useCurrentFrame();
  const temblor = interpolate(frame, [20, 30, 90], [0, 1, 0], clamp);
  const dx = Math.sin(frame * 2.3) * 4 * temblor;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #3a2a1c, #120c08)" }}>
      <Centro top={40}>
        <svg width={600} height={520} viewBox="0 0 600 520">
          <rect x={60} y={430} width={480} height={20} rx={6} fill="#5a4630" />
          <g transform={`translate(${dx} 0)`}>
            <path d="M200,140 L400,140 L380,430 L220,430 Z" fill="#ffffff18" stroke="#ffffff66" strokeWidth={4} />
            <path d="M207,230 L393,230 L380,430 L220,430 Z" fill="#9cc3d655" />
            {[0, 1, 2].map((i) => {
              const r = ((frame - 22 - i * 8) % 40) / 40;
              return temblor > 0.05 ? (
                <ellipse key={i} cx={300} cy={230} rx={20 + r * 70} ry={(20 + r * 70) * 0.18} fill="none" stroke="#fff" strokeWidth={2} opacity={(1 - r) * temblor} />
              ) : null;
            })}
          </g>
        </svg>
        <div style={{ fontFamily: SERIF_IT, fontSize: 56, color: C.crema2 }}>Apenas un temblor</div>
      </Centro>
    </AbsoluteFill>
  );
};

const Motores: React.FC = () => {
  const frame = useCurrentFrame();
  const amp = interpolate(frame, [30, 110], [1, 0], clamp);
  let d = "M100,480";
  for (let x = 100; x <= 1820; x += 6) {
    const y = 480 + Math.sin(x / 18 + frame / 2) * 70 * amp * (0.6 + 0.4 * Math.sin(x / 140));
    d += ` L${x},${y.toFixed(1)}`;
  }
  return (
    <AbsoluteFill style={{ background: "#050b16" }}>
      <svg width={1920} height={1080}>
        <path d={d} stroke={C.oro} strokeWidth={5} fill="none" />
      </svg>
      <div style={{ position: "absolute", top: 160, width: 1920, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 40, letterSpacing: 8, color: C.crema2 }}>
        MOTORES
      </div>
      <div
        style={{
          position: "absolute",
          top: 650,
          width: 1920,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: 110,
          color: C.crema,
          opacity: prog(frame, 100, 125),
        }}
      >
        Detenidos
      </div>
    </AbsoluteFill>
  );
};

const HieloEnCubierta: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Cielo arriba="#000" abajo="#0b1626" />
      <Estrellas opacidad={0.7} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* cubierta en perspectiva */}
        <path d="M0,1080 L560,560 L1360,560 L1920,1080 Z" fill="#4b3a28" />
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1={560 + i * 53} y1={560} x2={-200 + i * 145} y2={1080} stroke="#2e2316" strokeWidth={3} />
        ))}
        <path d="M560,560 L1360,560 L1360,520 L560,520 Z" fill="#2a2016" />
        {Array.from({ length: 26 }).map((_, i) => {
          const t0 = random(`c${i}`) * 120;
          const caida = prog(frame, t0, t0 + 25, { ...clamp, easing: Easing.in(Easing.quad) });
          const xf = 620 + random(`cx${i}`) * 680;
          const yf = 620 + random(`cy${i}`) * 380;
          const s = 10 + random(`cs${i}`) * 26 * (yf / 800);
          return (
            <rect
              key={i}
              x={xf}
              y={interpolate(caida, [0, 1], [300, yf])}
              width={s}
              height={s * 0.8}
              rx={4}
              fill="#e8f6fb"
              opacity={caida > 0 ? 0.9 : 0}
              transform={`rotate(${random(`cr${i}`) * 60} ${xf} ${yf})`}
            />
          );
        })}
      </svg>
      <div style={{ position: "absolute", top: 120, width: 1920, textAlign: "center", fontFamily: SERIF_IT, fontSize: 56, color: C.crema2, opacity: prog(frame, 300, 330) }}>
        “No pasa nada”
      </div>
    </AbsoluteFill>
  );
};

const Brecha: React.FC = () => {
  const frame = useCurrentFrame();
  const left = 180;
  const ancho = 1560;
  const esc = ancho / 1000;
  const tajo = prog(frame, 15, 75);
  const agua = prog(frame, 70, 200);
  // 16 compartimentos estancos; los 6 de proa quedan abiertos
  const xs = Array.from({ length: 17 }).map((_, i) => 85 + (i * (955 - 85)) / 16);
  return (
    <AbsoluteFill>
      <Cielo arriba="#020710" abajo="#0b1a2e" />
      <div style={{ position: "absolute", left, top: 300 }}>
        <Barco ancho={ancho} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform={`translate(${left} ${300 + 20 * esc}) scale(${esc})`}>
          {xs.slice(0, 16).map((x, i) => {
            const abierto = i >= 10;
            return (
              <g key={i}>
                <line x1={x} y1={125} x2={x} y2={222} stroke="#ffffff40" strokeWidth={1.5} />
                {abierto && (
                  <rect x={x} y={222 - 95 * agua * (0.5 + (i - 10) * 0.1)} width={xs[i + 1] - x} height={95 * agua * (0.5 + (i - 10) * 0.1)} fill="#2f7fb5" opacity={0.85} />
                )}
              </g>
            );
          })}
          <path d={`M${955 - 0},205 L${955 - 320 * tajo},212`} stroke={C.rojo} strokeWidth={6} strokeLinecap="round" />
        </g>
      </svg>
      <Mar y={300 + 220 * esc} opacidad={0.6} />
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 130, color: C.crema, lineHeight: 1 }}>≈ 90 m</div>
        <div style={{ fontFamily: SANS, fontSize: 38, color: C.crema2, opacity: prog(frame, 80, 100) }}>
          de casco abierto · 6 compartimentos inundándose
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Choque: React.FC = () => {
  const ID = "choque";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <RelojEscena h={23} m={40} desdeH={23} desdeM={0} /> },
        { desde: k("Tocó la campana"), render: <Vigia /> },
        { desde: k("37 segundos"), render: <Giro /> },
        { desde: k("en la cama"), render: <Vaso /> },
        { desde: k("el silencio"), render: <Motores /> },
        { desde: k("Subí a cubierta"), render: <HieloEnCubierta /> },
        { desde: k("90 metros"), render: <Brecha /> },
      ]}
    />
  );
};

export { RelojEscena, Iceberg, Termometro, Dato };

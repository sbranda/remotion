import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import {
  BarcoPartes,
  Beats,
  Bote,
  C,
  CORTE_X,
  Centro,
  Cielo,
  Contador,
  Estrellas,
  MAQUINA,
  Mar,
  Pictograma,
  Reloj,
  SANS,
  SERIF,
  SERIF_IT,
  Titular,
  clamp,
  miles,
  prog,
} from "./graficos";
import { Mapa } from "./mapa";
import { Iceberg, RelojEscena, Termometro } from "./escenas1";
import { capitulo, cueDe } from "./tiempos";

// ---------------------------------------------------------------------------
// Barco en escena nocturna, con inclinación, hundimiento y rotura
// ---------------------------------------------------------------------------
type Pose = {
  /** grados, + = proa hacia abajo */
  angulo: number;
  /** cuánto se hundió, en unidades del barco */
  hundido: number;
  luces: number;
  roto?: boolean;
  anguloPopa?: number;
  hundidoPopa?: number;
  anguloProa?: number;
  hundidoProa?: number;
  humo?: number;
};

const ESC = 1.3;
const HORIZONTE = 760;

const BarcoEscena: React.FC<{ pose: Pose; x?: number; escala?: number; id?: string }> = ({ pose, x = 960, escala = ESC, id = "bs" }) => {
  const tx = x - 500 * escala;
  const base = (ang: number, hund: number) =>
    `translate(${tx} ${HORIZONTE - 200 * escala + hund * escala}) scale(${escala}) rotate(${ang} ${CORTE_X} 200)`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", overflow: "visible" }}>
      {!pose.roto ? (
        <g transform={base(pose.angulo, pose.hundido)}>
          <BarcoPartes luces={pose.luces} humo={pose.humo ?? 0} id={id} />
        </g>
      ) : (
        <>
          <g transform={base(pose.anguloProa ?? pose.angulo, pose.hundidoProa ?? pose.hundido)}>
            <BarcoPartes luces={pose.luces} parte="proa" id={`${id}p`} />
          </g>
          {(pose.hundidoPopa ?? 0) < 900 && (
            <g transform={base(pose.anguloPopa ?? pose.angulo, pose.hundidoPopa ?? pose.hundido)}>
              <BarcoPartes luces={pose.luces} parte="popa" id={`${id}q`} />
            </g>
          )}
        </>
      )}
    </svg>
  );
};

const Noche: React.FC<{ children?: React.ReactNode; mar?: boolean }> = ({ children, mar = true }) => (
  <AbsoluteFill>
    <Cielo arriba="#000" abajo="#081629" />
    <Estrellas n={220} alto={760} />
    {children}
    {mar && <Mar y={HORIZONTE} opacidad={0.94} />}
  </AbsoluteFill>
);

// =====================================================================
// 5. LOS BOTES SALVAVIDAS
// =====================================================================
const Vapor: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Noche>
      <BarcoEscena pose={{ angulo: 1.5, hundido: 6, luces: 1, humo: 1 }} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const h = 30 + Math.abs(Math.sin(frame / 3 + i * 1.7)) * 160 * (0.6 + random(`v${i}`) * 0.4);
          return <rect key={i} x={1280 + i * 22} y={260 - h / 2} width={12} height={h} rx={6} fill={C.oro} opacity={0.8} />;
        })}
        <text x={1530} y={410} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={32} letterSpacing={6} fill={C.crema2}>
          RUIDO ENSORDECEDOR
        </text>
      </svg>
    </Noche>
  );
};

const RelojArena: React.FC = () => {
  const frame = useCurrentFrame();
  const t = prog(frame, 10, 260, { ...clamp, easing: Easing.linear });
  return (
    <AbsoluteFill>
      <Cielo arriba="#050b16" abajo="#16233a" />
      <Centro top={20}>
        <div style={{ display: "flex", alignItems: "center", gap: 120 }}>
          <svg width={300} height={520} viewBox="0 0 300 520">
            <rect x={20} y={10} width={260} height={20} rx={6} fill={C.oro} />
            <rect x={20} y={490} width={260} height={20} rx={6} fill={C.oro} />
            <path d="M50,30 L250,30 Q250,200 160,260 Q250,320 250,490 L50,490 Q50,320 140,260 Q50,200 50,30 Z" fill="#ffffff10" stroke={C.crema3} strokeWidth={4} />
            <path d={`M${70 + 70 * t},${60 + 180 * t} L${230 - 70 * t},${60 + 180 * t} Q200,220 150,258 Q100,220 ${70 + 70 * t},${60 + 180 * t} Z`} fill={C.crema} />
            <rect x={147} y={260} width={6} height={230} fill={C.crema} opacity={t < 1 ? 0.8 : 0} />
            <path d={`M60,490 Q150,${490 - 150 * t} 240,490 Z`} fill={C.crema} />
          </svg>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 6, color: C.crema2 }}>EL CONSTRUCTOR AL CAPITÁN</div>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 150, color: C.crema, lineHeight: 1.05 }}>
              Una o dos<br />horas
            </div>
            <div style={{ fontFamily: SERIF_IT, fontSize: 50, color: C.oro }}>“El barco se va a hundir”</div>
          </div>
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const PlazasEnBotes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#07111f" }}>
      <Centro top={30} gap={40}>
        <div style={{ display: "flex", gap: 120, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 110, color: C.crema, lineHeight: 1 }}>
              <Contador de={0} a={2224} delay={10} dur={45} formato={miles} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 34, color: C.crema2 }}>personas a bordo</div>
          </div>
          <div style={{ opacity: prog(frame, 60, 80) }}>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 110, color: C.oro, lineHeight: 1 }}>
              <Contador de={0} a={1178} delay={60} dur={45} formato={miles} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 34, color: C.crema2 }}>lugares en los 20 botes</div>
          </div>
        </div>
        <Pictograma total={222} marcados={118} colorMarcado={C.oro} columnas={37} tam={28} delay={5} marcarDesde={55} />
        <div style={{ fontFamily: SANS, fontSize: 30, color: C.crema3 }}>Cada punto = 10 personas</div>
      </Centro>
    </AbsoluteFill>
  );
};

const MedioVacio: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#07111f" }}>
      <Centro top={30} gap={40}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 6, color: C.crema2 }}>EL PRIMER BOTE EN BAJAR · N.º 7</div>
        <svg width={1300} height={330} viewBox="0 0 1300 330">
          <path d="M20,40 L1280,40 Q1220,320 1000,320 L300,320 Q80,320 20,40 Z" fill="none" stroke={C.crema} strokeWidth={6} />
          {Array.from({ length: 65 }).map((_, i) => {
            const col = i % 13;
            const fila = Math.floor(i / 13);
            const lleno = i < 28;
            const a = prog(frame, 20 + i * 1.2, 30 + i * 1.2);
            return (
              <circle
                key={i}
                cx={350 + col * 50}
                cy={80 + fila * 46}
                r={18 * a}
                fill={lleno ? C.oro : "none"}
                stroke={lleno ? "none" : C.crema3}
                strokeWidth={3}
              />
            );
          })}
        </svg>
        <div style={{ display: "flex", gap: 100 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 90, color: C.oro }}>28 personas</div>
          <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 90, color: C.crema3 }}>65 lugares</div>
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const Cohetes: React.FC = () => {
  const frame = useCurrentFrame();
  const lanzamientos = [10, 90, 170, 250];
  const lejana = 0.5 + 0.5 * Math.sin(frame / 10);
  return (
    <Noche>
      <BarcoEscena pose={{ angulo: 3, hundido: 14, luces: 1 }} x={1150} escala={1} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {lanzamientos.map((t, i) => {
          const sube = prog(frame, t, t + 30, { ...clamp, easing: Easing.out(Easing.quad) });
          const estalla = prog(frame, t + 30, t + 80, { ...clamp, easing: Easing.out(Easing.cubic) });
          const x = 1350 + i * 20;
          const y = interpolate(sube, [0, 1], [560, 160]);
          return (
            <g key={t}>
              {sube > 0 && sube < 1 && <line x1={x} y1={y} x2={x} y2={y + 60} stroke="#fff" strokeWidth={3} opacity={0.8} />}
              {estalla > 0 &&
                estalla < 1 &&
                Array.from({ length: 14 }).map((_, j) => {
                  const a = (j / 14) * Math.PI * 2;
                  return (
                    <circle key={j} cx={x + Math.cos(a) * 150 * estalla} cy={160 + Math.sin(a) * 150 * estalla + estalla * 60} r={6} fill="#fff" opacity={1 - estalla} />
                  );
                })}
            </g>
          );
        })}
        {/* luz de otro barco en el horizonte */}
        <circle cx={260} cy={HORIZONTE - 6} r={6} fill={C.luz} opacity={0.4 + 0.6 * lejana} />
        <circle cx={260} cy={HORIZONTE - 6} r={24} fill={C.luz} opacity={0.15 * lejana} />
        <text x={260} y={HORIZONTE - 50} textAnchor="middle" fontFamily={SANS} fontSize={30} fill={C.crema2} opacity={prog(frame, 150, 175)}>
          Otro barco. Nunca vino.
        </text>
      </svg>
    </Noche>
  );
};

const Radio: React.FC = () => {
  const frame = useCurrentFrame();
  const z = prog(frame, 0, 60);
  const carp = prog(frame, 70, 200);
  const morse = "CQD CQD SOS SOS · TITANIC · NECESITAMOS AYUDA";
  const n = Math.floor(interpolate(frame, [10, 140], [0, morse.length], clamp));
  return (
    <AbsoluteFill>
      <Mapa progreso={1} zoom={z} carpathia={carp} />
      <div style={{ position: "absolute", left: 100, top: 90, fontFamily: MAQUINA, fontSize: 44, color: C.crema }}>
        {morse.slice(0, n)}
        {frame % 20 < 10 ? "▌" : ""}
      </div>
      <div style={{ position: "absolute", right: 120, bottom: 230, textAlign: "right", opacity: prog(frame, 150, 175) }}>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 90, color: C.verde, lineHeight: 1 }}>≈ 4 horas</div>
        <div style={{ fontFamily: SANS, fontSize: 36, color: C.crema2 }}>a unos 93 km de distancia</div>
      </div>
    </AbsoluteFill>
  );
};

export const Botes: React.FC = () => {
  const ID = "botes";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <RelojEscena h={0} m={5} desdeH={23} desdeM={40} /> },
        { desde: k("ensordecedor"), render: <Vapor /> },
        { desde: k("constructor"), render: <RelojArena /> },
        { desde: k("1.178"), render: <PlazasEnBotes /> },
        { desde: k("medio vacíos"), render: <MedioVacio /> },
        { desde: k("cohetes"), render: <Cohetes /> },
        { desde: k("Por la radio"), render: <Radio /> },
      ]}
    />
  );
};

// =====================================================================
// 6. EL BOTE 13
// =====================================================================
const Inclinado: React.FC<{ notas?: boolean }> = ({ notas }) => {
  const frame = useCurrentFrame();
  return (
    <Noche>
      <BarcoEscena pose={{ angulo: 5, hundido: 28, luces: 1 }} />
      {notas && (
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const t = ((frame + i * 31) % 180) / 180;
            return (
              <text key={i} x={500 + i * 70 + Math.sin(t * 6 + i) * 20} y={480 - t * 360} fontSize={56} fill={C.oro} opacity={Math.sin(t * Math.PI) * 0.8}>
                {i % 2 ? "♪" : "♫"}
              </text>
            );
          })}
          <text x={960} y={140} textAnchor="middle" fontFamily={SERIF_IT} fontSize={52} fill={C.crema2}>
            La orquesta seguía tocando
          </text>
        </svg>
      )}
    </Noche>
  );
};

const Trece: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#050b16" }}>
      <Centro top={20} gap={10}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, letterSpacing: 10, color: C.crema2, opacity: prog(frame, 0, 15) }}>
          BOTE SALVAVIDAS
        </div>
        <Titular size={360}>13</Titular>
        <div style={{ opacity: prog(frame, 70, 90), fontFamily: SERIF_IT, fontSize: 60, color: C.oro }}>“¿Hay más mujeres? ¿Más niños?”</div>
        <div style={{ opacity: prog(frame, 190, 210), fontFamily: SERIF, fontWeight: 900, fontSize: 90, color: C.crema }}>“Usted. Salte.”</div>
      </Centro>
    </AbsoluteFill>
  );
};

const Salto: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ background: "#fff", opacity: interpolate(frame, [0, 4, 30], [0, 1, 0], clamp) }} />;
};

/** Plano pegado al casco: el bote baja y las ventanas pasan hacia arriba */
const Descenso: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [0, 250], [0, 900], clamp);
  const sacudon = Math.sin(frame / 3) * 4 * (frame < 250 ? 1 : 0);
  return (
    <AbsoluteFill style={{ background: "#0d0d0f" }}>
      <svg width={1920} height={1080}>
        {Array.from({ length: 10 }).map((_, fila) =>
          Array.from({ length: 16 }).map((_, c) => {
            const y = ((fila * 160 - scroll) % 1600 + 1600) % 1600 - 200;
            const encendida = random(`w${fila}-${c}`) > 0.25;
            return (
              <g key={`${fila}-${c}`}>
                <circle cx={80 + c * 120} cy={y} r={26} fill={encendida ? C.luz : "#222"} opacity={encendida ? 0.85 : 1} />
                <circle cx={80 + c * 120} cy={y} r={32} fill="none" stroke="#444" strokeWidth={6} />
              </g>
            );
          }),
        )}
        <rect x={0} y={0} width={1920} height={1080} fill="url(#sombra)" />
        <defs>
          <radialGradient id="sombra">
            <stop offset="40%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.85} />
          </radialGradient>
        </defs>
        {/* cuerdas */}
        <line x1={760} y1={0} x2={760} y2={560 + sacudon} stroke="#d9c7a6" strokeWidth={5} />
        <line x1={1160} y1={0} x2={1160} y2={560 + sacudon} stroke="#d9c7a6" strokeWidth={5} />
      </svg>
      <div style={{ position: "absolute", left: 960 - 260, top: 520 + sacudon }}>
        <Bote ancho={520} numero="13" gente={10} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 100, fontFamily: SANS, fontSize: 36, color: C.crema2 }}>
        ↓ Unos 20 metros hasta el agua
      </div>
    </AbsoluteFill>
  );
};

const Chorro: React.FC = () => {
  const frame = useCurrentFrame();
  const empuje = prog(frame, 20, 140);
  return (
    <AbsoluteFill>
      <Cielo arriba="#020710" abajo="#081629" />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* casco a la izquierda */}
        <rect x={0} y={0} width={340} height={1080} fill="#121214" />
        {/* chorro de agua */}
        {Array.from({ length: 40 }).map((_, i) => {
          const t = ((frame * 2 + i * 13) % 60) / 60;
          return <circle key={i} cx={340 + t * 520} cy={650 + Math.sin(i) * 30 + t * t * 120} r={14 + t * 20} fill="#e8f6fb" opacity={(1 - t) * 0.5} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 600 + empuje * 600, top: 640, transform: `rotate(${Math.sin(frame / 6) * 3}deg)` }}>
        <Bote ancho={460} numero="13" gente={10} />
      </div>
      <Mar y={740} opacidad={0.9} />
    </AbsoluteFill>
  );
};

const Bote15: React.FC<{ corte: number; caida: number }> = ({ corte, caida }) => {
  const frame = useCurrentFrame();
  const baja = interpolate(frame, [0, 120], [-260, 300], { ...clamp, easing: Easing.out(Easing.quad) });
  const cae = prog(frame, caida, caida + 20, { ...clamp, easing: Easing.in(Easing.quad) });
  const y15 = cae > 0 ? interpolate(cae, [0, 1], [300, 600]) : baja;
  const cortado = frame >= corte;
  const aparta = prog(frame, corte, corte + 60);
  const x13 = 960 - 230 + aparta * 520;
  const splash = interpolate(frame, [caida + 20, caida + 30, caida + 70], [0, 1, 0], clamp);
  const alerta = frame > 30 && frame < corte && frame % 20 < 12;
  return (
    <AbsoluteFill>
      <Cielo arriba="#020710" abajo="#081629" />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect x={0} y={0} width={260} height={1080} fill="#121214" />
        {/* cuerdas del 15 */}
        <line x1={830} y1={0} x2={830} y2={y15 + 20} stroke="#d9c7a6" strokeWidth={4} opacity={cae > 0 ? 0 : 1} />
        <line x1={1090} y1={0} x2={1090} y2={y15 + 20} stroke="#d9c7a6" strokeWidth={4} opacity={cae > 0 ? 0 : 1} />
        {/* cuerdas del 13 */}
        {!cortado && (
          <>
            <line x1={x13 + 40} y1={0} x2={x13 + 40} y2={640} stroke="#d9c7a6" strokeWidth={4} />
            <line x1={x13 + 420} y1={0} x2={x13 + 420} y2={640} stroke="#d9c7a6" strokeWidth={4} />
          </>
        )}
        {cortado && (
          <g opacity={1 - aparta}>
            <line x1={x13 + 40 - aparta * 520} y1={0} x2={x13 + 40 - aparta * 520} y2={420} stroke="#d9c7a6" strokeWidth={4} />
            <line x1={x13 + 420 - aparta * 520} y1={0} x2={x13 + 420 - aparta * 520} y2={420} stroke="#d9c7a6" strokeWidth={4} />
          </g>
        )}
      </svg>
      <div style={{ position: "absolute", left: 960 - 230, top: y15 }}>
        <Bote ancho={460} numero="15" gente={12} />
      </div>
      <div style={{ position: "absolute", left: x13, top: 620 }}>
        <Bote ancho={460} numero="13" gente={10} />
      </div>
      <Mar y={740} opacidad={0.9} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {splash > 0 &&
          Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={960 + (i - 9) * 30} cy={740 - Math.abs(Math.sin(i)) * 140 * splash} r={12} fill="#e8f6fb" opacity={splash} />
          ))}
      </svg>
      {alerta && (
        <div style={{ position: "absolute", right: 140, top: 140, fontFamily: SERIF, fontWeight: 900, fontSize: 140, color: C.rojo }}>!</div>
      )}
    </AbsoluteFill>
  );
};

const Remando: React.FC = () => {
  const frame = useCurrentFrame();
  const remo = Math.sin(frame / 10) * 18;
  return (
    <Noche mar={false}>
      <BarcoEscena pose={{ angulo: 7, hundido: 40, luces: 1 }} x={760} escala={0.75} id="rm" />
      <Mar y={HORIZONTE} opacidad={0.94} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform={`translate(1350 ${880 + Math.sin(frame / 15) * 6})`}>
          <line x1={-140} y1={0} x2={-260} y2={60} stroke="#8a6a43" strokeWidth={8} transform={`rotate(${remo} -140 0)`} />
          <line x1={140} y1={0} x2={260} y2={60} stroke="#8a6a43" strokeWidth={8} transform={`rotate(${-remo} 140 0)`} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 1350 - 230, top: 820 + Math.sin(frame / 15) * 6 }}>
        <Bote ancho={460} numero="13" gente={10} />
      </div>
    </Noche>
  );
};

export const Bote13: React.FC = () => {
  const ID = "bote13";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  const b15 = k("El bote 15 venía");
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <RelojEscena h={1} m={40} desdeH={0} desdeM={45} /> },
        { desde: k("La cubierta ya no"), render: <Inclinado /> },
        { desde: k("orquesta"), render: <Inclinado notas /> },
        { desde: k("Me tocó el bote 13"), render: <Trece /> },
        { desde: k("Salté."), render: <Salto /> },
        { desde: k("a sacudones"), render: <Descenso /> },
        { desde: k("Al tocar el agua"), render: <Chorro /> },
        { desde: b15 - 90, render: <Bote15 corte={k("cuchillo") - b15 + 120} caida={k("cayó al agua") - b15 + 90} /> },
        { desde: k("Remamos lejos") - 25, render: <Remando /> },
      ]}
    />
  );
};

// =====================================================================
// 7. EL HUNDIMIENTO (una sola toma continua)
// =====================================================================
export const Hundimiento: React.FC = () => {
  const ID = "hundimiento";
  const frame = useCurrentFrame();
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  const kParp = k("parpadearon");
  const kApag = k("se apagaron");
  const kRug = k("Un rugido");
  const kPie = k("La popa se quedó");
  const kFue = k("Y se fue");
  const kHora = k("dos y veinte");
  const kDos = k("Dos horas");

  const angulo = interpolate(frame, [0, kRug], [8, 16], clamp);
  const hundido = interpolate(frame, [0, kRug], [45, 85], clamp);

  // luces: parpadean dos veces y se apagan
  let luces = 1;
  if (frame >= kParp) {
    const t = frame - kParp;
    luces = t < 8 ? 0 : t < 20 ? 1 : t < 28 ? 0 : t < 40 ? 0.9 : frame < kApag + 15 ? 0.6 : 0;
  }

  const roto = frame >= kRug + 60;
  const sacude = frame >= kRug && frame < kRug + 120 ? Math.sin(frame * 1.7) * 3 : 0;
  const anguloPopa = interpolate(frame, [kRug + 60, kRug + 140, kPie, kFue], [16, 6, 70, 78], clamp);
  const hundidoPopa = interpolate(
    frame,
    [kRug + 60, kPie, kFue, kFue + 170],
    [85, 210, 240, 1100],
    { ...clamp, easing: Easing.in(Easing.quad) },
  );
  const anguloProa = interpolate(frame, [kRug + 60, kRug + 200], [16, 40], clamp);
  const hundidoProa = interpolate(frame, [kRug + 60, kRug + 200], [85, 500], clamp);
  const camara = interpolate(frame, [kRug, kPie], [1, 0.82], clamp);
  const ondas = frame > kFue + 150 ? ((frame - kFue - 150) % 90) / 90 : -1;
  const reloj = prog(frame, kHora - 10, kHora + 10);
  return (
    <AbsoluteFill>
      <Noche mar={false}>
        <AbsoluteFill style={{ transform: `scale(${camara}) translate(0, ${sacude}px)`, transformOrigin: "960px 760px" }}>
          <BarcoEscena
            pose={{
              angulo,
              hundido,
              luces,
              roto,
              anguloPopa,
              hundidoPopa,
              anguloProa,
              hundidoProa,
            }}
            id="hd"
          />
        </AbsoluteFill>
        {/* el mar no se escala con la cámara: así cubre siempre todo el ancho */}
        <Mar y={HORIZONTE} opacidad={0.97} />
        {ondas >= 0 && (
          <svg width={1920} height={1080} style={{ position: "absolute" }}>
            <ellipse cx={760} cy={HORIZONTE + 20} rx={40 + ondas * 500} ry={(40 + ondas * 500) * 0.08} fill="none" stroke="#fff" strokeWidth={2} opacity={(1 - ondas) * 0.4} />
          </svg>
        )}
      </Noche>
      {reloj > 0 && (
        <AbsoluteFill style={{ background: `rgba(2,6,13,${0.75 * reloj})` }}>
          <Centro top={30} style={{ opacity: reloj }}>
            <Reloj h={2} m={20} desdeH={23} desdeM={40} size={360} dur={90} />
            <div style={{ fontFamily: SANS, fontSize: 40, color: C.crema2, opacity: prog(frame, kDos, kDos + 20) }}>
              2 horas y 40 minutos después del choque
            </div>
          </Centro>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// =====================================================================
// 8. EL SILENCIO Y EL CARPATHIA
// =====================================================================
const MarVacio: React.FC<{ bote?: boolean }> = ({ bote }) => {
  const frame = useCurrentFrame();
  return (
    <Noche>
      {bote && (
        <div style={{ position: "absolute", left: 960 - 160, top: 690 + Math.sin(frame / 18) * 5 }}>
          <Bote ancho={320} numero="13" gente={10} />
        </div>
      )}
    </Noche>
  );
};

const Silencio: React.FC = () => {
  const frame = useCurrentFrame();
  const amp = interpolate(frame, [0, 200], [1, 0], clamp);
  let d = "M100,480";
  for (let x = 100; x <= 1820; x += 5) {
    const ruido = random(`s${Math.floor(x / 5)}-${Math.floor(frame / 2)}`) - 0.5;
    d += ` L${x},${(480 + ruido * 260 * amp).toFixed(1)}`;
  }
  return (
    <AbsoluteFill style={{ background: "#03070e" }}>
      <svg width={1920} height={1080}>
        <path d={d} stroke={C.crema3} strokeWidth={3} fill="none" />
      </svg>
      <div style={{ position: "absolute", top: 640, width: 1920, textAlign: "center", fontFamily: SERIF_IT, fontSize: 80, color: C.crema, opacity: prog(frame, 170, 200) }}>
        Silencio
      </div>
    </AbsoluteFill>
  );
};

const Bengala: React.FC = () => {
  const frame = useCurrentFrame();
  const sube = prog(frame, 20, 70, { ...clamp, easing: Easing.out(Easing.quad) });
  const brillo = interpolate(frame, [70, 80, 160], [0, 1, 0.3], clamp);
  return (
    <Noche>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle cx={1500} cy={interpolate(sube, [0, 1], [HORIZONTE, 360])} r={8} fill={C.verde} opacity={sube > 0 ? 1 : 0} />
        <circle cx={1500} cy={360} r={220} fill={C.verde} opacity={brillo * 0.25} />
        <circle cx={1500} cy={360} r={40} fill={C.verde} opacity={brillo} />
      </svg>
      <div style={{ position: "absolute", left: 960 - 160, top: 690 + Math.sin(frame / 18) * 5 }}>
        <Bote ancho={320} numero="13" gente={10} />
      </div>
    </Noche>
  );
};

const Llegada: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Mapa progreso={1} zoom={1} carpathia={prog(frame, 0, 140)} />
    </AbsoluteFill>
  );
};

const Amanecer: React.FC = () => {
  const frame = useCurrentFrame();
  const luz = prog(frame, 0, 120);
  return (
    <AbsoluteFill>
      <Cielo arriba="#1b2a4a" abajo="#e9a37f" />
      <AbsoluteFill style={{ background: "linear-gradient(#000, #0a1424)", opacity: 1 - luz }} />
      {[
        [300, 0.55],
        [700, 0.35],
        [1250, 0.7],
        [1650, 0.4],
      ].map(([x, s], i) => (
        <Iceberg key={i} escala={s} x={x} y={HORIZONTE} color={`rgba(244, 196, 200, ${0.6 + 0.4 * luz})`} />
      ))}
      {[480, 900, 1450].map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x, top: 800 + i * 20 }}>
          <Bote ancho={140} gente={8} />
        </div>
      ))}
      <Mar y={HORIZONTE} color="#3b4a66" lineas="#ffd9c0" opacidad={0.9} />
    </AbsoluteFill>
  );
};

const Escalera: React.FC = () => {
  const frame = useCurrentFrame();
  const linea = prog(frame, 40, 140);
  return (
    <AbsoluteFill>
      <Cielo arriba="#5a6d8f" abajo="#f0c7a0" />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* casco del Carpathia */}
        <rect x={0} y={60} width={1100} height={700} fill="#1a1a1a" />
        <rect x={0} y={60} width={1100} height={30} fill="#e9e2d2" />
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={90 + i * 115} cy={220} r={18} fill="#3a3a3a" />
        ))}
        <text x={480} y={420} textAnchor="middle" fontFamily={SERIF} fontWeight={900} fontSize={90} fill="#e9e2d2" letterSpacing={10}>
          CARPATHIA
        </text>
        {/* escalera de cuerda */}
        <line x1={960} y1={90} x2={960} y2={760} stroke="#d9c7a6" strokeWidth={6} />
        <line x1={1040} y1={90} x2={1040} y2={760} stroke="#d9c7a6" strokeWidth={6} />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={960} y1={120 + i * 46} x2={1040} y2={120 + i * 46} stroke="#d9c7a6" strokeWidth={6} />
        ))}
        {/* línea de tiempo del rescate */}
        <g transform="translate(1180 330)">
          <line x1={0} y1={0} x2={600 * linea} y2={0} stroke={C.verde} strokeWidth={6} />
          <circle cx={0} cy={0} r={14} fill={C.verde} />
          <circle cx={600} cy={0} r={14} fill={C.verde} opacity={linea >= 1 ? 1 : 0} />
          <text x={0} y={-40} fontFamily={SERIF} fontWeight={900} fontSize={64} fill="#1b2433">
            4:00
          </text>
          <text x={0} y={60} fontFamily={SANS} fontSize={30} fill="#1b2433">
            primer bote
          </text>
          <g opacity={linea >= 1 ? 1 : 0}>
            <text x={600} y={-40} textAnchor="end" fontFamily={SERIF} fontWeight={900} fontSize={64} fill="#1b2433">
              8:30
            </text>
            <text x={600} y={60} textAnchor="end" fontFamily={SANS} fontSize={30} fill="#1b2433">
              último bote
            </text>
          </g>
        </g>
      </svg>
      <Mar y={HORIZONTE} color="#3b4a66" lineas="#ffd9c0" opacidad={0.95} />
    </AbsoluteFill>
  );
};

export const Carpathia: React.FC = () => {
  const ID = "carpathia";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <MarVacio /> },
        {
          desde: k("dos grados"),
          render: <Termometro de={4} a={-2} titulo="TEMPERATURA DEL AGUA" nota="En minutos, el frío paralizaba el cuerpo" frio />,
        },
        { desde: k("No volvimos"), render: <MarVacio bote /> },
        { desde: k("Los gritos duraron"), render: <Silencio /> },
        { desde: k("Pasamos horas"), render: <MarVacio bote /> },
        { desde: k("luz verde"), render: <Bengala /> },
        { desde: k("navegado toda la noche"), render: <Llegada /> },
        { desde: k("amaneció"), render: <Amanecer /> },
        { desde: k("escalera de cuerda"), render: <Escalera /> },
      ]}
    />
  );
};

// =====================================================================
// 9. EPÍLOGO
// =====================================================================
const Lluvia: React.FC = () => {
  const frame = useCurrentFrame();
  const edificios = [
    [60, 260], [180, 340], [300, 220], [420, 520], [520, 300], [640, 420], [780, 640], [880, 360],
    [1000, 300], [1120, 480], [1260, 260], [1380, 560], [1500, 340], [1640, 420], [1780, 280],
  ];
  return (
    <AbsoluteFill>
      <Cielo arriba="#0b0f18" abajo="#1d2636" />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {edificios.map(([x, h], i) => (
          <g key={i}>
            <rect x={x} y={760 - h} width={110} height={h} fill="#0a0d14" />
            {Array.from({ length: Math.floor(h / 40) }).map((_, j) =>
              random(`lw${i}-${j}`) > 0.55 ? <rect key={j} x={x + 20 + (j % 3) * 28} y={780 - h + j * 36} width={12} height={16} fill={C.luz} opacity={0.6} /> : null,
            )}
          </g>
        ))}
        <rect x={0} y={760} width={1920} height={320} fill="#151a24" />
        {/* gente en el muelle */}
        {Array.from({ length: 120 }).map((_, i) => (
          <circle key={i} cx={(i * 16 + random(`g${i}`) * 12) % 1920} cy={800 + random(`gy${i}`) * 40} r={8} fill="#05070b" />
        ))}
        {/* lluvia */}
        {Array.from({ length: 220 }).map((_, i) => {
          const x = random(`ll${i}`) * 2000;
          const y = ((random(`lly${i}`) * 1080 + frame * 28) % 1180) - 100;
          return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="#c8d6e8" strokeWidth={1.5} opacity={0.35} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

const Balance: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#05080f" }}>
      <Centro top={30} gap={40}>
        <div style={{ display: "flex", gap: 160 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 120, color: C.crema3, lineHeight: 1 }}>
              +<Contador de={0} a={1500} delay={10} dur={50} formato={miles} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 36, color: C.crema2 }}>murieron</div>
          </div>
          <div style={{ textAlign: "center", opacity: prog(frame, 50, 70) }}>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 120, color: C.crema, lineHeight: 1 }}>
              ≈ <Contador de={0} a={710} delay={50} dur={40} formato={miles} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 36, color: C.crema2 }}>sobrevivieron</div>
          </div>
        </div>
        <Pictograma total={222} marcados={71} colorMarcado={C.crema} colorResto="#ffffff1c" columnas={37} tam={28} delay={5} marcarDesde={50} />
        <div style={{ fontFamily: SANS, fontSize: 30, color: C.crema3 }}>Cada punto = 10 personas</div>
      </Centro>
    </AbsoluteFill>
  );
};

const Reglas: React.FC = () => {
  const frame = useCurrentFrame();
  const reglas = [
    ["⛵", "Botes salvavidas para todos"],
    ["📻", "Radio encendida día y noche"],
    ["🧊", "Patrulla Internacional del Hielo"],
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(#0a1424, #16263e)" }}>
      <Centro top={20} gap={50}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, letterSpacing: 8, color: C.crema2 }}>LO QUE CAMBIÓ DESPUÉS DEL TITANIC</div>
        <div style={{ display: "flex", gap: 60 }}>
          {reglas.map(([ico, txt], i) => {
            const a = prog(frame, 40 + i * 70, 65 + i * 70);
            return (
              <div
                key={txt}
                style={{
                  width: 460,
                  height: 380,
                  borderRadius: 24,
                  border: `2px solid ${C.oro}88`,
                  background: "#ffffff0a",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 30,
                  padding: 30,
                  boxSizing: "border-box",
                  opacity: a,
                  transform: `translateY(${(1 - a) * 40}px)`,
                }}
              >
                <div style={{ fontSize: 110 }}>{ico}</div>
                <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 46, color: C.crema, textAlign: "center", lineHeight: 1.15 }}>{txt}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 32, color: C.crema3, opacity: prog(frame, 260, 290) }}>
          Convenio internacional para la seguridad de la vida humana en el mar · 1914
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const Insumergible: React.FC = () => {
  const frame = useCurrentFrame();
  const tacha = prog(frame, 120, 150);
  return (
    <AbsoluteFill style={{ background: "#05080f" }}>
      <Centro top={20}>
        <div style={{ position: "relative" }}>
          <Titular size={170}>INSUMERGIBLE</Titular>
          <div
            style={{
              position: "absolute",
              left: -20,
              top: "52%",
              height: 16,
              width: `${tacha * 106}%`,
              background: C.rojo,
              transform: "rotate(-4deg)",
              borderRadius: 8,
            }}
          />
        </div>
      </Centro>
    </AbsoluteFill>
  );
};

const Final: React.FC = () => {
  const frame = useCurrentFrame();
  const total = capitulo("epilogo").duracion - cueDe("epilogo", "Yo estuve ahí");
  return (
    <Noche mar={false}>
      <BarcoEscena pose={{ angulo: 0, hundido: 0, luces: 1 }} escala={0.9} id="fin" />
      <Mar y={HORIZONTE} opacidad={0.94} />
      <AbsoluteFill style={{ background: "#000", opacity: interpolate(frame, [total - 200, total - 120], [0, 0.85], clamp) }} />
      <Centro top={40} style={{ opacity: prog(frame, total - 170, total - 130) }}>
        <div style={{ fontFamily: SERIF_IT, fontSize: 64, color: C.crema, textAlign: "center", lineHeight: 1.3 }}>
          En memoria de las más de 1.500 personas
          <br />
          que no volvieron.
        </div>
      </Centro>
    </Noche>
  );
};

export const Epilogo: React.FC = () => {
  const ID = "epilogo";
  const total = capitulo(ID).duracion;
  const k = (c: string) => cueDe(ID, c);
  return (
    <Beats
      total={total}
      beats={[
        { desde: 0, render: <Lluvia /> },
        { desde: k("Murieron"), render: <Balance /> },
        { desde: k("cambió las reglas"), render: <Reglas /> },
        { desde: k("miedo al mar"), render: <Insumergible /> },
        { desde: k("Yo estuve ahí"), render: <Final /> },
      ]}
    />
  );
};

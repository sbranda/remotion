// Reel de 90 s: sinestesia, estilo neón.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave } from "../salud/pop";

const FPS = 30;

/** Colores "de sinestesia" para cada dígito (son un ejemplo: cada persona tiene los suyos) */
const COLOR_DIGITO = ["#ffffff", "#ff4d5e", "#ffd23f", "#3ad7ff", "#2ee59d", "#ff9f43", "#8b5cff", "#ff6fb5", "#7cf0ff", "#b6f34d"];

const Digito: React.FC<{ d: number; desde: number; size?: number }> = ({ d, desde, size = 150 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 15], [0, 1], clamp);
  const c = COLOR_DIGITO[d];
  return (
    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1, color: p > 0.5 ? c : "#cfd8ea", textShadow: p > 0.5 ? `0 0 ${30 * p}px ${c}` : "none", transform: `scale(${1 + 0.15 * Math.sin(p * Math.PI)})`, display: "inline-block" }}>
      {d}
    </span>
  );
};

// ─── Música que se ve ───────────────────────────────────────────────────────
const MusicaColores: React.FC = () => {
  const frame = useCurrentFrame();
  const notas = [
    { c: "#ff4d5e", f: "circulo" },
    { c: "#ffd23f", f: "triangulo" },
    { c: "#3ad7ff", f: "onda" },
    { c: "#8b5cff", f: "circulo" },
    { c: "#2ee59d", f: "triangulo" },
  ];
  return (
    <svg width={900} height={380} viewBox="0 0 900 380" style={{ overflow: "visible" }}>
      <text x={40} y={220} fontSize={120}>
        🎹
      </text>
      {notas.map((n, i) => {
        const t = ((frame + i * 18) % 90) / 90;
        const x = 200 + t * 680;
        const y = 190 + Math.sin(t * Math.PI * 2 + i) * 110;
        const s = 20 + t * 40;
        const op = 1 - t * 0.7;
        return (
          <g key={i} opacity={op} style={{ filter: `drop-shadow(0 0 12px ${n.c})` }}>
            {n.f === "circulo" && <circle cx={x} cy={y} r={s} fill={n.c} />}
            {n.f === "triangulo" && <path d={`M${x} ${y - s} L${x + s} ${y + s} L${x - s} ${y + s} Z`} fill={n.c} />}
            {n.f === "onda" && <path d={`M${x - s * 1.5} ${y} q${s * 0.75} ${-s} ${s * 1.5} 0 t${s * 1.5} 0`} stroke={n.c} strokeWidth={10} fill="none" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
};

// ─── Áreas del cerebro con "cables cruzados" ───────────────────────────────
const Cables: React.FC<{ extra: number; poda: number }> = ({ extra, poda }) => {
  const frame = useCurrentFrame();
  const lineas = Array.from({ length: 9 }).map((_, i) => ({ y1: 90 + i * 22, y2: 80 + ((i * 37) % 200), queda: i === 2 || i === 6 }));
  return (
    <svg width={900} height={360} viewBox="0 0 900 360" style={{ overflow: "visible" }}>
      <ellipse cx={200} cy={180} rx={160} ry={130} fill="#ffd23f22" stroke={P.amarillo} strokeWidth={6} style={{ filter: `drop-shadow(0 0 16px ${P.amarillo})` }} />
      <ellipse cx={700} cy={180} rx={160} ry={130} fill="#ff4d5e22" stroke={P.rojo} strokeWidth={6} style={{ filter: `drop-shadow(0 0 16px ${P.rojo})` }} />
      <text x={200} y={175} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={44} fill={P.amarillo}>
        123
      </text>
      <text x={200} y={225} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={30} fill={P.texto}>
        números
      </text>
      <text x={700} y={175} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={44} fill={P.rojo}>
        🎨
      </text>
      <text x={700} y={225} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={30} fill={P.texto}>
        color
      </text>
      {lineas.map((l, i) => {
        const op = extra * (l.queda ? 1 : 1 - poda);
        const t = ((frame / 30 + i * 0.21) % 1);
        return (
          <g key={i} opacity={op}>
            <path d={`M340 ${l.y1} C450 ${l.y1 - 40} 450 ${l.y2 + 40} 560 ${l.y2}`} stroke={l.queda ? P.verde : P.cian} strokeWidth={l.queda ? 7 : 4} fill="none" />
            {l.queda && <circle cx={340 + 220 * t} cy={l.y1 + (l.y2 - l.y1) * t} r={9} fill="#fff" />}
          </g>
        );
      })}
    </svg>
  );
};

// ─── Test: encontrá los 2 entre los 5 ──────────────────────────────────────
const DOS = new Set([7, 12, 20, 29, 33, 41]);

/** Dígito de reloj digital: el 2 es el 5 en espejo, por eso cuesta encontrarlos */
const Segmentos: React.FC<{ dos: boolean; color: string }> = ({ dos, color }) => {
  const h = (x: number, y: number) => <rect x={x} y={y} width={34} height={8} rx={4} fill={color} />;
  const v = (x: number, y: number) => <rect x={x} y={y} width={8} height={30} rx={4} fill={color} />;
  return (
    <svg width={50} height={80} viewBox="0 0 50 80">
      {h(8, 2)}
      {h(8, 36)}
      {h(8, 70)}
      {dos ? v(42, 6) : v(0, 6)}
      {dos ? v(0, 42) : v(42, 42)}
    </svg>
  );
};

const Test: React.FC<{ revela: number }> = ({ revela }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 100px)", gap: 6, justifyContent: "center" }}>
    {Array.from({ length: 48 }).map((_, i) => {
      const es2 = DOS.has(i);
      const color = revela > 0.5 ? (es2 ? P.rojo : "#3f6f5a") : P.texto;
      return (
        <div key={i} style={{ display: "flex", justifyContent: "center", padding: "6px 0", filter: revela > 0.5 && es2 ? `drop-shadow(0 0 12px ${P.rojo})` : "none" }}>
          <Segmentos dos={es2} color={color} />
        </div>
      );
    })}
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <div style={{ display: "flex", gap: 26 }}>
      {[1, 2, 3, 4, 5].map((d, i) => (
        <Digito key={d} d={d} desde={10 + i * 10} size={140} />
      ))}
    </div>
    <Golpe desde={30}>
      <Grande size={86}>
        ¿Y si los números <Marcador desde={45} color={P.violeta} texto="#fff">tuvieran colores</Marcador>?
      </Grande>
    </Golpe>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={90}>
        <Marcador desde={10} color={P.violeta} texto="#fff">Sinestesia</Marcador>
      </Grande>
    </Golpe>
    <Golpe desde={30}>
      <Chico size={38} color={P.texto2}>
        Del griego: “sentir juntos”
      </Chico>
    </Golpe>
    <Golpe desde={70}>
      <Vidrio color={P.violeta} style={{ width: 940, padding: "18px 28px" }}>
        <Chico size={42}>
          Un sentido <b style={{ color: P.cian }}>enciende otro</b> de forma automática: escuchás un sonido… y además <b style={{ color: P.amarillo }}>ves un color</b>.
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={200}>
      <Chico size={38}>
        No es una enfermedad ni una alucinación. Y es <b style={{ color: P.verde }}>fija</b>: si el 7 es violeta, es violeta toda la vida.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 3. Tipos ───────────────────────────────────────────────────────────────
const Tipos: React.FC = () => (
  <Pagina gap={18}>
    <Golpe desde={0}>
      <Grande size={80}>
        Hay <Marcador desde={12} color={P.amarillo}>muchos tipos</Marcador>
      </Grande>
    </Golpe>
    <Fila desde={30} emoji="🔢" color={P.rojo} flecha="🎨">
      Letras y números con color
    </Fila>
    <Fila desde={120} emoji="🎵" color={P.cian} flecha="🌈">
      Sonidos y música que se ven
    </Fila>
    <Fila desde={210} emoji="💬" color={P.amarillo} flecha="👅">
      Palabras con sabor: “lunes” sabe a tostada
    </Fila>
    <Fila desde={300} emoji="📅" color={P.verde} flecha="🌀">
      Meses ubicados en el espacio, alrededor del cuerpo
    </Fila>
    <Fila desde={390} emoji="🪞" color={P.violeta} flecha="✋">
      Sentir en tu piel el toque que ves en otro
    </Fila>
  </Pagina>
);

// ─── 4. Música que se ve ────────────────────────────────────────────────────
const Musica: React.FC = () => (
  <Pagina gap={26}>
    <Golpe desde={0}>
      <Grande size={82}>
        Música que <Marcador desde={12} color={P.cian}>se ve</Marcador>
      </Grande>
    </Golpe>
    <MusicaColores />
    <Golpe desde={120}>
      <Chico size={38}>
        Cada nota o instrumento tiene su <b style={{ color: P.cian }}>color, forma y textura</b>.
      </Chico>
    </Golpe>
    <Golpe desde={220}>
      <Chico size={34} color={P.texto2}>
        Artistas como Pharrell Williams o Billie Eilish contaron que la tienen.
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 5. Qué pasa en el cerebro ──────────────────────────────────────────────
const Cerebro: React.FC = () => {
  const frame = useCurrentFrame();
  const extra = interpolate(frame, [60, 100], [0, 1], clamp);
  const poda = interpolate(frame, [220, 290], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={22}>
      <Golpe desde={0}>
        <Grande size={78}>
          ¿Qué pasa en el <Marcador desde={12} color={P.verde}>cerebro</Marcador>?
        </Grande>
      </Golpe>
      <Cables extra={extra} poda={poda} />
      <Golpe desde={70}>
        <Chico size={38}>
          El área que reconoce <b style={{ color: P.amarillo }}>números</b> y la que procesa el <b style={{ color: P.rojo }}>color</b> están <b>al lado</b>.
        </Chico>
      </Golpe>
      <Golpe desde={220}>
        <Chico size={36}>
          De bebés tenemos conexiones de más, y con los años se “podan”. En la sinestesia, <b style={{ color: P.verde }}>algunas quedan</b>: cables cruzados.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 6. Cuántos la tienen ───────────────────────────────────────────────────
const Cuantos: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={170} color={P.violeta} style={{ textShadow: `0 0 40px ${P.violeta}` }}>
        1 de 25
      </Grande>
    </Golpe>
    <Golpe desde={25}>
      <Grande size={60}>personas, aproximadamente</Grande>
    </Golpe>
    <Golpe desde={90}>
      <Chico size={40}>
        Suele darse en familias, y muchas personas <b style={{ color: P.amarillo }}>no saben que la tienen</b>: creen que todo el mundo lo vive igual. 😮
      </Chico>
    </Golpe>
  </Pagina>
);

// ─── 7. El test ─────────────────────────────────────────────────────────────
const Prueba: React.FC = () => {
  const frame = useCurrentFrame();
  const revela = interpolate(frame, [200, 215], [0, 1], clamp);
  return (
    <Pagina gap={20}>
      <Golpe desde={0}>
        <Grande size={74}>
          Rápido: ¿cuántos <Marcador desde={12} color={P.rojo} texto="#fff">2</Marcador> hay?
        </Grande>
      </Golpe>
      <Golpe desde={20}>
        <Test revela={revela} />
      </Golpe>
      <Golpe desde={215}>
        <Chico size={38}>
          Para algunas personas con sinestesia, los 2 <b style={{ color: P.rojo }}>saltan a la vista</b> por su color. (¡Son 6!)
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={30} centro>
    <Golpe desde={0}>
      <Grande size={78}>
        ¿De qué color es tu <span style={{ color: COLOR_DIGITO[7], textShadow: `0 0 30px ${COLOR_DIGITO[7]}` }}>7</span>? 👇
      </Grande>
    </Golpe>
    <Golpe desde={25}>
      <Chico size={40}>Contámelo en los comentarios</Chico>
    </Golpe>
    <div style={{ display: "flex", gap: 24 }}>
      <Boton desde={50} emoji="🔖" texto="Guardalo" color={P.verde} />
      <Boton desde={65} emoji="📲" texto="Compartilo" color={P.violeta} />
    </div>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 5, Escena: Gancho },
  { id: "queEs", seg: 12, Escena: QueEs },
  { id: "tipos", seg: 18, Escena: Tipos },
  { id: "musica", seg: 12, Escena: Musica },
  { id: "cerebro", seg: 16, Escena: Cerebro },
  { id: "cuantos", seg: 10, Escena: Cuantos },
  { id: "prueba", seg: 12, Escena: Prueba },
  { id: "cierre", seg: 5, Escena: Cierre },
];

export const DURACION_SINESTESIA = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const Sinestesia: React.FC = () => (
  <ReelPop
    paginas={PAGINAS}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 5,12,18,12,16,10,12,5 --bpm 108 --transponer 4 --estilo energico
    musica={staticFile("audio/sinestesia-musica.mp3")}
  />
);

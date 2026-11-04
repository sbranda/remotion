import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Sintoma } from "../hipertiroidismo/Hipertiroidismo";
import { Boton, Chico, Emoji, Fila, Golpe, Grande, Marcador, P, Pagina, ReelPop, SANS, Vidrio, clamp, suave, useGolpe, useSacudida } from "../salud/pop";
import { AYUDA, FPS, MEDIR, PAGINAS, PaginaId, RANGOS, URGENCIAS } from "./datos";

// ─── Tensiómetro digital ────────────────────────────────────────────────────
const Tensiometro: React.FC<{ alta: number; baja: number; desde: number; dur?: number; misterio?: boolean; color?: string; etiquetas?: boolean }> = ({
  alta,
  baja,
  desde,
  dur = 50,
  misterio = false,
  color = P.cian,
  etiquetas = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [0, 1], { ...clamp, easing: suave });
  const a = Math.round(alta * p);
  const b = Math.round(baja * p);
  const corazon = frame > desde && Math.floor(frame / 12) % 2 === 0;
  const digito: React.CSSProperties = {
    fontFamily: SANS,
    fontWeight: 800,
    color,
    textShadow: `0 0 24px ${color}`,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1,
  };
  return (
    <div
      style={{
        width: 560,
        background: "#0b1426",
        border: `6px solid ${P.borde}`,
        borderRadius: 40,
        padding: "30px 40px",
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px ${color}22`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {etiquetas && <span style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: P.texto2 }}>MÁXIMA</span>}
        <span style={{ ...digito, fontSize: 150, marginLeft: "auto" }}>{misterio && p >= 1 ? "¿?" : a}</span>
      </div>
      <div style={{ height: 3, background: P.borde }} />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {etiquetas && <span style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: P.texto2 }}>MÍNIMA</span>}
        <span style={{ ...digito, fontSize: 110, marginLeft: "auto" }}>{misterio && p >= 1 ? "¿?" : b}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: SANS, fontSize: 30, fontWeight: 700, color: P.texto2 }}>
        <span>mmHg</span>
        <span style={{ fontSize: 44, opacity: corazon ? 1 : 0.25 }}>❤️</span>
      </div>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const sac = useSacudida(40, 12);
  return (
    <Pagina gap={30} centro>
      <Golpe desde={0}>
        <div style={{ transform: `translateX(${sac}px)` }}>
          <Tensiometro alta={180} baja={110} desde={2} dur={36} misterio color={P.rojo} />
        </div>
      </Golpe>
      <Golpe desde={10}>
        <Grande size={80}>No duele. No avisa.</Grande>
      </Golpe>
      <Golpe desde={50} giro={-5}>
        <Grande size={84}>
          ¿Sabés cuánto tenés de <Marcador desde={60} color={P.rojo} texto="#fff">presión</Marcador>?
        </Grande>
      </Golpe>
    </Pagina>
  );
};

// ─── 2. Qué significan los dos números ──────────────────────────────────────
const Numeros: React.FC = () => (
  <Pagina gap={28}>
    <Golpe desde={0}>
      <Grande size={86}>
        ¿Qué son los <Marcador desde={10} color={P.cian}>dos números</Marcador>?
      </Grande>
    </Golpe>
    <Golpe desde={20}>
      <Tensiometro alta={120} baja={80} desde={25} etiquetas color={P.verde} />
    </Golpe>
    <Golpe desde={110}>
      <Vidrio color={P.cian} style={{ width: 920, padding: "18px 28px" }}>
        <Chico size={40}>
          <b style={{ color: P.cian }}>Máxima:</b> la presión cuando el corazón late 💓
        </Chico>
      </Vidrio>
    </Golpe>
    <Golpe desde={200}>
      <Vidrio color={P.violeta} style={{ width: 920, padding: "18px 28px" }}>
        <Chico size={40}>
          <b style={{ color: P.violeta }}>Mínima:</b> cuando descansa entre latido y latido 😌
        </Chico>
      </Vidrio>
    </Golpe>
  </Pagina>
);

// ─── 3. Valores ─────────────────────────────────────────────────────────────
const Valores: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26}>
      <Golpe desde={0}>
        <Grande size={92}>
          ¿Cuánto es <Marcador desde={10} color={P.verde}>normal</Marcador>?
        </Grande>
      </Golpe>
      {RANGOS.map((r, i) => {
        const d = 30 + i * 80;
        const p = useGolpe(d, 11);
        return (
          <div key={r.nombre} style={{ opacity: frame >= d ? 1 : 0, transform: `scale(${p})` }}>
            <Vidrio color={r.color} style={{ width: 940, padding: "20px 30px", display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: r.color, boxShadow: `0 0 24px ${r.color}`, flexShrink: 0 }} />
              <div style={{ fontFamily: SANS, flex: 1 }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: r.color }}>{r.nombre}</div>
                <div style={{ fontSize: 60, fontWeight: 800, color: P.texto, lineHeight: 1.1 }}>{r.valor}</div>
              </div>
            </Vidrio>
          </div>
        );
      })}
      <Golpe desde={300}>
        <Chico size={34} color={P.texto2}>
          Valores para adultos. Tu médico define tu meta según tu caso.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 4. La enemiga silenciosa ───────────────────────────────────────────────
const Silenciosa: React.FC = () => {
  const frame = useCurrentFrame();
  const marca = frame > 80;
  return (
    <Pagina gap={30}>
      <Golpe desde={0}>
        <Grande size={86}>
          La <Marcador desde={10} color={P.rojo} texto="#fff">enemiga silenciosa</Marcador>
        </Grande>
      </Golpe>
      <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
        {[0, 1, 2].map((i) => {
          const p = useGolpe(25 + i * 12, 10);
          const roja = marca && i === 1;
          return (
            <div
              key={i}
              style={{
                transform: `scale(${p * (roja ? 1.15 : 1)})`,
                filter: roja ? `drop-shadow(0 0 30px ${P.rojo})` : "grayscale(1) opacity(0.5)",
              }}
            >
              <Emoji e="🧍" size={170} />
            </div>
          );
        })}
      </div>
      <Golpe desde={85}>
        <Grande size={64}>
          <span style={{ color: P.rojo }}>1 de cada 3</span> adultos en el mundo tiene presión alta
        </Grande>
      </Golpe>
      <Golpe desde={170}>
        <Chico size={44}>
          Y casi nunca da síntomas: <b style={{ color: P.amarillo }}>muchos no lo saben</b>.
        </Chico>
      </Golpe>
      <Golpe desde={230}>
        <Chico size={40} color={P.texto2}>
          Con los años aumenta el riesgo de infarto, ACV y problemas en los riñones.
        </Chico>
      </Golpe>
    </Pagina>
  );
};

// ─── 5. Cómo medirla bien ───────────────────────────────────────────────────
const Medir: React.FC = () => (
  <Pagina gap={16}>
    <Golpe desde={0}>
      <Grande size={86}>
        Cómo medirla <Marcador desde={10} color={P.cian}>bien</Marcador>
      </Grande>
    </Golpe>
    {MEDIR.map((m, i) => (
      <Fila key={m.texto} desde={28 + i * 65} emoji={m.emoji} color={P.cian} flecha="" numero={i + 1}>
        {m.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 6. Qué ayuda ───────────────────────────────────────────────────────────
const Ayuda: React.FC = () => (
  <Pagina gap={20}>
    <Golpe desde={0}>
      <Grande size={92}>
        Qué <Marcador desde={10} color={P.verde}>ayuda</Marcador>
      </Grande>
    </Golpe>
    {AYUDA.map((a, i) => (
      <Fila key={a.texto} desde={28 + i * 65} emoji={a.emoji} color={P.verde} flecha="↓">
        {a.texto}
      </Fila>
    ))}
  </Pagina>
);

// ─── 7. Urgencias ───────────────────────────────────────────────────────────
const Urgencias: React.FC = () => {
  const frame = useCurrentFrame();
  const sirena = Math.floor(frame / 8) % 2 === 0;
  return (
    <Pagina gap={24}>
      <Golpe desde={0}>
        <Grande size={78}>
          🚨 Presión muy alta <Marcador desde={10} color={P.rojo} texto="#fff">y además…</Marcador>
        </Grande>
      </Golpe>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 290px)", gap: 20 }}>
        {URGENCIAS.map((u, i) => (
          <Sintoma key={u.texto} desde={25 + i * 25} emoji={u.emoji} texto={u.texto} color={P.rojo} />
        ))}
      </div>
      <Golpe desde={200}>
        <div
          style={{
            width: 940,
            background: sirena ? P.rojo : "#c9303f",
            borderRadius: 30,
            padding: "20px 30px",
            boxShadow: `0 0 50px ${P.rojo}${sirena ? "cc" : "55"}`,
            fontFamily: SANS,
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Llamá al 107 o al 911
        </div>
      </Golpe>
    </Pagina>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={44} centro>
    <Golpe desde={0}>
      <Emoji e="🩺" size={150} />
    </Golpe>
    <Golpe desde={8}>
      <Grande size={86}>
        Medite la presión <Marcador desde={20} color={P.amarillo}>aunque te sientas bien</Marcador>
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
  numeros: Numeros,
  valores: Valores,
  silenciosa: Silenciosa,
  medir: Medir,
  ayuda: Ayuda,
  urgencias: Urgencias,
  cierre: Cierre,
};

export const Presion: React.FC = () => (
  <ReelPop
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --paginas 4,12,14,10,16,14,12,8 --transponer -1 --bpm 114 --estilo energico
    musica={staticFile("audio/presion-musica.mp3")}
  />
);

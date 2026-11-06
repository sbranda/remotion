import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { ACOMPANAR, COMUNICACION, CONDUCTAS, FPS, MITOS, PAGINAS, PaginaId, SENALES, SENTIDOS } from "./datos";

const ARCOIRIS = ["#ff6b6b", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7", "#9775fa"];

// ─── Infinito multicolor (símbolo de la neurodiversidad) ────────────────────
const Infinito: React.FC<{ desde?: number; ancho?: number }> = ({ desde = 0, ancho = 560 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 60], [0, 1], { ...clamp, easing: suave });
  const giro = frame * 1.5;
  const d = "M280 150 C340 60 470 60 470 150 C470 240 340 240 280 150 C220 60 90 60 90 150 C90 240 220 240 280 150 Z";
  return (
    <svg width={ancho} height={ancho * 0.54} viewBox="0 0 560 300">
      <defs>
        <linearGradient id="infinito" x1="0" x2="1" gradientTransform={`rotate(${giro % 360} 0.5 0.5)`}>
          {ARCOIRIS.map((c, i) => (
            <stop key={c} offset={i / (ARCOIRIS.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#infinito)" strokeWidth={34} strokeLinecap="round" strokeDasharray={1300} strokeDashoffset={1300 * (1 - p)} />
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Infinito desde={0} />
    <Entra desde={20}>
      <Titulo size={90}>No es una enfermedad.</Titulo>
    </Entra>
    <Entra desde={70}>
      <Titulo size={80}>
        Es otra forma de <Resalta>percibir el mundo</Resalta>
      </Titulo>
    </Entra>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={28}>
    <Entra desde={0}>
      <Titulo>
        ¿Qué es el <Resalta>autismo</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={44}>
          Una condición del <b style={{ color: C.violeta }}>neurodesarrollo</b>: el cerebro procesa la información de otra manera.
        </Texto>
      </Tarjeta>
    </Entra>
    {[
      { e: "👶", t: "Está desde el nacimiento", d: 170 },
      { e: "♾️", t: "Acompaña toda la vida", d: 260 },
      { e: "💜", t: "No es algo que haya que “curar”", d: 350 },
    ].map((x) => (
      <Entra key={x.t} desde={x.d} dx={-40}>
        <Tarjeta color={C.azul} style={{ width: 920, padding: "16px 28px", display: "flex", alignItems: "center", gap: 22 }}>
          <Emoji e={x.e} size={64} />
          <div style={{ fontFamily: SANS, fontSize: 42, fontWeight: 700, color: C.texto }}>{x.t}</div>
        </Tarjeta>
      </Entra>
    ))}
    <Entra desde={460}>
      <Texto size={32} color={C.texto2}>
        Su nombre médico es Trastorno del Espectro Autista (TEA).
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 3. Por qué "espectro" ──────────────────────────────────────────────────
const Espectro: React.FC = () => {
  const frame = useCurrentFrame();
  const personas = ["🧒", "👧", "🧑", "👩", "👨", "🧓", "👦"];
  return (
    <Pagina gap={30}>
      <Entra desde={0}>
        <Titulo size={88}>
          ¿Por qué <Resalta color={C.azul}>“espectro”</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={25}>
        <div style={{ width: 920, height: 40, borderRadius: 20, background: `linear-gradient(90deg, ${ARCOIRIS.join(", ")})` }} />
      </Entra>
      <div style={{ display: "flex", gap: 14 }}>
        {personas.map((p, i) => {
          const op = interpolate(frame, [50 + i * 18, 70 + i * 18], [0, 1], clamp);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${Math.sin(frame / 25 + i) * 6}px)` }}>
              <Tarjeta color={ARCOIRIS[i % ARCOIRIS.length]} style={{ width: 118, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Emoji e={p} size={70} />
              </Tarjeta>
            </div>
          );
        })}
      </div>
      <Entra desde={200}>
        <Texto size={46}>
          Porque <b style={{ color: C.azul }}>cada persona autista es distinta</b>: tiene sus propias fortalezas y desafíos.
        </Texto>
      </Entra>
      <Entra desde={340}>
        <Texto size={38} color={C.texto2}>
          Algunas necesitan mucho apoyo en el día a día; otras, muy poco.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. ¿Es común? ──────────────────────────────────────────────────────────
const Comun: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={26} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          ¿Es <Resalta color={C.verde}>común</Resalta>?
        </Titulo>
      </Entra>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 54px)", gap: 12 }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const op = interpolate(frame, [15 + i * 0.6, 22 + i * 0.6], [0, 1], clamp);
          const marcado = i === 44 && frame > 100;
          return (
            <div
              key={i}
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                opacity: op,
                background: marcado ? "linear-gradient(135deg, #ff6b6b, #ffd43b, #4dabf7, #9775fa)" : "rgba(255,255,255,0.75)",
                transform: `scale(${marcado ? 1.3 : 1})`,
                boxShadow: marcado ? "0 0 20px rgba(151,117,250,0.6)" : "none",
              }}
            />
          );
        })}
      </div>
      <Entra desde={100}>
        <Texto size={46}>
          Alrededor de <b style={{ color: C.violeta }}>1 de cada 100 chicos</b> en el mundo (OMS)
        </Texto>
      </Entra>
      <Entra desde={180}>
        <Texto size={36} color={C.texto2}>
          En nenas y mujeres suele pasar desapercibido y se diagnostica más tarde.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Comunicación ────────────────────────────────────────────────────────
const Comunicacion: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={80}>
        En la <Resalta color={C.azul}>comunicación</Resalta>
      </Titulo>
    </Entra>
    <Lista items={COMUNICACION} desde={30} paso={110} color={C.azul} size={38} />
  </Pagina>
);

// ─── 6. Conductas e intereses ───────────────────────────────────────────────
const Conductas: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={80}>
        Intereses y <Resalta color={C.verde}>rutinas</Resalta>
      </Titulo>
    </Entra>
    <Lista items={CONDUCTAS} desde={30} paso={100} color={C.verde} size={38} />
    <Entra desde={440}>
      <Texto size={34} color={C.texto2}>
        Esos movimientos ayudan a regularse. No hace falta frenarlos si no lastiman.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7. Los sentidos ────────────────────────────────────────────────────────
const Ondas: React.FC = () => {
  const frame = useCurrentFrame();
  const calma = interpolate(frame, [330, 380], [0, 1], { ...clamp, easing: suave });
  return (
    <div style={{ position: "relative", width: 420, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {[0, 1, 2, 3].map((i) => {
        const t = ((frame + i * 12) % 48) / 48;
        const tam = 120 + 280 * t * (1 - 0.6 * calma);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: tam,
              height: tam,
              borderRadius: "50%",
              border: `5px solid ${C.coral}`,
              opacity: (1 - t) * (1 - 0.8 * calma),
            }}
          />
        );
      })}
      <Emoji e={calma > 0.5 ? "😌" : "😣"} size={110} />
      <div style={{ position: "absolute", top: 20, opacity: calma }}>
        <Emoji e="🎧" size={90} />
      </div>
    </div>
  );
};

const Sentidos: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Los sentidos, <Resalta color={C.coral}>a otro volumen</Resalta>
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Ondas />
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 296px)", gap: 16 }}>
      {SENTIDOS.map((s, i) => (
        <Entra key={s.texto} desde={60 + i * 35}>
          <Tarjeta color={C.coral} style={{ height: 150, padding: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, textAlign: "center" }}>
            <Emoji e={s.emoji} size={56} />
            <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, color: C.texto, lineHeight: 1.1 }}>{s.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={330}>
      <Texto size={34} color={C.texto2}>
        Pueden sentirse mucho más fuertes… o buscar más estímulos.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 8. Señales en los chicos ───────────────────────────────────────────────
const Senales: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={78}>
        Señales en los <Resalta color={C.amarillo}>más chiquitos</Resalta>
      </Titulo>
    </Entra>
    <Lista items={SENALES} desde={25} paso={85} color={C.amarillo} size={36} />
    <Entra desde={460}>
      <Texto size={34} color={C.texto2}>
        Ante la duda, consultá al pediatra: detectarlo temprano ayuda mucho.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 9. Mitos ───────────────────────────────────────────────────────────────
const Mitos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={18}>
      <Entra desde={0}>
        <Titulo size={84}>
          Mitos <Resalta color={C.coral}>que hay que dejar atrás</Resalta>
        </Titulo>
      </Entra>
      {MITOS.map((m, i) => {
        const d = 30 + i * 135;
        const tacha = frame > d + 50;
        return (
          <Entra key={m.mito} desde={d} dx={-40}>
            <Tarjeta color={tacha ? C.verde : C.coral} style={{ width: 920, padding: "14px 26px" }}>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 38,
                  fontWeight: 800,
                  color: C.coral,
                  textDecoration: tacha ? "line-through" : "none",
                  textDecorationThickness: 4,
                }}
              >
                ❌ “{m.mito}”
              </div>
              <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.verde, opacity: interpolate(frame, [d + 55, d + 75], [0, 1], clamp), lineHeight: 1.25, marginTop: 4 }}>
                ✅ {m.verdad}
              </div>
            </Tarjeta>
          </Entra>
        );
      })}
    </Pagina>
  );
};

// ─── 10. Cómo acompañar ─────────────────────────────────────────────────────
const Acompanar: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        Cómo <Resalta color={C.verde}>acompañar</Resalta>
      </Titulo>
    </Entra>
    <Lista items={ACOMPANAR} desde={30} paso={70} color={C.verde} size={40} />
    <Entra desde={420}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "16px 26px" }}>
        <Texto size={34}>
          El diagnóstico lo hace un equipo de profesionales. Las terapias (fonoaudiología, terapia ocupacional, psicología) dan apoyo según cada persona.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 11. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={26} centro>
    <Infinito desde={0} ancho={420} />
    <Entra desde={20}>
      <Titulo size={80}>
        No hay que cambiar a nadie: hay que <Resalta>comprender y acompañar</Resalta> 💜
      </Titulo>
    </Entra>
    <Entra desde={110}>
      <Texto size={34} color={C.texto2}>
        2 de abril: Día Mundial de Concienciación sobre el Autismo
      </Texto>
    </Entra>
    <Entra desde={170}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: C.azul },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: C.blanco, borderRadius: 999, padding: "14px 32px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={44} />
            {b.t}
          </div>
        ))}
      </div>
    </Entra>
    <Entra desde={200}>
      <Texto size={28} color={C.texto2} peso={500}>
        Esto no reemplaza la consulta con un profesional.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  espectro: Espectro,
  comun: Comun,
  comunicacion: Comunicacion,
  conductas: Conductas,
  sentidos: Sentidos,
  senales: Senales,
  mitos: Mitos,
  acompanar: Acompanar,
  cierre: Cierre,
};

export const Autismo: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 6,20,18,10,18,18,18,18,20,22,12 --bpm 76 --transponer 3 --estilo suave
    musica={staticFile("audio/autismo-musica.mp3")}
  />
);

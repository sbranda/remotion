import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";
import { ALARMAS, AYUDAR, CAUSAS, COMPARACION, FPS, LINEA_AYUDA, PAGINAS, PaginaId, PASITOS, SINTOMAS } from "./datos";

// ─── La nube: llueve sobre la persona y, al final, se corre y sale el sol ───
const Nube: React.FC<{ despeja?: number; persona?: string }> = ({ despeja = 0, persona = "😔" }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 560, height: 470 }}>
      {/* sol detrás */}
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 10,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffe08a 0%, #ffc04d 70%)",
          boxShadow: "0 0 80px rgba(255,200,80,0.8)",
          opacity: despeja,
          transform: `scale(${0.6 + 0.4 * despeja}) rotate(${frame}deg)`,
        }}
      />
      {/* lluvia */}
      {Array.from({ length: 14 }).map((_, i) => {
        const y = ((frame * 9 + i * 41) % 200) + 150;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 150 + ((i * 37) % 260),
              top: y,
              width: 6,
              height: 26,
              borderRadius: 3,
              background: "#7d8bb5",
              opacity: (1 - despeja) * 0.8,
            }}
          />
        );
      })}
      {/* nube */}
      <div style={{ position: "absolute", left: 110 + 480 * despeja, top: 50, opacity: 1 - despeja * 0.9 }}>
        <Emoji e="☁️" size={300} />
      </div>
      {/* persona */}
      <div style={{ position: "absolute", left: 210, bottom: 0 }}>
        <Emoji e={persona} size={140} />
      </div>
    </div>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={20} centro>
    <Entra desde={0}>
      <Nube />
    </Entra>
    <Entra desde={15}>
      <Titulo size={84}>¿Hace semanas que nada te da ganas?</Titulo>
    </Entra>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo>
        ¿Qué es la <Resalta>depresión</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={30}>
      <Tarjeta color={C.violeta} style={{ width: 920, padding: "22px 30px" }}>
        <Texto size={44}>
          Una <b style={{ color: C.violeta }}>enfermedad</b> que afecta cómo pensás, cómo te sentís y lo que hacés.
        </Texto>
      </Tarjeta>
    </Entra>
    {[
      { e: "🙅", t: "No es “estar bajón” un par de días", d: 170 },
      { e: "💪", t: "No es falta de voluntad ni debilidad", d: 250 },
      { e: "💚", t: "Tiene tratamiento y se mejora", d: 330 },
    ].map((x) => (
      <Entra key={x.t} desde={x.d} dx={-40}>
        <Tarjeta color={x.d === 330 ? C.verde : C.coral} style={{ width: 920, padding: "16px 28px", display: "flex", alignItems: "center", gap: 22 }}>
          <Emoji e={x.e} size={60} />
          <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 700, color: C.texto }}>{x.t}</div>
        </Tarjeta>
      </Entra>
    ))}
  </Pagina>
);

// ─── 3. Tristeza vs. depresión ──────────────────────────────────────────────
const Tristeza: React.FC = () => {
  const frame = useCurrentFrame();
  const columnas = [
    { titulo: "Tristeza", emoji: "😢", color: C.azul, lado: "tristeza" as const },
    { titulo: "Depresión", emoji: "🌧️", color: C.violeta, lado: "depresion" as const },
  ];
  return (
    <Pagina gap={26}>
      <Entra desde={0}>
        <Titulo size={84}>
          <Resalta color={C.azul}>Tristeza</Resalta> no es lo mismo que <Resalta>depresión</Resalta>
        </Titulo>
      </Entra>
      <div style={{ display: "flex", gap: 22 }}>
        {columnas.map((c, ci) => (
          <Entra key={c.titulo} desde={30 + ci * 30}>
            <Tarjeta color={c.color} style={{ width: 449, padding: "22px 20px", textAlign: "center" }}>
              <Emoji e={c.emoji} size={90} />
              <div style={{ fontFamily: SANS, fontSize: 52, fontWeight: 800, color: c.color, marginBottom: 12 }}>{c.titulo}</div>
              {COMPARACION.map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: SANS,
                    fontSize: 34,
                    fontWeight: 700,
                    color: C.texto,
                    padding: "12px 0",
                    borderTop: `2px solid ${c.color}33`,
                    lineHeight: 1.2,
                    opacity: interpolate(frame, [110 + i * 110, 130 + i * 110], [0, 1], clamp),
                  }}
                >
                  {f[c.lado]}
                </div>
              ))}
            </Tarjeta>
          </Entra>
        ))}
      </div>
    </Pagina>
  );
};

// ─── 4. Es común ────────────────────────────────────────────────────────────
const Comun: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [20, 110], [0, 280], { ...clamp, easing: suave }));
  return (
    <Pagina gap={30} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          Es más <Resalta color={C.azul}>común</Resalta> de lo que creés
        </Titulo>
      </Entra>
      <Entra desde={15}>
        <div style={{ fontFamily: SANS, fontSize: 170, fontWeight: 800, color: C.violeta, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n}</div>
      </Entra>
      <Entra desde={30}>
        <Texto size={46}>millones de personas en el mundo la tienen (OMS)</Texto>
      </Entra>
      <Entra desde={130}>
        <Texto size={38} color={C.texto2}>
          Es más frecuente en mujeres. Y le puede pasar a cualquiera, a cualquier edad.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Cómo se <Resalta>siente</Resalta>?
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 450px)", gap: 18 }}>
      {SINTOMAS.map((s, i) => (
        <Entra key={s.texto} desde={30 + i * 50}>
          <Tarjeta color={C.violeta} style={{ height: 140, padding: "0 22px", display: "flex", alignItems: "center", gap: 18 }}>
            <Emoji e={s.emoji} size={62} />
            <div style={{ fontFamily: SANS, fontSize: 33, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{s.texto}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={470}>
      <Texto size={34} color={C.texto2}>
        Si varios duran 2 semanas o más, casi todos los días, consultá.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 6. En el cuerpo ────────────────────────────────────────────────────────
const Cuerpo: React.FC = () => {
  const frame = useCurrentFrame();
  const carga = interpolate(frame, [20, 120], [0.9, 0.12], { ...clamp, easing: suave });
  return (
    <Pagina gap={30} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          También se siente en el <Resalta color={C.azul}>cuerpo</Resalta>
        </Titulo>
      </Entra>
      <Entra desde={15}>
        <div style={{ position: "relative", width: 360, height: 160, border: `8px solid ${C.texto2}`, borderRadius: 30, padding: 12 }}>
          <div style={{ width: `${carga * 100}%`, height: "100%", borderRadius: 16, background: carga > 0.4 ? C.verde : C.coral }} />
          <div style={{ position: "absolute", right: -30, top: 46, width: 20, height: 52, borderRadius: 6, background: C.texto2 }} />
        </div>
      </Entra>
      <Entra desde={130}>
        <Texto size={44}>Cansancio físico, dolores, moverse o pensar más lento.</Texto>
      </Entra>
      <Entra desde={230}>
        <Texto size={36} color={C.texto2}>
          A veces la depresión se muestra más en el cuerpo que en el ánimo.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 7. Causas ──────────────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        ¿Por qué <Resalta>aparece</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={20}>
      <Texto size={40}>Suele ser una mezcla de cosas:</Texto>
    </Entra>
    <Lista items={CAUSAS} desde={40} paso={70} size={38} />
    <Entra desde={340}>
      <Texto size={42}>
        <b style={{ color: C.verde }}>No es culpa de nadie.</b>
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 8. Señales de alarma ───────────────────────────────────────────────────
const Alarma: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={80}>
        Señales de <Resalta color={C.coral}>alarma</Resalta>
      </Titulo>
    </Entra>
    <Lista items={ALARMAS} desde={30} paso={60} color={C.coral} size={38} />
    <Entra desde={230}>
      <div style={{ width: 920, background: C.coral, borderRadius: 36, padding: "20px 30px", textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: C.blanco }}>Pedí ayuda ya, para vos o para esa persona</div>
        <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.blanco, marginTop: 8, lineHeight: 1.3 }}>
          {LINEA_AYUDA} · Emergencias: 911
        </div>
      </div>
    </Entra>
  </Pagina>
);

// ─── 9. Tratamiento ─────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={88}>
        Se trata y <Resalta color={C.verde}>se mejora</Resalta> 💚
      </Titulo>
    </Entra>
    <div style={{ display: "flex", gap: 20 }}>
      {[
        { e: "🗣️", t: "Terapia", d: 40 },
        { e: "💊", t: "Medicación indicada por un profesional", d: 110 },
        { e: "🤝", t: "O las dos juntas", d: 180 },
      ].map((x) => (
        <Entra key={x.t} desde={x.d}>
          <Tarjeta color={C.verde} style={{ width: 293, height: 280, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}>
            <Emoji e={x.e} size={86} />
            <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 700, color: C.texto, lineHeight: 1.15 }}>{x.t}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={280}>
      <Tarjeta color={C.amarillo} style={{ width: 920, padding: "18px 28px", background: "#fff4e6" }}>
        <Texto size={36}>
          Los antidepresivos tardan unas semanas en hacer efecto. No los dejes de golpe: siempre hablalo con tu médico.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 10. Cómo ayudar a alguien ──────────────────────────────────────────────
const Ayudar: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Si le pasa a <Resalta color={C.azul}>alguien que querés</Resalta>
      </Titulo>
    </Entra>
    <Lista items={AYUDAR} desde={30} paso={110} color={C.azul} size={36} />
  </Pagina>
);

// ─── 11. Pasitos que ayudan ─────────────────────────────────────────────────
const Pasitos: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Pasitos que <Resalta color={C.verde}>suman</Resalta>
      </Titulo>
    </Entra>
    <Lista items={PASITOS} desde={25} paso={55} color={C.verde} size={38} />
    <Entra desde={320}>
      <Texto size={32} color={C.texto2}>
        Ayudan, pero no reemplazan el tratamiento.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 12. Cierre: se despeja ─────────────────────────────────────────────────
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const despeja = interpolate(frame, [10, 90], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={18} centro>
      <Nube despeja={despeja} persona={despeja > 0.6 ? "🙂" : "😔"} />
      <Entra desde={60}>
        <Titulo size={78}>No estás solo ni sola. Pedir ayuda es el primer paso 💜</Titulo>
      </Entra>
      <Entra desde={120}>
        <Texto size={28} color={C.texto2}>
          {LINEA_AYUDA}
        </Texto>
      </Entra>
      <Entra desde={150}>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { e: "🔖", t: "Guardalo", c: C.verde },
            { e: "📲", t: "Compartilo", c: C.azul },
          ].map((b) => (
            <div key={b.t} style={{ background: b.c, color: C.blanco, borderRadius: 999, padding: "12px 30px", fontFamily: SANS, fontSize: 40, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
              <Emoji e={b.e} size={40} />
              {b.t}
            </div>
          ))}
        </div>
      </Entra>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, React.FC> = {
  gancho: Gancho,
  queEs: QueEs,
  tristeza: Tristeza,
  comun: Comun,
  sintomas: Sintomas,
  cuerpo: Cuerpo,
  causas: Causas,
  alarma: Alarma,
  tratamiento: Tratamiento,
  ayudar: Ayudar,
  pasitos: Pasitos,
  cierre: Cierre,
};

export const Depresion: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS.map((p) => ({ ...p, Escena: ESCENAS[p.id] }))}
    fps={FPS}
    // Música original tranquila: scripts/musica_reel.py --paginas 6,18,18,10,20,12,14,16,20,22,14,10 --bpm 70 --transponer 0 --estilo suave
    musica={staticFile("audio/depresion-musica.mp3")}
  />
);

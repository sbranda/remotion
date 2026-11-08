// Reel de 3 min: endometriosis, estilo calma.
import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, Emoji, Entra, Lista, Pagina, ReelCalma, Resalta, SANS, Tarjeta, Texto, Titulo, clamp, suave } from "../salud/calma";

const FPS = 30;
const ROSA = "#e05a8a";
const LESION = "#8e2c6b";

// ─── Útero, trompas y ovarios ───────────────────────────────────────────────
const LESIONES = [
  [118, 168],
  [150, 128],
  [455, 125],
  [492, 205],
  [210, 262],
  [392, 268],
  [300, 382],
  [255, 330],
  [350, 335],
];

const Utero: React.FC<{ lesiones: number; inflama?: number; adherencias?: number; ancho?: number }> = ({ lesiones, inflama = 0, adherencias = 0, ancho = 600 }) => {
  const frame = useCurrentFrame();
  const pulso = inflama * (0.5 + 0.5 * Math.sin(frame / 7));
  return (
    <svg width={ancho} height={ancho * 0.72} viewBox="0 0 600 430" style={{ overflow: "visible" }}>
      {/* trompas */}
      <path d="M240 130 Q180 90 130 120 Q95 140 90 170" stroke="#f3a3bd" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M360 130 Q420 90 470 120 Q505 140 510 170" stroke="#f3a3bd" strokeWidth={18} fill="none" strokeLinecap="round" />
      {/* ovarios */}
      <ellipse cx={100} cy={200} rx={48} ry={34} fill="#f7c6d6" stroke={ROSA} strokeWidth={4} />
      <ellipse cx={500} cy={200} rx={48} ry={34} fill="#f7c6d6" stroke={ROSA} strokeWidth={4} />
      {/* útero */}
      <path d="M225 115 Q300 90 375 115 Q392 220 335 300 L325 370 L275 370 L265 300 Q208 220 225 115 Z" fill="#f7c6d6" stroke={ROSA} strokeWidth={5} />
      {/* endometrio (capa interna) */}
      <path d="M250 135 Q300 120 350 135 Q358 215 315 280 L285 280 Q242 215 250 135 Z" fill={ROSA} opacity={0.75} />
      {/* adherencias: hilos que "pegan" órganos */}
      {adherencias > 0 &&
        [
          "M140 225 Q190 260 228 240",
          "M460 225 Q410 260 372 240",
          "M270 360 Q300 400 330 360",
        ].map((d, i) => <path key={i} d={d} stroke={LESION} strokeWidth={5} fill="none" strokeDasharray="8 8" opacity={adherencias} />)}
      {/* lesiones fuera del útero */}
      {LESIONES.map(([x, y], i) => {
        const a = Math.max(0, Math.min(1, lesiones * LESIONES.length - i));
        const r = (13 + (i % 3) * 4) * a * (1 + 0.35 * pulso);
        return (
          <g key={i}>
            {inflama > 0 && <circle cx={x} cy={y} r={r * 1.9} fill={C.coral} opacity={0.25 * pulso} />}
            <circle cx={x} cy={y} r={r} fill={LESION} opacity={0.9} />
          </g>
        );
      })}
    </svg>
  );
};

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
const Gancho: React.FC = () => (
  <Pagina gap={30} centro>
    <Entra desde={0}>
      <Emoji e="🌸" size={130} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={80}>¿Te dijeron que el dolor de período es normal?</Titulo>
    </Entra>
    <Entra desde={90}>
      <Texto size={50} color={ROSA}>
        Si te deja en la cama, <b>no lo es</b>.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  const lesiones = interpolate(frame, [220, 380], [0, 1], { ...clamp, easing: suave });
  return (
    <Pagina gap={24}>
      <Entra desde={0}>
        <Titulo size={84}>
          ¿Qué es la <Resalta color={ROSA}>endometriosis</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={30}>
        <Utero lesiones={lesiones} ancho={620} />
      </Entra>
      <Entra desde={60}>
        <Texto size={40}>
          El <b style={{ color: ROSA }}>endometrio</b> es la capa que recubre el útero por dentro.
        </Texto>
      </Entra>
      <Entra desde={220}>
        <Tarjeta color={LESION} style={{ width: 920, padding: "18px 28px" }}>
          <Texto size={40}>
            En la endometriosis, un tejido parecido crece <b style={{ color: LESION }}>fuera del útero</b>: en ovarios, trompas, intestino o vejiga.
          </Texto>
        </Tarjeta>
      </Entra>
    </Pagina>
  );
};

// ─── 3. Cada mes ────────────────────────────────────────────────────────────
const Ciclo: React.FC = () => {
  const frame = useCurrentFrame();
  const inflama = interpolate(frame, [90, 130], [0, 1], clamp);
  const adherencias = interpolate(frame, [330, 400], [0, 1], clamp);
  const dia = 1 + (Math.floor(frame / 6) % 28);
  return (
    <Pagina gap={20}>
      <Entra desde={0}>
        <Titulo size={80}>
          ¿Por qué <Resalta color={C.coral}>duele</Resalta>?
        </Titulo>
      </Entra>
      <Entra desde={20}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto2 }}>
          <Emoji e="📅" size={50} /> Día {dia} del ciclo
        </div>
      </Entra>
      <Utero lesiones={1} inflama={inflama} adherencias={adherencias} ancho={560} />
      <Entra desde={90}>
        <Texto size={38}>
          Cada mes ese tejido responde a las hormonas: <b style={{ color: C.coral }}>se inflama y sangra</b>… pero no tiene por dónde salir.
        </Texto>
      </Entra>
      <Entra desde={330}>
        <Texto size={36} color={C.texto2}>
          Con el tiempo deja cicatrices y <b style={{ color: LESION }}>“pega” órganos entre sí</b> (adherencias).
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 4. Cuánto tarda el diagnóstico ─────────────────────────────────────────
const FRASES = [
  { anio: 1, t: "“Es normal”" },
  { anio: 3, t: "“Tomate un ibuprofeno”" },
  { anio: 5, t: "“Es estrés”" },
  { anio: 6, t: "“Exagerás”" },
];

const Demora: React.FC = () => {
  const frame = useCurrentFrame();
  const anios = interpolate(frame, [90, 330], [0, 8], clamp);
  return (
    <Pagina gap={22}>
      <Entra desde={0}>
        <Titulo size={74}>
          La tiene <Resalta color={ROSA}>1 de cada 10</Resalta> mujeres… y tarda <Resalta color={C.coral}>años</Resalta> en diagnosticarse
        </Titulo>
      </Entra>
      <Entra desde={60}>
        <div style={{ width: 920, position: "relative", height: 300 }}>
          <div style={{ position: "absolute", top: 140, left: 0, right: 0, height: 18, borderRadius: 9, background: "rgba(255,255,255,0.7)" }} />
          <div style={{ position: "absolute", top: 140, left: 0, width: `${(anios / 8) * 100}%`, height: 18, borderRadius: 9, background: C.coral }} />
          {FRASES.map((f, i) => {
            const vis = anios >= f.anio;
            const x = (f.anio / 8) * 920;
            return (
              <div key={f.t} style={{ position: "absolute", left: Math.min(Math.max(x - 130, 0), 660), top: i % 2 ? 180 : 20, width: 260, opacity: vis ? 1 : 0, transition: "none" }}>
                <Tarjeta color={C.texto2} style={{ padding: "10px 14px", textAlign: "center", fontFamily: SANS, fontSize: 32, fontWeight: 700, color: C.texto }}>
                  {f.t}
                </Tarjeta>
              </div>
            );
          })}
        </div>
      </Entra>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 110, color: C.coral, lineHeight: 1 }}>{anios.toFixed(0)} años</div>
      <Entra desde={340}>
        <Texto size={38} color={C.texto2}>
          Es el tiempo promedio de espera: entre 7 y 10 años.
        </Texto>
      </Entra>
    </Pagina>
  );
};

// ─── 5. Síntomas ────────────────────────────────────────────────────────────
const Sintomas: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={80}>
        Síntomas <Resalta color={ROSA}>frecuentes</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🩸", texto: "Período muy doloroso, que no calma con analgésicos" },
        { emoji: "⚡", texto: "Dolor pélvico fuera del período" },
        { emoji: "💔", texto: "Dolor en las relaciones sexuales" },
        { emoji: "🚽", texto: "Dolor al hacer pis o caca durante el período" },
        { emoji: "🎈", texto: "Panza hinchada (“endo belly”)" },
        { emoji: "🍼", texto: "Dificultad para quedar embarazada" },
      ]}
      desde={30}
      paso={90}
      color={ROSA}
      size={36}
    />
  </Pagina>
);

// ─── 6. Lo que no se ve ─────────────────────────────────────────────────────
const Invisible: React.FC = () => (
  <Pagina gap={26}>
    <Entra desde={0}>
      <Titulo size={80}>
        Y lo que <Resalta color={C.violeta}>no se ve</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: 920 }}>
      {[
        { e: "🪫", t: "Cansancio constante" },
        { e: "😔", t: "Ansiedad y tristeza" },
        { e: "🏫", t: "Faltar a clases o al trabajo" },
        { e: "🙊", t: "Que no te crean" },
      ].map((x, i) => (
        <Entra key={x.t} desde={40 + i * 50}>
          <Tarjeta color={C.violeta} style={{ height: 210, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: 16 }}>
            <Emoji e={x.e} size={80} />
            <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 700, color: C.texto }}>{x.t}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
    <Entra desde={280}>
      <Texto size={44}>
        Tu dolor es <b style={{ color: C.violeta }}>real</b>. No estás exagerando. 💜
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 7. Por qué aparece ─────────────────────────────────────────────────────
const Causas: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={80}>
        ¿Por qué <Resalta color={C.azul}>aparece</Resalta>?
      </Titulo>
    </Entra>
    <Entra desde={25}>
      <Texto size={40} color={C.texto2}>
        No se sabe del todo. Se estudian varias causas:
      </Texto>
    </Entra>
    <Lista
      items={[
        { emoji: "🔄", texto: "Sangre del período que vuelve por las trompas" },
        { emoji: "🛡️", texto: "Defensas que no limpian ese tejido" },
        { emoji: "🧬", texto: "Herencia: si tu mamá o hermana la tiene" },
      ]}
      desde={70}
      paso={80}
      color={C.azul}
      size={38}
    />
    <Entra desde={340}>
      <Texto size={38}>
        No es contagiosa y <b style={{ color: C.azul }}>no es por algo que hiciste</b>.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 8. Cuándo consultar ────────────────────────────────────────────────────
const Consultar: React.FC = () => (
  <Pagina gap={22}>
    <Entra desde={0}>
      <Titulo size={80}>
        Consultá <Resalta color={C.amarillo}>si…</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "💊", texto: "El dolor no se va con analgésicos comunes" },
        { emoji: "🛏️", texto: "Te hace faltar a tus actividades" },
        { emoji: "💔", texto: "Te duele en las relaciones o al ir al baño" },
        { emoji: "🍼", texto: "Hace más de un año que buscás embarazo" },
      ]}
      desde={25}
      paso={55}
      color={C.amarillo}
      size={38}
    />
  </Pagina>
);

// ─── 9. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={80}>
        ¿Cómo se <Resalta color={C.verde}>diagnostica</Resalta>?
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "🗣️", texto: "Contando tus síntomas con detalle" },
        { emoji: "🩻", texto: "Ecografía especializada o resonancia" },
        { emoji: "🔬", texto: "A veces, una laparoscopia (cirugía por pequeños cortes)" },
      ]}
      desde={30}
      paso={90}
      color={C.verde}
      size={38}
    />
    <Entra desde={320}>
      <Tarjeta color={C.coral} style={{ width: 920, padding: "18px 28px" }}>
        <Texto size={38}>
          ⚠️ Una ecografía común <b style={{ color: C.coral }}>puede salir normal</b> aunque tengas endometriosis.
        </Texto>
      </Tarjeta>
    </Entra>
  </Pagina>
);

// ─── 10. Tratamiento ────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={78}>
        No tiene cura… <Resalta color={C.verde}>pero se controla</Resalta>
      </Titulo>
    </Entra>
    <Lista
      items={[
        { emoji: "💊", texto: "Antiinflamatorios para el dolor" },
        { emoji: "🧪", texto: "Tratamientos hormonales: pastillas, DIU, otros" },
        { emoji: "🏥", texto: "Cirugía para quitar las lesiones" },
        { emoji: "♨️", texto: "Calor, movimiento y kinesiología de piso pélvico" },
        { emoji: "🧠", texto: "Acompañamiento psicológico" },
      ]}
      desde={30}
      paso={75}
      color={C.verde}
      size={36}
    />
    <Entra desde={430}>
      <Texto size={34} color={C.texto2}>
        Cada caso es distinto: el tratamiento se elige con tu equipo de salud.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── 11. Mitos ──────────────────────────────────────────────────────────────
const MITOS = [
  { m: "“El dolor menstrual fuerte es normal”", r: "Si te limita, hay que consultar." },
  { m: "“Se cura con un embarazo”", r: "Puede aliviar un tiempo, pero no la cura." },
  { m: "“Con endometriosis no podés tener hijos”", r: "Muchas pueden; a veces con ayuda." },
];

const Mitos: React.FC = () => (
  <Pagina gap={24}>
    <Entra desde={0}>
      <Titulo size={84}>
        <Resalta color={C.coral}>Mitos</Resalta> ✋
      </Titulo>
    </Entra>
    {MITOS.map((x, i) => (
      <Entra key={x.m} desde={30 + i * 140} dx={-40}>
        <Tarjeta color={C.coral} style={{ width: 920, padding: "18px 28px" }}>
          <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 700, color: C.texto2, textDecoration: "line-through", textDecorationColor: C.coral, textDecorationThickness: 4 }}>{x.m}</div>
          <div style={{ fontFamily: SANS, fontSize: 38, fontWeight: 800, color: C.verde, marginTop: 8 }}>✅ {x.r}</div>
        </Tarjeta>
      </Entra>
    ))}
  </Pagina>
);

// ─── 12. Cierre ─────────────────────────────────────────────────────────────
const Cierre: React.FC = () => (
  <Pagina gap={28} centro>
    <Entra desde={0}>
      <Emoji e="💜" size={120} />
    </Entra>
    <Entra desde={10}>
      <Titulo size={78}>
        El dolor que te frena <Resalta color={ROSA}>no es normal</Resalta>.
      </Titulo>
    </Entra>
    <Entra desde={60}>
      <Texto size={44}>Merecés que te escuchen.</Texto>
    </Entra>
    <Entra desde={100}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { e: "🔖", t: "Guardalo", c: C.verde },
          { e: "📲", t: "Compartilo", c: ROSA },
        ].map((b) => (
          <div key={b.t} style={{ background: b.c, color: "#fff", borderRadius: 999, padding: "14px 34px", fontFamily: SANS, fontSize: 42, fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
            <Emoji e={b.e} size={42} />
            {b.t}
          </div>
        ))}
      </div>
    </Entra>
    <Entra desde={130}>
      <Texto size={28} color={C.texto2} peso={500}>
        Esto no reemplaza la consulta con tu médico.
      </Texto>
    </Entra>
  </Pagina>
);

// ─── Composición ────────────────────────────────────────────────────────────
const PAGINAS = [
  { id: "gancho", seg: 6, Escena: Gancho },
  { id: "queEs", seg: 16, Escena: QueEs },
  { id: "ciclo", seg: 18, Escena: Ciclo },
  { id: "demora", seg: 14, Escena: Demora },
  { id: "sintomas", seg: 22, Escena: Sintomas },
  { id: "invisible", seg: 14, Escena: Invisible },
  { id: "causas", seg: 14, Escena: Causas },
  { id: "consultar", seg: 10, Escena: Consultar },
  { id: "diagnostico", seg: 18, Escena: Diagnostico },
  { id: "tratamiento", seg: 20, Escena: Tratamiento },
  { id: "mitos", seg: 18, Escena: Mitos },
  { id: "cierre", seg: 10, Escena: Cierre },
];

export const DURACION_ENDOMETRIOSIS = PAGINAS.reduce((a, p) => a + p.seg, 0) * FPS;

export const Endometriosis: React.FC = () => (
  <ReelCalma
    paginas={PAGINAS}
    fps={FPS}
    // Música original suave: scripts/musica_reel.py --paginas 6,16,18,14,22,14,14,10,18,20,18,10 --bpm 80 --transponer 5 --estilo suave
    musica={staticFile("audio/endometriosis-musica.mp3")}
  />
);

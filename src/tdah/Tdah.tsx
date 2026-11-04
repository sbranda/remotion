import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Boton, Emoji, Globo, K, ListaStickers, Pagina, Pop, ReelComic, SANS, COMIC, Sello, Sticker, TituloComic, clamp, useRebote, useSacudida } from "../salud/comic";
import {
  ADULTOS,
  DIAGNOSTICO,
  FPS,
  HIPERACTIVIDAD,
  INATENCION,
  MITOS,
  PAGINAS,
  PENDIENTES,
  PaginaId,
  TIPOS,
  TIPS,
  TRATAMIENTO,
} from "./datos";

// ─── 1. Gancho: pendientes que aparecen por todos lados ─────────────────────
const POS = [
  [20, 330, -6],
  [420, 470, 5],
  [40, 610, 4],
  [380, 750, -5],
  [60, 890, -3],
];

export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={0}>
      <Pop desde={0} giro={-3}>
        <TituloComic size={100}>¿Empezás 10 cosas y no terminás ninguna?</TituloComic>
      </Pop>
      {PENDIENTES.map((t, i) => {
        const [x, y, g] = POS[i];
        const desde = 18 + i * 12;
        const tachado = interpolate(frame, [desde + 30, desde + 40], [0, 1], clamp);
        return (
          <div key={t} style={{ position: "absolute", left: x, top: y }}>
            <Pop desde={desde} giro={g}>
              <div style={{ position: "relative" }}>
                <Sticker color={[K.blanco, K.celeste, K.rosa, K.lima, K.naranja][i]} style={{ padding: "14px 26px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 48, fontWeight: 800 }}>{t}</span>
                </Sticker>
                {tachado > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -30,
                      top: -26,
                      transform: `scale(${tachado}) rotate(12deg)`,
                      background: K.rojo,
                      color: K.blanco,
                      border: `4px solid ${K.negro}`,
                      borderRadius: 10,
                      padding: "0 12px",
                      fontFamily: COMIC,
                      fontSize: 38,
                      letterSpacing: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ¡A MEDIAS!
                  </div>
                )}
              </div>
            </Pop>
          </div>
        );
      })}
    </Pagina>
  );
};

// ─── 2. Qué es ──────────────────────────────────────────────────────────────
const SIGLA = [
  ["T", "Trastorno"],
  ["D", "por Déficit"],
  ["A", "de Atención"],
  ["H", "e Hiperactividad"],
];

export const QueEs: React.FC = () => (
  <Pagina gap={34}>
    <Pop desde={0} giro={-2}>
      <TituloComic size={120}>¿Qué es el TDAH?</TituloComic>
    </Pop>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
      {SIGLA.map(([l, w], i) => (
        <Pop key={l} desde={20 + i * 14} giro={i % 2 ? 1 : -1}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Sticker color={[K.rojo, K.celeste, K.lima, K.rosa][i]} style={{ width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: COMIC, fontSize: 90, color: K.blanco, WebkitTextStroke: `3px ${K.negro}` }}>{l}</span>
            </Sticker>
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 54, color: K.negro }}>{w}</span>
          </div>
        </Pop>
      ))}
    </div>
    <Pop desde={140}>
      <Globo size={46}>Es una forma diferente en que funciona el cerebro 🧠</Globo>
    </Pop>
    <Pop desde={300} giro={3}>
      <Sticker color={K.amarillo} style={{ padding: "14px 30px", marginTop: 40 }}>
        <span style={{ fontSize: 46, fontWeight: 800 }}>🙅 No es falta de ganas</span>
      </Sticker>
    </Pop>
  </Pagina>
);

// ─── 3. ¿Es común? ──────────────────────────────────────────────────────────
export const Comun: React.FC = () => {
  const frame = useCurrentFrame();
  const marcados = new Set([12, 37, 58, 74, 91]);
  return (
    <Pagina gap={30}>
      <Pop desde={0} giro={-2}>
        <TituloComic size={120}>¿Es común?</TituloComic>
      </Pop>
      <Sticker color={K.blanco} style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 54px)", gap: 12 }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const aparece = interpolate(frame, [20 + i * 0.6, 26 + i * 0.6], [0, 1], clamp);
            const marca = marcados.has(i) && frame > 110;
            return (
              <div
                key={i}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  border: `4px solid ${K.negro}`,
                  background: marca ? K.rojo : "#dddddd",
                  transform: `scale(${aparece * (marca ? 1.25 : 1)})`,
                }}
              />
            );
          })}
        </div>
      </Sticker>
      <Pop desde={115} giro={-2}>
        <Sticker color={K.rojo} style={{ padding: "14px 30px" }}>
          <span style={{ fontFamily: COMIC, fontSize: 70, color: K.blanco, WebkitTextStroke: `3px ${K.negro}`, letterSpacing: 2 }}>
            5 de cada 100 chicos
          </span>
        </Sticker>
      </Pop>
      <Pop desde={200} giro={2}>
        <Sticker color={K.amarillo} style={{ padding: "12px 28px" }}>
          <span style={{ fontSize: 44, fontWeight: 800 }}>y 2 a 3 de cada 100 adultos</span>
        </Sticker>
      </Pop>
    </Pagina>
  );
};

// ─── 4. Tres formas ─────────────────────────────────────────────────────────
const Tipos: React.FC = () => (
  <Pagina gap={36}>
    <Pop desde={0} giro={-2}>
      <TituloComic size={104}>3 formas de presentarse</TituloComic>
    </Pop>
    {TIPOS.map((t, i) => (
      <Pop key={t.nombre} desde={40 + i * 130} giro={i % 2 ? 2 : -2}>
        <Sticker color={[K.celeste, K.amarillo, K.rosa][i]} style={{ width: 900, padding: "22px 30px", display: "flex", alignItems: "center", gap: 26 }}>
          <Emoji e={t.emoji} size={100} />
          <div>
            <div style={{ fontFamily: COMIC, fontSize: 66, letterSpacing: 2, lineHeight: 1 }}>{t.nombre}</div>
            <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, marginTop: 6 }}>{t.texto}</div>
          </div>
        </Sticker>
      </Pop>
    ))}
  </Pagina>
);

// ─── 5, 6 y 7. Listas ───────────────────────────────────────────────────────
export const Lista: React.FC<{ titulo: string; size?: number; items: { emoji: string; texto: string }[]; paso: number; colores: string[]; extra?: React.ReactNode }> = ({
  titulo,
  size = 110,
  items,
  paso,
  colores,
  extra,
}) => (
  <Pagina gap={34}>
    <Pop desde={0} giro={-2}>
      <TituloComic size={size}>{titulo}</TituloComic>
    </Pop>
    <ListaStickers items={items} desde={35} paso={paso} colores={colores} />
    {extra}
  </Pagina>
);

const Inatencion: React.FC = () => <Lista titulo="Distracción" items={INATENCION} paso={85} colores={[K.blanco, K.amarillo]} />;

const Hiperactividad: React.FC = () => (
  <Lista titulo="Hiperactividad e impulsividad" size={92} items={HIPERACTIVIDAD} paso={105} colores={[K.blanco, K.lima]} />
);

export const Adultos: React.FC<{ paso?: number; globoDesde?: number }> = ({ paso = 80, globoDesde = 380 }) => (
  <Lista
    titulo="¿Y en adultos?"
    items={ADULTOS}
    paso={paso}
    colores={[K.blanco, K.naranja]}
    extra={
      <Pop desde={globoDesde} giro={2}>
        <Globo size={42} color={K.rosa}>
          👩 En mujeres suele pasar desapercibido: hay menos hiperactividad y más distracción
        </Globo>
      </Pop>
    }
  />
);

// ─── 8. Mitos ───────────────────────────────────────────────────────────────
export const Mitos: React.FC<{ paso?: number; aSello?: number }> = ({ paso = 150, aSello = 55 }) => {
  const frame = useCurrentFrame();
  return (
    <Pagina gap={30}>
      <Pop desde={0} giro={-3}>
        <TituloComic size={130} color={K.amarillo}>
          ¡Mitos!
        </TituloComic>
      </Pop>
      {MITOS.map((m, i) => {
        const desde = 40 + i * paso;
        const sello = desde + aSello;
        return (
          <Pop key={m} desde={desde} giro={i % 2 ? 1.5 : -1.5}>
            <div style={{ position: "relative" }}>
              <Sticker color={K.blanco} style={{ width: 900, padding: "20px 30px" }}>
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    textDecoration: frame > sello ? "line-through" : "none",
                    textDecorationColor: K.rojo,
                    textDecorationThickness: 6,
                  }}
                >
                  “{m}”
                </span>
              </Sticker>
              <div style={{ position: "absolute", right: -10, top: -30 }}>
                <Sello desde={sello} texto="MITO" color={K.rojo} />
              </div>
            </div>
          </Pop>
        );
      })}
    </Pagina>
  );
};

// ─── 9. Diagnóstico ─────────────────────────────────────────────────────────
const Diagnostico: React.FC = () => (
  <Lista titulo="¿Cómo se diagnostica?" size={100} items={DIAGNOSTICO} paso={90} colores={[K.blanco, K.celeste]} />
);

// ─── 10. Tratamiento ────────────────────────────────────────────────────────
const Tratamiento: React.FC = () => {
  const sac = useSacudida(8, 12);
  return (
    <Pagina gap={34}>
      <div style={{ transform: `translateX(${sac}px)` }}>
        <Pop desde={0} giro={-2}>
          <TituloComic size={116}>¿Se trata? ¡Sí!</TituloComic>
        </Pop>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 440px)", gap: 26 }}>
        {TRATAMIENTO.map((t, i) => (
          <Pop key={t.texto} desde={35 + i * 75} giro={i % 2 ? 2 : -2}>
            <Sticker
              color={[K.lima, K.celeste, K.amarillo, K.rosa][i]}
              style={{ height: 270, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}
            >
              <Emoji e={t.emoji} size={90} />
              <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15 }}>{t.texto}</div>
            </Sticker>
          </Pop>
        ))}
      </div>
      <Pop desde={360}>
        <Globo size={44}>Cada persona necesita su propio plan</Globo>
      </Pop>
    </Pagina>
  );
};

// ─── 11. Tips ───────────────────────────────────────────────────────────────
const Tips: React.FC = () => <Lista titulo="Tips que ayudan" items={TIPS} paso={70} colores={[K.blanco, K.lima]} />;

// ─── 12. Cierre ─────────────────────────────────────────────────────────────
export const Cierre: React.FC = () => {
  const p = useRebote(0);
  return (
    <Pagina gap={36} centro>
      <div style={{ transform: `scale(${p})` }}>
        <TituloComic size={124}>¿Te identificaste?</TituloComic>
      </div>
      <Pop desde={15} giro={2}>
        <Sticker color={K.amarillo} style={{ padding: "16px 34px" }}>
          <span style={{ fontSize: 52, fontWeight: 800 }}>Consultá con un profesional 👩‍⚕️</span>
        </Sticker>
      </Pop>
      <Pop desde={40}>
        <Globo size={40} ancho={760}>
          No te autodiagnostiques con un reel 😉
        </Globo>
      </Pop>
      <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
        <Boton desde={70} emoji="🔖" texto="Guardalo" color={K.lima} />
        <Boton desde={82} emoji="📲" texto="Compartilo" color={K.celeste} />
      </div>
      <Pop desde={100}>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, color: K.negro }}>Esto no reemplaza la consulta con un profesional.</div>
      </Pop>
    </Pagina>
  );
};

// ─── Composición ────────────────────────────────────────────────────────────
const ESCENAS: Record<PaginaId, { Escena: React.FC; color: string }> = {
  gancho: { Escena: Gancho, color: K.amarillo },
  queEs: { Escena: QueEs, color: K.celeste },
  comun: { Escena: Comun, color: K.lima },
  tipos: { Escena: Tipos, color: K.violeta },
  inatencion: { Escena: Inatencion, color: K.celeste },
  hiperactividad: { Escena: Hiperactividad, color: K.naranja },
  adultos: { Escena: () => <Adultos />, color: K.violeta },
  mitos: { Escena: () => <Mitos />, color: K.rosa },
  diagnostico: { Escena: Diagnostico, color: K.amarillo },
  tratamiento: { Escena: Tratamiento, color: K.violeta },
  tips: { Escena: Tips, color: K.celeste },
  cierre: { Escena: Cierre, color: K.amarillo },
};

export const Tdah: React.FC = () => (
  <ReelComic
    paginas={PAGINAS.map((p) => ({ ...p, ...ESCENAS[p.id] }))}
    fps={FPS}
    // Música original: scripts/musica_reel.py --estilo energico (ver README)
    musica={staticFile("audio/tdah-musica.mp3")}
  />
);

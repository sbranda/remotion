import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  Barco,
  Bengala,
  Cielo,
  Estrellas,
  HORIZONTE,
  Iceberg,
  Oceano,
} from "./Escenario";
import { EfectoPelicula, FotoAntigua } from "./PeliculaAntigua";
import { Subtitulos, type Subtitulo } from "./Subtitulos";

const FPS = 30;
const s = (segundos: number) => Math.round(segundos * FPS);

// Escenas en orden; cada una dura `duracion` segundos.
const ESCENAS: { id: string; duracion: number }[] = [
  { id: "intro", duracion: 5 },
  { id: "cena", duracion: 6 },
  { id: "navegando", duracion: 6 },
  { id: "mirada", duracion: 5 },
  { id: "iceberg", duracion: 6 },
  { id: "angustia", duracion: 6 },
  { id: "hundimiento", duracion: 8 },
  { id: "silencio", duracion: 5 },
  { id: "retrato", duracion: 6 },
  { id: "final", duracion: 5 },
];

const inicios: Record<string, number> = {};
let acumulado = 0;
for (const escena of ESCENAS) {
  inicios[escena.id] = acumulado;
  acumulado += s(escena.duracion);
}
export const DURACION_TITANIC = acumulado;

const en = (id: string, desde: number, hasta: number) => ({
  desde: inicios[id] + s(desde),
  hasta: inicios[id] + s(hasta),
});

const SUBTITULOS: Subtitulo[] = [
  { ...en("intro", 1.2, 5), texto: "Mi nombre no importa. Lo que importa es lo que vi aquella noche." },
  { ...en("cena", 0.3, 3), texto: "Subí a bordo en Southampton, el 10 de abril de 1912." },
  { ...en("cena", 3, 6), texto: "Cenábamos como si el mundo entero nos perteneciera." },
  { ...en("navegando", 0.3, 3), texto: "Decían que era insumergible." },
  { ...en("navegando", 3, 6), texto: "Y nadie a bordo lo dudaba." },
  { ...en("mirada", 0.3, 5), texto: "La noche del 14 de abril, el mar estaba en calma. Demasiado en calma." },
  { ...en("iceberg", 0.3, 3.2), texto: "A las 23:40 alguien gritó desde el puesto de vigía…" },
  { ...en("iceberg", 3.2, 6), texto: "«¡Iceberg, justo enfrente!»" },
  { ...en("angustia", 0.3, 3), texto: "El golpe fue casi silencioso." },
  { ...en("angustia", 3, 6), texto: "Pero yo supe enseguida que algo andaba mal." },
  { ...en("hundimiento", 0.3, 4), texto: "No había botes salvavidas para todos." },
  { ...en("hundimiento", 4, 8), texto: "Y la orquesta siguió tocando hasta el final." },
  { ...en("silencio", 0.5, 5), texto: "A las 2:20 de la madrugada, el Titanic desapareció bajo el mar." },
  { ...en("retrato", 0.3, 3), texto: "Yo sobreviví para contarlo." },
  { ...en("retrato", 3, 6), texto: "Más de 1.500 personas no tuvieron esa suerte." },
];

// Fundido desde y hacia negro al principio y al final de cada escena.
const Fundido: React.FC<{ duracion: number; children: React.ReactNode }> = ({
  duracion,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(
    frame,
    [0, 12, duracion - 12, duracion],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity: opacidad }}>{children}</AbsoluteFill>;
};

const BarcoEn: React.FC<{
  x: number;
  escala: number;
  rotacion?: number;
  hundido?: number;
  luces?: number;
}> = ({ x, escala, rotacion = 0, hundido = 0, luces = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: HORIZONTE - 235 * escala + hundido,
      width: 1000,
      height: 300,
      transform: `scale(${escala})`,
      transformOrigin: "0 0",
    }}
  >
    <div style={{ transform: `rotate(${rotacion}deg)`, transformOrigin: "35% 78%" }}>
      <Barco luces={luces} />
    </div>
  </div>
);

const Titulo: React.FC = () => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 420, opacity: opacidad }}>
      <div style={{ color: "#e8dcc2", fontFamily: "Georgia, serif", fontSize: 150, letterSpacing: 18 }}>
        TITANIC
      </div>
      <div style={{ color: "#c9b48a", fontFamily: "Georgia, serif", fontSize: 54, fontStyle: "italic", marginTop: 10 }}>
        El testimonio de un pasajero
      </div>
      <div style={{ color: "#9c8a66", fontFamily: "Georgia, serif", fontSize: 40, marginTop: 30, letterSpacing: 6 }}>
        14 · ABRIL · 1912
      </div>
    </AbsoluteFill>
  );
};

const EscenaIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Cielo />
      <Estrellas />
      <BarcoEn x={interpolate(frame, [0, s(5)], [1100, 480])} escala={0.35} />
      <Oceano />
      <Titulo />
    </>
  );
};

const EscenaNavegando: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Cielo />
      <Estrellas />
      <BarcoEn x={interpolate(frame, [0, s(6)], [-700, 120])} escala={0.95} />
      <Oceano />
    </>
  );
};

const EscenaIceberg: React.FC = () => {
  const frame = useCurrentFrame();
  const impacto = s(4.2);
  const temblor =
    frame > impacto && frame < impacto + 20
      ? Math.sin(frame * 3) * (20 - (frame - impacto)) * 1.2
      : 0;
  const escalaIceberg = interpolate(frame, [0, impacto], [0.7, 1.25], {
    extrapolateRight: "clamp",
  });
  const xBarco = interpolate(frame, [0, impacto], [-350, 90], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `translate(${temblor}px, ${temblor / 2}px)` }}>
      <Cielo tinte="#0e1f3a" />
      <Estrellas />
      <div
        style={{
          position: "absolute",
          left: 620,
          top: HORIZONTE - 300 * escalaIceberg + 40,
        }}
      >
        <Iceberg escala={escalaIceberg} />
      </div>
      <BarcoEn x={xBarco} escala={0.6} />
      <Oceano />
      {frame > impacto && frame < impacto + 6 ? (
        <AbsoluteFill style={{ background: "white", opacity: 0.35 }} />
      ) : null}
    </AbsoluteFill>
  );
};

const EscenaHundimiento: React.FC = () => {
  const frame = useCurrentFrame();
  const total = s(8);
  const rotacion = interpolate(frame, [0, total], [3, 24]);
  const hundido = interpolate(frame, [0, total], [10, 260], {
    easing: Easing.in(Easing.quad),
  });
  const luces = frame > s(6.5) ? 0 : frame > s(6.2) ? 0.3 : 1;
  return (
    <>
      <Cielo />
      <Estrellas />
      <Bengala inicio={s(0.5)} x={380} />
      <Bengala inicio={s(3)} x={620} />
      <Bengala inicio={s(5.5)} x={480} />
      <BarcoEn x={60} escala={0.95} rotacion={rotacion} hundido={hundido} luces={luces} />
      <Oceano />
      {[150, 380, 760].map((x, i) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x + frame * (i === 1 ? -0.4 : 0.3),
            top: HORIZONTE + 110 + i * 60,
            width: 90,
            height: 18,
            borderRadius: "0 0 40px 40px",
            background: "#d9cfbc",
            opacity: 0.85,
          }}
        />
      ))}
    </>
  );
};

const EscenaSilencio: React.FC = () => (
  <>
    <Cielo />
    <Estrellas />
    <Oceano />
  </>
);

const EscenaFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: "#05070c",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 100,
        opacity: opacidad,
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ color: "#e8dcc2", fontSize: 58, lineHeight: 1.4 }}>
        En memoria de las víctimas del
      </div>
      <div style={{ color: "#e8dcc2", fontSize: 92, letterSpacing: 10, marginTop: 20 }}>
        RMS TITANIC
      </div>
      <div style={{ color: "#9c8a66", fontSize: 42, marginTop: 30 }}>15 de abril de 1912</div>
    </AbsoluteFill>
  );
};

const contenido: Record<string, React.FC> = {
  intro: EscenaIntro,
  cena: () => <FotoAntigua archivo="cena.jpg" duracion={s(6)} origen="50% 30%" />,
  navegando: EscenaNavegando,
  mirada: () => <FotoAntigua archivo="mirada.jpg" duracion={s(5)} desde={1.2} hasta={1.05} origen="45% 40%" />,
  iceberg: EscenaIceberg,
  angustia: () => <FotoAntigua archivo="angustia.jpg" duracion={s(6)} origen="50% 30%" />,
  hundimiento: EscenaHundimiento,
  silencio: EscenaSilencio,
  retrato: () => <FotoAntigua archivo="retrato.jpg" duracion={s(6)} desde={1.25} hasta={1.08} origen="50% 30%" />,
  final: EscenaFinal,
};

export const Titanic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {ESCENAS.map((escena) => {
        const Contenido = contenido[escena.id];
        return (
          <Sequence key={escena.id} from={inicios[escena.id]} durationInFrames={s(escena.duracion)} name={escena.id}>
            <Fundido duracion={s(escena.duracion)}>
              <Contenido />
            </Fundido>
          </Sequence>
        );
      })}
      <EfectoPelicula />
      <Subtitulos subtitulos={SUBTITULOS} />
    </AbsoluteFill>
  );
};

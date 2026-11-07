// Muestrario de personajes: presentación del elenco y las expresiones.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, Entra, Pagina, ReelCalma, SANS, Tarjeta, Texto, Titulo, Resalta } from "./calma";
import { Expresion, NOMBRES, Personaje, TipoPersonaje } from "./personajes";

const TIPOS: TipoPersonaje[] = ["doctora", "doctor", "chica", "chico", "abuelo"];
const EXPRESIONES: Expresion[] = ["feliz", "triste", "dolor", "sorpresa", "pensando"];

const Elenco: React.FC = () => (
  <Pagina gap={20}>
    <Entra desde={0}>
      <Titulo size={84}>
        Los <Resalta>personajes</Resalta>
      </Titulo>
    </Entra>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, width: 960 }}>
      {TIPOS.map((t, i) => (
        <Entra key={t} desde={15 + i * 12}>
          <Tarjeta color={C.violeta} style={{ width: 300, padding: "10px 0 14px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Personaje tipo={t} size={200} saluda={i === 0} fase={i * 23} />
            <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: C.texto }}>{NOMBRES[t]}</div>
          </Tarjeta>
        </Entra>
      ))}
    </div>
  </Pagina>
);

const Expresiones: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.min(EXPRESIONES.length - 1, Math.floor(frame / 54));
  return (
    <Pagina gap={20} centro>
      <Entra desde={0}>
        <Titulo size={84}>
          Y sus <Resalta color={C.coral}>expresiones</Resalta>
        </Titulo>
      </Entra>
      <Personaje tipo="chica" expresion={EXPRESIONES[i]} size={430} />
      <Texto size={56} color={C.violeta} peso={800}>
        {EXPRESIONES[i]}
      </Texto>
      <div style={{ display: "flex", gap: 8 }}>
        {(["doctor", "chico", "abuelo"] as TipoPersonaje[]).map((t, k) => (
          <Personaje key={t} tipo={t} expresion={EXPRESIONES[(i + k + 1) % EXPRESIONES.length]} size={170} fase={k * 31} />
        ))}
      </div>
    </Pagina>
  );
};

export const MuestrarioPersonajes: React.FC = () => (
  <ReelCalma
    paginas={[
      { id: "elenco", seg: 7, Escena: Elenco },
      { id: "expresiones", seg: 9, Escena: Expresiones },
    ]}
    fps={30}
  />
);

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DATOS, heridosTexto } from "./datos";
import { Aparece, C, Contador, Rotulo, SANS, Senal, Tren, Vagon, clamp, useEntrada } from "./graficos";
import { Mapa } from "./mapa";
import { bloque, cueDe } from "./tiempos";

const Contenido: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  // Zona útil: deja libre arriba (cabecera de Instagram) y el tercio inferior (subtítulos y botones)
  <AbsoluteFill style={{ top: 260, bottom: 640, left: 70, right: 70, width: "auto", height: "auto", alignItems: "center", justifyContent: "center", ...style }}>
    {children}
  </AbsoluteFill>
);

const Titular: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 76, color = C.texto }) => (
  <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.12, color, textAlign: "center", textWrap: "balance" }}>
    {children}
  </div>
);

// ─── 1. Gancho ──────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const via = interpolate(frame, [10, 70], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 420 }}>
      <Aparece desde={4}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 44, letterSpacing: 10, color: C.acento, textAlign: "center" }}>
          {DATOS.fechaCorta}
        </div>
      </Aparece>
      <div style={{ width: 860 * via, height: 4, background: C.texto2, margin: "50px 0", opacity: 0.6 }} />
      <Aparece desde={40} style={{ padding: "0 70px" }}>
        <Titular size={92}>Dos trenes de alta velocidad chocan en Toledo</Titular>
      </Aparece>
    </AbsoluteFill>
  );
};

// ─── 2. Qué y dónde ─────────────────────────────────────────────────────────
const TarjetaTren: React.FC<{ i: number; desde: number }> = ({ i, desde }) => {
  const t = DATOS.trenes[i];
  const p = useEntrada(desde);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * (i === 0 ? -60 : 60)}px)`,
        background: C.panel,
        borderRadius: 20,
        padding: "26px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        width: 440,
      }}
    >
      <Tren vagon={120} vagones={3} color={t.color} franja={t.franja} />
      <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: C.texto }}>{t.nombre}</div>
      <div style={{ fontFamily: SANS, fontSize: 28, color: C.texto2 }}>{t.operador === t.nombre ? "Operadora privada" : `Operador: ${t.operador}`}</div>
    </div>
  );
};

export const Donde: React.FC = () => {
  const ave = cueDe("donde", "AVE");
  const iryo = cueDe("donde", "Iryo");
  const frame = useCurrentFrame();
  // el mapa se aparta un poco para dejar sitio a las tarjetas
  const sube = interpolate(frame, [ave - 20, ave + 10], [0, 1], { ...clamp, easing: (t) => t * t * (3 - 2 * t) });
  return (
    <Contenido style={{ justifyContent: "flex-start" }}>
      <Rotulo size={24} spacing={4}>{DATOS.linea}</Rotulo>
      <div style={{ marginTop: 24, width: 940, height: 760 - sube * 170, overflow: "hidden", borderRadius: 24, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${1 - sube * 0.22})`, transformOrigin: "top center" }}>
          <Mapa lineaDesde={20} zoomDesde={150} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 30, display: "flex", gap: 40 }}>
        <TarjetaTren i={0} desde={ave} />
        <TarjetaTren i={1} desde={iryo} />
      </div>
    </Contenido>
  );
};

// ─── 3. Cómo ocurrió ────────────────────────────────────────────────────────
export const Como: React.FC = () => {
  const frame = useCurrentFrame();
  const fallo = cueDe("como", "Según el Ministerio");
  const paran = cueDe("como", "Por precaución");
  const choque = cueDe("como", "Poco después");
  const impacto = cueDe("como", "Con el impacto");
  const emerg = cueDe("como", "Los equipos");
  const [ave, iryo] = DATOS.trenes;

  const VIA_Y = 520; // altura de la vía dentro de la escena
  const ancho = 940;
  const centro = ancho / 2;
  const V = 120; // largo de cada vagón
  const largoTren = V * 3 + 8;

  const ease = (t: number) => t * t * (3 - 2 * t);
  // los trenes avanzan, se detienen por precaución y luego se acercan hasta el punto de impacto
  const avance = interpolate(frame, [0, paran, paran + 40, choque, choque + 30], [0, 0.55, 0.62, 0.62, 1], clamp);
  const sepInicial = 520;
  const sep = sepInicial * (1 - avance);
  const xAve = centro - sep / 2 - largoTren;
  const xIryo = centro + sep / 2;

  const rojo = interpolate(frame, [fallo + 60, fallo + 70], [0, 1], clamp);
  const parpadeo = frame > fallo + 70 && frame < paran ? (Math.floor(frame / 10) % 2 === 0 ? 1 : 0.4) : 1;

  const flash = interpolate(frame, [choque + 30, choque + 34, choque + 60], [0, 1, 0], clamp);
  const caida = interpolate(frame, [impacto + 10, impacto + 60], [0, 1], { ...clamp, easing: ease });
  const temblor = frame > choque + 30 && frame < choque + 45 ? Math.sin(frame * 3) * 6 : 0;
  const luces = frame > emerg ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0.25) : 0;

  const etiqueta = (texto: string, desde: number, color = C.texto) => {
    const p = interpolate(frame, [desde, desde + 15], [0, 1], clamp);
    return (
      <div style={{ opacity: p, fontFamily: SANS, fontSize: 36, fontWeight: 600, color, textAlign: "center", height: 48 }}>{texto}</div>
    );
  };

  return (
    <Contenido style={{ justifyContent: "flex-start" }}>
      <div style={{ height: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {frame < paran
          ? etiqueta("Fallo en la señalización", fallo + 50, C.acento)
          : frame < choque
            ? etiqueta("Los trenes se detienen por precaución", paran)
            : frame < impacto
              ? etiqueta("Colisión", choque + 30, C.rojo)
              : frame < emerg
                ? etiqueta("Dos vagones caen por un terraplén", impacto)
                : etiqueta("Llegan los equipos de emergencia", emerg)}
      </div>

      <div style={{ position: "relative", width: ancho, height: 900, transform: `translateX(${temblor}px)` }}>
        {/* terraplén */}
        <svg width={ancho} height={900} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={`M0 ${VIA_Y + 14} H${ancho} V${VIA_Y + 70} L${centro + 260} ${VIA_Y + 70} L${centro + 120} ${VIA_Y + 330} L0 ${VIA_Y + 330} Z`} fill="#202833" />
          <path d={`M${centro + 120} ${VIA_Y + 330} L${centro + 260} ${VIA_Y + 70} H${ancho} V${VIA_Y + 330} Z`} fill="#161c24" />
          <rect x={0} y={VIA_Y + 6} width={ancho} height={8} fill="#5a6474" />
          {Array.from({ length: 24 }).map((_, i) => (
            <rect key={i} x={i * 40 + 6} y={VIA_Y + 12} width={24} height={6} fill="#3d4655" />
          ))}
        </svg>

        {/* señales */}
        <div style={{ position: "absolute", left: 40, top: VIA_Y - 150, opacity: parpadeo }}>
          <Senal rojo={rojo} />
        </div>
        <div style={{ position: "absolute", right: 40, top: VIA_Y - 150, opacity: parpadeo }}>
          <Senal rojo={rojo} />
        </div>

        {/* AVE: los dos primeros vagones siguen en la vía, el de cabeza cae */}
        <div style={{ position: "absolute", left: xAve, top: VIA_Y - 66, display: "flex", gap: 4 }}>
          <Vagon largo={V} color={ave.color} franja={ave.franja} />
          <Vagon largo={V} color={ave.color} franja={ave.franja} />
          <div style={{ transformOrigin: "0% 100%", transform: `translate(${caida * 40}px, ${caida * 230}px) rotate(${caida * 32}deg)` }}>
            <Vagon largo={V} color={ave.color} franja={ave.franja} cabeza />
          </div>
        </div>
        {/* Iryo, en espejo */}
        <div style={{ position: "absolute", left: xIryo, top: VIA_Y - 66, display: "flex", gap: 4, transform: "scaleX(-1)" }}>
          <Vagon largo={V} color={iryo.color} franja={iryo.franja} />
          <Vagon largo={V} color={iryo.color} franja={iryo.franja} />
          <div style={{ transformOrigin: "0% 100%", transform: `translate(${caida * 10}px, ${caida * 250}px) rotate(${caida * 38}deg)` }}>
            <Vagon largo={V} color={iryo.color} franja={iryo.franja} cabeza />
          </div>
        </div>

        {/* nombres */}
        <div style={{ position: "absolute", top: VIA_Y - 130, left: Math.max(20, xAve + 60), fontFamily: SANS, fontSize: 30, fontWeight: 800, color: C.texto2, opacity: 1 - caida }}>
          AVE →
        </div>
        <div style={{ position: "absolute", top: VIA_Y - 130, left: Math.min(ancho - 160, xIryo + largoTren - 180), fontFamily: SANS, fontSize: 30, fontWeight: 800, color: C.texto2, opacity: 1 - caida }}>
          ← Iryo
        </div>

        {/* destello del impacto */}
        <div
          style={{
            position: "absolute",
            left: centro - 160,
            top: VIA_Y - 190,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,240,220,${flash}) 0%, rgba(184,66,58,${flash * 0.6}) 40%, transparent 70%)`,
          }}
        />

        {/* luces de emergencia */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 120 + i * 300,
              top: 60,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: i % 2 ? "#3b6fd8" : C.rojo,
              filter: "blur(18px)",
              opacity: i % 2 ? luces : (luces ? 1.25 - luces : 0),
            }}
          />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 0, fontFamily: SANS, fontSize: 24, color: C.texto2, opacity: 0.8, textAlign: "center" }}>
        Recreación esquemática · No representa la posición exacta de los trenes
      </div>
    </Contenido>
  );
};

// ─── 4. Las cifras ──────────────────────────────────────────────────────────
export const Cifras: React.FC = () => {
  const muertos = cueDe("cifras", "Con los últimos");
  const frame = useCurrentFrame();
  const heridos = muertos + 90;
  const opNota = interpolate(frame, [heridos + 60, heridos + 80], [0, 1], clamp);
  return (
    <Contenido>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <Aparece desde={muertos - 10} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 40, color: C.texto2, marginBottom: 8 }}>al menos</div>
          <Contador valor={DATOS.fallecidos} desde={muertos} dur={75} size={200} />
          <div style={{ fontFamily: SANS, fontSize: 48, fontWeight: 600, color: C.texto }}>personas fallecidas</div>
        </Aparece>
        <div style={{ width: 200, height: 3, background: C.linea }} />
        <Aparece desde={heridos - 10} style={{ textAlign: "center" }}>
          <Contador valor={DATOS.heridos} desde={heridos} dur={75} prefijo={DATOS.heridosMasDe ? "+" : ""} size={140} color={C.texto2} />
          <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 600, color: C.texto2 }}>heridos</div>
        </Aparece>
        <div style={{ opacity: opNota, fontFamily: SANS, fontSize: 26, color: C.texto2, textAlign: "center", lineHeight: 1.5 }}>
          Datos provisionales al {DATOS.actualizado}
          <br />
          Fuentes: {DATOS.fuenteCifras}
        </div>
      </div>
    </Contenido>
  );
};

// ─── 5. ¿Por qué? ───────────────────────────────────────────────────────────
const Version: React.FC<{ desde: number; quien: string; cargo: string; puntos: string[] }> = ({ desde, quien, cargo, puntos }) => {
  const p = useEntrada(desde);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px)`,
        background: C.panel,
        borderLeft: `8px solid ${C.acento}`,
        borderRadius: 16,
        padding: "30px 36px",
        width: 900,
      }}
    >
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: C.texto }}>{quien}</div>
      <div style={{ fontFamily: SANS, fontSize: 28, color: C.texto2, marginBottom: 20 }}>{cargo}</div>
      {puntos.map((pt) => (
        <div key={pt} style={{ fontFamily: SANS, fontSize: 36, color: C.texto, lineHeight: 1.35, display: "flex", gap: 16 }}>
          <span style={{ color: C.acento }}>—</span>
          <span>{pt}</span>
        </div>
      ))}
    </div>
  );
};

export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const ministro = cueDe("porque", "El ministro");
  const bloom = cueDe("porque", "Según Bloomberg");
  const inv = cueDe("porque", "Será la investigación");
  const sello = interpolate(frame, [inv, inv + 12], [0, 1], clamp);
  return (
    <Contenido style={{ justifyContent: "flex-start", gap: 30 }}>
      <Aparece desde={0}>
        <Titular size={84}>¿Qué falló?</Titular>
      </Aparece>
      <Version
        desde={ministro}
        quien="Óscar Puente"
        cargo="Ministro de Transportes"
        puntos={["Fallo en la señalización", "Una orden dada desde el centro de control de Atocha"]}
      />
      <Version desde={bloom} quien="Bloomberg" cargo="Primeros indicios" puntos={["Error humano"]} />
      <div
        style={{
          marginTop: 20,
          opacity: sello,
          transform: `rotate(-6deg) scale(${1.6 - sello * 0.6})`,
          border: `6px solid ${C.rojo}`,
          borderRadius: 14,
          padding: "14px 40px",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 58,
          letterSpacing: 6,
          color: C.rojo,
        }}
      >
        EN INVESTIGACIÓN
      </div>
    </Contenido>
  );
};

// ─── 6. La respuesta ────────────────────────────────────────────────────────
const IconoCruz = () => (
  <svg width={110} height={110} viewBox="0 0 110 110">
    <rect x={0} y={0} width={110} height={110} rx={24} fill={C.panel} />
    <path d="M42 22h26v20h20v26H68v20H42V68H22V42h20z" fill={C.rojo} />
  </svg>
);
const IconoUrna = () => (
  <svg width={110} height={110} viewBox="0 0 110 110">
    <rect x={0} y={0} width={110} height={110} rx={24} fill={C.panel} />
    <rect x={44} y={18} width={22} height={30} fill={C.texto} transform="rotate(8 55 33)" />
    <rect x={22} y={44} width={66} height={46} rx={6} fill={C.acento} />
    <rect x={38} y={44} width={34} height={6} fill={C.panel} />
  </svg>
);
const IconoProtesta = () => (
  <svg width={110} height={110} viewBox="0 0 110 110">
    <rect x={0} y={0} width={110} height={110} rx={24} fill={C.panel} />
    <rect x={26} y={20} width={58} height={38} rx={4} fill={C.texto} />
    <rect x={52} y={58} width={6} height={36} fill={C.texto2} />
  </svg>
);

const Fila: React.FC<{ desde: number; icono: React.ReactNode; titulo: string; texto: string }> = ({ desde, icono, titulo, texto }) => {
  const p = useEntrada(desde);
  return (
    <div style={{ display: "flex", gap: 36, alignItems: "center", width: 920, opacity: p, transform: `translateX(${(1 - p) * -50}px)` }}>
      {icono}
      <div>
        <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 800, color: C.texto }}>{titulo}</div>
        <div style={{ fontFamily: SANS, fontSize: 32, color: C.texto2, lineHeight: 1.3 }}>{texto}</div>
      </div>
    </div>
  );
};

export const Respuesta: React.FC = () => (
  <Contenido style={{ gap: 70 }}>
    <Fila desde={cueDe("respuesta", "Los servicios")} icono={<IconoCruz />} titulo="Emergencias" texto="Atención a heridos y familias durante horas" />
    <Fila desde={cueDe("respuesta", "La tragedia")} icono={<IconoUrna />} titulo="En plena campaña" texto="El accidente entra en la campaña electoral" />
    <Fila desde={cueDe("respuesta", "Hubo protestas")} icono={<IconoProtesta />} titulo="Protestas" texto="Piden la dimisión del Gobierno" />
  </Contenido>
);

// ─── 7. Contexto ────────────────────────────────────────────────────────────
export const Contexto: React.FC = () => {
  const segundo = cueDe("contexto", "Y el segundo");
  return (
    <Contenido style={{ gap: 80 }}>
      <Aparece desde={8} style={{ textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 64, color: C.texto, lineHeight: 1.15, textWrap: "balance" }}>
          El accidente ferroviario más grave en España
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 64, color: C.acento, marginTop: 16 }}>en más de una década</div>
      </Aparece>
      <Aparece desde={segundo} style={{ textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 44, color: C.texto2, lineHeight: 1.3 }}>
          El <b style={{ color: C.texto }}>segundo</b> gran choque de trenes de 2026
        </div>
      </Aparece>
    </Contenido>
  );
};

// ─── 8. Cierre ──────────────────────────────────────────────────────────────
const Lazo = () => (
  <svg width={160} height={220} viewBox="0 0 160 220">
    <path
      d="M80 30 C40 -10 10 40 50 90 L20 200 L52 210 L80 120 L108 210 L140 200 L110 90 C150 40 120 -10 80 30 Z M80 60 C95 40 115 50 100 75 L80 100 L60 75 C45 50 65 40 80 60 Z"
      fill="#e6e6e6"
      fillRule="evenodd"
    />
  </svg>
);

export const Cierre: React.FC = () => {
  const dur = bloque("cierre").duracion;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 420, gap: 40 }}>
      <Aparece desde={6}>
        <Lazo />
      </Aparece>
      <Aparece desde={20} style={{ padding: "0 80px" }}>
        <Titular size={64}>Nuestro recuerdo está con las víctimas y sus familias</Titular>
      </Aparece>
      <Aparece desde={Math.min(60, dur - 60)} style={{ textAlign: "center", fontFamily: SANS, fontSize: 26, color: C.texto2, lineHeight: 1.6 }}>
        {DATOS.lugar} ({DATOS.provincia}) · {DATOS.fecha}
        <br />
        Fuentes: {DATOS.fuentes.join(" · ")}
        <br />
        {DATOS.fallecidos} fallecidos y {heridosTexto()} heridos según datos al {DATOS.actualizado}
      </Aparece>
    </AbsoluteFill>
  );
};

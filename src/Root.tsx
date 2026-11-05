import React from "react";
import { Composition } from "remotion";
import { Accidente } from "./accidente/Accidente";
import { DURACION_FRAMES, FPS } from "./accidente/tiempos";
import { Trigliceridos } from "./trigliceridos/Trigliceridos";
import { DURACION_FRAMES as DURACION_TG, FPS as FPS_TG } from "./trigliceridos/datos";
import { Colesterol } from "./colesterol/Colesterol";
import { DURACION_FRAMES as DURACION_COL, FPS as FPS_COL } from "./colesterol/datos";
import { Mitos } from "./mitos/Mitos";
import { DURACION_FRAMES as DURACION_MITOS, FPS as FPS_MITOS } from "./mitos/datos";
import { Anemia } from "./anemia/Anemia";
import { DURACION_FRAMES as DURACION_ANEMIA, FPS as FPS_ANEMIA } from "./anemia/datos";
import { Tdah } from "./tdah/Tdah";
import { DURACION_FRAMES as DURACION_TDAH, FPS as FPS_TDAH } from "./tdah/datos";
import { DURACION_90, Tdah90 } from "./tdah/Tdah90";
import { Hipertiroidismo } from "./hipertiroidismo/Hipertiroidismo";
import { DURACION_FRAMES as DURACION_HIPER, FPS as FPS_HIPER } from "./hipertiroidismo/datos";
import { Hipotiroidismo } from "./hipotiroidismo/Hipotiroidismo";
import { DURACION_FRAMES as DURACION_HIPO, FPS as FPS_HIPO } from "./hipotiroidismo/datos";
import { Arritmia } from "./arritmia/Arritmia";
import { DURACION_FRAMES as DURACION_ARRITMIA, FPS as FPS_ARRITMIA } from "./arritmia/datos";
import { JesusDeMiguel } from "./tenerife/JesusDeMiguel";
import { DURACION_FRAMES as DURACION_JDM, FPS as FPS_JDM } from "./tenerife/datos";
import { Pies } from "./pies/Pies";
import { DURACION_FRAMES as DURACION_PIES, FPS as FPS_PIES } from "./pies/datos";
import { Presion } from "./presion/Presion";
import { DURACION_FRAMES as DURACION_PRESION, FPS as FPS_PRESION } from "./presion/datos";
import { Ansiedad } from "./ansiedad/Ansiedad";
import { DURACION_FRAMES as DURACION_ANSIEDAD, FPS as FPS_ANSIEDAD } from "./ansiedad/datos";
import { Papel } from "./papel/Papel";
import { DURACION_FRAMES as DURACION_PAPEL, FPS as FPS_PAPEL } from "./papel/datos";
import { Panico } from "./panico/Panico";
import { DURACION_FRAMES as DURACION_PANICO, FPS as FPS_PANICO } from "./panico/datos";
import { Migrana } from "./migrana/Migrana";
import { DURACION_FRAMES as DURACION_MIGRANA, FPS as FPS_MIGRANA } from "./migrana/datos";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Reel de 3 minutos: choque de trenes del 28 de octubre de 2026 en Toledo */}
    <Composition
      id="Accidente"
      component={Accidente}
      durationInFrames={DURACION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ subtitulos: true }}
    />
    <Composition
      id="AccidenteSinSubtitulos"
      component={Accidente}
      durationInFrames={DURACION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ subtitulos: false }}
    />
    {/* Reel de 90 segundos: triglicéridos */}
    <Composition id="Trigliceridos" component={Trigliceridos} durationInFrames={DURACION_TG} fps={FPS_TG} width={1080} height={1920} />
    {/* Reel de 90 segundos: colesterol */}
    <Composition id="Colesterol" component={Colesterol} durationInFrames={DURACION_COL} fps={FPS_COL} width={1080} height={1920} />
    {/* Reel de 90 segundos: triglicéridos, ¿mito o verdad? */}
    <Composition id="TrigliceridosMitos" component={Mitos} durationInFrames={DURACION_MITOS} fps={FPS_MITOS} width={1080} height={1920} />
    {/* Reel de 90 segundos: anemia */}
    <Composition id="Anemia" component={Anemia} durationInFrames={DURACION_ANEMIA} fps={FPS_ANEMIA} width={1080} height={1920} />
    {/* Reel de 3 minutos: TDAH, estilo cómic */}
    <Composition id="Tdah" component={Tdah} durationInFrames={DURACION_TDAH} fps={FPS_TDAH} width={1080} height={1920} />
    {/* Reel de 90 segundos: TDAH, estilo cómic (versión corta) */}
    <Composition id="Tdah90" component={Tdah90} durationInFrames={DURACION_90} fps={FPS_TDAH} width={1080} height={1920} />
    {/* Reel de 90 segundos: hipertiroidismo, estilo neón */}
    <Composition id="Hipertiroidismo" component={Hipertiroidismo} durationInFrames={DURACION_HIPER} fps={FPS_HIPER} width={1080} height={1920} />
    {/* Reel de 90 segundos: hipotiroidismo, estilo neón */}
    <Composition id="Hipotiroidismo" component={Hipotiroidismo} durationInFrames={DURACION_HIPO} fps={FPS_HIPO} width={1080} height={1920} />
    {/* Reel de 90 segundos: arritmia, estilo neón */}
    <Composition id="Arritmia" component={Arritmia} durationInFrames={DURACION_ARRITMIA} fps={FPS_ARRITMIA} width={1080} height={1920} />
    {/* Reel de 3 minutos: Jesús de Miguel (CD Tenerife), estilo sobrio */}
    <Composition id="JesusDeMiguel" component={JesusDeMiguel} durationInFrames={DURACION_JDM} fps={FPS_JDM} width={1080} height={1920} />
    {/* Reel de 90 segundos: pies hinchados, estilo neón */}
    <Composition id="PiesHinchados" component={Pies} durationInFrames={DURACION_PIES} fps={FPS_PIES} width={1080} height={1920} />
    {/* Reel de 90 segundos: presión arterial, estilo neón */}
    <Composition id="PresionArterial" component={Presion} durationInFrames={DURACION_PRESION} fps={FPS_PRESION} width={1080} height={1920} />
    {/* Reel de 3 minutos: ansiedad, estilo calma */}
    <Composition id="Ansiedad" component={Ansiedad} durationInFrames={DURACION_ANSIEDAD} fps={FPS_ANSIEDAD} width={1080} height={1920} />
    {/* Reel de 90 segundos: curiosidad matemática, el papel que llega a la Luna */}
    <Composition id="PapelLuna" component={Papel} durationInFrames={DURACION_PAPEL} fps={FPS_PAPEL} width={1080} height={1920} />
    {/* Reel de 3 minutos: ¿qué es un ataque de pánico?, estilo calma */}
    <Composition id="AtaquePanico" component={Panico} durationInFrames={DURACION_PANICO} fps={FPS_PANICO} width={1080} height={1920} />
    {/* Reel de 90 segundos: migraña, estilo calma */}
    <Composition id="Migrana" component={Migrana} durationInFrames={DURACION_MIGRANA} fps={FPS_MIGRANA} width={1080} height={1920} />
  </>
);

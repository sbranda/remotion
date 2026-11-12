import React from "react";
import { DURACION_SACUDIDA, SacudidaHipnica } from "./sacudida/SacudidaHipnica";
import { AlopeciaVitiligo, DURACION_ALOPECIA_VITILIGO } from "./autoinmune/AlopeciaVitiligo";
import { DURACION_DOLOR_INVISIBLE, DolorInvisible } from "./fibromialgia/DolorInvisible";
import { DURACION_INSULINA, ResistenciaInsulina } from "./insulina/ResistenciaInsulina";
import { DURACION_SINESTESIA, Sinestesia } from "./sinestesia/Sinestesia";
import { DURACION_NIEBLA, NieblaMental } from "./niebla/NieblaMental";
import { AlzheimerReserva, DURACION_ALZHEIMER } from "./alzheimer/Alzheimer";
import { CeliaquiaComic, DURACION_CELIAQUIA_COMIC } from "./celiaquia/CeliaquiaComic";
import { DURACION_DEJAVU, DejaVuJamaisVu } from "./dejavu/DejaVu";
import { DURACION_ENDOMETRIOSIS, Endometriosis } from "./endometriosis/Endometriosis";
import { ApneaSueno, DURACION_APNEA } from "./apnea/Apnea";
import { DURACION_PIERNAS, PiernasInquietas } from "./piernas/PiernasInquietas";
import { DURACION_PARALISIS, ParalisisSueno } from "./paralisis/Paralisis";
import { DURACION_SOP, Sop } from "./sop/Sop";
import { Bruxismo, DURACION_BRUXISMO } from "./bruxismo/Bruxismo";
import { FatigaBurnoutNoche } from "./fatiga/FatigaNoche";
import { DURACION_CUCHARAS_NEON, FatigaCucharasNeon } from "./cucharas/CucharasNeon";
import { DURACION_CUCHARAS, FatigaCucharas } from "./cucharas/Cucharas";
import { Relato } from "./relato/Relato";
import { DURACION_FRAMES as DURACION_RELATO, FPS as FPS_RELATO } from "./relato/datos";
import { FatigaBurnout } from "./fatiga/Fatiga";
import { DURACION_FRAMES as DURACION_FATIGA, FPS as FPS_FATIGA } from "./fatiga/datos";
import { Historia } from "./historia/Historia";
import { DURACION_FRAMES as DURACION_HISTORIA, FPS as FPS_HISTORIA } from "./historia/datos";
import { MuestrarioPersonajes } from "./salud/MuestrarioPersonajes";
import { Prueba3D } from "./tres/Prueba3D";
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
import { Diabetes } from "./diabetes/Diabetes";
import { DURACION_FRAMES as DURACION_DIABETES, FPS as FPS_DIABETES } from "./diabetes/datos";
import { Insomnio } from "./insomnio/Insomnio";
import { DURACION_FRAMES as DURACION_INSOMNIO, FPS as FPS_INSOMNIO } from "./insomnio/datos";
import { InsomnioNoche } from "./insomnio/InsomnioNoche";
import { HigadoGraso } from "./higado/Higado";
import { DURACION_FRAMES as DURACION_HIGADO, FPS as FPS_HIGADO } from "./higado/datos";
import { Gota } from "./gota/Gota";
import { DURACION_FRAMES as DURACION_GOTA, FPS as FPS_GOTA } from "./gota/datos";
import { Acv } from "./acv/Acv";
import { DURACION_FRAMES as DURACION_ACV, FPS as FPS_ACV } from "./acv/datos";
import { Autismo } from "./autismo/Autismo";
import { DURACION_FRAMES as DURACION_AUTISMO, FPS as FPS_AUTISMO } from "./autismo/datos";
import { Depresion } from "./depresion/Depresion";
import { DURACION_FRAMES as DURACION_DEPRESION, FPS as FPS_DEPRESION } from "./depresion/datos";
import { Fibromialgia } from "./fibromialgia/Fibromialgia";
import { DURACION_FRAMES as DURACION_FIBRO, FPS as FPS_FIBRO } from "./fibromialgia/datos";
import { Celiaquia } from "./celiaquia/Celiaquia";
import { DURACION_FRAMES as DURACION_CELIAQUIA, FPS as FPS_CELIAQUIA } from "./celiaquia/datos";

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
    {/* Reel de 3 minutos: diabetes y glucosa, estilo neón */}
    <Composition id="Diabetes" component={Diabetes} durationInFrames={DURACION_DIABETES} fps={FPS_DIABETES} width={1080} height={1920} />
    {/* Reel de 90 segundos: insomnio, estilo calma */}
    <Composition id="Insomnio" component={Insomnio} durationInFrames={DURACION_INSOMNIO} fps={FPS_INSOMNIO} width={1080} height={1920} />
    {/* Insomnio, versión estilo noche */}
    <Composition id="InsomnioNoche" component={InsomnioNoche} durationInFrames={DURACION_INSOMNIO} fps={FPS_INSOMNIO} width={1080} height={1920} />
    {/* Reel de 90 segundos: hígado graso, estilo neón */}
    <Composition id="HigadoGraso" component={HigadoGraso} durationInFrames={DURACION_HIGADO} fps={FPS_HIGADO} width={1080} height={1920} />
    {/* Reel de 90 segundos: ácido úrico y gota, estilo neón */}
    <Composition id="AcidoUricoGota" component={Gota} durationInFrames={DURACION_GOTA} fps={FPS_GOTA} width={1080} height={1920} />
    {/* Reel de 90 segundos: cómo reconocer un ACV, estilo neón */}
    <Composition id="Acv" component={Acv} durationInFrames={DURACION_ACV} fps={FPS_ACV} width={1080} height={1920} />
    {/* Reel de 3 minutos: ¿qué es el autismo?, estilo calma */}
    <Composition id="Autismo" component={Autismo} durationInFrames={DURACION_AUTISMO} fps={FPS_AUTISMO} width={1080} height={1920} />
    {/* Reel de 3 minutos: ¿qué es la depresión?, estilo calma */}
    <Composition id="Depresion" component={Depresion} durationInFrames={DURACION_DEPRESION} fps={FPS_DEPRESION} width={1080} height={1920} />
    {/* Prueba de three.js: glóbulos rojos en 3D (10 s) */}
    <Composition id="Prueba3D" component={Prueba3D} durationInFrames={300} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: fibromialgia, estilo calma */}
    <Composition id="Fibromialgia" component={Fibromialgia} durationInFrames={DURACION_FIBRO} fps={FPS_FIBRO} width={1080} height={1920} />
    {/* Muestrario de personajes ilustrados (16 s) */}
    <Composition id="Personajes" component={MuestrarioPersonajes} durationInFrames={480} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: celiaquía y sensibilidad al gluten no celíaca, estilo neón */}
    <Composition id="Celiaquia" component={Celiaquia} durationInFrames={DURACION_CELIAQUIA} fps={FPS_CELIAQUIA} width={1080} height={1920} />
    {/* Historia de 5 minutos: "Ladrillo a ladrillo" */}
    <Composition id="LadrilloALadrillo" component={Historia} durationInFrames={DURACION_HISTORIA} fps={FPS_HISTORIA} width={1080} height={1920} />
    {/* Reel de 90 segundos: fatiga crónica y burnout, estilo calma */}
    <Composition id="FatigaBurnout" component={FatigaBurnout} durationInFrames={DURACION_FATIGA} fps={FPS_FATIGA} width={1080} height={1920} />
    {/* Relato de 5 minutos: "La arquitectura del vacío" */}
    <Composition id="ArquitecturaDelVacio" component={Relato} durationInFrames={DURACION_RELATO} fps={FPS_RELATO} width={1080} height={1920} />
    {/* Reel de 90 segundos: fatiga crónica con la teoría de las cucharas, estilo cuaderno */}
    <Composition id="FatigaCucharas" component={FatigaCucharas} durationInFrames={DURACION_CUCHARAS} fps={30} width={1080} height={1920} />
    {/* Fatiga crónica con la teoría de las cucharas, versión neón */}
    <Composition id="FatigaCucharasNeon" component={FatigaCucharasNeon} durationInFrames={DURACION_CUCHARAS_NEON} fps={30} width={1080} height={1920} />
    {/* Fatiga crónica y burnout, versión estilo noche */}
    <Composition id="FatigaBurnoutNoche" component={FatigaBurnoutNoche} durationInFrames={DURACION_FATIGA} fps={FPS_FATIGA} width={1080} height={1920} />
    {/* Reel de 90 segundos: bruxismo, estilo noche */}
    <Composition id="Bruxismo" component={Bruxismo} durationInFrames={DURACION_BRUXISMO} fps={30} width={1080} height={1920} />
    {/* Reel de 3 minutos: SOP (síndrome de ovario poliquístico), estilo neón */}
    <Composition id="Sop" component={Sop} durationInFrames={DURACION_SOP} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: parálisis del sueño, estilo noche */}
    <Composition id="ParalisisSueno" component={ParalisisSueno} durationInFrames={DURACION_PARALISIS} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: síndrome de piernas inquietas, estilo cuaderno */}
    <Composition id="PiernasInquietas" component={PiernasInquietas} durationInFrames={DURACION_PIERNAS} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: apnea del sueño, estilo neón */}
    <Composition id="ApneaSueno" component={ApneaSueno} durationInFrames={DURACION_APNEA} fps={30} width={1080} height={1920} />
    {/* Reel de 3 minutos: endometriosis, estilo calma */}
    <Composition id="Endometriosis" component={Endometriosis} durationInFrames={DURACION_ENDOMETRIOSIS} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: déjà vu y jamais vu, estilo neón */}
    <Composition id="DejaVuJamaisVu" component={DejaVuJamaisVu} durationInFrames={DURACION_DEJAVU} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: enfermedad celíaca, estilo cómic */}
    <Composition id="CeliaquiaComic" component={CeliaquiaComic} durationInFrames={DURACION_CELIAQUIA_COMIC} fps={30} width={1080} height={1920} />
    {/* Reel de 3 minutos: Alzheimer y reserva cognitiva, estilo cuaderno */}
    <Composition id="AlzheimerReserva" component={AlzheimerReserva} durationInFrames={DURACION_ALZHEIMER} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: niebla mental, estilo calma */}
    <Composition id="NieblaMental" component={NieblaMental} durationInFrames={DURACION_NIEBLA} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: sinestesia, estilo neón */}
    <Composition id="Sinestesia" component={Sinestesia} durationInFrames={DURACION_SINESTESIA} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: resistencia a la insulina, estilo cómic */}
    <Composition id="ResistenciaInsulina" component={ResistenciaInsulina} durationInFrames={DURACION_INSULINA} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: fibromialgia y el dolor invisible, estilo noche */}
    <Composition id="DolorInvisible" component={DolorInvisible} durationInFrames={DURACION_DOLOR_INVISIBLE} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: alopecia areata y vitiligo, estilo calma */}
    <Composition id="AlopeciaVitiligo" component={AlopeciaVitiligo} durationInFrames={DURACION_ALOPECIA_VITILIGO} fps={30} width={1080} height={1920} />
    {/* Reel de 90 segundos: la sacudida al dormir (mioclonía hípnica), estilo noche */}
    <Composition id="SacudidaHipnica" component={SacudidaHipnica} durationInFrames={DURACION_SACUDIDA} fps={30} width={1080} height={1920} />
  </>
);

# Reel: choque de trenes en Toledo (28 de octubre de 2026)

Video vertical para Instagram Reels (1080×1920, 30 fps, **3:00 exactos**) hecho con [Remotion](https://www.remotion.dev/).
Explica con motion graphics el choque entre un AVE de Renfe y un tren de Iryo cerca de Urda (Toledo).

## Estructura

| Tiempo | Bloque | Qué se ve |
|---|---|---|
| 0:00–0:06 | Gancho | Fecha y titular |
| 0:06–0:30 | Qué y dónde | Mapa de la línea Madrid–Andalucía con zoom a Urda y los dos trenes |
| 0:30–1:05 | Cómo ocurrió | Recreación esquemática: señales en rojo, trenes detenidos, colisión, vagones por el terraplén |
| 1:05–1:30 | Las cifras | Contadores de fallecidos y heridos, con fecha y fuentes |
| 1:30–2:05 | ¿Por qué? | Las versiones (ministro de Transportes, Bloomberg) y el sello "En investigación" |
| 2:05–2:35 | La respuesta | Emergencias, campaña electoral, protestas |
| 2:35–2:52 | Contexto | El más grave en más de una década; segundo gran choque del año |
| 2:52–3:00 | Cierre | Lazo negro, mensaje a las víctimas y fuentes |

## Uso

```bash
npm install
npm run dev                     # Remotion Studio para previsualizar
npm run render                  # out/accidente-trenes.mp4
npm run render:sin-subtitulos   # out/accidente-trenes-sin-subtitulos.mp4
npm run portada                 # out/portada.png
npm run subtitulos              # out/accidente.srt y out/guion-con-tiempos.txt
```

## Antes de publicar

- **Actualiza las cifras** en `src/accidente/datos.ts` (`fallecidos`, `heridos`, `actualizado`, `fuenteCifras`).
  Las cifras cambiaron mucho durante las primeras horas; el texto de la narración y los subtítulos se actualizan solos.
- **Revisa la causa**: el video la presenta como "en investigación" y atribuye cada versión a quien la dijo.
  Si la investigación oficial publica conclusiones, cambia el bloque `porque` en `src/accidente/guion.ts`.
- La animación del choque es una recreación esquemática (lo dice en pantalla): no representa la posición real de los trenes.

## Editar

- Datos y fuentes: `src/accidente/datos.ts`
- Guion de la voz en off y duración de cada bloque: `src/accidente/guion.ts` (los bloques deben sumar 180 s)
- Escenas: `src/accidente/escenas.tsx` · Mapa: `src/accidente/mapa.tsx` · Estilos y trenes: `src/accidente/graficos.tsx`

El video no lleva audio. Graba la voz en off siguiendo `out/guion-con-tiempos.txt` o el `.srt` (ritmo de unas 140 palabras por minuto) y agrégala con música suave en el editor.
La fuente Inter va incluida en `public/fonts` (licencia SIL OFL), así que no hace falta internet para renderizar.

---

# Reel: Triglicéridos (90 s)

Video vertical (1080×1920, 30 fps, **1:30 exactos**) para público argentino, con el mismo contenido y estilo que el diseño de Canva "Reel 90 s – Triglicéridos".

| Página | Duración | Contenido |
|---|---|---|
| 1. Gancho | 4 s | "En tu análisis dice: Triglicéridos 210. ¿Es mucho?" + análisis de ejemplo |
| 2. Qué son | 10 s | Gota de sangre con grasa |
| 3. Valores | 12 s | Semáforo de rangos, marca "tu 210" en Alto |
| 4. Por qué importan | 12 s | Sin síntomas, corazón, páncreas |
| 5. Qué los sube | 17 s | 5 causas con íconos |
| 6. Cómo bajarlos | 23 s | 5 consejos + "bajar 5–10 % del peso ≈ 20 % menos" |
| 7. Cómo se miden | 7 s | Perfil lipídico, ayuno |
| 8. Cierre | 5 s | "Guardalo para tu próximo análisis" + aviso médico |

```bash
npm run trigliceridos           # out/trigliceridos.mp4
npm run trigliceridos:portada   # out/trigliceridos-portada.png
```

Textos, rangos y duraciones: `src/trigliceridos/datos.ts` · Escenas: `src/trigliceridos/Trigliceridos.tsx` · Íconos: `src/trigliceridos/iconos.tsx`.
**Música:** pista original sintetizada con `scripts/musica_trigliceridos.py` (sin derechos de terceros): acordes F–C–Dm–Bb a 96 BPM, arpegio suave y una campanita en cada cambio de página.
Para regenerarla (por ejemplo, si cambiás las duraciones): `python3 scripts/musica_reel.py` y después
`ffmpeg -i public/audio/trigliceridos-musica.wav -b:a 160k public/audio/trigliceridos-musica.mp3`.
Si preferís música de Instagram, renderizá sin la línea `<Html5Audio>` de `Trigliceridos.tsx`.

---

# Reel: Colesterol (90 s)

Segundo Reel de la serie de salud, para público argentino, en versión **llamativa**: fondo oscuro con manchas de color en movimiento, neón rojo (LDL) y verde (HDL), palabras clave resaltadas, entradas con rebote, destello en cada cambio de página y emojis. Contenido igual al diseño de Canva "Reel 90 s – Colesterol".

| Página | Duración | Contenido |
|---|---|---|
| 1. Gancho | 4 s | "¿Colesterol bueno y colesterol malo? ¿Cuál es cuál?" con LDL/HDL |
| 2. Qué es | 10 s | Arteria animada que se va tapando |
| 3. Bueno vs. malo | 12 s | LDL (malo) y HDL (bueno) |
| 4. Valores | 14 s | Total < 200 · LDL < 100 · HDL > 40 / 50 |
| 5. Por qué importa | 12 s | Sin síntomas, placas, infarto o ACV |
| 6. Qué lo sube | 13 s | 5 causas con íconos |
| 7. Cómo bajarlo | 17 s | 5 consejos + no dejar la medicación |
| 8. Cierre | 8 s | Perfil lipídico, guardar y compartir, aviso médico |

```bash
npm run colesterol            # out/colesterol.mp4
npm run colesterol:portada    # out/colesterol-portada.png
```

Textos y duraciones: `src/colesterol/datos.ts` · Escenas: `src/colesterol/Colesterol.tsx`.
Paleta y emojis: `src/colesterol/datos.ts` (objeto `P`). Los emojis se ven con la fuente de emojis del sistema donde se renderiza.
Música enérgica (118 BPM, bombo, palmas y "whoosh" + golpe en cada cambio de página):

```bash
python3 scripts/musica_reel.py --paginas 4,10,12,14,12,13,17,8 --transponer 2 --bpm 118 --estilo energico \
  --salida public/audio/colesterol-musica.wav
ffmpeg -i public/audio/colesterol-musica.wav -af loudnorm=I=-14:TP=-1.5 -b:a 160k public/audio/colesterol-musica.mp3
```

---

# Reel: Triglicéridos · ¿Mito o verdad? (90 s)

Tercer Reel de la serie, con el estilo llamativo (componentes en `src/salud/pop.tsx`) y **@sebranda** al pie.
Formato de juego: aparece una frase, cuenta regresiva de 3 segundos ("¿Vos qué decís?"), cae el sello ❌ MITO o ✅ VERDAD y la explicación.

| Página | Duración |
|---|---|
| Gancho "¿MITO o VERDAD?" | 4 s |
| Intro "Respondé antes de que aparezca la respuesta" | 6 s |
| 6 frases (flaco, grasa, jugos, síntomas, alcohol, ejercicio) | 12 s cada una |
| Cierre "¿Cuántas acertaste? Contalo en los comentarios" | 8 s |

```bash
npm run mitos            # out/trigliceridos-mitos.mp4
npm run mitos:portada    # out/trigliceridos-mitos-portada.png
```

Frases, veredictos y explicaciones: `src/mitos/datos.ts`. El usuario del pie se cambia en `FIRMA` (`src/salud/pop.tsx`), y vale para este Reel y el del colesterol.
Música: `python3 scripts/musica_reel.py --paginas 4,6,12,12,12,12,12,12,8 --transponer -3 --bpm 122 --estilo energico --salida public/audio/mitos-musica.wav` y convertir con `loudnorm` como el del colesterol.

---

# Reel: Anemia (90 s)

Cuarto Reel de la serie, estilo llamativo y **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| 1. Gancho | 4 s | "¿Siempre cansado? Podría ser anemia" con batería que se descarga |
| 2. Qué es | 10 s | Glóbulos rojos con oxígeno; con anemia desaparece la mitad |
| 3. Síntomas | 14 s | Cansancio, palidez, falta de aire, mareos, manos y pies fríos, corazón acelerado |
| 4. Valores | 12 s | Hemoglobina < 13 (hombres), < 12 (mujeres), < 11 g/dL (embarazadas), criterio OMS · hemograma |
| 5. Causas | 13 s | Poco hierro, sangrados, embarazo, celiaquía, falta de B12 o ácido fólico |
| 6. Hierro | 12 s | Carne roja, hígado y morcilla · pollo y pescado · legumbres · acelga y espinaca |
| 7. Trucos | 17 s | Vitamina C · el mate lejos de las comidas · no tomar hierro por cuenta propia |
| 8. Cierre | 8 s | "Si te sentís así, pedí un hemograma" |

```bash
npm run anemia            # out/anemia.mp4
npm run anemia:portada    # out/anemia-portada.png
```

Textos: `src/anemia/datos.ts` · Escenas: `src/anemia/Anemia.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,10,14,12,13,12,17,8 --transponer 5 --bpm 116 --estilo energico --salida public/audio/anemia-musica.wav` y convertir con `loudnorm`.

---

# Reel: TDAH (3 minutos, estilo cómic)

Quinto Reel de la serie, con un estilo nuevo **cómic / pop art** (`src/salud/comic.tsx`): fondos de color con rayos y trama de puntos, bordes negros gruesos, sombras duras, stickers torcidos, globos de diálogo, sellos "MITO" y una onomatopeya (¡ZAS!, ¡PUM!, ¡BOOM!…) en cada cambio de página. Tipografía Bangers (OFL) en `public/fonts`. **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 5 s | "¿Empezás 10 cosas y no terminás ninguna?" con pendientes "¡A medias!" |
| Qué es | 15 s | Sigla T-D-A-H, "una forma diferente en que funciona el cerebro", "no es falta de ganas" |
| ¿Es común? | 12 s | Grilla de 100: 5 de cada 100 chicos, 2 a 3 de cada 100 adultos |
| 3 formas | 18 s | Inatento · hiperactivo-impulsivo · combinado |
| Distracción | 18 s | 5 señales de inatención |
| Hiperactividad e impulsividad | 18 s | 4 señales |
| En adultos | 18 s | 4 señales + "en mujeres suele pasar desapercibido" |
| Mitos | 22 s | Falta de voluntad · crianza · solo chicos · disciplina |
| Diagnóstico | 15 s | Profesional, entrevistas, desde la infancia, sin análisis de sangre |
| Tratamiento | 17 s | Entenderlo · terapia · apoyo · medicación si se indica |
| Tips | 14 s | Pasos chicos · alarmas · listas · moverse y dormir bien |
| Cierre | 8 s | "¿Te identificaste? Consultá con un profesional" |

```bash
npm run tdah             # out/tdah.mp4 (con --crf=24 para que pese ~45 MB)
npm run tdah:portada     # out/tdah-portada.png
```

Textos: `src/tdah/datos.ts` · Escenas: `src/tdah/Tdah.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 5,15,12,18,18,18,18,22,15,17,14,8 --transponer 7 --bpm 126 --estilo energico --salida public/audio/tdah-musica.wav` y convertir con `loudnorm`.

## TDAH en 90 segundos (versión corta)

Composición `Tdah90` (`src/tdah/Tdah90.tsx`): mismo estilo cómic y escenas del Reel de 3 minutos, resumido en 8 páginas:
gancho (5 s) · qué es (12 s) · ¿es común? (8 s) · señales (16 s) · en adultos (12 s) · mitos (14 s) · diagnóstico y tratamiento (15 s) · cierre (8 s).

```bash
npm run tdah90           # out/tdah-90s.mp4
```

Música: `python3 scripts/musica_reel.py --paginas 5,12,8,16,12,14,15,8 --transponer 4 --bpm 128 --estilo energico --salida public/audio/tdah90-musica.wav` y convertir con `loudnorm`.

---

# Reel: Hipertiroidismo (90 s, estilo neón)

Estilo neón de la serie (`src/salud/pop.tsx`) y **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Velocímetro que se va al rojo: "¿Corazón a mil, nervios y bajás de peso sin hacer dieta? Podría ser la tiroides" |
| Qué es | 12 s | La "mariposa" del cuello que regula el motor del cuerpo; en el hiper fabrica hormonas de más |
| Síntomas | 16 s | 9 tarjetas: palpitaciones, peso, nervios, temblor, calor, sueño, baño, debilidad, ojos saltones |
| Hiper vs. hipo | 12 s | Todo se acelera vs. todo se enlentece |
| Causas | 12 s | Graves, nódulos, tiroiditis, exceso de medicación · más frecuente en mujeres |
| Diagnóstico | 12 s | Análisis de sangre: TSH baja, T4 libre alta · por qué la TSH baja · ecografía u otros estudios |
| Tratamiento | 14 s | Medicamentos, yodo radiactivo, cirugía · lo decide el endocrinólogo · sin tratar: arritmias y huesos frágiles |
| Cierre | 8 s | "Si te sentís así, pedí un análisis de tiroides" |

```bash
npm run hipertiroidismo     # out/hipertiroidismo.mp4
```

Textos: `src/hipertiroidismo/datos.ts` · Escenas: `src/hipertiroidismo/Hipertiroidismo.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,16,12,12,12,14,8 --transponer -5 --bpm 120 --estilo energico --salida public/audio/hipertiroidismo-musica.wav` y convertir con `loudnorm`.

---

# Reel: Hipotiroidismo (90 s, estilo neón)

Contracara del Reel de hipertiroidismo; reutiliza sus piezas (mariposa, tarjetas de síntomas, "hiper vs. hipo" y hormonas), exportadas desde `src/hipertiroidismo/Hipertiroidismo.tsx`. **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | 🐢 + barra de carga que no avanza: "¿Cansancio, frío y subís de peso sin explicación? Podría ser la tiroides" |
| Qué es | 12 s | La mariposa del cuello se apaga y late lento (💤): fabrica hormonas de menos |
| Síntomas | 16 s | 9 tarjetas: cansancio, peso, frío, piel seca, pelo, constipación, ánimo, memoria, corazón lento |
| Hipo vs. hiper | 12 s | Todo se enlentece vs. todo se acelera |
| Causas | 12 s | Hashimoto, cirugía o yodo radiactivo, medicamentos, posparto · más frecuente en mujeres · pesquisa neonatal |
| Diagnóstico | 12 s | TSH alta, T4 libre baja |
| Tratamiento | 14 s | Levotiroxina una vez por día, en ayunas, lejos del mate y el café · controles · no dejarla sin consultar |
| Cierre | 8 s | "Si te sentís así, pedí un análisis de tiroides" |

```bash
npm run hipotiroidismo     # out/hipotiroidismo.mp4
```

Textos: `src/hipotiroidismo/datos.ts` · Escenas: `src/hipotiroidismo/Hipotiroidismo.tsx`.
Música (más lenta, 104 BPM): `python3 scripts/musica_reel.py --paginas 4,12,16,12,12,12,14,8 --transponer 0 --bpm 104 --estilo energico --salida public/audio/hipotiroidismo-musica.wav` y convertir con `loudnorm`.

---

# Reel: Arritmia (90 s, estilo neón)

Estilo neón de la serie y **@sebranda** al pie. Incluye un electrocardiograma animado (`Ecg` en `src/arritmia/Arritmia.tsx`) con ritmos normal, rápido, lento, irregular y fibrilación.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Corazón que salta + electro irregular: "¿Sentiste que el corazón se salta un latido?" |
| Qué es | 14 s | 4 electros: normal (60 a 100 lpm), muy rápido, muy lento, irregular |
| Síntomas | 12 s | Palpitaciones, mareos, falta de aire, cansancio, dolor de pecho, desmayos · algunas no dan síntomas |
| Fibrilación auricular | 12 s | La más común, más frecuente después de los 60 · riesgo de coágulos y ACV |
| Causas | 14 s | Presión alta y corazón, tiroides, café o energizantes, alcohol y tabaco, estrés y dormir poco |
| Tomate el pulso | 12 s | Dos dedos en la muñeca, contar 30 s, multiplicar por 2 |
| Diagnóstico y tratamiento | 12 s | Electrocardiograma, Holter · hábitos, medicamentos, procedimientos o marcapasos |
| Cierre | 10 s | "Llamá al 107 o al 911 si…", "si notás el pulso raro, consultá" |

```bash
npm run arritmia     # out/arritmia.mp4
```

Textos: `src/arritmia/datos.ts` · Escenas: `src/arritmia/Arritmia.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,14,12,12,14,12,12,10 --transponer 3 --bpm 112 --estilo energico --salida public/audio/arritmia-musica.wav` y convertir con `loudnorm`.

---

# Reel: Jesús de Miguel (3 minutos, estilo sobrio)

Homenaje e información sobre la muerte del delantero del CD Tenerife tras un choque en el partido contra el FC Andorra (Segunda División, jornada 12). Estilo sobrio propio (`src/tenerife/JesusDeMiguel.tsx`): fondo oscuro con azul y blanco, crespón negro, fundidos lentos, sin destellos. Música suave en tono menor. **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Portada | 8 s | Crespón, nombre, 1996–2026, delantero del CD Tenerife |
| Qué pasó | 25 s | Cronología del partido hasta el traslado al Hospital de La Candelaria |
| En el hospital | 18 s | UCI, partes del club, fallecimiento el martes 3 de noviembre |
| Quién era | 30 s | Nacimiento, Castellón (88 partidos, 25 goles), llegada al Tenerife y ascenso |
| Lo que se sabe y lo que no | 25 s | Hechos confirmados vs. causa exacta y diagnóstico sin confirmar |
| Homenajes | 30 s | Minuto de silencio, Real Madrid, UEFA, mensajes |
| Por qué importa saber RCP | 30 s | Llamar a emergencias, RCP, desfibrilador |
| Cierre | 14 s | "Descansá en paz, Jesús", fuentes y fecha de los datos |

**Antes de publicar:** revisá los datos en `src/tenerife/datos.ts` contra la información oficial más reciente (la causa de la muerte no estaba confirmada al 4 de noviembre de 2026). No afirmes una causa hasta que la confirme una fuente oficial.

```bash
npm run tenerife     # out/jesus-de-miguel.mp4
```

Música: `python3 scripts/musica_reel.py --paginas 8,25,18,30,25,30,30,14 --bpm 72 --transponer -2 --menor --estilo suave --salida public/audio/tenerife-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Reel: Pies hinchados (90 s, estilo neón)

Estilo neón de la serie y **@sebranda** al pie. Incluye un pie que se hincha y la animación de la "prueba del dedo" (fóvea).

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Pie que se infla: "¿Llegás a la noche con los pies como globos?" |
| Por qué se hinchan | 12 s | Líquido que baja por la gravedad: edema |
| La prueba del dedo | 12 s | Apretar 5 segundos y ver si queda un hoyito |
| Lo más común | 14 s | Horas de pie o sentado, viajes, calor, sal, embarazo |
| Algo más | 14 s | Corazón, riñones, hígado, várices, tiroides, medicamentos |
| Urgente si | 14 s | Una pierna con dolor/calor/rojo (trombosis), falta de aire (107/911), embarazada con dolor de cabeza |
| Qué ayuda | 12 s | Piernas en alto, moverse, menos sal, agua, medias si las indica el médico |
| Cierre | 8 s | "Si se repite seguido, consultá a tu médico" |

```bash
npm run pies     # out/pies-hinchados.mp4
```

Textos: `src/pies/datos.ts` · Escenas: `src/pies/Pies.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,12,14,14,14,12,8 --transponer 1 --bpm 108 --estilo energico --salida public/audio/pies-musica.wav` y convertir con `loudnorm`.

---

# Reel: Presión arterial (90 s, estilo neón)

Estilo neón de la serie y **@sebranda** al pie, con un tensiómetro digital animado.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Tensiómetro con "¿?": "No duele. No avisa. ¿Sabés cuánto tenés de presión?" |
| Los dos números | 12 s | 120/80: máxima (cuando late) y mínima (cuando descansa) |
| Valores | 14 s | Normal < 120/80 · vigilar 120/80–139/89 · alta ≥ 140/90 · la meta la define el médico |
| Enemiga silenciosa | 10 s | 1 de cada 3 adultos en el mundo (OMS) · sin síntomas · infarto, ACV, riñones |
| Cómo medirla bien | 16 s | 6 pasos: reposo, sin café ni cigarrillo, postura, brazo, no hablar, 2 mediciones |
| Qué ayuda | 14 s | Menos sal, moverse, peso, alcohol y cigarrillo, no dejar la medicación |
| Urgencias | 12 s | Presión muy alta + síntomas de alarma: 107 o 911 |
| Cierre | 8 s | "Medite la presión aunque te sientas bien" |

```bash
npm run presion     # out/presion-arterial.mp4
```

Textos y valores: `src/presion/datos.ts` (umbral de 140/90 según OMS y guías europeas y argentinas; algunas guías usan 130/80).
Música: `python3 scripts/musica_reel.py --paginas 4,12,14,10,16,14,12,8 --transponer -1 --bpm 114 --estilo energico --salida public/audio/presion-musica.wav` y convertir con `loudnorm`.

---

# Reel: Ansiedad (3 minutos, estilo calma)

Estilo nuevo **calma** (`src/salud/calma.tsx`): fondo pastel que cambia de color despacio, burbujas suaves, tarjetas blancas redondeadas, fundidos lentos y sin destellos. Música tranquila. **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 6 s | Pensamientos que dan vueltas: "¿Tu cabeza no para nunca?" |
| Qué es | 20 s | La alarma natural del cuerpo; el problema es cuando queda prendida |
| Cuándo es un problema | 16 s | Intensa, duradera, sin motivo, te frena · los trastornos de ansiedad son los más frecuentes (OMS) |
| En el cuerpo | 18 s | 8 síntomas físicos |
| En la mente | 16 s | 5 síntomas mentales |
| Ataque de pánico | 22 s | Qué se siente · curva "pico en minutos y pasa" · consultar la primera vez, 107/911 con dolor de pecho |
| Respirá conmigo | 28 s | Respiración guiada: inhalar 4, exhalar 6, dos ciclos con círculo que crece y se achica |
| 5-4-3-2-1 | 18 s | Técnica para volver al presente |
| Día a día | 16 s | Moverse, dormir, menos café y alcohol, límite a pantallas, hablar con alguien |
| Pedir ayuda | 12 s | Terapia; medicación si la indica un profesional |
| Cierre | 8 s | "No estás solo ni sola" + línea de ayuda 135 / (011) 5275-1135 |

```bash
npm run ansiedad     # out/ansiedad.mp4
```

Textos y línea de ayuda: `src/ansiedad/datos.ts` · Escenas: `src/ansiedad/Ansiedad.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 6,20,16,18,16,22,28,18,16,12,8 --bpm 72 --transponer 2 --estilo suave --salida public/audio/ansiedad-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Reel: El papel que llega a la Luna (90 s, estilo cuaderno)

Curiosidad matemática con un estilo nuevo **cuaderno**: hoja rayada con margen rojo, letra manuscrita Caveat (OFL, en `public/fonts`), resaltado con fibrón y notas pegadas. **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 5 s | "¿Cuántas veces tenés que doblar un papel para llegar a la Luna?" |
| La hoja | 6 s | 0,1 mm, como un pelo |
| ¿Qué es un doblez? | 8 s | Hoja que se dobla por la mitad dos veces: 1 → 2 → 4 capas |
| Duplica | 12 s | Pila de capas: 1 → 2 → 4 → 8 → 16 |
| Escalada | 30 s | Contador de dobleces y grosor; el fondo pasa del cuaderno al cielo y al espacio; hitos: libro, casa, edificio, rascacielos, aviones, espacio, Luna |
| La Luna | 8 s | 42 dobleces ≈ 439.805 km; la Luna está a unos 384.400 km |
| En la vida real | 10 s | 7 u 8 dobleces; récord de 12 (Britney Gallivan, 2002) |
| La idea | 6 s | Crecimiento exponencial |
| Cierre | 5 s | "¿Lo sabías? Mandáselo a alguien que no lo crea" |

```bash
npm run papel     # out/papel-luna.mp4
```

Datos e hitos: `src/papel/datos.ts` (grosor de la hoja, distancia a la Luna, comparaciones) · Escenas: `src/papel/Papel.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 5,6,8,12,30,8,10,6,5 --transponer 5 --bpm 104 --estilo energico --salida public/audio/papel-musica.wav` y convertir con `loudnorm=I=-15`.

---

# Reel: ¿Qué es un ataque de pánico? (3 minutos, estilo calma)

Hermano del Reel de ansiedad: mismo estilo **calma** y reutiliza la curva de la "ola" y la respiración guiada (exportadas desde `src/ansiedad/Ansiedad.tsx`). **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 6 s | Corazón que late cada vez más rápido (72 → 150 latidos/min) |
| Qué es | 18 s | Miedo intenso de golpe, a veces sin aviso; le puede pasar a cualquiera |
| Qué se siente | 20 s | 10 síntomas del cuerpo y la mente |
| La ola | 16 s | Pico en unos 10 minutos y baja; el ataque en sí no hace daño |
| Por qué pasa | 16 s | La alarma del cuerpo se dispara sin peligro real; adrenalina; desencadenantes |
| Círculo del miedo | 18 s | Síntoma → pensamiento catastrófico → más miedo → más síntomas |
| Qué hacer | 26 s | 5 pasos para el momento |
| Respirá conmigo | 24 s | Respiración guiada: inhalar 4, exhalar 6 |
| Si le pasa a alguien | 16 s | Cómo acompañar |
| Tratamiento | 10 s | Terapia, medicación si la indica un profesional |
| Cierre | 10 s | 107/911 si es la primera vez o hay dolor de pecho · "Va a pasar" |

```bash
npm run panico     # out/ataque-de-panico.mp4
```

Textos: `src/panico/datos.ts` · Escenas: `src/panico/Panico.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 6,18,20,16,16,18,26,24,16,10,10 --bpm 70 --transponer -3 --estilo suave --salida public/audio/panico-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Reel: Migraña (90 s, estilo calma)

Estilo **calma** (colores suaves y sin destellos) y **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Cabeza que late despacio: "¿Te duele tanto la cabeza que hasta la luz te molesta?" |
| Qué es | 12 s | Enfermedad neurológica, no un dolor común · crisis de 4 a 72 h · 3 veces más en mujeres |
| Síntomas | 12 s | Dolor que late de un lado, náuseas, luz, ruidos, olores, empeora al moverse |
| El aura | 12 s | Zigzag animado: luces, zigzags o manchas antes del dolor |
| Qué la dispara | 14 s | Estrés, sueño, saltear comidas, menstruación, alcohol, poca agua |
| Qué ayuda | 14 s | Oscuridad y silencio, frío, medicación temprana, diario de crisis · ojo con el exceso de analgésicos |
| Urgente si | 14 s | Peor dolor de golpe, fiebre y nuca rígida, problemas para hablar o debilidad, golpe en la cabeza · 107/911 |
| Cierre | 8 s | "La migraña tiene tratamiento: consultá a un neurólogo" |

```bash
npm run migrana     # out/migrana.mp4
```

Textos: `src/migrana/datos.ts` · Escenas: `src/migrana/Migrana.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,12,12,14,14,14,8 --bpm 74 --transponer 6 --estilo suave --salida public/audio/migrana-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Reel: Diabetes y glucosa (3 minutos, estilo neón)

Estilo neón de la serie de análisis y **@sebranda** al pie. Animación central: la insulina como **llave** que abre la célula para que entre la glucosa; en la diabetes la llave falla y la glucosa se acumula en la sangre.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 6 s | 🥤🚽😴 "¿Mucha sed, vas al baño a cada rato y estás siempre cansado?" |
| Glucosa | 16 s | El azúcar de la sangre, combustible del cuerpo; comidas que se convierten en glucosa |
| Insulina | 18 s | La llave que abre la célula (animación) |
| Diabetes | 16 s | La llave falla y la glucosa se acumula (animación) |
| Tipos | 20 s | Tipo 1, tipo 2 (9 de cada 10), gestacional |
| Valores | 18 s | Ayunas: < 100 normal · 100–125 prediabetes · ≥ 126 diabetes · HbA1c ≥ 6,5 % |
| Señales | 18 s | 8 síntomas + "o ningún síntoma" |
| Prediabetes | 14 s | Alarma que se puede frenar con movimiento y bajar de peso |
| Complicaciones | 14 s | Corazón, riñones, ojos, pies, nervios, ACV |
| Quién debería medirse | 10 s | +45 años, sobrepeso, familiares, presión o colesterol alto |
| Qué ayuda | 22 s | 6 consejos |
| Cierre | 8 s | "Un análisis de glucosa puede cambiarte la vida" |

```bash
npm run diabetes     # out/diabetes.mp4
```

Textos y valores: `src/diabetes/datos.ts` · Escenas: `src/diabetes/Diabetes.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 6,16,18,16,20,18,18,14,14,10,22,8 --transponer 2 --bpm 110 --estilo energico --salida public/audio/diabetes-musica.wav` y convertir con `loudnorm`.

---

# Reel: Insomnio (90 s, estilo calma)

Estilo **calma** y **@sebranda** al pie.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | Reloj a las 03:00 y ovejas que saltan: "¿Son las 3 de la mañana y seguís mirando el techo?" |
| Qué es | 12 s | Cuesta dormirse, despertarse a la noche o muy temprano + cansancio al día |
| Cuántas horas | 8 s | 7 a 9 h para la mayoría de los adultos |
| Qué lo empeora | 14 s | Estrés, pantallas, mate o café a la tarde, alcohol, horarios, siestas largas |
| Hábitos | 22 s | 6 hábitos para dormir mejor |
| Regla de los 20 minutos | 10 s | Si no te dormís, levantate, algo tranquilo y volvé con sueño (animación) |
| Cuándo consultar | 12 s | Más de un mes, afecta el día, ronquidos o pausas al respirar · terapia · no automedicarse |
| Cierre | 8 s | "Dormir bien también es salud" |

```bash
npm run insomnio     # out/insomnio.mp4
```

Textos: `src/insomnio/datos.ts` · Escenas: `src/insomnio/Insomnio.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,8,14,22,10,12,8 --bpm 66 --transponer -4 --estilo suave --salida public/audio/insomnio-musica.wav` y convertir con `loudnorm=I=-18`.

## Insomnio, versión estilo noche

Composición `InsomnioNoche` (`src/insomnio/InsomnioNoche.tsx`): mismas escenas, textos y música que el Reel de insomnio, con un estilo nuevo **noche** (`src/salud/noche.tsx`): cielo azul oscuro con estrellas que titilan, estrellas fugaces, luna creciente con brillo, tarjetas translúcidas que flotan y fundidos lentos. Tiene la misma interfaz que el estilo calma, así que cualquier Reel en calma se puede pasar a noche cambiando el import.

```bash
npm run insomnio:noche     # out/insomnio-noche.mp4
```

---

# Reel: Hígado graso (90 s, estilo neón)

Estilo neón de la serie de análisis y **@sebranda** al pie. Animación de un hígado que se llena de gotitas de grasa y de las etapas (sano → graso → inflamado → cicatrices).

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | "Tu hígado se puede llenar de grasa… y no te avisa" |
| Qué es | 12 s | Grasa de más dentro del hígado (nuevo nombre: asociada a disfunción metabólica) |
| Es común | 8 s | 1 de cada 3 adultos · casi sin síntomas |
| Qué lo favorece | 14 s | Sobrepeso, glucosa, triglicéridos y colesterol, presión, azúcar, alcohol · también en flacos |
| Etapas | 16 s | Sano → graso → inflamado → cicatrices · en las primeras se puede revertir |
| Diagnóstico | 10 s | Ecografía y análisis de sangre del hígado |
| Qué ayuda | 18 s | 5 consejos + bajar 7–10 % del peso |
| Cierre | 8 s | "Cuidá tu hígado: pedí un chequeo" |

```bash
npm run higado     # out/higado-graso.mp4
```

Textos: `src/higado/datos.ts` · Escenas: `src/higado/Higado.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,8,14,16,10,18,8 --transponer 4 --bpm 112 --estilo energico --salida public/audio/higado-musica.wav` y convertir con `loudnorm`.

---

# Reel: Ácido úrico y gota (90 s, estilo neón)

Estilo neón de la serie de análisis y **@sebranda** al pie. Animaciones: recorrido del ácido úrico (comida → sangre → riñones → orina) y cristales como agujitas que se juntan en el dedo gordo del pie (reutiliza el pie del Reel de pies hinchados).

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | "Un dolor tan fuerte en el dedo gordo que no soportás ni la sábana" |
| Ácido úrico | 12 s | Desecho que eliminan los riñones; el problema es cuando se acumula |
| Valores | 10 s | Alto: > 7 mg/dL hombres, > 6 mujeres (orientativo) |
| La gota | 14 s | Cristales en la articulación → inflamación |
| Síntomas | 12 s | Dolor de golpe, de noche, rojo, calor, hinchazón · qué hacer en una crisis |
| Qué lo sube | 14 s | Achuras, carne roja, mariscos, cerveza, gaseosas, sobrepeso |
| Qué ayuda | 16 s | Agua, menos achuras y alcohol, bajar de peso de a poco, no dejar la medicación |
| Cierre | 8 s | "En tu próximo análisis, pedí el ácido úrico" |

```bash
npm run gota     # out/acido-urico-gota.mp4
```

Textos y valores: `src/gota/datos.ts` · Escenas: `src/gota/Gota.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,10,14,12,14,16,8 --transponer -2 --bpm 108 --estilo energico --salida public/audio/gota-musica.wav` y convertir con `loudnorm`.

---

# Reel: Cómo reconocer un ACV (90 s, estilo neón)

Estilo neón y **@sebranda** al pie. Animaciones: vaso que se tapa o se rompe, contador de neuronas por minuto, y la prueba de 3 pasos (cara que se cae, brazo que baja, frase trabada).

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | "Esto puede salvar una vida: cómo reconocer un ACV en 3 pasos" |
| Qué es | 12 s | Un vaso del cerebro se tapa o se rompe |
| El tiempo | 8 s | ~1,9 millones de neuronas por minuto |
| 1. Sonreír | 8 s | ¿Se cae un lado de la cara? |
| 2. Brazos | 8 s | ¿Uno se cae? |
| 3. Hablar | 8 s | ¿Habla raro o trabado? |
| Otras señales | 12 s | Mareo, visión, dolor de cabeza fuerte, confusión |
| Qué hacer | 14 s | Llamar YA al 107/911, anotar la hora, nada por boca, aunque se pase |
| Prevenir | 8 s | Presión, cigarrillo, diabetes, colesterol, arritmias, sedentarismo |
| Cierre | 8 s | "Sonreír, brazos, hablar… y llamar YA" |

```bash
npm run acv     # out/acv.mp4
```

Textos: `src/acv/datos.ts` · Escenas: `src/acv/Acv.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,8,8,8,8,12,14,8,8 --transponer 1 --bpm 116 --estilo energico --salida public/audio/acv-musica.wav` y convertir con `loudnorm`.

---

# Reel: ¿Qué es el autismo? (3 minutos, estilo calma)

Estilo **calma** (sin destellos ni movimientos bruscos) y **@sebranda** al pie. Lenguaje respetuoso: no se presenta como enfermedad ni como algo para "curar". Símbolo del infinito multicolor de la neurodiversidad.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 6 s | Infinito multicolor: "No es una enfermedad. Es otra forma de percibir el mundo" |
| Qué es | 20 s | Condición del neurodesarrollo, desde el nacimiento, para toda la vida · TEA |
| Espectro | 18 s | Cada persona autista es distinta; distintas necesidades de apoyo |
| ¿Es común? | 10 s | ~1 de cada 100 chicos (OMS) · en mujeres pasa desapercibido |
| Comunicación | 18 s | Mirada, sentido literal, reglas sociales, comunicación sin palabras |
| Intereses y rutinas | 18 s | Intereses intensos, rutinas, movimientos repetitivos, ordenar objetos |
| Sentidos | 18 s | Ruidos, luces, texturas, olores, roces |
| Señales tempranas | 18 s | Nombre, señalar, palabras, juego, pérdida de habilidades |
| Mitos | 20 s | Vacunas, crianza, emociones, "cosa de chicos" |
| Cómo acompañar | 22 s | 5 consejos + diagnóstico y terapias |
| Cierre | 12 s | "Comprender y acompañar" · 2 de abril |

```bash
npm run autismo     # out/autismo.mp4
```

Textos: `src/autismo/datos.ts` · Escenas: `src/autismo/Autismo.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 6,20,18,10,18,18,18,18,20,22,12 --bpm 76 --transponer 3 --estilo suave --salida public/audio/autismo-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Reel: ¿Qué es la depresión? (3 minutos, estilo calma)

Estilo **calma** y **@sebranda** al pie. Una nube gris llueve sobre una persona al principio y, en el cierre, se corre y sale el sol.

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 6 s | Nube con lluvia: "¿Hace semanas que nada te da ganas?" |
| Qué es | 18 s | Enfermedad, no falta de voluntad; tiene tratamiento |
| Tristeza vs. depresión | 18 s | Motivo, duración (2 semanas o más), impacto |
| Es común | 10 s | 280 millones de personas (OMS) |
| Síntomas | 20 s | 8 síntomas |
| En el cuerpo | 12 s | Cansancio, dolores, lentitud |
| Causas | 14 s | Genética, química del cerebro, situaciones difíciles, enfermedades · no es culpa de nadie |
| Señales de alarma | 16 s | Ideas de muerte o daño · línea 135 / (011) 5275-1135 · 911 |
| Tratamiento | 20 s | Terapia, medicación o ambas · los antidepresivos no se dejan de golpe |
| Cómo ayudar | 22 s | Escuchar, no juzgar, acompañar, preguntar directo, seguir presente |
| Pasitos | 14 s | 5 hábitos que suman (no reemplazan el tratamiento) |
| Cierre | 10 s | Sale el sol: "No estás solo ni sola. Pedir ayuda es el primer paso" |

```bash
npm run depresion     # out/depresion.mp4
```

Textos y línea de ayuda: `src/depresion/datos.ts` (verificar que la línea siga vigente) · Escenas: `src/depresion/Depresion.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 6,18,18,10,20,12,14,16,20,22,14,10 --bpm 70 --transponer 0 --estilo suave --salida public/audio/depresion-musica.wav` y convertir con `loudnorm=I=-18`.

---

# three.js (3D)

Instalados `three` 0.187.0, `@react-three/fiber` 8.18.0 y `@remotion/three` 4.0.539. Prueba: composición `Prueba3D` (`src/tres/Prueba3D.tsx`), glóbulos rojos 3D que giran y flotan, 10 s.

```bash
npm run prueba3d     # out/prueba-3d.mp4
```

Al renderizar algo con 3D hay que usar **`--gl=swangle`** (dibuja por software). En este entorno de la nube `--gl=angle`, `swiftshader`, `egl` y `angle-egl` fallan con "Error creating WebGL context". En una computadora con placa de video también suele andar `--gl=angle`, más rápido.

---

# Reel: Fibromialgia (90 s, estilo calma)

Estilo **calma** y **@sebranda** al pie. Animaciones: cuerpo con puntos de dolor que laten y perilla de "volumen del dolor".

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | "¿Te duele todo el cuerpo… y los análisis dan bien?" |
| Qué es | 12 s | Dolor crónico generalizado con cansancio · es real |
| El volumen | 10 s | El sistema nervioso amplifica las señales de dolor |
| Síntomas | 14 s | Dolor, cansancio, sueño no reparador, niebla mental, rigidez, sensibilidad |
| A quién | 8 s | 2 a 4 de cada 100 personas, sobre todo mujeres |
| Diagnóstico | 12 s | Sin análisis específico; por síntomas y descartando otras causas |
| Qué ayuda | 22 s | Ejercicio suave, sueño, terapia, medicación indicada |
| Cierre | 8 s | "Que no se vea no significa que no exista" |

```bash
npm run fibromialgia     # out/fibromialgia.mp4
```

Textos: `src/fibromialgia/datos.ts` · Escenas: `src/fibromialgia/Fibromialgia.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,12,10,14,8,12,22,8 --bpm 74 --transponer -1 --estilo suave --salida public/audio/fibromialgia-musica.wav` y convertir con `loudnorm=I=-18`.

---

# Personajes ilustrados

Componente `<Personaje />` en `src/salud/personajes.tsx`, para usar en cualquier Reel:

```tsx
<Personaje tipo="doctora" expresion="feliz" saluda size={400} />
```

- **tipo:** `doctora`, `doctor`, `chica` (Sofi), `chico` (Tomi), `abuelo`
- **expresion:** `feliz`, `triste`, `dolor`, `sorpresa`, `pensando`
- Respiran y parpadean solos; `saluda` mueve la mano; `fase` desfasa la animación entre varios personajes.

Muestrario: composición `Personajes` (`src/salud/MuestrarioPersonajes.tsx`), 16 s.

```bash
npm run personajes     # out/personajes.mp4
```

---

# Reel: Celiaquía y sensibilidad al gluten no celíaca (90 s, estilo neón)

Estilo neón y **@sebranda** al pie. Animaciones: vellosidades del intestino que se aplanan con el gluten y sello "Sin TACC" genérico (no es el logo oficial).

| Página | Duración | Contenido |
|---|---|---|
| Gancho | 4 s | "¿Comés pan o pizza y se te hincha la panza?" |
| Gluten | 8 s | Proteína de trigo, avena, cebada y centeno (TACC) |
| Celiaquía | 12 s | Autoinmune; vellosidades aplanadas; ~1 de cada 100 |
| Señales | 12 s | 8 síntomas + "o ningún síntoma" |
| Sensibilidad no celíaca | 12 s | Síntomas parecidos, sin daño intestinal ni anticuerpos |
| Comparación | 12 s | Tabla celiaquía vs. sensibilidad |
| Diagnóstico | 12 s | Anticuerpos y biopsia · no dejar el gluten antes |
| Sin TACC | 12 s | Dieta sin TACC y contaminación cruzada |
| Cierre | 6 s | "Si tenés síntomas, consultá antes de sacar el gluten" |

```bash
npm run celiaquia     # out/celiaquia.mp4
```

Textos: `src/celiaquia/datos.ts` · Escenas: `src/celiaquia/Celiaquia.tsx`.
Música: `python3 scripts/musica_reel.py --paginas 4,8,12,12,12,12,12,12,6 --transponer 3 --bpm 110 --estilo energico --salida public/audio/celiaquia-musica.wav` y convertir con `loudnorm`.

---

# Historia: "Ladrillo a ladrillo" (5 minutos)

Historia ilustrada **ficticia**, inspirada en muchas historias reales: Lucía y su familia pasan de la pobreza a la clase media gracias a la educación, el trabajo y la ayuda (escuela pública, una maestra, una beca). Usa los personajes ilustrados (`src/salud/personajes.tsx`, ahora con mamá, papá, abuela y maestra, y colores personalizables con `piel`, `pelo` y `ropa`).

| Escena | Duración | Qué pasa |
|---|---|---|
| Título | 8 s | "Ladrillo a ladrillo · La historia de Lucía" |
| La familia | 24 s | Lucía, 8 años, y su familia en el barrio |
| El papá | 22 s | Juan hace changas de albañil |
| La mamá | 22 s | Rosa limpia casas y cose de noche |
| La abuela | 22 s | "Lo que aprendés, nadie te lo puede quitar" |
| La escuela | 26 s | Comedor escolar y la maestra Marta |
| La crisis | 24 s | Lucía piensa dejar la escuela; la mamá dice que no |
| El esfuerzo | 24 s | Termina la secundaria; Mateo aprende electricidad |
| La facultad | 28 s | Primera universitaria de la familia, con beca |
| La graduación | 22 s | Licenciada en Enfermería |
| Hoy | 24 s | Lucía en el hospital; Mateo y el papá en el taller |
| La casa | 28 s | Construyen una casa nueva, ladrillo a ladrillo |
| Reflexión | 18 s | "Nadie lo logra solo" |
| Cierre | 8 s | "¿Conocés una historia así?" |

```bash
npm run historia     # out/ladrillo-a-ladrillo.mp4
```

Textos, diálogos y duraciones: `src/historia/datos.ts` · Escenarios: `src/historia/escenarios.tsx` · Animación: `src/historia/Historia.tsx`.
Música en dos partes (menor y después mayor), concatenadas:

```bash
python3 scripts/musica_reel.py --paginas 8,24,22,22,22,26,24 --bpm 72 --transponer -2 --menor --estilo suave --salida /tmp/hA.wav
python3 scripts/musica_reel.py --paginas 24,28,22,24,28,18,8 --bpm 84 --transponer 0 --estilo suave --salida /tmp/hB.wav
ffmpeg -i /tmp/hA.wav -i /tmp/hB.wav -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[a];[a]loudnorm=I=-18:TP=-2[b]" -map "[b]" -b:a 160k public/audio/historia-musica.mp3
```

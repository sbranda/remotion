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

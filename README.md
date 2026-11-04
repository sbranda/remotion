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

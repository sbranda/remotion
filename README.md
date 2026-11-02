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
Para regenerarla (por ejemplo, si cambiás las duraciones): `python3 scripts/musica_trigliceridos.py` y después
`ffmpeg -i public/audio/trigliceridos-musica.wav -b:a 160k public/audio/trigliceridos-musica.mp3`.
Si preferís música de Instagram, renderizá sin la línea `<Html5Audio>` de `Trigliceridos.tsx`.

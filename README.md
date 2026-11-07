# La Arquitectura del Vacío — video en Remotion

Video tipográfico (1920×1080, 30 fps, ~5 min 13 s) del relato *La Arquitectura del Vacío*.
El texto se revela palabra por palabra a ritmo de narración (150 palabras/min), y la puesta
visual acompaña el arco emocional de Julián:

| Tramo | Atmósfera |
|---|---|
| Frío (párr. 1–2) | Azul de plano arquitectónico, retícula simétrica con ejes |
| Tensión (3–5) | Grises, la retícula pierde fuerza; los diálogos van en cursiva |
| Crisis (6–10) | Casi negro, luces del puerto titilando, la retícula se inclina (vértigo) |
| Liberación (11–13) | Ámbar; la mancha de whisky se expande, orgánica e imperfecta |
| Amanecer (14–16) | Cálido, el sol de la mañana entibia la pantalla |

## Uso

```bash
npm install
npm run dev      # abre Remotion Studio
npm run render   # genera out/arquitectura-del-vacio.mp4
```

## Personalizar

Todo el texto y el ritmo están en `src/story.ts`: `WORDS_PER_MINUTE` (velocidad),
`HOLD_SECONDS` (pausa al final de cada párrafo) y el `mood`/`effect` de cada párrafo.
Las paletas por estado de ánimo están en `src/palette.ts`. Si grabás una narración,
ajustá `WORDS_PER_MINUTE` a tu ritmo y agregá el audio con `<Audio>` en `src/Video.tsx`.

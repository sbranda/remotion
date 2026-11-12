# Nadie está solo

Cortometraje animado (~75 s, 1920×1080, 30 fps) sobre el bullying, hecho con Remotion
a partir de las hojas de personajes estilo animación 3D (Mia, Sam y compañía).

## Historia

| # | Escena | Qué pasa |
|---|--------|----------|
| 1 | Título | "Nadie está solo" |
| 2 | Llegada | Primer día de Sam en la escuela nueva |
| 3 | Burla | Leo se ríe de Sam y le lanza una bola de papel |
| 4 | Soledad | Día gris y lluvioso: todos lo ven, nadie dice nada |
| 5 | Mia se da cuenta | "Esto no está bien..." |
| 6 | Amistad | Mia se sienta con Sam y vuelve el sol |
| 7 | Un adulto | Mia y Sam se lo cuentan a Don Tomás |
| 8 | Juntos | Los amigos se ponen al lado de Sam frente a Leo |
| 9 | Perdón | Leo se disculpa y Sam lo invita a jugar |
| 10 | Celebración | Todos juntos, con confeti |
| 11 | Mensaje | Habla con un adulto · Acompaña · Incluye |

## Estructura

- `src/scenes.tsx` – cada escena (diálogos, posiciones, tiempos)
- `src/Story.tsx` – orden y duración de las escenas + transiciones
- `src/components.tsx` – personaje, caminata, globos de diálogo, narración, confeti
- `src/backgrounds.tsx` – patio de la escuela (día / gris / atardecer) y aula
- `public/sprites/` – poses recortadas con fondo transparente

## Comandos

```bash
npm install
npm run dev     # Remotion Studio para previsualizar y ajustar
npm run build   # renderiza out/nadie-esta-solo.mp4
```

# El Informe

Cortometraje de 3 minutos (1920×1080, 30 fps) sobre ética profesional:
**¿qué pesa más, la lealtad a los plazos o la transparencia profesional?**

Laura y Daniel descubren, la víspera de la presentación, que el informe para el cliente
tiene un error grave en los costes. Daniel quiere presentarlo igual y corregirlo sobre la
marcha; Laura quiere decirlo ya, aunque eso suponga retrasos y penalizaciones.

## Escenas

| # | Escena | Duración |
|---|--------|----------|
| 1 | Título | 6 s |
| 2 | Presentación de Laura y Daniel | 11 s |
| 3 | Celebran que han terminado | 11 s |
| 4 | Laura revisa y encuentra el error | 13 s |
| 5 | Se lo cuenta a Daniel | 12 s |
| 6 | La postura de Daniel (plazos) | 15 s |
| 7 | La postura de Laura (transparencia) | 15 s |
| 8 | Choque: la balanza | 12 s |
| 9 | Noche: dudas de los dos | 16 s |
| 10 | Correo de la dirección | 10 s |
| 11 | Daniel cambia de opinión | 14 s |
| 12 | Preparan la solución | 10 s |
| 13 | Reunión con la dirección | 17 s |
| 14 | Desenlace | 11 s |
| 15 | Preguntas para reflexionar | 14 s |

## Estructura

- `src/scenes.tsx` – diálogos, poses y tiempos de cada escena
- `src/Story.tsx` – orden y duración de las escenas
- `src/overlays.tsx` – informe, correo, balanza, checklist, diapositiva, cuenta atrás
- `src/backgrounds.tsx` – oficina (mañana / tarde / noche / amanecer), cocina de la oficina y sala de reuniones
- `src/components.tsx` – personajes, caminata, globos de diálogo, narración
- `public/sprites/` – poses recortadas de la hoja de personajes

## Comandos

```bash
npm install
npm run dev     # Remotion Studio
npm run build   # renderiza out/el-informe.mp4
```

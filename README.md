# Reel: Historia de la computadora

Video vertical para Instagram Reels (1080×1920, 30 fps, ~38 s) hecho con [Remotion](https://www.remotion.dev/).

**Estructura:** gancho ("Del ábaco a la IA") → 12 hitos con año animado, ilustración y dato → cierre con llamada a la acción.

| # | Año | Hito |
|---|-----|------|
| 1 | ~2500 a.C. | El ábaco |
| 2 | 1642 | La Pascalina |
| 3 | 1837 | La Máquina Analítica (Babbage) |
| 4 | 1843 | Ada Lovelace |
| 5 | 1936 | La Máquina de Turing |
| 6 | 1946 | ENIAC |
| 7 | 1947 | El transistor |
| 8 | 1971 | El microprocesador (Intel 4004) |
| 9 | 1981 | La computadora personal |
| 10 | 1991 | La World Wide Web |
| 11 | 2007 | El smartphone |
| 12 | Hoy | Inteligencia artificial |

## Uso

```bash
npm install
npm run dev      # abre Remotion Studio para previsualizar y editar
npm run render   # genera out/historia-computadora.mp4
npm run still    # genera out/portada.png (imagen de portada)
```

## Editar

- Textos, años, colores y duraciones: `src/data.ts`
- Escenas, transiciones y línea de tiempo: `src/Reel.tsx`
- Ilustraciones animadas (SVG): `src/Icons.tsx`

El video no lleva audio: conviene agregar la música desde Instagram al publicar (usar audio en tendencia ayuda al alcance).
El contenido importante está dentro de la zona segura (se deja libre el tercio inferior donde Instagram muestra la descripción y los botones).

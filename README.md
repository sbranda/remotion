# Reel: Historia de la computadora

Video vertical para Instagram Reels (1080×1920, 30 fps, ~51 s) hecho con [Remotion](https://www.remotion.dev/).

**Estructura:** gancho ("Del ábaco a la IA") → 12 hitos con año animado, ilustración y dato → sección "En números" con 3 gráficos animados → cierre con llamada a la acción.

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

### Gráficos (sección "En números")

1. **¿Cuánto pesa una computadora?** Barras: ENIAC 27.000 kg vs. notebook 1,5 kg vs. smartphone 0,2 kg (escala lineal, para que se note la diferencia).
2. **Transistores dentro de un chip.** Línea en escala logarítmica (Ley de Moore): de 2.300 (Intel 4004, 1971) a 208.000 millones (NVIDIA B200, 2024).
3. **Personas conectadas a Internet.** Columnas: de 16 millones (1995) a 5.500 millones (2024).

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
- Gráficos y sus datos: `src/Charts.tsx`

El video no lleva audio: conviene agregar la música desde Instagram al publicar (usar audio en tendencia ayuda al alcance).
El contenido importante está dentro de la zona segura (se deja libre el tercio inferior donde Instagram muestra la descripción y los botones).

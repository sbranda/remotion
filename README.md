# remotion

Proyecto de video con [Remotion](https://www.remotion.dev).

## Uso

```bash
npm install
npm run dev        # abre Remotion Studio
npm run render     # renderiza HelloWorld en out/video.mp4
npm run typecheck  # comprueba los tipos con TypeScript
```

### En GitHub Codespaces

Usa `npm run dev:codespaces` en lugar de `npm run dev` y abre el puerto 3000.
El Studio rechaza las peticiones que llegan por la URL `*.app.github.dev`;
este script pone delante un proxy que lo permite solo para la URL de tu Codespace.

Las composiciones están en `src/Root.tsx`; el punto de entrada es `src/index.ts`.

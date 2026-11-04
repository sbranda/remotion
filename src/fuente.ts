import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Inter incluida en public/fonts (licencia OFL): no depende de internet al renderizar
for (const weight of ["400", "600", "800"]) {
  loadFont({ family: "Inter", url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`), weight });
}

export const SANS = "Inter, sans-serif";

// Bangers (licencia OFL), tipografía de cómic para el estilo "cómic / pop art"
loadFont({ family: "Bangers", url: staticFile("fonts/bangers-latin-400-normal.woff2"), weight: "400" });

export const COMIC = "Bangers, Impact, sans-serif";

// Caveat (licencia OFL), letra manuscrita para el estilo "cuaderno"
loadFont({ family: "Caveat", url: staticFile("fonts/caveat-latin-700-normal.woff2"), weight: "700" });

export const MANUSCRITA = "Caveat, cursive";

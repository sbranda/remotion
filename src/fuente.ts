import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Inter incluida en public/fonts (licencia OFL): no depende de internet al renderizar
for (const weight of ["400", "600", "800"]) {
  loadFont({ family: "Inter", url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`), weight });
}

export const SANS = "Inter, sans-serif";

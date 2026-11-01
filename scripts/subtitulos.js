// Genera out/titanic.srt y out/titanic-capitulos.txt a partir de src/titanic/guion.ts
// Uso: npm run subtitulos
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "titanic-"));
execSync(
  `npx tsc src/titanic/tiempos.ts src/titanic/guion.ts --outDir ${tmp} --module commonjs --target es2018 --skipLibCheck`,
  { stdio: "inherit" },
);
const t = require(path.join(tmp, "tiempos.js"));
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/titanic.srt", t.generarSRT());
fs.writeFileSync("out/titanic-capitulos.txt", t.marcas() + "\n");
console.log(`Ritmo de narración: ${t.PALABRAS_POR_MINUTO.toFixed(0)} palabras por minuto`);
console.log(t.marcas());

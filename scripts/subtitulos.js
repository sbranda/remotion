// Genera out/accidente.srt y out/guion-con-tiempos.txt a partir de src/accidente/guion.ts
// Uso: npm run subtitulos
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "accidente-"));
execSync(
  `npx tsc src/accidente/tiempos.ts --outDir ${tmp} --module commonjs --target es2018 --skipLibCheck`,
  { stdio: "inherit" },
);
const t = require(path.join(tmp, "tiempos.js"));
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/accidente.srt", t.generarSRT());
fs.writeFileSync("out/guion-con-tiempos.txt", t.guionConTiempos());
console.log(t.guionConTiempos());
const rapidos = t.LINEA.filter((b) => b.palabrasPorMinuto > 175);
if (rapidos.length) {
  console.log(`⚠ Bloques con lectura muy rápida (>175 palabras/min): ${rapidos.map((b) => b.id).join(", ")}`);
}

// Arranca Remotion Studio dentro de GitHub Codespaces.
//
// El Studio rechaza las peticiones cuyo Origin no es `http://<host>`, y el
// reenvío de puertos de Codespaces usa `https://<codespace>-<puerto>.app.github.dev`.
// Este proxy escucha en PORT y reescribe el Origin solo cuando coincide
// exactamente con la URL reenviada de este Codespace.
import { spawn } from "node:child_process";
import http from "node:http";
import net from "node:net";

const PORT = Number(process.env.PORT ?? 3000);
const STUDIO_PORT = PORT + 1;

const { CODESPACE_NAME, GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN } = process.env;
if (!CODESPACE_NAME || !GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
  console.error("Este script es solo para GitHub Codespaces. Usa `npm run dev`.");
  process.exit(1);
}
const allowedOrigin = `https://${CODESPACE_NAME}-${PORT}.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;

const rewriteHeaders = (headers) => {
  const out = { ...headers, host: `localhost:${STUDIO_PORT}` };
  if (headers.origin === allowedOrigin) {
    out.origin = `http://localhost:${STUDIO_PORT}`;
  }
  return out;
};

const studio = spawn(
  "npx",
  ["remotion", "studio", "--no-open", `--port=${STUDIO_PORT}`],
  { stdio: "inherit" },
);
studio.on("exit", (code) => process.exit(code ?? 0));

const server = http.createServer((req, res) => {
  const upstream = http.request(
    {
      host: "localhost",
      port: STUDIO_PORT,
      method: req.method,
      path: req.url,
      headers: rewriteHeaders(req.headers),
    },
    (upRes) => {
      res.writeHead(upRes.statusCode ?? 502, upRes.headers);
      upRes.pipe(res);
    },
  );
  upstream.on("error", () => {
    if (!res.headersSent) res.writeHead(502);
    res.end("Remotion Studio todavía está arrancando, recarga en unos segundos.");
  });
  req.pipe(upstream);
});

server.on("upgrade", (req, socket, head) => {
  const upstream = net.connect(STUDIO_PORT, "localhost", () => {
    const headers = rewriteHeaders(req.headers);
    const lines = [`${req.method} ${req.url} HTTP/${req.httpVersion}`];
    for (const [k, v] of Object.entries(headers)) {
      for (const value of [].concat(v)) lines.push(`${k}: ${value}`);
    }
    upstream.write(lines.join("\r\n") + "\r\n\r\n");
    upstream.write(head);
    upstream.pipe(socket).pipe(upstream);
  });
  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
});

server.listen(PORT, () => {
  console.log(`Abre el Studio en: ${allowedOrigin}`);
});

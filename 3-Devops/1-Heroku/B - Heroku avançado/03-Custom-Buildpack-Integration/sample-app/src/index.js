import http from "node:http";

const port = Number.parseInt(process.env.PORT ?? "5000", 10);

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok", toolchain: process.env.WASMTOY_HOME ?? "missing" }));
    return;
  }

  response.writeHead(200, { "content-type": "text/plain" });
  response.end("Custom buildpack sample app");
});

server.listen(port);

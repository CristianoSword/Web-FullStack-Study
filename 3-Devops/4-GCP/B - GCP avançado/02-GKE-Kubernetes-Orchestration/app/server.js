import http from "node:http";

const port = Number(process.env.PORT ?? 8080);
const startedAt = new Date().toISOString();

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", startedAt, service: "study-api" }));
    return;
  }

  if (request.url === "/ready") {
    response.writeHead(200);
    response.end(JSON.stringify({ ready: true, port }));
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      message: "GKE sample application running",
      path: request.url,
      method: request.method
    })
  );
});

server.listen(port, "0.0.0.0", () => {
  console.log(`study-api listening on ${port}`);
});

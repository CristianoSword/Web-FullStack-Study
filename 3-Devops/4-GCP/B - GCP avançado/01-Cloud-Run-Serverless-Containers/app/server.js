import http from "node:http";

const port = Number(process.env.PORT ?? 8080);

const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", platform: "cloud-run" }));
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      service: "study-cloud-run",
      revision: process.env.K_REVISION ?? "local",
      path: request.url
    })
  );
});

server.listen(port, () => {
  console.log(`study-cloud-run listening on ${port}`);
});

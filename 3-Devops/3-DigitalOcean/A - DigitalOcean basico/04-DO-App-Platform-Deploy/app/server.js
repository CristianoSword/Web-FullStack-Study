import http from "node:http";

const port = Number(process.env.PORT ?? 8080);

const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", platform: "digitalocean-app-platform" }));
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      service: "study-web-app",
      env: process.env.APP_ENV ?? "production",
      path: request.url
    })
  );
});

server.listen(port, () => {
  console.log(`study-web-app listening on ${port}`);
});

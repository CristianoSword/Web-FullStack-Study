import http from "node:http";

const port = Number(process.env.PORT ?? 3001);

const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", upstream: "study-app", port }));
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      service: "study-app",
      proxiedBy: "nginx",
      path: request.url
    })
  );
});

server.listen(port, () => {
  console.log(`study-app running on ${port}`);
});

import http from "node:http";

const port = Number(process.env.PORT ?? 8080);

const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", service: "study-orders-api" }));
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      service: "study-orders-api",
      runtime: "ecs-fargate",
      path: request.url
    })
  );
});

server.listen(port, () => {
  console.log(`study-orders-api listening on ${port}`);
});

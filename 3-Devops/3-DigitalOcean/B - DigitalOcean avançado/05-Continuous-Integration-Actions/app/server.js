import http from "node:http";

const port = Number(process.env.PORT ?? 3000);

http
  .createServer((request, response) => {
    response.setHeader("content-type", "application/json");
    if (request.url === "/health") {
      response.end(JSON.stringify({ status: "ok", deployedBy: "github-actions" }));
      return;
    }

    response.end(JSON.stringify({ service: "study-app", path: request.url }));
  })
  .listen(port, () => {
    console.log(`study-app listening on ${port}`);
  });

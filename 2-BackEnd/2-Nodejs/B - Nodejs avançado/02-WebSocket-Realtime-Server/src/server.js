const http = require("http");

const server = http.createServer((_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ status: "ws-server-ready" }));
});

server.listen(8080);

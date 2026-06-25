const http = require("http");
const { attachSocket } = require("./handlers/socket-handler");

const server = http.createServer((_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ status: "ws-server-ready" }));
});

attachSocket(server, {
  on() {},
});

server.listen(8080);

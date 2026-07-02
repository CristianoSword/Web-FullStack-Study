const http = require("http");
const { WebSocketServer } = require("ws");
const { attachSocket } = require("./handlers/socket-handler");

function buildServer() {
  const server = http.createServer((request, response) => {
    if (request.url === "/health") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ status: "ws-server-ready" }));
      return;
    }

    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
  });

  const socketServer = new WebSocketServer({ server });
  attachSocket(socketServer);
  return server;
}

if (require.main === module) {
  buildServer().listen(8080, () => {
    console.log("WebSocket server listening on port 8080");
  });
}

module.exports = {
  buildServer,
};

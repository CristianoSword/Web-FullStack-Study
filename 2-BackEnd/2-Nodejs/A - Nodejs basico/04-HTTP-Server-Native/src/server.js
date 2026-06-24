const http = require("http");
const { URL } = require("url");
const { resolveRoute } = require("./services/router-service");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3001");
  const { statusCode, payload } = resolveRoute(req.method, url.pathname);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(JSON.stringify(payload, null, 2));
});

server.listen(3001, () => {
  console.log("Native HTTP server running on port 3001");
});

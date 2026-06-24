const http = require("http");
const { URL } = require("url");
const { guardMethod } = require("./middleware/request-guard");
const { resolveRoute } = require("./services/router-service");

const server = http.createServer((req, res) => {
  const blocked = guardMethod(req.method);

  if (blocked) {
    res.writeHead(blocked.statusCode, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(blocked.payload, null, 2));
    return;
  }

  let url;

  try {
    url = new URL(req.url, "http://localhost:3001");
  } catch (_error) {
    res.writeHead(400, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify({ message: "Invalid URL" }, null, 2));
    return;
  }

  const { statusCode, payload } = resolveRoute(req.method, url.pathname);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(JSON.stringify(payload, null, 2));
});

server.listen(3001, () => {
  console.log("Native HTTP server running on port 3001");
});

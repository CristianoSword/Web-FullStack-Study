const fs = require("fs");
const http = require("http");
const path = require("path");

function buildModules() {
  return [
    { id: 1, title: "Automação com Playwright", reviewed: false },
    { id: 2, title: "Contratos de API", reviewed: false },
    { id: 3, title: "Observabilidade de filas", reviewed: false }
  ];
}

async function startStudyServer() {
  const appDir = path.join(__dirname, "..", "app");
  const state = {
    modules: buildModules()
  };

  const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");

    if (request.method === "GET" && url.pathname === "/api/health") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/modules") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ modules: state.modules }));
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/modules/review") {
      let rawBody = "";
      request.on("data", (chunk) => {
        rawBody += chunk;
      });
      request.on("end", () => {
        const payload = rawBody ? JSON.parse(rawBody) : {};
        state.modules = state.modules.map((module) =>
          module.id === payload.id ? { ...module, reviewed: true } : module
        );
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ modules: state.modules }));
      });
      return;
    }

    const targetPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = path.join(appDir, targetPath);

    if (fs.existsSync(filePath)) {
      const extension = path.extname(filePath);
      const contentType = extension === ".js" ? "application/javascript" : "text/html";
      response.writeHead(200, { "Content-Type": contentType });
      response.end(fs.readFileSync(filePath));
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  };
}

module.exports = { startStudyServer };

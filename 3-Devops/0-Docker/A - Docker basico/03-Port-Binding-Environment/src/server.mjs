import http from "node:http";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runtimeConfig } from "./lib/runtime-config.mjs";
import { handleBinding } from "./routes/binding-route.mjs";
import { handleEnvironment } from "./routes/environment-route.mjs";
import { handleHealth } from "./routes/health-route.mjs";
import { buildEnvironmentSummary } from "./services/environment-summary-service.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bindingProfile = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../models/port-binding-profile.json"), "utf8")
);
const startedAt = new Date().toISOString();

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    handleHealth(request, response, {
      status: "ok",
      startedAt,
      service: runtimeConfig.serviceName
    });
    return;
  }

  if (request.url === "/environment") {
    handleEnvironment(request, response, buildEnvironmentSummary());
    return;
  }

  if (request.url === "/binding") {
    handleBinding(request, response, {
      containerPort: bindingProfile.containerPort,
      publishedPorts: bindingProfile.bindings,
      activePort: runtimeConfig.port
    });
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "route not found" }));
});

server.listen(runtimeConfig.port, runtimeConfig.host);

import http from "node:http";

import { runtimeConfig } from "./lib/runtime-config.mjs";
import { handleHealth } from "./routes/health-route.mjs";
import { handleMetadata } from "./routes/metadata-route.mjs";
import { buildMetadataPayload } from "./services/app-metadata-service.mjs";

const startedAt = new Date().toISOString();

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    handleHealth(request, response, {
      status: "ok",
      service: runtimeConfig.serviceName,
      startedAt
    });
    return;
  }

  if (request.url === "/metadata") {
    handleMetadata(request, response, buildMetadataPayload());
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "route not found" }));
});

server.listen(runtimeConfig.port, runtimeConfig.host);

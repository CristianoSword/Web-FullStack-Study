import Fastify from "fastify";

import { runtimeConfig } from "../config/runtime-config.mjs";
import { shutdownRabbitResources } from "./lib/rabbitmq-connection.mjs";
import { registerHealthRoutes } from "./routes/health-routes.mjs";
import { registerObservabilityRoutes } from "./routes/observability-routes.mjs";
import { ObservabilityService } from "./services/observability-service.mjs";

const app = Fastify({ logger: true });
const observabilityService = new ObservabilityService();

app.setErrorHandler((error, _request, reply) => {
  reply.code(400).send({
    error: error.message
  });
});

await registerHealthRoutes(app, { observabilityService });
await registerObservabilityRoutes(app, { observabilityService });

const shutdown = async (signal) => {
  app.log.info({ signal }, "Shutting down observability service");
  await app.close();
  await shutdownRabbitResources();
  process.exit(0);
};

const start = async () => {
  await observabilityService.startConsumer();
  await app.listen({ port: runtimeConfig.app.port, host: "0.0.0.0" });
};

process.on("SIGINT", () => {
  shutdown("SIGINT").catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM").catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
});

start().catch((error) => {
  app.log.error(error);
  shutdownRabbitResources().finally(() => process.exit(1));
});

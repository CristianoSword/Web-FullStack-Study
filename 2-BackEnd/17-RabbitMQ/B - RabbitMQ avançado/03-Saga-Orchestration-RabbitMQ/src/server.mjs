import Fastify from "fastify";

import { runtimeConfig } from "../config/runtime-config.mjs";
import { shutdownRabbitResources } from "./lib/rabbitmq-connection.mjs";
import { registerHealthRoutes } from "./routes/health-routes.mjs";
import { registerSagaRoutes } from "./routes/saga-routes.mjs";
import { OrderSagaOrchestrator } from "./services/order-saga-orchestrator.mjs";
import { startSimulatedDomainServices } from "./services/simulated-domain-services.mjs";

const app = Fastify({ logger: true });
const orchestrator = new OrderSagaOrchestrator();

app.setErrorHandler((error, _request, reply) => {
  reply.code(400).send({
    error: error.message
  });
});

await registerHealthRoutes(app);
await registerSagaRoutes(app, { orchestrator });

const shutdown = async (signal) => {
  app.log.info({ signal }, "Shutting down saga orchestration service");
  await app.close();
  await shutdownRabbitResources();
  process.exit(0);
};

const start = async () => {
  await orchestrator.startEventLoop();
  await startSimulatedDomainServices();
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

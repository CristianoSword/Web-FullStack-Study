import Fastify from "fastify";

import { runtimeConfig } from "../config/runtime-config.mjs";
import { shutdownRabbitResources } from "./lib/rabbitmq-connection.mjs";
import { registerClusterRoutes } from "./routes/cluster-routes.mjs";
import { registerHealthRoutes } from "./routes/health-routes.mjs";
import { ClusterProbeService } from "./services/cluster-probe-service.mjs";
import { QuorumQueueService } from "./services/quorum-queue-service.mjs";

const app = Fastify({ logger: true });
const probeService = new ClusterProbeService();
const quorumQueueService = new QuorumQueueService();

app.setErrorHandler((error, _request, reply) => {
  reply.code(400).send({
    error: error.message
  });
});

await registerHealthRoutes(app);
await registerClusterRoutes(app, { probeService, quorumQueueService });

const shutdown = async (signal) => {
  app.log.info({ signal }, "Shutting down quorum cluster service");
  await app.close();
  await shutdownRabbitResources();
  process.exit(0);
};

const start = async () => {
  await quorumQueueService.startConsumers();
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

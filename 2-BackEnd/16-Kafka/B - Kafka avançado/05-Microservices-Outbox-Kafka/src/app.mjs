import Fastify from "fastify";

import { registerOutboxRoutes } from "./routes/outbox-routes.mjs";

export function createApp({ config, orderOutboxService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "Microservices Outbox Kafka",
    docs: [
      "POST /orders",
      "GET /orders",
      "GET /outbox",
      "POST /outbox/publish",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerOutboxRoutes(instance, { orderOutboxService });
  });

  return app;
}

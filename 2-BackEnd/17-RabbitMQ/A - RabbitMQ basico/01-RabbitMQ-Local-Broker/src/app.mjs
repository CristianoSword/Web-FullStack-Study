import Fastify from "fastify";

import { registerBrokerRoutes } from "./routes/broker-routes.mjs";

export function createApp({ config, brokerService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "RabbitMQ Local Broker",
    docs: [
      "POST /messages/publish",
      "POST /messages/dead-letter",
      "GET /messages/published",
      "GET /messages/consumed",
      "GET /messages/dlq",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerBrokerRoutes(instance, { brokerService });
  });

  return app;
}

import Fastify from "fastify";

import { registerPubSubRoutes } from "./routes/pubsub-routes.mjs";

export function createApp({ config, pubSubFanoutService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "PubSub Fanout Exchange",
    docs: [
      "POST /events/publish",
      "GET /events/published",
      "GET /subscribers",
      "GET /subscribers/messages",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerPubSubRoutes(instance, { pubSubFanoutService });
  });

  return app;
}

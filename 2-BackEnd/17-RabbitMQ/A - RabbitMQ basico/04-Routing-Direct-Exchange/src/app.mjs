import Fastify from "fastify";

import { registerDirectRoutingRoutes } from "./routes/direct-routing-routes.mjs";

export function createApp({ config, directRoutingService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "Routing Direct Exchange",
    docs: [
      "POST /logs/publish",
      "GET /logs/published",
      "GET /routes",
      "GET /deliveries",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerDirectRoutingRoutes(instance, { directRoutingService });
  });

  return app;
}

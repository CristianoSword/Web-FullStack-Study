import Fastify from "fastify";

import { registerDelayedRetryRoutes } from "./routes/delayed-retry-routes.mjs";

export function createApp({ config, delayedRetryService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "Delayed Retry DLX",
    docs: [
      "POST /jobs/publish",
      "GET /jobs/published",
      "GET /jobs/attempts",
      "GET /jobs/processed",
      "GET /jobs/dead-letter",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerDelayedRetryRoutes(instance, { delayedRetryService });
  });

  return app;
}

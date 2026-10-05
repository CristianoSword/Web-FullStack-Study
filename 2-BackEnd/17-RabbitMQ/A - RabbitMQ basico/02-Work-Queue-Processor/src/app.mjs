import Fastify from "fastify";

import { registerWorkQueueRoutes } from "./routes/work-queue-routes.mjs";

export function createApp({ config, workQueueService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "Work Queue Processor",
    docs: [
      "POST /tasks/dispatch",
      "GET /tasks/dispatched",
      "GET /tasks/processed",
      "GET /tasks/dlq",
      "GET /workers",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerWorkQueueRoutes(instance, { workQueueService });
  });

  return app;
}

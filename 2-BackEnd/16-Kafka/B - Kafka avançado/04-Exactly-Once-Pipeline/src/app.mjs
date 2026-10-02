import Fastify from "fastify";

import { registerPipelineRoutes } from "./routes/pipeline-routes.mjs";

export function createApp({ config, exactlyOnceService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "Exactly Once Pipeline",
    docs: [
      "POST /payments/ingest",
      "POST /payments/process",
      "GET /payments/processed",
      "GET /payments/idempotency/:idempotencyKey",
      "GET /payments/dlq",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerPipelineRoutes(instance, { exactlyOnceService });
  });

  return app;
}

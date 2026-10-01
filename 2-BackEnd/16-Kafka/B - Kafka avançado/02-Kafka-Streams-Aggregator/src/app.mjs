import Fastify from "fastify";
import { registerAggregatorRoutes } from "./routes/aggregator-routes.mjs";

export function createApp({ config, streamAggregatorService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("aggregatorConfig", config);
  app.decorate("streamAggregatorService", streamAggregatorService);

  app.setErrorHandler((error, _request, reply) => {
    reply.status(error.statusCode ?? 500).send({
      error: "StreamsAggregatorError",
      message: error.message
    });
  });

  app.register(registerAggregatorRoutes);

  return app;
}

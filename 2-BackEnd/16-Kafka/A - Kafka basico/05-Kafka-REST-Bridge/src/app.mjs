import Fastify from "fastify";
import { registerBridgeRoutes } from "./routes/bridge-routes.mjs";

export function createApp({ config, bridgeService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("bridgeConfig", config);
  app.decorate("bridgeService", bridgeService);

  app.setErrorHandler((error, _request, reply) => {
    const statusCode = error.validation ? 400 : error.statusCode ?? 500;

    reply.status(statusCode).send({
      error: "BridgeError",
      message: error.message
    });
  });

  app.register(registerBridgeRoutes);

  return app;
}

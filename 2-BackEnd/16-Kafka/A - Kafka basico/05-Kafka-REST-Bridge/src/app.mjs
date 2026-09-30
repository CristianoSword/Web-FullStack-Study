import Fastify from "fastify";

export function createApp({ config, bridgeService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("bridgeConfig", config);
  app.decorate("bridgeService", bridgeService);

  app.setErrorHandler((error, _request, reply) => {
    reply.status(500).send({
      error: "BridgeError",
      message: error.message
    });
  });

  return app;
}

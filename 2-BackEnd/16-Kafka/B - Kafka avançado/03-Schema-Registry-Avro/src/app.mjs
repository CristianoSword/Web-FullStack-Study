import Fastify from "fastify";
import { registerRegistryRoutes } from "./routes/registry-routes.mjs";

export function createApp({ config, registryAvroService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("registryConfig", config);
  app.decorate("registryAvroService", registryAvroService);

  app.setErrorHandler((error, _request, reply) => {
    reply.status(error.statusCode ?? 500).send({
      error: "SchemaRegistryAvroError",
      message: error.message
    });
  });

  app.register(registerRegistryRoutes);

  return app;
}

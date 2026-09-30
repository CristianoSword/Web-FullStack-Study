import Fastify from "fastify";
import { registerOrderRoutes } from "./routes/order-routes.mjs";

export function createApp({ config, eventStoreService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("ordersConfig", config);
  app.decorate("eventStoreService", eventStoreService);

  app.setErrorHandler((error, _request, reply) => {
    reply.status(error.statusCode ?? 500).send({
      error: "OrdersServiceError",
      message: error.message
    });
  });

  app.register(registerOrderRoutes);

  return app;
}

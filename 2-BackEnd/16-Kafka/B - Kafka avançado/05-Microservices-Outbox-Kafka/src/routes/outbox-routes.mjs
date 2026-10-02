export async function registerOutboxRoutes(app, { orderOutboxService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "microservices-outbox-kafka"
  }));

  app.get("/status", async () => orderOutboxService.getStatus());

  app.post("/orders", async (request, reply) => {
    const result = orderOutboxService.createOrder(request.body);
    reply.code(result.ok ? 201 : 400);
    return result;
  });

  app.get("/orders", async () => ({
    orders: orderOutboxService.listOrders()
  }));

  app.get("/outbox", async () => ({
    events: orderOutboxService.listOutboxEvents()
  }));

  app.post("/outbox/publish", async () => orderOutboxService.publishPendingEvents());
}

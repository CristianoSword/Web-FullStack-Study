export async function registerPubSubRoutes(app, { pubSubFanoutService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-pubsub-fanout-exchange"
  }));

  app.get("/status", async () => pubSubFanoutService.getStatus());

  app.post("/events/publish", async (request) => pubSubFanoutService.publishEvent(request.body ?? {}));

  app.get("/events/published", async () => ({
    events: pubSubFanoutService.getPublishedEvents()
  }));

  app.get("/subscribers", async () => ({
    subscribers: pubSubFanoutService.getSubscriberReceipts()
  }));

  app.get("/subscribers/messages", async () => ({
    deliveries: pubSubFanoutService.getSubscriberMessages()
  }));
}

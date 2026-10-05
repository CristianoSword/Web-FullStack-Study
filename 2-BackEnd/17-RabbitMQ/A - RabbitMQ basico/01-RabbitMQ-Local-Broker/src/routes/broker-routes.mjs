export async function registerBrokerRoutes(app, { brokerService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-local-broker"
  }));

  app.get("/status", async () => brokerService.getStatus());

  app.post("/messages/publish", async (request) => brokerService.publishMessage(request.body ?? {}));

  app.post("/messages/dead-letter", async (request) => brokerService.routeToDeadLetter(request.body ?? {}));

  app.get("/messages/published", async () => ({
    messages: brokerService.getPublishedMessages()
  }));

  app.get("/messages/consumed", async () => ({
    messages: brokerService.getConsumedMessages()
  }));

  app.get("/messages/dlq", async () => ({
    messages: brokerService.getDeadLetterMessages()
  }));
}

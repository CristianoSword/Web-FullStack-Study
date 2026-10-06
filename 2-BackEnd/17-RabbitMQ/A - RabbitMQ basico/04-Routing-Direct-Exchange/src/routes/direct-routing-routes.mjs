export async function registerDirectRoutingRoutes(app, { directRoutingService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-routing-direct-exchange"
  }));

  app.get("/status", async () => directRoutingService.getStatus());

  app.post("/logs/publish", async (request) => directRoutingService.publishLog(request.body ?? {}));

  app.get("/logs/published", async () => ({
    logs: directRoutingService.getPublishedLogs()
  }));

  app.get("/routes", async () => ({
    routes: directRoutingService.getRoutingReceipts()
  }));

  app.get("/deliveries", async () => ({
    deliveries: directRoutingService.getRoutedDeliveries()
  }));
}

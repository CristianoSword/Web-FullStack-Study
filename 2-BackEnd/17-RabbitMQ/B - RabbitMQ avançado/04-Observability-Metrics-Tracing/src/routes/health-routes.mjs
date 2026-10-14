export const registerHealthRoutes = async (app, { observabilityService }) => {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-observability-metrics-tracing",
    counters: observabilityService.snapshot().counters
  }));
};

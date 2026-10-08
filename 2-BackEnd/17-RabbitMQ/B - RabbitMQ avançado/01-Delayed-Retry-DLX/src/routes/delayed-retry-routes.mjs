export async function registerDelayedRetryRoutes(app, { delayedRetryService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-delayed-retry-dlx"
  }));

  app.get("/status", async () => delayedRetryService.getStatus());

  app.post("/jobs/publish", async (request) => delayedRetryService.publishJob(request.body ?? {}));

  app.get("/jobs/published", async () => ({
    jobs: delayedRetryService.getPublishedJobs()
  }));

  app.get("/jobs/attempts", async () => ({
    attempts: delayedRetryService.getRetryAttempts()
  }));

  app.get("/jobs/processed", async () => ({
    jobs: delayedRetryService.getProcessedJobs()
  }));

  app.get("/jobs/dead-letter", async () => ({
    jobs: delayedRetryService.getDeadLetterJobs()
  }));
}

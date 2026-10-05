export async function registerWorkQueueRoutes(app, { workQueueService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-work-queue-processor"
  }));

  app.get("/status", async () => workQueueService.getStatus());

  app.post("/tasks/dispatch", async (request) => workQueueService.dispatchTask(request.body ?? {}));

  app.get("/tasks/dispatched", async () => ({
    tasks: workQueueService.getDispatchedTasks()
  }));

  app.get("/tasks/processed", async () => ({
    tasks: workQueueService.getProcessedTasks()
  }));

  app.get("/tasks/dlq", async () => ({
    tasks: workQueueService.getDeadLetterEntries()
  }));

  app.get("/workers", async () => ({
    workers: workQueueService.getWorkerMetrics()
  }));
}

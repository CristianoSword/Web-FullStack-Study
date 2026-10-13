export const registerHealthRoutes = async (app) => {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-priority-queue-scheduler"
  }));
};

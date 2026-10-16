export const registerHealthRoutes = async (app) => {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-cluster-ha-quorum-queues"
  }));
};

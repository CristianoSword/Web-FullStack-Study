export const registerClusterRoutes = async (app, { probeService, quorumQueueService }) => {
  app.get("/cluster", async () => probeService.snapshot());

  app.post("/cluster/messages", async (request, reply) => {
    const message = await quorumQueueService.publish(request.body ?? {});
    reply.code(202);
    return message;
  });

  app.get("/cluster/messages", async () => quorumQueueService.snapshot());
};

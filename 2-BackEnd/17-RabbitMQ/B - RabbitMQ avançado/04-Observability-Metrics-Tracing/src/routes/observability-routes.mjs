export const registerObservabilityRoutes = async (app, { observabilityService }) => {
  app.post("/messages/publish", async (request, reply) => {
    const result = await observabilityService.publish(request.body ?? {}, request.headers);
    reply.code(202);
    return result;
  });

  app.get("/metrics", async (_request, reply) => {
    reply.header("content-type", "text/plain; version=0.0.4");
    return observabilityService.renderPrometheusMetrics();
  });

  app.get("/traces", async () => observabilityService.snapshot());
};

const salesEventBodySchema = {
  type: "object",
  required: ["storeId", "amount"],
  properties: {
    eventId: { type: "string" },
    storeId: { type: "string" },
    amount: { type: "number" },
    occurredAt: { type: "string" }
  }
};

export async function registerAggregatorRoutes(app) {
  app.get("/health", async () => ({
    status: "ok",
    service: app.aggregatorConfig.serviceName
  }));

  app.get("/status", async () => app.streamAggregatorService.getStatus());

  app.post(
    "/sales-events",
    {
      schema: {
        body: salesEventBodySchema
      }
    },
    async (request, reply) => {
      const accepted = await app.streamAggregatorService.ingestSalesEvent(request.body);

      reply.status(202).send(accepted);
    }
  );

  app.get("/aggregates", async () => ({
    windowSizeMs: app.aggregatorConfig.windowSizeMs,
    aggregates: app.streamAggregatorService.listAggregates()
  }));

  app.get("/aggregates/:storeId", async (request) => ({
    storeId: request.params.storeId,
    aggregates: app.streamAggregatorService.listStoreAggregates(request.params.storeId)
  }));
}

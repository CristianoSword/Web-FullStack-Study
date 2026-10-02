export async function registerPipelineRoutes(app, { exactlyOnceService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "exactly-once-pipeline"
  }));

  app.get("/status", async () => exactlyOnceService.getStatus());

  app.get("/payments/ingested", async () => ({
    receipts: exactlyOnceService.listInputReceipts()
  }));

  app.post("/payments/ingest", async (request, reply) => {
    const result = await exactlyOnceService.ingestPayment(request.body);
    const statusCode = result.ok ? 202 : 400;
    reply.code(statusCode);
    return result;
  });

  app.post("/payments/process", async (request, reply) => {
    const result = await exactlyOnceService.processPayment(request.body);
    const statusCode = result.ok ? 200 : 400;
    reply.code(statusCode);
    return result;
  });

  app.get("/payments/processed", async () => ({
    records: exactlyOnceService.listProcessed()
  }));

  app.get("/payments/dlq", async () => ({
    records: exactlyOnceService.listDeadLetters()
  }));

  app.get("/payments/idempotency/:idempotencyKey", async (request, reply) => {
    const record = exactlyOnceService.getIdempotencyRecord(request.params.idempotencyKey);

    if (!record) {
      reply.code(404);
      return {
        message: "Idempotency key not found."
      };
    }

    return record;
  });
}

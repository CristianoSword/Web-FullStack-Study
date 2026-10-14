export const registerSagaRoutes = async (app, { orchestrator }) => {
  app.get("/sagas", async () => ({
    sagas: orchestrator.listSagas()
  }));

  app.get("/sagas/:sagaId", async (request, reply) => {
    const saga = orchestrator.getSaga(request.params.sagaId);
    if (!saga) {
      reply.code(404);
      return { error: "Saga not found" };
    }

    return saga;
  });

  app.post("/orders", async (request, reply) => {
    const saga = await orchestrator.createOrder(request.body ?? {});
    reply.code(202);
    return saga;
  });
};

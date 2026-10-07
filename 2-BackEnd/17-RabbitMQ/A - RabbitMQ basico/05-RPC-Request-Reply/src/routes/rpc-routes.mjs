export async function registerRpcRoutes(app, { rpcRequestReplyService }) {
  app.get("/health", async () => ({
    status: "ok",
    service: "rabbitmq-rpc-request-reply"
  }));

  app.get("/status", async () => rpcRequestReplyService.getStatus());

  app.post("/rpc/call", async (request) => rpcRequestReplyService.callRpc(request.body ?? {}));

  app.get("/rpc/calls", async () => ({
    calls: rpcRequestReplyService.getRpcCalls()
  }));

  app.get("/rpc/responses", async () => ({
    responses: rpcRequestReplyService.getRpcResponses()
  }));
}

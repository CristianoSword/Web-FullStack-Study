import Fastify from "fastify";

import { registerRpcRoutes } from "./routes/rpc-routes.mjs";

export function createApp({ config, rpcRequestReplyService }) {
  const app = Fastify({
    logger: false
  });

  app.decorate("projectConfig", config);

  app.get("/", async () => ({
    project: "RPC Request Reply",
    docs: [
      "POST /rpc/call",
      "GET /rpc/calls",
      "GET /rpc/responses",
      "GET /status"
    ]
  }));

  app.register(async (instance) => {
    await registerRpcRoutes(instance, { rpcRequestReplyService });
  });

  return app;
}

import { createApp } from "./app.mjs";
import { createRabbitConnection } from "./lib/create-connection.mjs";
import { loadConfig, loadTopology } from "./lib/load-config.mjs";
import { createRpcRequestReplyService } from "./services/rpc-request-reply-service.mjs";

const config = await loadConfig();
const topology = await loadTopology();

const connection = await createRabbitConnection(config);
const setupChannel = await connection.createChannel();

const rpcRequestReplyService = createRpcRequestReplyService({
  config,
  connection,
  setupChannel,
  topology
});

await rpcRequestReplyService.bootstrapQueues();
await rpcRequestReplyService.startRpcServer();
await rpcRequestReplyService.startReplyConsumer();

const app = createApp({
  config,
  rpcRequestReplyService
});

const shutdown = async () => {
  await rpcRequestReplyService.close().catch(() => {});
  await setupChannel.close().catch(() => {});
  await connection.close().catch(() => {});
  await app.close().catch(() => {});
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await app.listen({
  host: "0.0.0.0",
  port: config.httpPort
});

console.log(`RPC Request Reply API listening on http://localhost:${config.httpPort}`);

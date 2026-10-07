import { randomUUID } from "node:crypto";

function computeResult(operation, operands) {
  if (operation === "sum") {
    return operands.reduce((sum, value) => sum + value, 0);
  }

  if (operation === "multiply") {
    return operands.reduce((result, value) => result * value, 1);
  }

  throw new Error(`Unsupported operation: ${operation}`);
}

export function createRpcRequestReplyService({ config, connection, setupChannel, topology }) {
  const rpcCalls = [];
  const rpcResponses = [];
  const pendingResolvers = new Map();
  let workerChannel = null;
  let replyConsumerChannel = null;

  async function bootstrapQueues() {
    for (const queue of topology.queues) {
      await setupChannel.assertQueue(queue.name, {
        durable: queue.durable
      });
    }
  }

  async function startRpcServer() {
    workerChannel = await connection.createChannel();
    await workerChannel.assertQueue(config.requestQueue, { durable: true });
    await workerChannel.prefetch(1);

    await workerChannel.consume(
      config.requestQueue,
      async (message) => {
        if (!message) {
          return;
        }

        const request = JSON.parse(message.content.toString("utf8"));
        const correlationId = message.properties.correlationId;
        const replyTo = message.properties.replyTo;

        const response = {
          requestId: request.requestId,
          correlationId,
          result: computeResult(request.operation, request.operands),
          processedAt: new Date().toISOString()
        };

        workerChannel.sendToQueue(
          replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId,
            persistent: true,
            contentType: "application/json"
          }
        );

        workerChannel.ack(message);
      },
      {
        noAck: false,
        consumerTag: "rpc-server-worker"
      }
    );
  }

  async function startReplyConsumer() {
    replyConsumerChannel = await connection.createChannel();
    await replyConsumerChannel.assertQueue(config.replyQueue, { durable: true });

    await replyConsumerChannel.consume(
      config.replyQueue,
      (message) => {
        if (!message) {
          return;
        }

        const correlationId = message.properties.correlationId;
        const response = JSON.parse(message.content.toString("utf8"));
        const resolver = pendingResolvers.get(correlationId);

        rpcResponses.push(response);

        if (resolver) {
          resolver.resolve(response);
          pendingResolvers.delete(correlationId);
        }

        replyConsumerChannel.ack(message);
      },
      {
        noAck: false,
        consumerTag: "rpc-client-replies"
      }
    );
  }

  async function callRpc(input) {
    const request = {
      requestId: input.requestId ?? randomUUID(),
      operation: input.operation ?? "sum",
      operands: input.operands ?? [2, 3],
      createdAt: new Date().toISOString()
    };

    const correlationId = randomUUID();
    const call = {
      callId: randomUUID(),
      requestId: request.requestId,
      correlationId,
      status: "pending",
      timeoutMs: config.timeoutMs
    };

    rpcCalls.push(call);

    const responsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingResolvers.delete(correlationId);
        call.status = "timed_out";
        reject(new Error(`RPC call timed out after ${config.timeoutMs} ms.`));
      }, config.timeoutMs);

      pendingResolvers.set(correlationId, {
        resolve: (response) => {
          clearTimeout(timeout);
          call.status = "completed";
          resolve(response);
        }
      });
    });

    setupChannel.sendToQueue(
      config.requestQueue,
      Buffer.from(JSON.stringify(request)),
      {
        correlationId,
        replyTo: config.replyQueue,
        persistent: true,
        contentType: "application/json"
      }
    );

    const response = await responsePromise;

    return {
      ok: true,
      call,
      request,
      response
    };
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      requestQueue: config.requestQueue,
      replyQueue: config.replyQueue,
      timeoutMs: config.timeoutMs,
      metrics: {
        rpcCalls: rpcCalls.length,
        rpcResponses: rpcResponses.length,
        pending: rpcCalls.filter((call) => call.status === "pending").length
      }
    };
  }

  async function close() {
    if (workerChannel) {
      await workerChannel.close().catch(() => {});
    }

    if (replyConsumerChannel) {
      await replyConsumerChannel.close().catch(() => {});
    }
  }

  return {
    bootstrapQueues,
    startRpcServer,
    startReplyConsumer,
    callRpc,
    getStatus,
    getRpcCalls: () => rpcCalls,
    getRpcResponses: () => rpcResponses,
    close
  };
}

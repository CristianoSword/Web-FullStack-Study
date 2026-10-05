import { randomUUID } from "node:crypto";

function createWorkerMetric(workerId) {
  return {
    workerId,
    acked: 0,
    failed: 0,
    lastTaskAt: null,
    status: "idle"
  };
}

export function createWorkQueueService({ config, connection, setupChannel, topology }) {
  const dispatchedTasks = [];
  const processedTasks = [];
  const deadLetterEntries = [];
  const workerMetrics = Array.from({ length: config.workerCount }, (_, index) =>
    createWorkerMetric(`worker-${index + 1}`)
  );
  const workerChannels = [];
  let deadLetterChannel = null;

  async function bootstrapTopology() {
    for (const exchange of topology.exchanges) {
      if (!exchange.name) {
        continue;
      }

      await setupChannel.assertExchange(exchange.name, exchange.type, {
        durable: exchange.durable
      });
    }

    for (const queue of topology.queues) {
      await setupChannel.assertQueue(queue.name, {
        durable: queue.durable,
        arguments: queue.arguments
      });
    }

    for (const binding of topology.bindings) {
      await setupChannel.bindQueue(
        binding.destination,
        binding.source,
        binding.routingKey
      );
    }
  }

  async function dispatchTask(input) {
    const task = {
      taskId: input.taskId ?? randomUUID(),
      jobType: input.jobType ?? "thumbnail-generation",
      payload: input.payload ?? {
        source: "api",
        itemCount: 10
      },
      createdAt: new Date().toISOString(),
      attempt: input.attempt ?? 1
    };

    setupChannel.sendToQueue(
      config.queue,
      Buffer.from(JSON.stringify(task)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: task.taskId,
        type: task.jobType
      }
    );

    dispatchedTasks.push(task);

    return {
      ok: true,
      task
    };
  }

  async function startWorkers() {
    for (const metric of workerMetrics) {
      const channel = await connection.createChannel();
      workerChannels.push(channel);

      await channel.prefetch(config.prefetch);
      await channel.assertQueue(config.queue, { durable: true });

      await channel.consume(
        config.queue,
        async (message) => {
          if (!message) {
            return;
          }

          const task = JSON.parse(message.content.toString("utf8"));
          metric.status = "running";
          metric.lastTaskAt = new Date().toISOString();

          if (task.payload?.forceFail === true) {
            metric.failed += 1;
            channel.nack(message, false, false);
            metric.status = "idle";
            return;
          }

          processedTasks.push({
            workerId: metric.workerId,
            taskId: task.taskId,
            jobType: task.jobType,
            processedAt: new Date().toISOString(),
            payload: task.payload
          });

          metric.acked += 1;
          channel.ack(message);
          metric.status = "idle";
        },
        {
          noAck: false,
          consumerTag: metric.workerId
        }
      );
    }
  }

  async function startDeadLetterConsumer() {
    deadLetterChannel = await connection.createChannel();
    await deadLetterChannel.assertQueue(config.deadLetterQueue, { durable: true });
    await deadLetterChannel.consume(
      config.deadLetterQueue,
      (message) => {
        if (!message) {
          return;
        }

        const task = JSON.parse(message.content.toString("utf8"));
        deadLetterEntries.push({
          taskId: task.taskId,
          reason: "worker_failure",
          failedAt: new Date().toISOString(),
          payload: task.payload
        });
        deadLetterChannel.ack(message);
      },
      {
        noAck: false,
        consumerTag: "dead-letter-observer"
      }
    );
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      queue: config.queue,
      deadLetterQueue: config.deadLetterQueue,
      workerCount: config.workerCount,
      prefetch: config.prefetch,
      metrics: {
        dispatched: dispatchedTasks.length,
        processed: processedTasks.length,
        deadLettered: deadLetterEntries.length
      }
    };
  }

  async function close() {
    for (const channel of workerChannels) {
      await channel.close().catch(() => {});
    }

    if (deadLetterChannel) {
      await deadLetterChannel.close().catch(() => {});
    }
  }

  return {
    bootstrapTopology,
    dispatchTask,
    startWorkers,
    startDeadLetterConsumer,
    getStatus,
    getWorkerMetrics: () => workerMetrics,
    getDispatchedTasks: () => dispatchedTasks,
    getProcessedTasks: () => processedTasks,
    getDeadLetterEntries: () => deadLetterEntries,
    close
  };
}

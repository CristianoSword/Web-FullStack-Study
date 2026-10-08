import { randomUUID } from "node:crypto";

export function createDelayedRetryService({ config, connection, setupChannel, topology }) {
  const publishedJobs = [];
  const retryAttempts = [];
  const processedJobs = [];
  const deadLetterJobs = [];
  let workerChannel = null;
  let deadLetterChannel = null;

  async function bootstrapTopology() {
    for (const exchange of topology.exchanges) {
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
        binding.queue,
        binding.exchange,
        binding.routingKey
      );
    }
  }

  async function publishJob(input) {
    const job = {
      jobId: input.jobId ?? randomUUID(),
      jobType: input.jobType ?? "invoice-sync",
      payload: input.payload ?? {
        customerId: "customer-1001",
        forceFail: false
      },
      attempt: input.attempt ?? 1,
      createdAt: new Date().toISOString()
    };

    setupChannel.publish(
      config.mainExchange,
      config.mainRoutingKey,
      Buffer.from(JSON.stringify(job)),
      {
        persistent: true,
        contentType: "application/json",
        messageId: job.jobId,
        headers: {
          attempt: job.attempt
        }
      }
    );

    publishedJobs.push(job);
    retryAttempts.push({
      jobId: job.jobId,
      attempt: job.attempt,
      status: "scheduled",
      recordedAt: new Date().toISOString()
    });

    return {
      ok: true,
      job
    };
  }

  async function startWorker() {
    workerChannel = await connection.createChannel();
    await workerChannel.assertQueue(config.mainQueue, { durable: true });
    await workerChannel.prefetch(1);

    await workerChannel.consume(
      config.mainQueue,
      async (message) => {
        if (!message) {
          return;
        }

        const job = JSON.parse(message.content.toString("utf8"));
        const currentAttempt = Number(message.properties.headers?.attempt ?? job.attempt ?? 1);

        if (job.payload?.forceFail === true && currentAttempt < config.maxAttempts) {
          const retryJob = {
            ...job,
            attempt: currentAttempt + 1
          };

          workerChannel.publish(
            config.retryExchange,
            config.retryRoutingKey,
            Buffer.from(JSON.stringify(retryJob)),
            {
              persistent: true,
              contentType: "application/json",
              messageId: retryJob.jobId,
              headers: {
                attempt: retryJob.attempt
              }
            }
          );

          retryAttempts.push({
            jobId: retryJob.jobId,
            attempt: retryJob.attempt,
            status: "retrying",
            recordedAt: new Date().toISOString()
          });

          workerChannel.ack(message);
          return;
        }

        if (job.payload?.forceFail === true && currentAttempt >= config.maxAttempts) {
          const deadLetter = {
            jobId: job.jobId,
            attempt: currentAttempt,
            reason: "max_attempts_reached",
            failedAt: new Date().toISOString(),
            payload: job.payload
          };

          workerChannel.publish(
            config.errorExchange,
            config.errorRoutingKey,
            Buffer.from(JSON.stringify(deadLetter)),
            {
              persistent: true,
              contentType: "application/json",
              messageId: deadLetter.jobId,
              headers: {
                attempt: currentAttempt
              }
            }
          );

          retryAttempts.push({
            jobId: job.jobId,
            attempt: currentAttempt,
            status: "dead_lettered",
            recordedAt: new Date().toISOString()
          });

          workerChannel.ack(message);
          return;
        }

        processedJobs.push({
          jobId: job.jobId,
          jobType: job.jobType,
          attempt: currentAttempt,
          processedAt: new Date().toISOString(),
          payload: job.payload
        });

        retryAttempts.push({
          jobId: job.jobId,
          attempt: currentAttempt,
          status: "processed",
          recordedAt: new Date().toISOString()
        });

        workerChannel.ack(message);
      },
      {
        noAck: false,
        consumerTag: "retry-worker"
      }
    );
  }

  async function startDeadLetterConsumer() {
    deadLetterChannel = await connection.createChannel();
    await deadLetterChannel.assertQueue(config.errorQueue, { durable: true });

    await deadLetterChannel.consume(
      config.errorQueue,
      (message) => {
        if (!message) {
          return;
        }

        const deadLetter = JSON.parse(message.content.toString("utf8"));
        deadLetterJobs.push(deadLetter);
        deadLetterChannel.ack(message);
      },
      {
        noAck: false,
        consumerTag: "retry-error-consumer"
      }
    );
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      mainQueue: config.mainQueue,
      retryQueue: config.retryQueue,
      errorQueue: config.errorQueue,
      retryDelayMs: config.retryDelayMs,
      maxAttempts: config.maxAttempts,
      metrics: {
        publishedJobs: publishedJobs.length,
        processedJobs: processedJobs.length,
        retryEvents: retryAttempts.filter((attempt) => attempt.status === "retrying").length,
        deadLetters: deadLetterJobs.length
      }
    };
  }

  async function close() {
    if (workerChannel) {
      await workerChannel.close().catch(() => {});
    }

    if (deadLetterChannel) {
      await deadLetterChannel.close().catch(() => {});
    }
  }

  return {
    bootstrapTopology,
    publishJob,
    startWorker,
    startDeadLetterConsumer,
    getStatus,
    getPublishedJobs: () => publishedJobs,
    getRetryAttempts: () => retryAttempts,
    getProcessedJobs: () => processedJobs,
    getDeadLetterJobs: () => deadLetterJobs,
    close
  };
}

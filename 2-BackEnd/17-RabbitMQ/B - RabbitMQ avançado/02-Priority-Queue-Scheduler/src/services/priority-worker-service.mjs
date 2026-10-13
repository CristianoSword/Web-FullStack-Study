import { runtimeConfig } from "../../config/runtime-config.mjs";
import { priorityTopology } from "../../topology/priority-topology.mjs";
import { getRabbitResources, publishAuditEvent } from "../lib/rabbitmq-connection.mjs";

const wait = (durationMs) => new Promise((resolve) => setTimeout(resolve, durationMs));

export class PriorityWorkerService {
  constructor({ schedulerService }) {
    this.schedulerService = schedulerService;
    this.consumerTag = null;
  }

  async start() {
    const { channel } = await getRabbitResources();
    await channel.prefetch(runtimeConfig.scheduler.workerPrefetch);

    const consumer = await channel.consume(
      priorityTopology.queues.priority,
      async (message) => {
        if (!message) {
          return;
        }

        const job = JSON.parse(message.content.toString("utf8"));

        try {
          await wait(Math.min(job.metadata.concurrencyWeight * 125, 750));
          this.schedulerService.markCompleted(job);
          await publishAuditEvent({
            type: "job.completed",
            jobId: job.metadata.jobId,
            priority: job.metadata.priority
          });
          channel.ack(message);
        } catch (error) {
          this.schedulerService.markRejected(job.metadata, error.message);
          await publishAuditEvent({
            type: "job.rejected",
            jobId: job.metadata.jobId,
            reason: error.message
          });
          channel.nack(message, false, false);
        }
      }
    );

    this.consumerTag = consumer.consumerTag;
  }
}

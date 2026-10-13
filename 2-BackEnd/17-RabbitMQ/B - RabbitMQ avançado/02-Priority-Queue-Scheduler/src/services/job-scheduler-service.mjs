import { runtimeConfig } from "../../config/runtime-config.mjs";
import { createJobEnvelope, isDispatchable, normalizeJobRequest } from "../../models/job-definition.mjs";
import { createWorkerLoadPolicy } from "../../models/worker-load-policy.mjs";
import { priorityTopology } from "../../topology/priority-topology.mjs";
import { fetchQueuePressure, getRabbitResources, publishAuditEvent } from "../lib/rabbitmq-connection.mjs";
import { SchedulerStore } from "./scheduler-store.mjs";

export class JobSchedulerService {
  constructor() {
    this.store = new SchedulerStore(runtimeConfig.scheduler);
  }

  schedule(rawPayload) {
    const job = normalizeJobRequest(rawPayload);
    this.store.enqueue(job);
    return job;
  }

  async dispatchDueJobs() {
    const queueMetrics = await fetchQueuePressure();
    const queuePressure = this.store.snapshot(queueMetrics).queuePressure;
    const policy = createWorkerLoadPolicy({
      prefetch: runtimeConfig.scheduler.workerPrefetch,
      highWatermark: runtimeConfig.scheduler.highWatermark,
      queuePressure
    });

    if (policy.shouldPauseDispatch) {
      return {
        dispatched: [],
        policy,
        queuePressure
      };
    }

    const candidates = this.store.pullDispatchable(new Date(), policy.nextPrefetch);
    const dispatchableJobs = candidates.filter((job) => isDispatchable(job));
    const { channel } = await getRabbitResources();

    for (const job of dispatchableJobs) {
      channel.publish(
        priorityTopology.exchanges.scheduler,
        priorityTopology.routingKeys.dispatch,
        Buffer.from(JSON.stringify(createJobEnvelope(job))),
        {
          persistent: true,
          contentType: "application/json",
          priority: job.priority
        }
      );

      this.store.markDispatched(job);
      await publishAuditEvent({
        type: "job.dispatched",
        jobId: job.jobId,
        priority: job.priority,
        scheduledFor: job.scheduledFor
      });
    }

    return {
      dispatched: dispatchableJobs,
      policy,
      queuePressure
    };
  }

  markCompleted(job) {
    this.store.markCompleted(job);
  }

  markRejected(job, reason) {
    this.store.markRejected(job, reason);
  }

  async snapshot() {
    const queueMetrics = await fetchQueuePressure();
    return this.store.snapshot(queueMetrics);
  }
}

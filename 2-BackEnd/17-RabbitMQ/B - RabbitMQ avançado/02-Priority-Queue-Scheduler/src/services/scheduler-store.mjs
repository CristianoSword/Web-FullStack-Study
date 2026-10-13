import {
  createQueuePressureSnapshot,
  createSchedulerState,
  summarizePendingJobs
} from "../../models/scheduler-state.mjs";

export class SchedulerStore {
  constructor(config) {
    this.config = config;
    this.state = createSchedulerState();
  }

  enqueue(job) {
    this.state.pending.push(job);
    this.state.pending.sort((left, right) => {
      if (left.priority !== right.priority) {
        return right.priority - left.priority;
      }

      return new Date(left.scheduledFor).getTime() - new Date(right.scheduledFor).getTime();
    });

    this.state.telemetry.totalScheduled += 1;
    return job;
  }

  pullDispatchable(now, limit) {
    const dispatchable = [];
    const pending = [];

    for (const job of this.state.pending) {
      if (dispatchable.length < limit && new Date(job.scheduledFor) <= now) {
        dispatchable.push(job);
      } else {
        pending.push(job);
      }
    }

    this.state.pending = pending;
    return dispatchable;
  }

  markDispatched(job) {
    this.state.dispatched.unshift({
      jobId: job.jobId,
      priority: job.priority,
      scheduledFor: job.scheduledFor,
      dispatchedAt: new Date().toISOString()
    });
    this.state.telemetry.lastDispatchAt = new Date().toISOString();
    this.state.telemetry.totalDispatched += 1;
  }

  markCompleted(job) {
    this.state.completed.unshift({
      jobId: job.metadata.jobId,
      handler: job.metadata.handler,
      priority: job.metadata.priority,
      completedAt: new Date().toISOString()
    });
    this.state.telemetry.totalCompleted += 1;
  }

  markRejected(job, reason) {
    this.state.rejected.unshift({
      jobId: job.jobId,
      priority: job.priority,
      reason,
      rejectedAt: new Date().toISOString()
    });
    this.state.telemetry.totalRejected += 1;
  }

  snapshot(queueMetrics) {
    return {
      pending: summarizePendingJobs(this.state.pending),
      dispatched: this.state.dispatched.slice(0, 20),
      completed: this.state.completed.slice(0, 20),
      rejected: this.state.rejected.slice(0, 20),
      telemetry: this.state.telemetry,
      queuePressure: createQueuePressureSnapshot({
        ...queueMetrics,
        highWatermark: this.config.highWatermark,
        prefetch: this.config.workerPrefetch
      })
    };
  }
}

export const createSchedulerState = () => ({
  pending: [],
  dispatched: [],
  completed: [],
  rejected: [],
  telemetry: {
    lastDispatchAt: null,
    totalScheduled: 0,
    totalDispatched: 0,
    totalCompleted: 0,
    totalRejected: 0
  }
});

export const createQueuePressureSnapshot = ({
  queuedMessages = 0,
  inFlight = 0,
  highWatermark = 25,
  prefetch = 4
} = {}) => ({
  queuedMessages,
  inFlight,
  highWatermark,
  prefetch,
  overloaded: queuedMessages + inFlight >= highWatermark
});

export const summarizePendingJobs = (jobs) =>
  jobs.map((job) => ({
    jobId: job.jobId,
    name: job.name,
    priority: job.priority,
    scheduledFor: job.scheduledFor,
    tenant: job.tenant
  }));

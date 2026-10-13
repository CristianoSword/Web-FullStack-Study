import crypto from "node:crypto";

const allowedPriorities = [1, 3, 5, 8, 10];

const asIsoDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("scheduledFor must be a valid date");
  }

  return date.toISOString();
};

export const normalizeJobRequest = (payload = {}) => {
  if (!payload.name || typeof payload.name !== "string") {
    throw new Error("name is required");
  }

  if (!payload.handler || typeof payload.handler !== "string") {
    throw new Error("handler is required");
  }

  const priority = Number.parseInt(payload.priority ?? "5", 10);
  if (!allowedPriorities.includes(priority)) {
    throw new Error(`priority must be one of ${allowedPriorities.join(", ")}`);
  }

  const concurrencyWeight = Number.parseInt(payload.concurrencyWeight ?? "1", 10);
  if (!Number.isInteger(concurrencyWeight) || concurrencyWeight < 1 || concurrencyWeight > 5) {
    throw new Error("concurrencyWeight must be between 1 and 5");
  }

  return {
    jobId: payload.jobId ?? crypto.randomUUID(),
    name: payload.name.trim(),
    handler: payload.handler.trim(),
    priority,
    concurrencyWeight,
    scheduledFor: asIsoDate(payload.scheduledFor ?? new Date().toISOString()),
    tenant: String(payload.tenant ?? "default"),
    payload: payload.payload ?? {},
    maxRuntimeMs: Number.parseInt(payload.maxRuntimeMs ?? "30000", 10),
    retryBudget: Number.parseInt(payload.retryBudget ?? "3", 10),
    createdAt: new Date().toISOString()
  };
};

export const createJobEnvelope = (job) => ({
  metadata: {
    jobId: job.jobId,
    handler: job.handler,
    scheduledFor: job.scheduledFor,
    priority: job.priority,
    tenant: job.tenant,
    retryBudget: job.retryBudget,
    concurrencyWeight: job.concurrencyWeight
  },
  payload: job.payload
});

export const isDispatchable = (job, now = new Date()) => new Date(job.scheduledFor) <= now;

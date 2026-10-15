import crypto from "node:crypto";

export const normalizeClusterMessage = (payload = {}) => {
  if (!payload.eventName || typeof payload.eventName !== "string") {
    throw new Error("eventName is required");
  }

  return {
    messageId: payload.messageId ?? crypto.randomUUID(),
    eventName: payload.eventName.trim(),
    queue: String(payload.queue ?? "cluster.orders.quorum"),
    payload: payload.payload ?? {},
    publishedAt: new Date().toISOString()
  };
};

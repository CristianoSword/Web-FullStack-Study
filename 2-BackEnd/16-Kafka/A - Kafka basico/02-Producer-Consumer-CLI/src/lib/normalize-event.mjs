import crypto from "node:crypto";

export function normalizeEvent(input) {
  return {
    eventId: input.eventId || crypto.randomUUID(),
    eventType: input.eventType || "cli.event",
    source: input.source || "cli-producer",
    payload: input.payload || {},
    createdAt: input.createdAt || new Date().toISOString()
  };
}

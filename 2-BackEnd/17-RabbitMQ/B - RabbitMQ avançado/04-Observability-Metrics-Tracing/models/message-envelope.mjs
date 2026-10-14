export const normalizePublishRequest = (payload = {}) => {
  if (!payload.eventName || typeof payload.eventName !== "string") {
    throw new Error("eventName is required");
  }

  return {
    eventName: payload.eventName.trim(),
    payload: payload.payload ?? {},
    queue: String(payload.queue ?? "observability.jobs"),
    service: String(payload.service ?? "api"),
    processingDelayMs: Number.parseInt(payload.processingDelayMs ?? "250", 10)
  };
};

export const createMessageEnvelope = ({ message, traceContext }) => ({
  metadata: {
    eventName: message.eventName,
    queue: message.queue,
    service: message.service,
    processingDelayMs: message.processingDelayMs,
    publishedAt: new Date().toISOString(),
    traceId: traceContext.traceId,
    spanId: traceContext.spanId,
    parentSpanId: traceContext.parentSpanId
  },
  payload: message.payload
});

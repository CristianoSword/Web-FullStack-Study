import crypto from "node:crypto";

export const createTraceContext = (headers = {}) => ({
  traceId: headers["x-trace-id"] ?? crypto.randomUUID(),
  spanId: crypto.randomUUID(),
  parentSpanId: headers["x-span-id"] ?? null,
  createdAt: new Date().toISOString()
});

export const formatTraceHeaders = (traceContext) => ({
  "x-trace-id": traceContext.traceId,
  "x-span-id": traceContext.spanId,
  "x-parent-span-id": traceContext.parentSpanId ?? ""
});

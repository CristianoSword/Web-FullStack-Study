export function validatePaymentPayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return ["Payload must be an object."];
  }

  for (const field of ["messageId", "idempotencyKey", "paymentId", "occurredAt"]) {
    if (typeof payload[field] !== "string" || payload[field].trim().length === 0) {
      errors.push(`${field} is required and must be a non-empty string.`);
    }
  }

  if (typeof payload.amount !== "number" || Number.isNaN(payload.amount) || payload.amount <= 0) {
    errors.push("amount must be a positive number.");
  }

  if (payload.currency && typeof payload.currency !== "string") {
    errors.push("currency must be a string when provided.");
  }

  if (payload.metadata && typeof payload.metadata !== "object") {
    errors.push("metadata must be an object when provided.");
  }

  return errors;
}

export function normalizePaymentPayload(payload) {
  return {
    messageId: payload.messageId.trim(),
    idempotencyKey: payload.idempotencyKey.trim(),
    paymentId: payload.paymentId.trim(),
    amount: Number(payload.amount),
    currency: (payload.currency ?? "BRL").trim(),
    occurredAt: payload.occurredAt.trim(),
    metadata: payload.metadata ?? {}
  };
}

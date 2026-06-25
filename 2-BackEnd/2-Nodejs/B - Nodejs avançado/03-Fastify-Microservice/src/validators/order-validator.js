function validateOrderPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object.");
  }

  if (!String(payload.customer || "").trim()) {
    throw new Error("Customer is required.");
  }

  const total = Number(payload.total);

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("Total must be greater than zero.");
  }

  return {
    customer: String(payload.customer).trim(),
    total,
  };
}

module.exports = {
  validateOrderPayload,
};

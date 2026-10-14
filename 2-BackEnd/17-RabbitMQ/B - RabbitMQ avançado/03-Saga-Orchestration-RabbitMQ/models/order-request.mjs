import crypto from "node:crypto";

export const normalizeOrderRequest = (payload = {}) => {
  if (!payload.customerId || typeof payload.customerId !== "string") {
    throw new Error("customerId is required");
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error("items must be a non-empty array");
  }

  const items = payload.items.map((item) => {
    const sku = String(item.sku ?? "").trim();
    const quantity = Number.parseInt(item.quantity ?? "0", 10);
    const price = Number(item.price ?? 0);

    if (!sku) {
      throw new Error("each item requires a sku");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("each item quantity must be a positive integer");
    }

    if (!Number.isFinite(price) || price < 0) {
      throw new Error("each item price must be a positive number");
    }

    return { sku, quantity, price };
  });

  const paymentShouldFail = Boolean(payload.flags?.paymentShouldFail);
  const shippingShouldFail = Boolean(payload.flags?.shippingShouldFail);

  return {
    sagaId: payload.sagaId ?? crypto.randomUUID(),
    customerId: payload.customerId.trim(),
    items,
    currency: String(payload.currency ?? "USD"),
    totalAmount: items.reduce((total, item) => total + item.quantity * item.price, 0),
    flags: {
      paymentShouldFail,
      shippingShouldFail
    },
    createdAt: new Date().toISOString()
  };
};

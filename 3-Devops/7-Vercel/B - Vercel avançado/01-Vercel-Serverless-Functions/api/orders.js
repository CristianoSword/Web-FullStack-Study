import { catalog } from "../lib/catalog.js";
import { createOrderSummary, validateOrderPayload } from "../lib/orders.js";
import { badRequest, json } from "../lib/response.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return badRequest(response, "Only POST is supported for /api/orders.");
  }

  const payload = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  const validation = validateOrderPayload(payload, catalog, Number(process.env.ORDER_LIMIT || 5));

  if (!validation.valid) {
    return badRequest(response, validation.error);
  }

  const order = createOrderSummary(payload, catalog, process.env.DEFAULT_CURRENCY || "USD");
  return json(response, 201, order);
}

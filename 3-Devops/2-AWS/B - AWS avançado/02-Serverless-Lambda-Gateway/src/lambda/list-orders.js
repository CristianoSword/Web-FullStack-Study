import { OrderHandlerService } from "../services/order-handler.service.js";

export async function handler(event) {
  const service = new OrderHandlerService({ tableName: process.env.ORDERS_TABLE ?? "study-orders" });
  return service.buildListResponse(event);
}

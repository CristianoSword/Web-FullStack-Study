function transitionStatus(currentStatus, eventType) {
  if (eventType === "OrderCreated") {
    return "CREATED";
  }

  if (eventType === "OrderPaid") {
    return "PAID";
  }

  if (eventType === "OrderCancelled") {
    return "CANCELLED";
  }

  if (eventType === "OrderShipped") {
    return "SHIPPED";
  }

  return currentStatus;
}

export function applyOrderEvent(currentProjection, event) {
  const baseProjection = currentProjection ?? {
    orderId: event.orderId,
    status: "CREATED",
    version: 0,
    history: []
  };

  return {
    orderId: event.orderId,
    status: transitionStatus(baseProjection.status, event.eventType),
    version: event.version,
    totalAmount: event.payload.totalAmount ?? baseProjection.totalAmount ?? null,
    customerId: event.payload.customerId ?? baseProjection.customerId ?? null,
    history: [
      ...baseProjection.history,
      {
        eventType: event.eventType,
        occurredAt: event.occurredAt,
        version: event.version
      }
    ]
  };
}

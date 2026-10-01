export function getWindowBounds(occurredAt, windowSizeMs) {
  const timestamp = new Date(occurredAt).getTime();
  const windowStartMs = Math.floor(timestamp / windowSizeMs) * windowSizeMs;
  const windowEndMs = windowStartMs + windowSizeMs;

  return {
    windowStartMs,
    windowEndMs,
    windowStart: new Date(windowStartMs).toISOString(),
    windowEnd: new Date(windowEndMs).toISOString()
  };
}

export function buildAggregateKey(storeId, windowStartMs) {
  return `${storeId}:${windowStartMs}`;
}

export function applySalesEventToAggregate(currentAggregate, salesEvent, config) {
  const windowBounds = getWindowBounds(salesEvent.occurredAt, config.windowSizeMs);
  const aggregate =
    currentAggregate ?? {
      storeId: salesEvent.storeId,
      windowStart: windowBounds.windowStart,
      windowEnd: windowBounds.windowEnd,
      eventCount: 0,
      totalAmount: 0,
      averageAmount: 0,
      lastEventId: null
    };

  const eventCount = aggregate.eventCount + 1;
  const totalAmount = Number((aggregate.totalAmount + salesEvent.amount).toFixed(2));

  return {
    storeId: salesEvent.storeId,
    windowStart: aggregate.windowStart,
    windowEnd: aggregate.windowEnd,
    eventCount,
    totalAmount,
    averageAmount: Number((totalAmount / eventCount).toFixed(2)),
    lastEventId: salesEvent.eventId
  };
}

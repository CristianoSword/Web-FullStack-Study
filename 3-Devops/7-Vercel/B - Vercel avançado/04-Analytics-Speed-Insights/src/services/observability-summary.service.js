export function summarizeObservabilityPlan(eventMap, performanceThresholds) {
  return {
    eventCount: eventMap.events.length,
    thresholdCount: performanceThresholds.thresholds.length
  };
}

export function buildObservabilityPlan(eventMap, performanceThresholds) {
  return {
    events: eventMap.events,
    thresholds: performanceThresholds.thresholds
  };
}

export function createHpaChecks() {
  return [
    "rollout-ready",
    "metrics-available",
    "load-job-ran",
    "hpa-scaled-up",
    "hpa-scaled-down"
  ];
}

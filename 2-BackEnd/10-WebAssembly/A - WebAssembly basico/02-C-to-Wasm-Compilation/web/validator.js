export function validateMetricJob(job) {
  if (!Array.isArray(job.values) || job.values.length === 0) {
    return "values must be a non-empty array";
  }

  if (!Array.isArray(job.weights) || job.weights.length !== job.values.length) {
    return "weights must match the values array";
  }

  if (!job.clamp || typeof job.clamp.value !== "number") {
    return "clamp settings are required";
  }

  return null;
}

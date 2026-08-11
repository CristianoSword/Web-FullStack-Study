export function validateArithmeticJob(job) {
  if (!Array.isArray(job.left) || !Array.isArray(job.right) || job.left.length !== job.right.length) {
    return "left and right vectors must have the same size";
  }

  if (!Array.isArray(job.matrix) || job.matrix.length === 0 || job.matrix.some((row) => row.length !== job.matrix.length)) {
    return "matrix must be square";
  }

  if (!job.score || typeof job.score.value !== "number") {
    return "score settings are required";
  }

  return null;
}

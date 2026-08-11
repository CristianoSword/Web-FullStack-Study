import { exportedFunctions } from "./module_exports.js";

export function validateJob(job) {
  const definition = exportedFunctions[job.exportName];

  if (!definition) {
    return "unknown export";
  }

  if (!Array.isArray(job.args) || job.args.length !== definition.arity) {
    return "invalid arity";
  }

  if (!job.args.every((value) => Number.isInteger(value))) {
    return "all arguments must be integers";
  }

  return null;
}

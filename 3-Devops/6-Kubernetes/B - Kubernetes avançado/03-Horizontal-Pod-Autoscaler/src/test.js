import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AutoscalingSpec } from "./models/autoscaling-spec.model.js";
import { LoadTestPlan } from "./models/load-test-plan.model.js";
import { buildAutoscalingPlan } from "./services/autoscaling-plan.service.js";
import { summarizeAutoscaling } from "./services/autoscaling-summary.service.js";
import { createHpaChecks } from "./services/hpa-checks.service.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const autoscalingSpec = AutoscalingSpec.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/autoscaling-spec.json"), "utf8"))
);
const loadTestPlan = LoadTestPlan.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/load-test-plan.json"), "utf8"))
);

const plan = buildAutoscalingPlan(autoscalingSpec, loadTestPlan);
const summary = summarizeAutoscaling(autoscalingSpec, loadTestPlan);
const checks = createHpaChecks();

assert.equal(summary.namespace, "study-hpa");
assert.equal(summary.targetCpu, "65%");
assert.equal(plan.scaleRange.minReplicas, 2);
assert.equal(plan.scaleRange.maxReplicas, 6);
assert.equal(plan.scaleDown.stabilizationWindowSeconds, 120);
assert.equal(plan.loadTest.requestPath, "/work?ms=120");
assert.deepEqual(checks, [
  "rollout-ready",
  "metrics-available",
  "load-job-ran",
  "hpa-scaled-up",
  "hpa-scaled-down"
]);

console.log("Horizontal Pod Autoscaler lab tests passed.");

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RolloutSpec } from "./models/rollout-spec.model.js";
import { ReleaseStep } from "./models/release-step.model.js";
import { buildRolloutPlan } from "./services/rollout-plan.service.js";
import { summarizeRelease } from "./services/release-summary.service.js";
import { createSmokeChecks } from "./services/smoke-check.service.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(currentDirectory, "..");

const rolloutSpec = RolloutSpec.from(
  JSON.parse(await readFile(path.join(rootDirectory, "config/rollout-spec.json"), "utf8"))
);
const releasePlan = JSON.parse(
  await readFile(path.join(rootDirectory, "config/release-plan.json"), "utf8")
);
const releaseSteps = releasePlan.stages.map((stage) => ReleaseStep.from(stage));

const summary = summarizeRelease(rolloutSpec, releaseSteps);
const plan = buildRolloutPlan(rolloutSpec, releaseSteps);
const smokeChecks = createSmokeChecks(rolloutSpec);

assert.equal(summary.deploymentName, "catalog-api");
assert.equal(summary.namespace, "study-rolling");
assert.equal(plan.strategy.type, "RollingUpdate");
assert.equal(plan.strategy.maxUnavailable, 0);
assert.equal(plan.stages.length, 3);
assert.equal(plan.probeMatrix.readinessPath, "/readyz");
assert.deepEqual(smokeChecks, [
  "rollout-status",
  "rollout-history",
  "service-endpoints",
  "deployment-describe",
  "rollback-ready"
]);

console.log("Rolling updates lab tests passed.");

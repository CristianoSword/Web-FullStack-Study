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

const rolloutSpecData = JSON.parse(
  await readFile(path.join(rootDirectory, "config/rollout-spec.json"), "utf8")
);
const releasePlanData = JSON.parse(
  await readFile(path.join(rootDirectory, "config/release-plan.json"), "utf8")
);

const rolloutSpec = RolloutSpec.from(rolloutSpecData);
const releaseSteps = releasePlanData.stages.map((stage) => ReleaseStep.from(stage));
const plan = buildRolloutPlan(rolloutSpec, releaseSteps);
const summary = summarizeRelease(rolloutSpec, releaseSteps);
const smokeChecks = createSmokeChecks(rolloutSpec);

console.log(JSON.stringify({ summary, plan, smokeChecks }, null, 2));

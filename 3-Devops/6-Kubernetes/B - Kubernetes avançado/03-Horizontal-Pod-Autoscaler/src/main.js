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

console.log(JSON.stringify({ summary, plan, checks }, null, 2));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ManifestSummaryService } from "./services/manifest-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";
import { WorkloadPlanService } from "./services/workload-plan.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const workload = JSON.parse(fs.readFileSync(path.resolve(root, "config/workload-spec.json"), "utf8"));
const labels = JSON.parse(fs.readFileSync(path.resolve(root, "config/label-strategy.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new WorkloadPlanService({ workload, labels }).buildPlan();
} else if (command === "manifests") {
  payload = new ManifestSummaryService().buildSummary();
} else if (command === "smoke") {
  payload = new SmokeCheckService({ workload }).buildPlan();
} else {
  console.error("Supported commands: plan, manifests, smoke");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { EnvironmentPlanService } from "./services/environment-plan.service.js";
import { SummaryOutputService } from "./services/summary-output.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/environment-spec.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new EnvironmentPlanService({ spec }).buildPlan();
} else if (command === "summary") {
  payload = new SummaryOutputService({ spec }).buildSummary();
} else {
  console.error("Supported commands: plan, summary");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

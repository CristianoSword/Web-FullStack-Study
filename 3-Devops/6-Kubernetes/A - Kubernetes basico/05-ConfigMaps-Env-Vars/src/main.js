import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ConfigmapPlanService } from "./services/configmap-plan.service.js";
import { ConfigmapSummaryService } from "./services/configmap-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/configmap-spec.json"), "utf8"));
const mappings = JSON.parse(fs.readFileSync(path.resolve(root, "config/env-mapping.json"), "utf8"));

const command = process.argv[2] ?? "plan";
let payload;

if (command === "plan") {
  payload = new ConfigmapPlanService({ spec, mappings }).buildPlan();
} else if (command === "configmap") {
  payload = new ConfigmapSummaryService({ spec, mappings }).buildSummary();
} else if (command === "smoke") {
  payload = new SmokeCheckService({ spec }).buildPlan();
} else {
  console.error("Supported commands: plan, configmap, smoke");
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ConsumerSummaryService } from "./services/consumer-summary.service.js";
import { CustomActionPlanService } from "./services/custom-action-plan.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/action-spec.json"), "utf8"));
const sampleInputs = JSON.parse(fs.readFileSync(path.resolve(root, "samples/action-inputs.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new ConsumerSummaryService({ spec, sampleInputs }).buildSummary()
  : new CustomActionPlanService({ spec, sampleInputs }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

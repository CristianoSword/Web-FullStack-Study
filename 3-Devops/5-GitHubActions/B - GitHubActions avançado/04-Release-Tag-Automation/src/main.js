import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ReleasePlanService } from "./services/release-plan.service.js";
import { ReleaseSummaryService } from "./services/release-summary.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/release-spec.json"), "utf8"));
const commits = JSON.parse(fs.readFileSync(path.resolve(root, "samples/commit-history.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new ReleaseSummaryService({ spec, commits }).buildSummary()
  : new ReleasePlanService({ spec, commits }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

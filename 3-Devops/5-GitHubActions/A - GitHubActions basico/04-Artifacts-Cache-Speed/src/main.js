import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ArtifactSummaryService } from "./services/artifact-summary.service.js";
import { CachePlanService } from "./services/cache-plan.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/cache-spec.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new ArtifactSummaryService({ spec }).buildSummary()
  : new CachePlanService({ spec }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

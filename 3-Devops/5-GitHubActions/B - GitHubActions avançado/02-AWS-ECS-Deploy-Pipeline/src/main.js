import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DeploySummaryService } from "./services/deploy-summary.service.js";
import { EcsPipelinePlanService } from "./services/ecs-pipeline-plan.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pipelineSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/pipeline-spec.json"), "utf8"));
const serviceSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/ecs-service-spec.json"), "utf8"));

const command = process.argv[2] ?? "plan";
const payload = command === "summary"
  ? new DeploySummaryService({ pipelineSpec, serviceSpec }).buildSummary()
  : new EcsPipelinePlanService({ pipelineSpec, serviceSpec }).buildPlan();

console.log(JSON.stringify(payload, null, 2));

import assert from "node:assert/strict";

import { ArtifactSummaryService } from "./services/artifact-summary.service.js";
import { CachePlanService } from "./services/cache-plan.service.js";

const spec = {
  cachePath: "~/.npm",
  cacheKeyPrefix: "npm-cache",
  artifactName: "build-report",
  artifactPath: "dist/build-report.json",
  nodeVersion: "20"
};

try {
  const plan = new CachePlanService({ spec }).buildPlan();
  assert.equal(plan.nodeVersion, "20");
  assert.ok(plan.steps.includes("upload-artifact"));

  const summary = new ArtifactSummaryService({ spec }).buildSummary();
  assert.equal(summary.artifactName, "build-report");
  assert.equal(summary.artifactPath, "dist/build-report.json");

  console.log("Artifacts Cache Speed lab tests passed.");
} catch (error) {
  console.error("Artifacts Cache Speed lab tests failed:", error);
  process.exit(1);
}

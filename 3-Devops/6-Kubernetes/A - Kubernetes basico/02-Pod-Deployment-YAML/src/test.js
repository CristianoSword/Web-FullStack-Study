import assert from "node:assert/strict";

import { ManifestSummaryService } from "./services/manifest-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";
import { WorkloadPlanService } from "./services/workload-plan.service.js";

const workload = {
  appName: "study-nginx",
  namespace: "study-yaml",
  image: "nginx:1.27-alpine",
  replicas: 2,
  containerPort: 80,
  servicePort: 80,
  nodePort: 30081
};

const labels = {
  app: "study-nginx",
  tier: "web",
  managedBy: "kubectl",
  selector: {
    app: "study-nginx"
  }
};

try {
  const plan = new WorkloadPlanService({ workload, labels }).buildPlan();
  assert.equal(plan.workload.appName, "study-nginx");
  assert.equal(plan.labels.selector.app, "study-nginx");

  const manifests = new ManifestSummaryService().buildSummary();
  assert.ok(manifests.some((manifest) => manifest.file === "pod.yaml"));
  assert.ok(manifests.some((manifest) => manifest.kind === "Deployment"));

  const smoke = new SmokeCheckService({ workload }).buildPlan();
  assert.equal(smoke[0].name, "check-pod");
  assert.equal(smoke.at(-1).name, "open-service-url");

  console.log("Pod Deployment YAML lab tests passed.");
} catch (error) {
  console.error("Pod Deployment YAML lab tests failed:", error);
  process.exit(1);
}

import assert from "node:assert/strict";

import { NodeportPlanService } from "./services/nodeport-plan.service.js";
import { ServiceSummaryService } from "./services/service-summary.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const serviceSpec = {
  namespace: "study-nodeport",
  appName: "nodeport-web",
  deploymentName: "nodeport-web-deployment",
  serviceName: "nodeport-web-service",
  image: "nginx:1.27-alpine",
  containerPort: 80,
  servicePort: 80,
  nodePort: 30082
};

const accessFlow = {
  entrypoint: "NodePort",
  localCheck: "minikube service nodeport-web-service -n study-nodeport --url",
  expectedHttpStatus: 200,
  browserPath: "/"
};

try {
  const plan = new NodeportPlanService({ serviceSpec, accessFlow }).buildPlan();
  assert.equal(plan.service.serviceName, "nodeport-web-service");
  assert.equal(plan.access.entrypoint, "NodePort");

  const summary = new ServiceSummaryService({ serviceSpec, accessFlow }).buildSummary();
  assert.equal(summary.nodePort, 30082);
  assert.equal(summary.expectedHttpStatus, 200);

  const smoke = new SmokeCheckService({ serviceSpec }).buildPlan();
  assert.equal(smoke[0].name, "rollout");
  assert.equal(smoke.at(-1).name, "open-nodeport-url");

  console.log("Kubernetes Service NodePort lab tests passed.");
} catch (error) {
  console.error("Kubernetes Service NodePort lab tests failed:", error);
  process.exit(1);
}

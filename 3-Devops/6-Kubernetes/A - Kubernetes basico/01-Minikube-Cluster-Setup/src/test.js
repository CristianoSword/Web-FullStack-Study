import assert from "node:assert/strict";

import { ManifestSummaryService } from "./services/manifest-summary.service.js";
import { MinikubePlanService } from "./services/minikube-plan.service.js";
import { SmokeCheckService } from "./services/smoke-check.service.js";

const profile = {
  profile: "study-cluster",
  driver: "docker",
  kubernetesVersion: "v1.30.0",
  cpus: 2,
  memoryMb: 4096,
  containerRuntime: "containerd"
};

const addons = [
  { name: "ingress", purpose: "Expor servicos HTTP no cluster local." },
  { name: "metrics-server", purpose: "Permitir leitura de metricas e estudo de autoscaling." },
  { name: "dashboard", purpose: "Inspecionar recursos do cluster visualmente." }
];

try {
  const plan = new MinikubePlanService({ profile, addons }).buildPlan();
  assert.equal(plan.profile.profile, "study-cluster");
  assert.equal(plan.addons.length, 3);

  const manifests = new ManifestSummaryService().buildSummary();
  assert.ok(manifests.some((item) => item.file === "deployment.yaml"));
  assert.ok(manifests.some((item) => item.kind === "Service"));

  const smoke = new SmokeCheckService({ profile }).buildPlan();
  assert.equal(smoke[0].name, "check-profile");
  assert.equal(smoke.at(-1).name, "open-service-url");

  console.log("Minikube Cluster Setup lab tests passed.");
} catch (error) {
  console.error("Minikube Cluster Setup lab tests failed:", error);
  process.exit(1);
}

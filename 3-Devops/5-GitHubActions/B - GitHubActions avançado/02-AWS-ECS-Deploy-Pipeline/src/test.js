import assert from "node:assert/strict";

import { DeploySummaryService } from "./services/deploy-summary.service.js";
import { EcsPipelinePlanService } from "./services/ecs-pipeline-plan.service.js";

const pipelineSpec = {
  workflowName: "AWS ECS Deploy Pipeline",
  awsRegion: "us-east-1",
  accountId: "123456789012",
  repositoryName: "study-api",
  defaultBranch: "main",
  oidcRoleArn: "arn:aws:iam::123456789012:role/github-actions-ecs-deployer"
};

const serviceSpec = {
  cluster: "study-platform-cluster",
  service: "study-api-service",
  taskFamily: "study-api-task",
  containerName: "study-api",
  containerPort: 8080,
  desiredCount: 2,
  launchType: "FARGATE",
  deploymentCircuitBreaker: true
};

try {
  const plan = new EcsPipelinePlanService({ pipelineSpec, serviceSpec }).buildPlan();
  assert.equal(plan.workflowName, "AWS ECS Deploy Pipeline");
  assert.ok(plan.steps.includes("deploy-ecs-service"));

  const summary = new DeploySummaryService({ pipelineSpec, serviceSpec }).buildSummary();
  assert.equal(summary.cluster, "study-platform-cluster");
  assert.equal(summary.repository, "study-api");

  console.log("AWS ECS Deploy Pipeline lab tests passed.");
} catch (error) {
  console.error("AWS ECS Deploy Pipeline lab tests failed:", error);
  process.exit(1);
}

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/network.json",
  "config/scaling.json",
  "Dockerfile",
  "app/server.js",
  "infra/stack.yaml",
  "infra/task-definition.json",
  "infra/service-definition.json",
  "src/main.js",
  "src/test.js",
  "src/models/ecs-task.model.js",
  "src/models/ecs-service.model.js",
  "src/models/deployment-step.model.js",
  "src/services/fargate-plan.service.js",
  "src/services/task-definition.service.js",
  "src/services/deployment-observability.service.js",
  "scripts/check-fargate-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const template = fs.readFileSync(path.resolve(root, "infra/stack.yaml"), "utf8");
for (const token of ["AWS::ECS::Cluster", "AWS::ECS::TaskDefinition", "AWS::ECS::Service", "AWS::ECR::Repository"]) {
  if (!template.includes(token)) {
    throw new Error(`Missing infrastructure token: ${token}`);
  }
}

console.log("ECS Fargate Containers project validation passed.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  ".github/workflows/aws-ecs-deploy.yml",
  "config/pipeline-spec.json",
  "config/ecs-service-spec.json",
  "ecs/task-definition.json",
  "samples/image-build-context.json",
  "scripts/build-image-metadata.mjs",
  "src/main.js",
  "src/test.js",
  "src/models/aws-pipeline.model.js",
  "src/models/ecs-service.model.js",
  "src/services/ecs-pipeline-plan.service.js",
  "src/services/deploy-summary.service.js"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = fs.readFileSync(path.resolve(root, ".github/workflows/aws-ecs-deploy.yml"), "utf8");
for (const token of [
  "aws-actions/configure-aws-credentials@v4",
  "aws-actions/amazon-ecr-login@v2",
  "aws-actions/amazon-ecs-render-task-definition@v1",
  "aws-actions/amazon-ecs-deploy-task-definition@v2",
  "docker build -t $REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .",
  "wait-for-service-stability: true"
]) {
  if (!workflow.includes(token)) {
    throw new Error(`ECS workflow missing token: ${token}`);
  }
}

const taskDefinition = fs.readFileSync(path.resolve(root, "ecs/task-definition.json"), "utf8");
for (const token of ["\"family\": \"study-api-task\"", "\"requiresCompatibilities\": [\"FARGATE\"]", "\"name\": \"study-api\""]) {
  if (!taskDefinition.includes(token)) {
    throw new Error(`Task definition missing token: ${token}`);
  }
}

console.log("AWS ECS Deploy Pipeline workflow validation passed.");

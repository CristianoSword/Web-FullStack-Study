import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/routes.json",
  "config/dynamo-schema.json",
  "events/create-order.json",
  "events/list-orders.json",
  "infra/template.yaml",
  "src/main.js",
  "src/test.js",
  "src/models/api-route.model.js",
  "src/models/dynamo-table.model.js",
  "src/models/lambda-function.model.js",
  "src/lambda/create-order.js",
  "src/lambda/list-orders.js",
  "src/services/api-gateway-plan.service.js",
  "src/services/dynamo-access-plan.service.js",
  "src/services/order-handler.service.js",
  "scripts/check-serverless-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "routes", "sample-create", "sample-list"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

const template = fs.readFileSync(path.resolve(root, "infra/template.yaml"), "utf8");
for (const token of ["AWS::Serverless::HttpApi", "AWS::DynamoDB::Table", "CreateOrderFunction", "ListOrdersFunction"]) {
  if (!template.includes(token)) {
    throw new Error(`Template missing token: ${token}`);
  }
}

console.log("Serverless Lambda Gateway project validation passed.");

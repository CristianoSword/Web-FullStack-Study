import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/instances.json",
  "config/scaling-policies.json",
  "cloudformation/stack.yaml",
  "user-data/bootstrap.sh",
  "src/main.js",
  "src/test.js",
  "src/models/load-balancer.model.js",
  "src/models/auto-scaling-group.model.js",
  "src/models/scaling-policy.model.js",
  "src/services/alb-stack-plan.service.js",
  "src/services/scaling-policy.service.js",
  "src/services/traffic-simulation.service.js",
  "scripts/check-elb-plan.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const template = fs.readFileSync(path.resolve(root, "cloudformation/stack.yaml"), "utf8");
for (const token of ["AWS::ElasticLoadBalancingV2::LoadBalancer", "AWS::AutoScaling::AutoScalingGroup", "AWS::EC2::LaunchTemplate"]) {
  if (!template.includes(token)) {
    throw new Error(`CloudFormation template missing token: ${token}`);
  }
}

const mainCode = fs.readFileSync(path.resolve(root, "src/main.js"), "utf8");
for (const branch of ["plan", "policies", "traffic"]) {
  if (!mainCode.includes(branch)) {
    throw new Error(`Missing CLI branch: ${branch}`);
  }
}

console.log("Auto Scaling ELB Stack project validation passed.");

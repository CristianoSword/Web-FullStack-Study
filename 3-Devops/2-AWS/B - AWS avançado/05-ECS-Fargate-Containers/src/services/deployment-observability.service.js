import { DeploymentStepModel } from "../models/deployment-step.model.js";

export class DeploymentObservabilityService {
  constructor({ settings }) {
    this.settings = settings;
  }

  buildRunbook() {
    return [
      new DeploymentStepModel({
        name: "build-image",
        command: `docker build -t ${this.settings.repositoryName}:latest .`,
        purpose: "Build the container image that will run in Fargate."
      }),
      new DeploymentStepModel({
        name: "push-image",
        command: `docker push <account>.dkr.ecr.${this.settings.region}.amazonaws.com/${this.settings.repositoryName}:latest`,
        purpose: "Publish the image to ECR."
      }),
      new DeploymentStepModel({
        name: "force-deployment",
        command: `aws ecs update-service --cluster ${this.settings.clusterName} --service ${this.settings.serviceName} --force-new-deployment`,
        purpose: "Roll the service to the latest task definition."
      }),
      new DeploymentStepModel({
        name: "tail-logs",
        command: "aws logs tail /ecs/study-orders --follow",
        purpose: "Inspect runtime boot logs and health transitions."
      })
    ];
  }
}

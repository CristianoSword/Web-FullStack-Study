import { EcsServiceModel } from "../models/ecs-service.model.js";
import { EcsTaskModel } from "../models/ecs-task.model.js";

export class FargatePlanService {
  constructor({ settings, network, scaling }) {
    this.settings = settings;
    this.network = network;
    this.scaling = scaling;
  }

  buildPlan() {
    const task = new EcsTaskModel({
      family: this.settings.taskFamily,
      cpu: "512",
      memory: "1024",
      launchType: "FARGATE",
      containerName: "study-orders-api",
      containerPort: 8080
    });

    const service = new EcsServiceModel({
      clusterName: this.settings.clusterName,
      serviceName: this.settings.serviceName,
      desiredCount: this.scaling.minTasks,
      launchType: "FARGATE",
      subnets: this.network.privateSubnets,
      securityGroupId: this.network.securityGroupId
    });

    return {
      region: this.settings.region,
      repositoryName: this.settings.repositoryName,
      task,
      service,
      deploymentType: "rolling update",
      smokeChecks: [
        "Service reaches steady state with 2 tasks",
        "Container /health endpoint returns 200",
        "CloudWatch log stream receives boot events"
      ]
    };
  }
}

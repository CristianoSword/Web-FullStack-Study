export class TaskDefinitionService {
  constructor({ settings, scaling }) {
    this.settings = settings;
    this.scaling = scaling;
  }

  buildDefinitionSummary() {
    return {
      registerCommand: "aws ecs register-task-definition --cli-input-json file://infra/task-definition.json",
      serviceDeployCommand: `aws ecs update-service --cluster ${this.settings.clusterName} --service ${this.settings.serviceName} --force-new-deployment`,
      autoscaling: {
        minTasks: this.scaling.minTasks,
        maxTasks: this.scaling.maxTasks,
        cpuTarget: this.scaling.cpuTarget,
        memoryTarget: this.scaling.memoryTarget
      }
    };
  }
}

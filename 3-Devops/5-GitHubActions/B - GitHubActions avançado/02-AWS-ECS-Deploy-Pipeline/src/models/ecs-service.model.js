export class EcsServiceModel {
  constructor({ cluster, service, taskFamily, containerName, containerPort, desiredCount, launchType, deploymentCircuitBreaker }) {
    this.cluster = cluster;
    this.service = service;
    this.taskFamily = taskFamily;
    this.containerName = containerName;
    this.containerPort = containerPort;
    this.desiredCount = desiredCount;
    this.launchType = launchType;
    this.deploymentCircuitBreaker = deploymentCircuitBreaker;
  }
}

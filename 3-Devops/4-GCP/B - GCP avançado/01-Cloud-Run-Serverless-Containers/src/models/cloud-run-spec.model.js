export class CloudRunSpecModel {
  constructor({ serviceName, projectId, region, containerImage, cpu, memory, concurrency, minInstances, maxInstances, ingress }) {
    this.serviceName = serviceName;
    this.projectId = projectId;
    this.region = region;
    this.containerImage = containerImage;
    this.cpu = cpu;
    this.memory = memory;
    this.concurrency = concurrency;
    this.minInstances = minInstances;
    this.maxInstances = maxInstances;
    this.ingress = ingress;
  }
}

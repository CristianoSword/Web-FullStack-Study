export class EcsTaskModel {
  constructor({ family, cpu, memory, launchType, containerName, containerPort }) {
    this.family = family;
    this.cpu = cpu;
    this.memory = memory;
    this.launchType = launchType;
    this.containerName = containerName;
    this.containerPort = containerPort;
  }
}

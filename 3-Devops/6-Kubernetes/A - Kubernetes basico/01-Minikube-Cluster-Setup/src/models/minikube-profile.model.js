export class MinikubeProfileModel {
  constructor({ profile, driver, kubernetesVersion, cpus, memoryMb, containerRuntime }) {
    this.profile = profile;
    this.driver = driver;
    this.kubernetesVersion = kubernetesVersion;
    this.cpus = cpus;
    this.memoryMb = memoryMb;
    this.containerRuntime = containerRuntime;
  }
}

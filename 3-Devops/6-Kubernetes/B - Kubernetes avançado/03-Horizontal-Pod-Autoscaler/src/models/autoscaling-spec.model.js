export class AutoscalingSpec {
  constructor({
    namespace,
    deploymentName,
    minReplicas,
    maxReplicas,
    targetCPUUtilizationPercentage,
    scaleUp,
    scaleDown
  }) {
    this.namespace = namespace;
    this.deploymentName = deploymentName;
    this.minReplicas = minReplicas;
    this.maxReplicas = maxReplicas;
    this.targetCPUUtilizationPercentage = targetCPUUtilizationPercentage;
    this.scaleUp = scaleUp;
    this.scaleDown = scaleDown;
  }

  static from(raw) {
    return new AutoscalingSpec(raw);
  }
}

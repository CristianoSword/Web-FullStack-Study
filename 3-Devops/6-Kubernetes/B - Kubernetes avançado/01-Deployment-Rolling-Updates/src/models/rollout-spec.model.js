export class RolloutSpec {
  constructor({
    deploymentName,
    namespace,
    replicas,
    strategy,
    revisionHistoryLimit,
    minReadySeconds,
    progressDeadlineSeconds,
    probes
  }) {
    this.deploymentName = deploymentName;
    this.namespace = namespace;
    this.replicas = replicas;
    this.strategy = strategy;
    this.revisionHistoryLimit = revisionHistoryLimit;
    this.minReadySeconds = minReadySeconds;
    this.progressDeadlineSeconds = progressDeadlineSeconds;
    this.probes = probes;
  }

  static from(raw) {
    return new RolloutSpec(raw);
  }
}

export function buildRolloutPlan(rolloutSpec, releaseSteps) {
  return {
    deploymentName: rolloutSpec.deploymentName,
    namespace: rolloutSpec.namespace,
    replicas: rolloutSpec.replicas,
    strategy: rolloutSpec.strategy,
    safetyBudget: {
      revisionHistoryLimit: rolloutSpec.revisionHistoryLimit,
      minReadySeconds: rolloutSpec.minReadySeconds,
      progressDeadlineSeconds: rolloutSpec.progressDeadlineSeconds
    },
    probeMatrix: {
      startupPath: rolloutSpec.probes.startupPath,
      livenessPath: rolloutSpec.probes.livenessPath,
      readinessPath: rolloutSpec.probes.readinessPath
    },
    stages: releaseSteps.map((step, index) => ({
      order: index + 1,
      name: step.name,
      checks: step.checks
    }))
  };
}

export function summarizeRelease(rolloutSpec, releaseSteps) {
  return {
    deploymentName: rolloutSpec.deploymentName,
    namespace: rolloutSpec.namespace,
    rolloutWindow: `${rolloutSpec.replicas} replicas with ${rolloutSpec.strategy.maxSurge} surge`,
    disruptionPolicy: `${rolloutSpec.strategy.maxUnavailable} unavailable during update`,
    stages: releaseSteps.map((step) => step.name)
  };
}

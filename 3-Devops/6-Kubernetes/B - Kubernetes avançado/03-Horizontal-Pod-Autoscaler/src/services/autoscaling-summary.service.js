export function summarizeAutoscaling(autoscalingSpec, loadTestPlan) {
  return {
    namespace: autoscalingSpec.namespace,
    deploymentName: autoscalingSpec.deploymentName,
    targetCpu: `${autoscalingSpec.targetCPUUtilizationPercentage}%`,
    requestBurst: `${loadTestPlan.requests} requests`,
    concurrency: loadTestPlan.concurrency
  };
}

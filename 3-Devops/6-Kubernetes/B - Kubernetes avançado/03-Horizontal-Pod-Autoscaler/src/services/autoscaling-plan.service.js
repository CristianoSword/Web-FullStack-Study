export function buildAutoscalingPlan(autoscalingSpec, loadTestPlan) {
  return {
    namespace: autoscalingSpec.namespace,
    deploymentName: autoscalingSpec.deploymentName,
    scaleRange: {
      minReplicas: autoscalingSpec.minReplicas,
      maxReplicas: autoscalingSpec.maxReplicas
    },
    scaleUp: autoscalingSpec.scaleUp,
    scaleDown: autoscalingSpec.scaleDown,
    loadTest: loadTestPlan
  };
}

export function summarizeVariablesPlan(environmentMatrix, vercelEnvFlow) {
  return {
    variableCount: environmentMatrix.variables.length,
    flowStepCount: vercelEnvFlow.steps.length
  };
}

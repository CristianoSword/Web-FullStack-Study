export function buildVariablesPlan(environmentMatrix, vercelEnvFlow) {
  return {
    variables: environmentMatrix.variables,
    steps: vercelEnvFlow.steps
  };
}

export function buildCliSetupPlan(cliFlow, projectLinkTemplate) {
  return {
    steps: cliFlow.steps,
    localUrl: cliFlow.localUrl,
    orgId: projectLinkTemplate.orgId,
    projectId: projectLinkTemplate.projectId
  };
}

export function summarizeCliSetup(cliFlow, projectLinkTemplate) {
  return {
    projectName: projectLinkTemplate.projectName,
    localUrl: cliFlow.localUrl,
    stepCount: cliFlow.steps.length
  };
}

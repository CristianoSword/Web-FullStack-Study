export function summarizeSpaDeploy(deployStrategy, routesConfig) {
  return {
    outputDirectory: deployStrategy.outputDirectory,
    routeCount: routesConfig.routes.length,
    previewCommand: deployStrategy.previewCommand
  };
}

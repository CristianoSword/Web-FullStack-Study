export function buildSpaDeployPlan(deployStrategy, routesConfig) {
  return {
    outputDirectory: deployStrategy.outputDirectory,
    previewCommand: deployStrategy.previewCommand,
    productionCommand: deployStrategy.productionCommand,
    routingMode: deployStrategy.routingMode,
    routes: routesConfig.routes,
    fallback: routesConfig.fallback
  };
}

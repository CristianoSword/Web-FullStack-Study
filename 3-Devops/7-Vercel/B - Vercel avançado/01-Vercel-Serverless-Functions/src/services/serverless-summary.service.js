export function summarizeServerlessPlan(routeMap, runtimeProfile) {
  return {
    routeCount: routeMap.routes.length,
    runtime: runtimeProfile.runtime,
    sharedModuleCount: runtimeProfile.sharedModules.length
  };
}

export function buildServerlessPlan(routeMap, runtimeProfile) {
  return {
    routes: routeMap.routes,
    runtime: runtimeProfile.runtime,
    memory: runtimeProfile.memory,
    maxDuration: runtimeProfile.maxDuration,
    sharedModules: runtimeProfile.sharedModules
  };
}

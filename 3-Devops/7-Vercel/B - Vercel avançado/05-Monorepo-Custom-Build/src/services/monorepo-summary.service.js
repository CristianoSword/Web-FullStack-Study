export function summarizeMonorepoPlan(appMap, buildProfile) {
  return {
    appCount: appMap.apps.length,
    outputDirectory: buildProfile.outputDirectory,
    buildCommand: buildProfile.buildCommand
  };
}

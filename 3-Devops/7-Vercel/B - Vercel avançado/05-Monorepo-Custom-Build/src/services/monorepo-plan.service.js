export function buildMonorepoPlan(appMap, buildProfile) {
  return {
    apps: appMap.apps,
    installCommand: buildProfile.installCommand,
    buildCommand: buildProfile.buildCommand,
    ignoreCommand: buildProfile.ignoreCommand,
    outputDirectory: buildProfile.outputDirectory
  };
}

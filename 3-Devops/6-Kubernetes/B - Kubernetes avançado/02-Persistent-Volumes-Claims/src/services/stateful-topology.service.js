export function summarizeStatefulTopology(storageSpec, backupPolicy) {
  return {
    namespace: storageSpec.namespace,
    appName: storageSpec.appName,
    claimName: storageSpec.persistentVolumeClaim.name,
    mountPath: storageSpec.mountPath,
    backupTarget: backupPolicy.targetPath
  };
}

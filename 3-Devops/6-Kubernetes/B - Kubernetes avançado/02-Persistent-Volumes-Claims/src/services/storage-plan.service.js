export function buildStoragePlan(storageSpec, backupPolicy) {
  return {
    namespace: storageSpec.namespace,
    workload: {
      kind: "StatefulSet",
      name: storageSpec.appName,
      replicas: storageSpec.replicas
    },
    persistentVolume: {
      name: storageSpec.persistentVolume.name,
      capacity: storageSpec.persistentVolume.capacity,
      accessModes: storageSpec.persistentVolume.accessModes
    },
    claim: {
      name: storageSpec.persistentVolumeClaim.name,
      requestedStorage: storageSpec.persistentVolumeClaim.requestedStorage
    },
    backup: backupPolicy
  };
}

export class StorageSpec {
  constructor({
    namespace,
    appName,
    persistentVolume,
    persistentVolumeClaim,
    mountPath,
    replicas
  }) {
    this.namespace = namespace;
    this.appName = appName;
    this.persistentVolume = persistentVolume;
    this.persistentVolumeClaim = persistentVolumeClaim;
    this.mountPath = mountPath;
    this.replicas = replicas;
  }

  static from(raw) {
    return new StorageSpec(raw);
  }
}

export class SecretAccessPolicy {
  constructor({ namespace, mountPath, envKeys, fileKeys, nonSensitiveConfigKeys }) {
    this.namespace = namespace;
    this.mountPath = mountPath;
    this.envKeys = envKeys;
    this.fileKeys = fileKeys;
    this.nonSensitiveConfigKeys = nonSensitiveConfigKeys;
  }

  static from(raw) {
    return new SecretAccessPolicy(raw);
  }
}

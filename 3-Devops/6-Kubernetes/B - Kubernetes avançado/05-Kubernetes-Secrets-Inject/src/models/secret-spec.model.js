export class SecretSpec {
  constructor({ secretName, namespace, keys }) {
    this.secretName = secretName;
    this.namespace = namespace;
    this.keys = keys;
  }

  static from(raw) {
    return new SecretSpec(raw);
  }
}

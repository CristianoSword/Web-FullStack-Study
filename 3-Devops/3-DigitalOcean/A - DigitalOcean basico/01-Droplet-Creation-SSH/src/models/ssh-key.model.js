export class SshKeyModel {
  constructor({ name, fingerprint, publicKeyPath, privateKeyPath, loginUser }) {
    this.name = name;
    this.fingerprint = fingerprint;
    this.publicKeyPath = publicKeyPath;
    this.privateKeyPath = privateKeyPath;
    this.loginUser = loginUser ?? "root";
  }
}

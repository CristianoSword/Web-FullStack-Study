export class SshSessionModel {
  constructor({ user, hostPlaceholder, privateKeyPath, firstChecks }) {
    this.user = user;
    this.hostPlaceholder = hostPlaceholder;
    this.privateKeyPath = privateKeyPath;
    this.firstChecks = firstChecks ?? [];
  }
}

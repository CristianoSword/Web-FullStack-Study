export class MonorepoPackageModel {
  constructor({ scope, path, command }) {
    this.scope = scope;
    this.path = path;
    this.command = command;
  }
}

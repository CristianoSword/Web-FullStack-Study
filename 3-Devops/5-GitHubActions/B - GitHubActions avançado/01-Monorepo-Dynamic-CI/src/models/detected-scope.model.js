export class DetectedScopeModel {
  constructor({ scope, path, command, changedFiles }) {
    this.scope = scope;
    this.path = path;
    this.command = command;
    this.changedFiles = changedFiles;
  }
}

export class ServiceUnitModel {
  constructor({ name, workingDirectory, user, port }) {
    this.name = name;
    this.workingDirectory = workingDirectory;
    this.user = user;
    this.port = port;
  }
}

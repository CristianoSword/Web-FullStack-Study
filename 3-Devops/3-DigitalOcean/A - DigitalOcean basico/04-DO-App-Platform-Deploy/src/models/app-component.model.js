export class AppComponentModel {
  constructor({ name, sourceDir, instanceSize, instanceCount, httpPort }) {
    this.name = name;
    this.sourceDir = sourceDir;
    this.instanceSize = instanceSize;
    this.instanceCount = instanceCount;
    this.httpPort = httpPort;
  }
}

export class LambdaFunctionModel {
  constructor({ name, handler, method, path, timeoutSeconds, memoryMb }) {
    this.name = name;
    this.handler = handler;
    this.method = method;
    this.path = path;
    this.timeoutSeconds = timeoutSeconds ?? 15;
    this.memoryMb = memoryMb ?? 256;
  }
}

export class ApiRouteModel {
  constructor({ name, method, path, handler, auth }) {
    this.name = name;
    this.method = method;
    this.path = path;
    this.handler = handler;
    this.auth = auth ?? "NONE";
  }
}

export class ProxyRouteModel {
  constructor({ path, upstream, healthCheck }) {
    this.path = path;
    this.upstream = upstream;
    this.healthCheck = healthCheck ?? false;
  }
}

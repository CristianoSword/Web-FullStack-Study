export class RoutesConfig {
  constructor({ routes, fallback }) {
    this.routes = routes;
    this.fallback = fallback;
  }

  static from(raw) {
    return new RoutesConfig(raw);
  }
}

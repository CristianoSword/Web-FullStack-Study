export class RouteMap {
  constructor({ routes }) {
    this.routes = routes;
  }

  static from(raw) {
    return new RouteMap(raw);
  }
}

export class RoutingSmokePlan {
  constructor({ checks }) {
    this.checks = checks;
  }

  static from(raw) {
    return new RoutingSmokePlan(raw);
  }
}

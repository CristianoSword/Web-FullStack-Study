export class AppMap {
  constructor({ apps }) {
    this.apps = apps;
  }

  static from(raw) {
    return new AppMap(raw);
  }
}

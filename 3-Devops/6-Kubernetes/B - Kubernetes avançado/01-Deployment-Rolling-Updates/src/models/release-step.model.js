export class ReleaseStep {
  constructor({ name, checks }) {
    this.name = name;
    this.checks = checks;
  }

  static from(raw) {
    return new ReleaseStep(raw);
  }
}

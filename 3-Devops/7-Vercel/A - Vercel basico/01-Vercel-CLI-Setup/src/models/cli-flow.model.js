export class CliFlow {
  constructor({ steps, localUrl }) {
    this.steps = steps;
    this.localUrl = localUrl;
  }

  static from(raw) {
    return new CliFlow(raw);
  }
}

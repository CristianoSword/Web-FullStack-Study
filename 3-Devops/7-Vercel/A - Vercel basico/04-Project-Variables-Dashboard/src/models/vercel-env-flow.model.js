export class VercelEnvFlow {
  constructor({ steps }) {
    this.steps = steps;
  }

  static from(raw) {
    return new VercelEnvFlow(raw);
  }
}

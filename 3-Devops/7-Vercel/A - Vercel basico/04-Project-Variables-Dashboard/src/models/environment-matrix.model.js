export class EnvironmentMatrix {
  constructor({ variables }) {
    this.variables = variables;
  }

  static from(raw) {
    return new EnvironmentMatrix(raw);
  }
}

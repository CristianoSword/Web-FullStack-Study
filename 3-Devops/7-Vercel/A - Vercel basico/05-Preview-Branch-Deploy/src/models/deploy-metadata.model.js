export class DeployMetadata {
  constructor({ variables, previewPurpose }) {
    this.variables = variables;
    this.previewPurpose = previewPurpose;
  }

  static from(raw) {
    return new DeployMetadata(raw);
  }
}

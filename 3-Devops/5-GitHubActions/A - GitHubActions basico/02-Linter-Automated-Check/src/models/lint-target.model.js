export class LintTargetModel {
  constructor({ extensions, include, severity, nodeVersions }) {
    this.extensions = extensions;
    this.include = include;
    this.severity = severity;
    this.nodeVersions = nodeVersions;
  }
}

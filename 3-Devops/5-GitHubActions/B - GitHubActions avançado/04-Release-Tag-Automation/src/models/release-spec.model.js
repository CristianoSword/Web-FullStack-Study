export class ReleaseSpecModel {
  constructor({ workflowName, baseVersion, defaultBranch, tagPrefix, allowedBumps }) {
    this.workflowName = workflowName;
    this.baseVersion = baseVersion;
    this.defaultBranch = defaultBranch;
    this.tagPrefix = tagPrefix;
    this.allowedBumps = allowedBumps;
  }
}

export class BackupPolicy {
  constructor({ schedule, sourcePath, targetPath, retentionCopies }) {
    this.schedule = schedule;
    this.sourcePath = sourcePath;
    this.targetPath = targetPath;
    this.retentionCopies = retentionCopies;
  }

  static from(raw) {
    return new BackupPolicy(raw);
  }
}

import { CommitEntryModel } from "../models/commit-entry.model.js";
import { ReleaseSpecModel } from "../models/release-spec.model.js";

export class ReleaseSummaryService {
  constructor({ spec, commits }) {
    this.spec = new ReleaseSpecModel(spec);
    this.commits = commits.map((commit) => new CommitEntryModel(commit));
  }

  buildSummary() {
    const [major, minor, patch] = this.spec.baseVersion.split(".").map(Number);

    return {
      branch: this.spec.defaultBranch,
      commitCount: this.commits.length,
      tagExample: `${this.spec.tagPrefix}${major}.${minor}.${patch + 1}`,
      changelogFile: "changelog/release-notes.md"
    };
  }
}

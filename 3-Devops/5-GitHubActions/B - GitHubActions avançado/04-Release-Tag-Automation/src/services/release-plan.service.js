import { CommitEntryModel } from "../models/commit-entry.model.js";
import { ReleaseSpecModel } from "../models/release-spec.model.js";

export class ReleasePlanService {
  constructor({ spec, commits }) {
    this.spec = new ReleaseSpecModel(spec);
    this.commits = commits.map((commit) => new CommitEntryModel(commit));
  }

  buildPlan() {
    return {
      workflowName: this.spec.workflowName,
      baseVersion: this.spec.baseVersion,
      allowedBumps: this.spec.allowedBumps,
      commitTypes: [...new Set(this.commits.map((commit) => commit.type))],
      steps: [
        "checkout",
        "compute-next-version",
        "render-release-notes",
        "upload-release-notes",
        "create-git-tag",
        "create-github-release"
      ]
    };
  }
}

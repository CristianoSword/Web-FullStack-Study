import { LintTargetModel } from "../models/lint-target.model.js";

export class ReportSummaryService {
  constructor({ targets }) {
    this.targets = new LintTargetModel(targets);
  }

  buildSummary() {
    return {
      severity: this.targets.severity,
      totalTargets: this.targets.include.length,
      extensions: this.targets.extensions,
      nodeVersions: this.targets.nodeVersions
    };
  }
}

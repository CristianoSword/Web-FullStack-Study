import { DetectedScopeModel } from "../models/detected-scope.model.js";
import { MonorepoPackageModel } from "../models/monorepo-package.model.js";

export class ScopeSummaryService {
  constructor({ packages, changedFiles }) {
    this.packages = packages.map((pkg) => new MonorepoPackageModel(pkg));
    this.changedFiles = changedFiles;
  }

  buildSummary() {
    const affectedPackages = this.packages
      .filter((pkg) => this.changedFiles.some((file) => file.startsWith(pkg.path)))
      .map((pkg) => new DetectedScopeModel({
        scope: pkg.scope,
        path: pkg.path,
        command: pkg.command,
        changedFiles: this.changedFiles.filter((file) => file.startsWith(pkg.path))
      }));

    return {
      changedFiles: this.changedFiles,
      affectedPackages
    };
  }
}

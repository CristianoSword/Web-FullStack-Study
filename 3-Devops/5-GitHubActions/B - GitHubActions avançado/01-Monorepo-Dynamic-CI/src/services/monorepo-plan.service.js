import { MonorepoPackageModel } from "../models/monorepo-package.model.js";

export class MonorepoPlanService {
  constructor({ packages, changedFiles }) {
    this.packages = packages.map((pkg) => new MonorepoPackageModel(pkg));
    this.changedFiles = changedFiles;
  }

  buildPlan() {
    const affected = this.packages.filter((pkg) => this.changedFiles.some((file) => file.startsWith(pkg.path)));

    return {
      changedFiles: this.changedFiles,
      affectedScopes: affected.map((pkg) => pkg.scope),
      strategy: "detect-changes -> dynamic-matrix -> run-affected-packages"
    };
  }
}

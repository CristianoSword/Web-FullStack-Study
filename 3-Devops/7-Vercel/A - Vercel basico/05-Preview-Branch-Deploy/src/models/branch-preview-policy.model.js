export class BranchPreviewPolicy {
  constructor({ productionBranch, previewBranches }) {
    this.productionBranch = productionBranch;
    this.previewBranches = previewBranches;
  }

  static from(raw) {
    return new BranchPreviewPolicy(raw);
  }
}

export function summarizePreviewPlan(branchPreviewPolicy, deployMetadata) {
  return {
    productionBranch: branchPreviewPolicy.productionBranch,
    previewPatternCount: branchPreviewPolicy.previewBranches.length,
    runtimeVariableCount: deployMetadata.variables.length
  };
}

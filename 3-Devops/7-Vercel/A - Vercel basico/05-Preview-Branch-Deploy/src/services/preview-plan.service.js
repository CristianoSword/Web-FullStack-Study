export function buildPreviewPlan(branchPreviewPolicy, deployMetadata) {
  return {
    productionBranch: branchPreviewPolicy.productionBranch,
    previewBranches: branchPreviewPolicy.previewBranches,
    runtimeVariables: deployMetadata.variables,
    previewPurpose: deployMetadata.previewPurpose
  };
}

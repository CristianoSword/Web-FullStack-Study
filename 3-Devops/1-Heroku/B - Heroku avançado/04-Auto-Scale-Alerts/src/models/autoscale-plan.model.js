export const createAutoscalePlan = ({
  appName,
  processType,
  currentDynos,
  recommendedDynos,
  scaleCommand,
  verificationCommands
}) => ({
  appName,
  processType,
  currentDynos,
  recommendedDynos,
  scaleCommand,
  verificationCommands
});

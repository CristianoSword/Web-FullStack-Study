export const createPipelinePlan = ({
  pipelineName,
  stagingApp,
  productionApp,
  createPipelineCommand,
  addStagingCommand,
  addProductionCommand,
  verificationCommands
}) => ({
  pipelineName,
  stagingApp,
  productionApp,
  createPipelineCommand,
  addStagingCommand,
  addProductionCommand,
  verificationCommands
});

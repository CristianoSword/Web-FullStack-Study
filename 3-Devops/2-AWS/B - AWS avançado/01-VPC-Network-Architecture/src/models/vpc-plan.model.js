export const createVpcPlan = ({
  vpcName,
  cidrBlock,
  createVpcCommand,
  attachInternetGatewayCommand,
  verificationCommands
}) => ({
  vpcName,
  cidrBlock,
  createVpcCommand,
  attachInternetGatewayCommand,
  verificationCommands
});

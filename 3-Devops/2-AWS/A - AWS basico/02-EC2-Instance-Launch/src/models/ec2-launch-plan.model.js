export const createEc2LaunchPlan = ({
  amiId,
  instanceType,
  region,
  keyPair,
  securityGroup,
  runCommand,
  verificationCommands
}) => ({
  amiId,
  instanceType,
  region,
  keyPair,
  securityGroup,
  runCommand,
  verificationCommands
});

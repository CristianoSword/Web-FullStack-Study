export const createSubnetSummary = ({ publicSubnets, privateSubnets }) => ({
  publicSubnets,
  privateSubnets,
  totalSubnets: publicSubnets.length + privateSubnets.length
});

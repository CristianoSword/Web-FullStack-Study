export class EcsServiceModel {
  constructor({ clusterName, serviceName, desiredCount, launchType, subnets, securityGroupId }) {
    this.clusterName = clusterName;
    this.serviceName = serviceName;
    this.desiredCount = desiredCount;
    this.launchType = launchType;
    this.subnets = subnets;
    this.securityGroupId = securityGroupId;
  }
}

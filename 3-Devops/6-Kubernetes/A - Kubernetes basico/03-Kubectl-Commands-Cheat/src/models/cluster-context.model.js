export class ClusterContextModel {
  constructor({ namespace, appName, deploymentName, serviceName, labelSelector }) {
    this.namespace = namespace;
    this.appName = appName;
    this.deploymentName = deploymentName;
    this.serviceName = serviceName;
    this.labelSelector = labelSelector;
  }
}

export class ConfigmapSpecModel {
  constructor({ namespace, appName, configMapName, serviceName, deploymentName, image, data }) {
    this.namespace = namespace;
    this.appName = appName;
    this.configMapName = configMapName;
    this.serviceName = serviceName;
    this.deploymentName = deploymentName;
    this.image = image;
    this.data = data;
  }
}

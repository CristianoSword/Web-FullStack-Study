export class ServiceSpecModel {
  constructor({ namespace, appName, deploymentName, serviceName, image, containerPort, servicePort, nodePort }) {
    this.namespace = namespace;
    this.appName = appName;
    this.deploymentName = deploymentName;
    this.serviceName = serviceName;
    this.image = image;
    this.containerPort = containerPort;
    this.servicePort = servicePort;
    this.nodePort = nodePort;
  }
}

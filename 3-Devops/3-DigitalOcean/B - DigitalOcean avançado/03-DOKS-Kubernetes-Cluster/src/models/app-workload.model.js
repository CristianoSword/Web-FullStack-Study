export class AppWorkloadModel {
  constructor({ namespace, deploymentName, replicas, containerImage, containerPort, servicePort, ingressHost }) {
    this.namespace = namespace;
    this.deploymentName = deploymentName;
    this.replicas = replicas;
    this.containerImage = containerImage;
    this.containerPort = containerPort;
    this.servicePort = servicePort;
    this.ingressHost = ingressHost;
  }
}

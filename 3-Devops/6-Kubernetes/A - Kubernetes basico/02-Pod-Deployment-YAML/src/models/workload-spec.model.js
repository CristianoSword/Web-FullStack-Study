export class WorkloadSpecModel {
  constructor({ appName, namespace, image, replicas, containerPort, servicePort, nodePort }) {
    this.appName = appName;
    this.namespace = namespace;
    this.image = image;
    this.replicas = replicas;
    this.containerPort = containerPort;
    this.servicePort = servicePort;
    this.nodePort = nodePort;
  }
}

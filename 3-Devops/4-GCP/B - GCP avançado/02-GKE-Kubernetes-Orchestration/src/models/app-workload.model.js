export class AppWorkloadModel {
  constructor({
    namespace,
    deploymentName,
    serviceName,
    ingressName,
    hpaName,
    configMapName,
    secretName,
    host,
    containerImage,
    replicas,
    port,
    targetPort,
    minReplicas,
    maxReplicas,
    targetCpuUtilization,
    requests,
    limits
  }) {
    this.namespace = namespace;
    this.deploymentName = deploymentName;
    this.serviceName = serviceName;
    this.ingressName = ingressName;
    this.hpaName = hpaName;
    this.configMapName = configMapName;
    this.secretName = secretName;
    this.host = host;
    this.containerImage = containerImage;
    this.replicas = replicas;
    this.port = port;
    this.targetPort = targetPort;
    this.minReplicas = minReplicas;
    this.maxReplicas = maxReplicas;
    this.targetCpuUtilization = targetCpuUtilization;
    this.requests = requests;
    this.limits = limits;
  }
}

export class LoadBalancerModel {
  constructor({ albName, targetGroupName, listenerPort, healthCheckPath, scheme }) {
    this.albName = albName;
    this.targetGroupName = targetGroupName;
    this.listenerPort = listenerPort ?? 443;
    this.healthCheckPath = healthCheckPath ?? "/health";
    this.scheme = scheme ?? "internet-facing";
  }
}

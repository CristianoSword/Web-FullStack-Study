export class HealthCheckModel {
  constructor({ protocol, port, path, checkIntervalSeconds, responseTimeoutSeconds, healthyThreshold, unhealthyThreshold }) {
    this.protocol = protocol;
    this.port = port;
    this.path = path;
    this.checkIntervalSeconds = checkIntervalSeconds;
    this.responseTimeoutSeconds = responseTimeoutSeconds;
    this.healthyThreshold = healthyThreshold;
    this.unhealthyThreshold = unhealthyThreshold;
  }
}

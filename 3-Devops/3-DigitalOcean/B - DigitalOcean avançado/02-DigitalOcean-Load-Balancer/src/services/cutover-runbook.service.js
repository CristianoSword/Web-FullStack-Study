export class CutoverRunbookService {
  constructor({ spec, healthCheck }) {
    this.spec = spec;
    this.healthCheck = healthCheck;
  }

  buildRunbook() {
    return [
      {
        name: "register-droplets",
        command: `Ensure all Droplets tagged ${this.spec.dropletTag} serve ${this.healthCheck.path} on port ${this.healthCheck.port}.`,
        purpose: "Prevent the load balancer from routing to unprepared nodes."
      },
      {
        name: "lower-dns-ttl",
        command: "Reduce DNS TTL ahead of the cutover window.",
        purpose: "Speed up propagation if rollback is needed."
      },
      {
        name: "switch-traffic",
        command: "Point the public DNS record to the DigitalOcean load balancer IP.",
        purpose: "Start routing production traffic through the edge balancer."
      },
      {
        name: "watch-health",
        command: "Observe target health, response codes and session stickiness after cutover.",
        purpose: "Catch uneven traffic or unhealthy backend nodes quickly."
      }
    ];
  }
}

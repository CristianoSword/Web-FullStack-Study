export class TrafficSimulationService {
  constructor({ instances, policies }) {
    this.instances = instances;
    this.policies = policies;
  }

  simulate() {
    const desiredCapacity = this.instances.desiredCapacity;
    const cpuPolicy = this.policies.find((policy) => policy.metric === "ASGAverageCPUUtilization");
    const requestPolicy = this.policies.find((policy) => policy.metric === "ALBRequestCountPerTarget");

    return {
      baseline: {
        instances: desiredCapacity,
        requestsPerMinute: 600,
        averageCpu: 38
      },
      spike: {
        instances: Math.min(this.instances.maxSize, desiredCapacity + 2),
        requestsPerMinute: 2200,
        averageCpu: 72,
        triggeredBy: [cpuPolicy?.name, requestPolicy?.name].filter(Boolean)
      },
      recovery: {
        instances: desiredCapacity,
        requestsPerMinute: 500,
        averageCpu: 29
      }
    };
  }
}

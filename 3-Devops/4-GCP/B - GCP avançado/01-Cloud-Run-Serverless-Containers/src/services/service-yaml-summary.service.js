export class ServiceYamlSummaryService {
  constructor({ serviceSpec, envVars }) {
    this.serviceSpec = serviceSpec;
    this.envVars = envVars;
  }

  buildSummary() {
    return {
      concurrency: this.serviceSpec.concurrency,
      autoscaling: {
        minInstances: this.serviceSpec.minInstances,
        maxInstances: this.serviceSpec.maxInstances
      },
      envVarNames: this.envVars.map((envVar) => envVar.name),
      operatorAdvice: [
        "Cloud Run expects the container to listen on PORT 8080 by default.",
        "Container concurrency shapes cost and latency tradeoffs."
      ]
    };
  }
}

export class FunctionSpecModel {
  constructor({ projectId, region, functionName, runtime, entryPoint, memory, timeoutSeconds, serviceAccount, environmentVariables }) {
    this.projectId = projectId;
    this.region = region;
    this.functionName = functionName;
    this.runtime = runtime;
    this.entryPoint = entryPoint;
    this.memory = memory;
    this.timeoutSeconds = timeoutSeconds;
    this.serviceAccount = serviceAccount;
    this.environmentVariables = environmentVariables;
  }
}

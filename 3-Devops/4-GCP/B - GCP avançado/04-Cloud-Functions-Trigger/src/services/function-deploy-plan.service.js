import { FunctionSpecModel } from "../models/function-spec.model.js";
import { StorageTriggerModel } from "../models/storage-trigger.model.js";

export class FunctionDeployPlanService {
  constructor({ functionSpec, triggerSpec }) {
    this.function = new FunctionSpecModel(functionSpec);
    this.trigger = new StorageTriggerModel(triggerSpec);
  }

  buildPlan() {
    return {
      function: {
        name: this.function.functionName,
        runtime: this.function.runtime,
        region: this.function.region,
        memory: this.function.memory,
        timeoutSeconds: this.function.timeoutSeconds
      },
      trigger: this.trigger,
      commands: {
        deploy: `gcloud functions deploy ${this.function.functionName} --gen2 --runtime ${this.function.runtime} --region ${this.function.region} --source function --entry-point ${this.function.entryPoint} --trigger-event-filters=type=${this.trigger.eventType} --trigger-event-filters=bucket=${this.trigger.bucket} --service-account ${this.function.serviceAccount}`,
        describe: `gcloud functions describe ${this.function.functionName} --gen2 --region ${this.function.region}`,
        callLogs: `gcloud functions logs read ${this.function.functionName} --gen2 --region ${this.function.region} --limit 20`
      }
    };
  }
}

import { RollbackStepModel } from "../models/rollback-step.model.js";

export class RollbackPlanService {
  buildPlan() {
    return [
      new RollbackStepModel({
        order: 1,
        command: "doctl compute load-balancer delete <lb-id>",
        reason: "Load balancer depends on backend Droplets."
      }),
      new RollbackStepModel({
        order: 2,
        command: "doctl compute firewall delete <firewall-id>",
        reason: "Firewall can be removed after traffic entrypoint is gone."
      }),
      new RollbackStepModel({
        order: 3,
        command: "doctl compute droplet delete <droplet-id-1> <droplet-id-2>",
        reason: "Droplets are leaf resources in this stack."
      })
    ];
  }
}

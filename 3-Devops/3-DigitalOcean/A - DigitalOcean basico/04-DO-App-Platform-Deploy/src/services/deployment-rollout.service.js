import { DeploymentStepModel } from "../models/deployment-step.model.js";

export class DeploymentRolloutService {
  constructor({ settings }) {
    this.settings = settings;
  }

  buildRunbook() {
    return [
      new DeploymentStepModel({
        name: "validate-spec",
        command: "doctl apps spec validate app-spec.yaml",
        purpose: "Catch spec issues before creating or updating the app."
      }),
      new DeploymentStepModel({
        name: "create-or-update",
        command: "doctl apps create --spec app-spec.yaml",
        purpose: "Provision the app with the declared GitHub source."
      }),
      new DeploymentStepModel({
        name: "watch-deployments",
        command: "doctl apps list-deployments <app-id>",
        purpose: "Check build, deploy and health-check progression."
      }),
      new DeploymentStepModel({
        name: "rollback",
        command: "doctl apps create-deployment <app-id> --force-rebuild=false",
        purpose: "Trigger a controlled redeploy if the latest rollout is unhealthy."
      })
    ];
  }
}

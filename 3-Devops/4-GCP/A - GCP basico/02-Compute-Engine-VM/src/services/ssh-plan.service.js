import { SshCheckModel } from "../models/ssh-check.model.js";

export class SshPlanService {
  constructor({ instanceSpec }) {
    this.instanceSpec = instanceSpec;
  }

  buildPlan() {
    return {
      connectCommand: `gcloud compute ssh ${this.instanceSpec.name} --zone ${this.instanceSpec.zone}`,
      firstChecks: [
        new SshCheckModel({ command: "hostnamectl", purpose: "Confirm VM identity." }),
        new SshCheckModel({ command: "systemctl status nginx --no-pager", purpose: "Check startup-installed web server." }),
        new SshCheckModel({ command: "curl -I http://127.0.0.1", purpose: "Confirm local web response." })
      ]
    };
  }
}

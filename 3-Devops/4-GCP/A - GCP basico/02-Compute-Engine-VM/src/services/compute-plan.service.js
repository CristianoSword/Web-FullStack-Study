import { FirewallRuleModel } from "../models/firewall-rule.model.js";
import { InstanceSpecModel } from "../models/instance-spec.model.js";

export class ComputePlanService {
  constructor({ instanceSpec, firewallRule }) {
    this.instanceSpec = new InstanceSpecModel(instanceSpec);
    this.firewallRule = new FirewallRuleModel(firewallRule);
  }

  buildPlan() {
    return {
      instance: this.instanceSpec,
      firewall: this.firewallRule,
      createCommand: `gcloud compute instances create ${this.instanceSpec.name} --zone ${this.instanceSpec.zone} --machine-type ${this.instanceSpec.machineType} --image-family ${this.instanceSpec.imageFamily} --image-project ${this.instanceSpec.imageProject} --metadata-from-file startup-script=startup/startup.sh --tags ${this.instanceSpec.networkTags.join(",")}`,
      note: "Compute Engine startup scripts are ideal for first-boot package installation and base web server setup."
    };
  }
}

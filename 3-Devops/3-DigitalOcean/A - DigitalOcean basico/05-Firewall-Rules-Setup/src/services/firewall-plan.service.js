import { FirewallTargetModel } from "../models/firewall-target.model.js";

export class FirewallPlanService {
  constructor({ settings, selector }) {
    this.settings = settings;
    this.selector = new FirewallTargetModel(selector);
  }

  buildPlan() {
    return {
      firewallName: this.settings.firewallName,
      tagSelector: this.selector.tagNames,
      dropletNames: this.selector.dropletNames,
      environment: this.selector.environment,
      createCommand: `doctl compute firewall create --name ${this.settings.firewallName} --tag-names ${this.settings.dropletTag}`,
      designGoal: "Allow public web traffic while keeping administrative SSH restricted."
    };
  }
}

import { DropletSpecModel } from "../models/droplet-spec.model.js";
import { SshKeyModel } from "../models/ssh-key.model.js";

export class DropletPlanService {
  constructor({ settings, dropletSpec, sshKey }) {
    this.settings = settings;
    this.droplet = new DropletSpecModel(dropletSpec);
    this.sshKey = new SshKeyModel(sshKey);
  }

  buildPlan() {
    return {
      provider: "DigitalOcean",
      droplet: this.droplet,
      sshKey: this.sshKey,
      createCommand: `doctl compute droplet create ${this.droplet.name} --region ${this.droplet.region} --image ${this.droplet.image} --size ${this.droplet.size} --ssh-keys ${this.sshKey.fingerprint} --enable-monitoring --user-data-file cloud-init/bootstrap.yaml`,
      taggingStrategy: this.droplet.tags,
      verificationCommands: this.settings.verificationCommands
    };
  }
}

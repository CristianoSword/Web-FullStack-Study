import { createSshChecklist } from "../models/ssh-checklist.model.js";

export class SshChecklistService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildChecklist() {
    const keyPair = this.env.AWS_KEY_PAIR ?? "study-ec2-key";

    return createSshChecklist({
      sshUser: this.config.sshUser,
      keyPair: `${keyPair}.pem`,
      publicIpPlaceholder: "<public-ip>",
      steps: [
        "Wait for instance status checks to pass.",
        `Run ssh -i ${keyPair}.pem ${this.config.sshUser}@<public-ip>.`,
        "Inspect cloud-init logs in /var/log/cloud-init-output.log.",
        "Confirm the bootstrap HTTP page is reachable on port 80."
      ]
    });
  }
}

import { SshKeyModel } from "../models/ssh-key.model.js";
import { SshSessionModel } from "../models/ssh-session.model.js";

export class SshAccessService {
  constructor({ sshKey }) {
    this.sshKey = new SshKeyModel(sshKey);
  }

  buildSession() {
    return new SshSessionModel({
      user: this.sshKey.loginUser,
      hostPlaceholder: "<droplet-ip>",
      privateKeyPath: this.sshKey.privateKeyPath,
      firstChecks: [
        "hostnamectl",
        "cloud-init status --wait",
        "systemctl status nginx --no-pager",
        "ufw status verbose"
      ]
    });
  }

  buildKnownHostsAdvice() {
    return {
      addHostCommand: `ssh-keyscan -H <droplet-ip> >> ~/.ssh/known_hosts`,
      openSessionCommand: `ssh -i ${this.sshKey.privateKeyPath} ${this.sshKey.loginUser}@<droplet-ip>`,
      note: "Use the saved fingerprint to confirm the first SSH handshake."
    };
  }
}

import { VerificationCheckModel } from "../models/verification-check.model.js";

export class FirewallVerificationService {
  constructor({ settings }) {
    this.settings = settings;
  }

  buildChecks() {
    return [
      new VerificationCheckModel({
        name: "ssh-allowed-from-admin",
        command: "nc -zv <droplet-ip> 22",
        expected: "Connection succeeds only from the allowed admin CIDR."
      }),
      new VerificationCheckModel({
        name: "http-public",
        command: "curl -I http://<droplet-ip>",
        expected: "HTTP remains reachable publicly."
      }),
      new VerificationCheckModel({
        name: "https-public",
        command: "curl -k -I https://<droplet-ip>",
        expected: "HTTPS remains reachable publicly when TLS is configured."
      }),
      new VerificationCheckModel({
        name: "firewall-inspection",
        command: "doctl compute firewall get <firewall-id>",
        expected: `Rule set references ${this.settings.firewallName} and correct tag selector.`
      })
    ];
  }
}

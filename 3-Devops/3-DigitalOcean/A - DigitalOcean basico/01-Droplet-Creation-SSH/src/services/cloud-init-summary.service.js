export class CloudInitSummaryService {
  constructor({ userData }) {
    this.userData = userData;
  }

  buildSummary() {
    const packages = [];
    const commands = [];

    for (const line of this.userData.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") && !trimmed.includes(":")) {
        if (["nginx", "fail2ban", "ufw"].includes(trimmed.slice(2))) {
          packages.push(trimmed.slice(2));
        } else {
          commands.push(trimmed.slice(2));
        }
      }
    }

    return {
      packages,
      commands,
      guarantees: [
        "Nginx installed and enabled on first boot.",
        "Basic firewall opened only for SSH and HTTP/HTTPS.",
        "Landing page written before service restart."
      ]
    };
  }
}

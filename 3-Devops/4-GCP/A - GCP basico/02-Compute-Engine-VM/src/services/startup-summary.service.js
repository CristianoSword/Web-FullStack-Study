export class StartupSummaryService {
  constructor({ startupScript }) {
    this.startupScript = startupScript;
  }

  buildSummary() {
    return {
      installsNginx: this.startupScript.includes("apt-get install -y nginx"),
      enablesService: this.startupScript.includes("systemctl enable nginx"),
      writesLandingPage: this.startupScript.includes("/var/www/html/index.html"),
      operatorAdvice: [
        "Use metadata startup scripts for repeatable first-boot setup.",
        "Keep scripts short and deterministic to simplify troubleshooting."
      ]
    };
  }
}

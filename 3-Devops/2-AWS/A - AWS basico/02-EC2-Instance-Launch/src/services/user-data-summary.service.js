export class UserDataSummaryService {
  constructor({ userDataScript, networkProfile }) {
    this.userDataScript = userDataScript;
    this.networkProfile = networkProfile;
  }

  buildSummary() {
    return {
      installsHttpd: this.userDataScript.includes("httpd"),
      startsHttpd: this.userDataScript.includes("systemctl start httpd"),
      ingressRules: this.networkProfile.ingress
    };
  }
}

export class AdcProfileModel {
  constructor({ credentialSource, quotaProject, serviceAccount }) {
    this.credentialSource = credentialSource;
    this.quotaProject = quotaProject;
    this.serviceAccount = serviceAccount;
  }
}

export class WorkloadIdentityBindingModel {
  constructor({ gkeNamespace, kubernetesServiceAccount, googleServiceAccount, member, role }) {
    this.gkeNamespace = gkeNamespace;
    this.kubernetesServiceAccount = kubernetesServiceAccount;
    this.googleServiceAccount = googleServiceAccount;
    this.member = member;
    this.role = role;
  }
}

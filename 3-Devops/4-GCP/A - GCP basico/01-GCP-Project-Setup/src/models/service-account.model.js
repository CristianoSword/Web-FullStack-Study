export class ServiceAccountModel {
  constructor({ accountId, displayName, roles }) {
    this.accountId = accountId;
    this.displayName = displayName;
    this.roles = roles ?? [];
  }
}

export class ServiceAccountSpecModel {
  constructor({ projectId, accountId, displayName, email, targetBucket, scopes }) {
    this.projectId = projectId;
    this.accountId = accountId;
    this.displayName = displayName;
    this.email = email;
    this.targetBucket = targetBucket;
    this.scopes = scopes;
  }
}

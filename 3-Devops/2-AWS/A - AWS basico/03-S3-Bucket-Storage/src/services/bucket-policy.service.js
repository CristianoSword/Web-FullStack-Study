export class BucketPolicyService {
  constructor({ policyDocument, config }) {
    this.policyDocument = policyDocument;
    this.config = config;
  }

  buildSummary() {
    const statement = this.policyDocument.Statement[0];

    return {
      version: this.policyDocument.Version,
      bucketName: this.config.bucketName,
      actions: Array.isArray(statement.Action) ? statement.Action : [statement.Action],
      resource: statement.Resource,
      principal: statement.Principal
    };
  }
}

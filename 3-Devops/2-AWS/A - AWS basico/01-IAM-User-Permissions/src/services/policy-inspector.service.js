export class PolicyInspectorService {
  constructor({ policyDocument }) {
    this.policyDocument = policyDocument;
  }

  buildSummary() {
    const statement = this.policyDocument.Statement[0];

    return {
      version: this.policyDocument.Version,
      statementCount: this.policyDocument.Statement.length,
      actions: statement.Action,
      effect: statement.Effect,
      resourceScope: statement.Resource
    };
  }
}

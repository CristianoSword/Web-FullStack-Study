export class OperationsPolicy {
  constructor({ requiresAuthorization, secretHeader, retentionDaysDefault }) {
    this.requiresAuthorization = requiresAuthorization;
    this.secretHeader = secretHeader;
    this.retentionDaysDefault = retentionDaysDefault;
  }

  static from(raw) {
    return new OperationsPolicy(raw);
  }
}

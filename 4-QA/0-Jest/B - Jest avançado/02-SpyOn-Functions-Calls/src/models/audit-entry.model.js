class AuditEntry {
  constructor({ action, actor, target, metadata }) {
    this.action = action;
    this.actor = actor;
    this.target = target;
    this.metadata = metadata;
  }
}

module.exports = {
  AuditEntry
};

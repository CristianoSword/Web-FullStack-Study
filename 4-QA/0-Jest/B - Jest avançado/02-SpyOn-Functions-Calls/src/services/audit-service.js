const { AuditEntry } = require("../models/audit-entry.model.js");

class AuditService {
  formatEntry(action, actor, target, metadata) {
    return new AuditEntry({
      action,
      actor,
      target,
      metadata
    });
  }

  persist(entry) {
    return {
      saved: true,
      entry
    };
  }
}

module.exports = {
  AuditService
};

import { appendSagaHistory, createSagaRecord } from "../../models/saga-state.mjs";

export class SagaStore {
  constructor() {
    this.records = new Map();
  }

  create(order) {
    const record = createSagaRecord(order);
    this.records.set(order.sagaId, record);
    return record;
  }

  update(sagaId, type, message, patch = {}) {
    const current = this.records.get(sagaId);
    if (!current) {
      return null;
    }

    const next = appendSagaHistory(current, type, message, patch);
    this.records.set(sagaId, next);
    return next;
  }

  get(sagaId) {
    return this.records.get(sagaId) ?? null;
  }

  list() {
    return Array.from(this.records.values());
  }
}

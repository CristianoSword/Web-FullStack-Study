export class RollbackStepModel {
  constructor({ order, command, reason }) {
    this.order = order;
    this.command = command;
    this.reason = reason;
  }
}

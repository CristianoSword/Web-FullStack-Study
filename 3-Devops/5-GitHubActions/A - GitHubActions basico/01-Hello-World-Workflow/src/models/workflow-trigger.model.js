export class WorkflowTriggerModel {
  constructor({ pushesTo, pullRequestsTo, manualDispatch }) {
    this.pushesTo = pushesTo;
    this.pullRequestsTo = pullRequestsTo;
    this.manualDispatch = manualDispatch;
  }
}

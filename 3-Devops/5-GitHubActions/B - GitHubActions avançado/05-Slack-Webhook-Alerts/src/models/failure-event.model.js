export class FailureEventModel {
  constructor({ workflow, job, status, repository, runUrl, commit, environment }) {
    this.workflow = workflow;
    this.job = job;
    this.status = status;
    this.repository = repository;
    this.runUrl = runUrl;
    this.commit = commit;
    this.environment = environment;
  }
}

export class AwsPipelineModel {
  constructor({ workflowName, awsRegion, accountId, repositoryName, defaultBranch, oidcRoleArn }) {
    this.workflowName = workflowName;
    this.awsRegion = awsRegion;
    this.accountId = accountId;
    this.repositoryName = repositoryName;
    this.defaultBranch = defaultBranch;
    this.oidcRoleArn = oidcRoleArn;
  }
}

export class ProjectLinkTemplate {
  constructor({ orgId, projectId, projectName }) {
    this.orgId = orgId;
    this.projectId = projectId;
    this.projectName = projectName;
  }

  static from(raw) {
    return new ProjectLinkTemplate(raw);
  }
}

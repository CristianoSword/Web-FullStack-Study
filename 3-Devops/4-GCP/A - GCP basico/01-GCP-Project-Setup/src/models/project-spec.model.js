export class ProjectSpecModel {
  constructor({ projectId, projectName, folderId, labels, defaultRegion, defaultZone }) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.folderId = folderId;
    this.labels = labels ?? {};
    this.defaultRegion = defaultRegion;
    this.defaultZone = defaultZone;
  }
}

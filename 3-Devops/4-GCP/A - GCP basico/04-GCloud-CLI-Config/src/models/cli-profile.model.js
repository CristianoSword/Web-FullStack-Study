export class CliProfileModel {
  constructor({ name, projectId, accountEmail, region, zone, disableUsageReporting }) {
    this.name = name;
    this.projectId = projectId;
    this.accountEmail = accountEmail;
    this.region = region;
    this.zone = zone;
    this.disableUsageReporting = disableUsageReporting;
  }
}

export class InstanceSpecModel {
  constructor({ name, machineType, zone, imageFamily, imageProject, bootDiskGb, networkTags, serviceAccount }) {
    this.name = name;
    this.machineType = machineType;
    this.zone = zone;
    this.imageFamily = imageFamily;
    this.imageProject = imageProject;
    this.bootDiskGb = bootDiskGb;
    this.networkTags = networkTags ?? [];
    this.serviceAccount = serviceAccount;
  }
}

export class SqlInstanceSpecModel {
  constructor({ instanceName, databaseVersion, region, tier, availabilityType, storageType, storageGb, deletionProtection, backupStartTime }) {
    this.instanceName = instanceName;
    this.databaseVersion = databaseVersion;
    this.region = region;
    this.tier = tier;
    this.availabilityType = availabilityType;
    this.storageType = storageType;
    this.storageGb = storageGb;
    this.deletionProtection = deletionProtection;
    this.backupStartTime = backupStartTime;
  }
}

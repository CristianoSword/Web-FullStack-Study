export class ClusterSpecModel {
  constructor({ name, engine, version, region, size, nodeCount, privateNetworkUuid, maintenanceWindow, standbyRegion }) {
    this.name = name;
    this.engine = engine;
    this.version = version;
    this.region = region;
    this.size = size;
    this.nodeCount = nodeCount;
    this.privateNetworkUuid = privateNetworkUuid;
    this.maintenanceWindow = maintenanceWindow;
    this.standbyRegion = standbyRegion;
  }
}

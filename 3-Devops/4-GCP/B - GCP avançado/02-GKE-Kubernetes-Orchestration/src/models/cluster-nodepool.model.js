export class ClusterNodePoolModel {
  constructor({ name, machineType, minNodes, maxNodes, diskSizeGb, diskType, preemptible, labels }) {
    this.name = name;
    this.machineType = machineType;
    this.minNodes = minNodes;
    this.maxNodes = maxNodes;
    this.diskSizeGb = diskSizeGb;
    this.diskType = diskType;
    this.preemptible = preemptible;
    this.labels = labels;
  }
}

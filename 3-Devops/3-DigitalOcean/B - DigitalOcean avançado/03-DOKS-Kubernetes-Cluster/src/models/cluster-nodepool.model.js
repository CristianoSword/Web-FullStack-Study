export class ClusterNodepoolModel {
  constructor({ name, size, autoScale, minNodes, maxNodes }) {
    this.name = name;
    this.size = size;
    this.autoScale = autoScale;
    this.minNodes = minNodes;
    this.maxNodes = maxNodes;
  }
}

export class MerkleTree {
  constructor({
    leaves = [],
    levels = [],
    root = null
  } = {}) {
    this.leaves = leaves;
    this.levels = levels;
    this.root = root;
  }
}

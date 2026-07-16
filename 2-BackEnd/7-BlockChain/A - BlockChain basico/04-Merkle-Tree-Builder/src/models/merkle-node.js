export class MerkleNode {
  constructor({
    hash,
    left = null,
    right = null,
    level = 0,
    data = null
  } = {}) {
    this.hash = hash;
    this.left = left;
    this.right = right;
    this.level = level;
    this.data = data;
  }
}

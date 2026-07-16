export class MerkleProof {
  constructor({
    leaf,
    leafHash,
    root,
    siblings = []
  } = {}) {
    this.leaf = leaf;
    this.leafHash = leafHash;
    this.root = root;
    this.siblings = siblings;
  }
}

export class ChainBlock {
  constructor({
    index,
    previousHash,
    hash,
    data,
    timestamp
  } = {}) {
    this.index = index;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

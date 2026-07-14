export class Block {
  constructor({
    index,
    previousHash,
    timestamp,
    transactions,
    nonce = 0,
    hash = ""
  }) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = nonce;
    this.hash = hash;
  }
}

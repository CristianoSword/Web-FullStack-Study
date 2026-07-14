export class BlockchainState {
  constructor({ chain = [], pendingTransactions = [], minedBlocks = 0 } = {}) {
    this.chain = chain;
    this.pendingTransactions = pendingTransactions;
    this.minedBlocks = minedBlocks;
  }
}

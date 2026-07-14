import crypto from "node:crypto";
import { blockchainConfig } from "../config.js";
import { Block } from "../models/block.js";
import { BlockchainState } from "../models/blockchain-state.js";
import { Transaction } from "../models/transaction.js";

export class Blockchain {
  constructor() {
    this.config = blockchainConfig;
    this.state = new BlockchainState({
      chain: [this.createGenesisBlock()],
      pendingTransactions: [],
      minedBlocks: 0
    });
  }

  createGenesisBlock() {
    const genesisBlock = new Block({
      index: 0,
      previousHash: "0".repeat(64),
      timestamp: this.config.genesisTimestamp,
      transactions: [new Transaction({ from: "network", to: "genesis", amount: 0, memo: "Genesis block" })]
    });

    genesisBlock.hash = this.calculateHash(genesisBlock);
    return genesisBlock;
  }

  getLatestBlock() {
    return this.state.chain.at(-1);
  }

  addTransaction(transaction) {
    const normalizedTransaction = new Transaction(transaction);

    if (!normalizedTransaction.from || !normalizedTransaction.to) {
      throw new Error("Transactions require both sender and recipient addresses.");
    }

    if (!Number.isFinite(normalizedTransaction.amount) || normalizedTransaction.amount <= 0) {
      throw new Error("Transactions require a positive numeric amount.");
    }

    this.state.pendingTransactions.push(normalizedTransaction);
  }

  minePendingTransactions(minerAddress) {
    if (!minerAddress) {
      throw new Error("A miner address is required to collect the mining reward.");
    }

    if (this.state.pendingTransactions.length === 0) {
      throw new Error("There are no pending transactions to mine.");
    }

    const transactions = [
      ...this.state.pendingTransactions,
      new Transaction({
        from: "network",
        to: minerAddress,
        amount: this.config.miningReward,
        memo: "Mining reward"
      })
    ];

    const block = new Block({
      index: this.state.chain.length,
      previousHash: this.getLatestBlock().hash,
      timestamp: new Date().toISOString(),
      transactions
    });

    this.proofOfWork(block);
    this.state.chain.push(block);
    this.state.pendingTransactions = [];
    this.state.minedBlocks += 1;
    return block;
  }

  calculateHash(block) {
    return crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          index: block.index,
          previousHash: block.previousHash,
          timestamp: block.timestamp,
          transactions: block.transactions,
          nonce: block.nonce
        })
      )
      .digest("hex");
  }

  proofOfWork(block) {
    const targetPrefix = "0".repeat(this.config.difficulty);
    do {
      block.nonce += 1;
      block.hash = this.calculateHash(block);
    } while (!block.hash.startsWith(targetPrefix));
  }

  isChainValid() {
    for (let index = 1; index < this.state.chain.length; index += 1) {
      const currentBlock = this.state.chain[index];
      const previousBlock = this.state.chain[index - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

import { Blockchain } from "./services/blockchain.js";

const blockchain = new Blockchain();
console.log(`Blockchain bootstrapped with genesis hash ${blockchain.getLatestBlock().hash}`);

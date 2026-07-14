import { Blockchain } from "./services/blockchain.js";

const blockchain = new Blockchain();
const command = process.argv[2] ?? "help";

switch (command) {
  case "demo":
    blockchain.addTransaction({ from: "alice", to: "bob", amount: 15, memo: "Invoice #1001" });
    blockchain.addTransaction({ from: "carol", to: "dave", amount: 22, memo: "Payroll" });
    console.log("Mining pending transactions...");
    console.log(blockchain.minePendingTransactions("miner-01"));
    break;
  case "chain":
    console.log(JSON.stringify(blockchain.state.chain, null, 2));
    break;
  case "add-tx":
    blockchain.addTransaction({
      from: process.argv[3],
      to: process.argv[4],
      amount: Number(process.argv[5]),
      memo: process.argv[6] ?? ""
    });
    console.log(JSON.stringify(blockchain.state.pendingTransactions, null, 2));
    break;
  case "mine":
    console.log(blockchain.minePendingTransactions(process.argv[3] ?? "miner-01"));
    break;
  default:
    console.log("Commands:");
    console.log("  npm run demo");
    console.log("  npm run chain");
    console.log("  node src/index.js add-tx <from> <to> <amount> [memo]");
    console.log("  node src/index.js mine <minerAddress>");
    break;
}

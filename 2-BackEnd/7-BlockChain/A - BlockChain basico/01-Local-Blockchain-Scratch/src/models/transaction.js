export class Transaction {
  constructor({ from, to, amount, memo = "" }) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.memo = memo;
  }
}

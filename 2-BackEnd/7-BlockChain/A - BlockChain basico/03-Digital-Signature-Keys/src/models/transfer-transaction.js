export class TransferTransaction {
  constructor({
    fromAddress,
    toAddress,
    amount,
    fee = 0,
    memo = "",
    nonce,
    timestamp
  } = {}) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.fee = fee;
    this.memo = memo;
    this.nonce = nonce;
    this.timestamp = timestamp;
  }
}

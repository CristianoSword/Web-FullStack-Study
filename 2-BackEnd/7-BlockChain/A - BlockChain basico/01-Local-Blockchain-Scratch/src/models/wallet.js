export class Wallet {
  constructor({ address, balance = 0 }) {
    this.address = address;
    this.balance = balance;
  }
}

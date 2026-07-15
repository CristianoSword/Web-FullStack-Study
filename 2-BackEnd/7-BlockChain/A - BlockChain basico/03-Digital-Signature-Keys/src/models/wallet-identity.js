export class WalletIdentity {
  constructor({
    owner,
    curve = "secp256k1",
    publicKey,
    privateKey,
    address
  } = {}) {
    this.owner = owner;
    this.curve = curve;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.address = address;
  }
}

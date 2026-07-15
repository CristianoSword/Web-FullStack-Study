export class SignedTransaction {
  constructor({
    transaction,
    signature,
    algorithm = "sha256",
    signerPublicKey
  } = {}) {
    this.transaction = transaction;
    this.signature = signature;
    this.algorithm = algorithm;
    this.signerPublicKey = signerPublicKey;
  }
}

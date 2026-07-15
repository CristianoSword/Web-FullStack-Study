import crypto from "node:crypto";
import { SignedTransaction } from "../models/signed-transaction.js";
import { TransferTransaction } from "../models/transfer-transaction.js";
import { WalletIdentity } from "../models/wallet-identity.js";

export class SignatureService {
  constructor() {
    this.defaultCurve = "secp256k1";
    this.defaultAlgorithm = "sha256";
  }

  generateWallet({ owner, curve = this.defaultCurve } = {}) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: curve,
      publicKeyEncoding: {
        type: "spki",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
      }
    });

    const address = this.createAddress(publicKey);

    return new WalletIdentity({
      owner,
      curve,
      publicKey,
      privateKey,
      address
    });
  }

  createAddress(publicKey) {
    return crypto
      .createHash("sha256")
      .update(publicKey)
      .digest("hex")
      .slice(0, 40);
  }

  createTransaction(input) {
    return new TransferTransaction({
      ...input,
      nonce: input?.nonce ?? crypto.randomUUID(),
      timestamp: input?.timestamp ?? new Date().toISOString()
    });
  }

  serializeTransaction(transactionInput) {
    const transaction = new TransferTransaction(transactionInput);

    return JSON.stringify({
      amount: transaction.amount,
      fee: transaction.fee,
      fromAddress: transaction.fromAddress,
      memo: transaction.memo,
      nonce: transaction.nonce,
      timestamp: transaction.timestamp,
      toAddress: transaction.toAddress
    });
  }

  digestTransaction(transactionInput, algorithm = this.defaultAlgorithm) {
    return crypto
      .createHash(algorithm)
      .update(this.serializeTransaction(transactionInput))
      .digest("hex");
  }

  signTransaction(transactionInput, privateKey, signerPublicKey) {
    const transaction = this.createTransaction(transactionInput);
    const signer = crypto.createSign("SHA256");
    signer.update(this.serializeTransaction(transaction));
    signer.end();

    return new SignedTransaction({
      transaction,
      algorithm: this.defaultAlgorithm,
      signerPublicKey,
      signature: signer.sign(privateKey, "hex")
    });
  }

  verifySignedTransaction(signedTransaction) {
    const verifier = crypto.createVerify("SHA256");
    verifier.update(this.serializeTransaction(signedTransaction.transaction));
    verifier.end();

    return verifier.verify(
      signedTransaction.signerPublicKey,
      signedTransaction.signature,
      "hex"
    );
  }
}

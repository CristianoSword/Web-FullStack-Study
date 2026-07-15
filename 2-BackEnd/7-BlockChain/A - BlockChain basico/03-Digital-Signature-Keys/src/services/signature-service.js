import crypto from "node:crypto";
import { SignedTransaction } from "../models/signed-transaction.js";
import { TransferTransaction } from "../models/transfer-transaction.js";
import { WalletIdentity } from "../models/wallet-identity.js";

export class SignatureService {
  constructor() {
    this.defaultCurve = "secp256k1";
    this.defaultAlgorithm = "sha256";
    this.supportedCurves = ["secp256k1", "prime256v1"];
  }

  generateWallet({ owner, curve = this.defaultCurve } = {}) {
    this.assertOwner(owner);
    this.assertCurve(curve);

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

  assertOwner(owner) {
    if (typeof owner !== "string" || owner.trim().length < 2) {
      throw new Error("Owner must be a string with at least 2 characters.");
    }
  }

  assertCurve(curve) {
    if (!this.supportedCurves.includes(curve)) {
      throw new Error(
        `Unsupported curve "${curve}". Use one of: ${this.supportedCurves.join(", ")}`
      );
    }
  }

  assertPemKey(key, label) {
    if (typeof key !== "string" || !key.includes("BEGIN")) {
      throw new Error(`${label} must be a PEM-encoded key.`);
    }
  }

  assertAddress(address, label) {
    if (typeof address !== "string" || !/^[a-f0-9]{40}$/i.test(address)) {
      throw new Error(`${label} must be a 40-character hexadecimal address.`);
    }
  }

  assertTransaction(transaction) {
    this.assertAddress(transaction.fromAddress, "Transaction fromAddress");
    this.assertAddress(transaction.toAddress, "Transaction toAddress");

    if (transaction.fromAddress === transaction.toAddress) {
      throw new Error("Transaction must target a different recipient address.");
    }

    if (typeof transaction.amount !== "number" || !Number.isFinite(transaction.amount) || transaction.amount <= 0) {
      throw new Error("Transaction amount must be a positive number.");
    }

    if (typeof transaction.fee !== "number" || !Number.isFinite(transaction.fee) || transaction.fee < 0) {
      throw new Error("Transaction fee must be zero or a positive number.");
    }

    if (typeof transaction.memo !== "string" || transaction.memo.length > 140) {
      throw new Error("Transaction memo must be a string with up to 140 characters.");
    }

    if (typeof transaction.nonce !== "string" || transaction.nonce.trim().length === 0) {
      throw new Error("Transaction nonce must be a non-empty string.");
    }

    if (typeof transaction.timestamp !== "string" || Number.isNaN(Date.parse(transaction.timestamp))) {
      throw new Error("Transaction timestamp must be a valid ISO date string.");
    }
  }

  createAddress(publicKey) {
    return crypto
      .createHash("sha256")
      .update(publicKey)
      .digest("hex")
      .slice(0, 40);
  }

  createTransaction(input) {
    const transaction = new TransferTransaction({
      ...input,
      nonce: input?.nonce ?? crypto.randomUUID(),
      timestamp: input?.timestamp ?? new Date().toISOString()
    });

    this.assertTransaction(transaction);
    return transaction;
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
    this.assertPemKey(privateKey, "Private key");
    this.assertPemKey(signerPublicKey, "Signer public key");
    const transaction = this.createTransaction(transactionInput);
    const derivedAddress = this.createAddress(signerPublicKey);

    if (derivedAddress !== transaction.fromAddress) {
      throw new Error(
        "Signer public key does not match the transaction fromAddress."
      );
    }

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
    if (!signedTransaction?.transaction) {
      throw new Error("Signed transaction payload must include a transaction object.");
    }

    this.assertPemKey(signedTransaction.signerPublicKey, "Signer public key");
    if (typeof signedTransaction.signature !== "string" || signedTransaction.signature.trim().length === 0) {
      throw new Error("Signed transaction must include a non-empty signature.");
    }

    this.assertTransaction(new TransferTransaction(signedTransaction.transaction));

    const derivedAddress = this.createAddress(signedTransaction.signerPublicKey);
    if (derivedAddress !== signedTransaction.transaction.fromAddress) {
      return false;
    }

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

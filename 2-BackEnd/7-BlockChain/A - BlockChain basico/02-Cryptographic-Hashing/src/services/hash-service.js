import crypto from "node:crypto";
import { HashRequest } from "../models/hash-request.js";
import { HashResult } from "../models/hash-result.js";

export class HashService {
  constructor() {
    this.supportedAlgorithms = ["sha256", "sha384", "sha512"];
  }

  assertSupportedAlgorithm(algorithm) {
    if (!this.supportedAlgorithms.includes(algorithm)) {
      throw new Error(
        `Unsupported algorithm "${algorithm}". Use one of: ${this.supportedAlgorithms.join(", ")}`
      );
    }
  }

  assertPayload(payload) {
    if (typeof payload !== "string" || payload.trim().length === 0) {
      throw new Error("Payload must be a non-empty string.");
    }
  }

  assertSalt(salt) {
    if (typeof salt !== "string") {
      throw new Error("Salt must be a string.");
    }
  }

  assertDigest(digest, algorithm) {
    if (typeof digest !== "string" || digest.trim().length === 0) {
      throw new Error("Digest must be a non-empty hex string.");
    }

    const expectedHexLength = {
      sha256: 64,
      sha384: 96,
      sha512: 128
    }[algorithm];

    if (!/^[a-f0-9]+$/i.test(digest) || digest.length !== expectedHexLength) {
      throw new Error(
        `Digest must be a ${expectedHexLength}-character hexadecimal value for ${algorithm}.`
      );
    }
  }

  hashText(input) {
    const request = new HashRequest(input);
    this.assertSupportedAlgorithm(request.algorithm);
    this.assertPayload(request.payload);
    this.assertSalt(request.salt);
    const digest = crypto
      .createHash(request.algorithm)
      .update(`${request.salt}:${request.payload}`)
      .digest("hex");

    return new HashResult({
      algorithm: request.algorithm,
      payload: request.payload,
      digest,
      salt: request.salt
    });
  }

  verify({ payload, salt = "", digest, algorithm = "sha256" }) {
    this.assertSupportedAlgorithm(algorithm);
    this.assertPayload(payload);
    this.assertSalt(salt);
    this.assertDigest(digest, algorithm);

    const generated = this.hashText({ payload, salt, algorithm });
    const expected = Buffer.from(generated.digest, "hex");
    const provided = Buffer.from(digest, "hex");

    return (
      expected.length === provided.length &&
      crypto.timingSafeEqual(expected, provided)
    );
  }

  compareHashes(leftInput, rightInput) {
    const left = this.hashText(leftInput);
    const right = this.hashText(rightInput);

    return {
      left,
      right,
      sameDigest:
        left.digest.length === right.digest.length &&
        crypto.timingSafeEqual(
          Buffer.from(left.digest, "hex"),
          Buffer.from(right.digest, "hex")
        )
    };
  }
}

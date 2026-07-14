import crypto from "node:crypto";
import { HashRequest } from "../models/hash-request.js";
import { HashResult } from "../models/hash-result.js";

export class HashService {
  hashText(input) {
    const request = new HashRequest(input);
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
    const generated = this.hashText({ payload, salt, algorithm });
    return generated.digest === digest;
  }
}

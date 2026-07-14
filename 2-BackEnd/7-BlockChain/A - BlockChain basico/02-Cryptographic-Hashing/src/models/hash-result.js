export class HashResult {
  constructor({ algorithm, payload, digest, salt }) {
    this.algorithm = algorithm;
    this.payload = payload;
    this.digest = digest;
    this.salt = salt;
  }
}

export class HashRequest {
  constructor({ algorithm = "sha256", payload = "", salt = "" } = {}) {
    this.algorithm = algorithm;
    this.payload = payload;
    this.salt = salt;
  }
}

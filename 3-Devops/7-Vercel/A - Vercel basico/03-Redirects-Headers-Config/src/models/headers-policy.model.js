export class HeadersPolicy {
  constructor({ globalHeaders, assetHeaders }) {
    this.globalHeaders = globalHeaders;
    this.assetHeaders = assetHeaders;
  }

  static from(raw) {
    return new HeadersPolicy(raw);
  }
}

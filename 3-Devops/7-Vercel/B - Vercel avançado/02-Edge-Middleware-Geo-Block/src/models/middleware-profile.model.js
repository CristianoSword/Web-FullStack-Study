export class MiddlewareProfile {
  constructor({ matcher, decisionHeader, blockedPage }) {
    this.matcher = matcher;
    this.decisionHeader = decisionHeader;
    this.blockedPage = blockedPage;
  }

  static from(raw) {
    return new MiddlewareProfile(raw);
  }
}

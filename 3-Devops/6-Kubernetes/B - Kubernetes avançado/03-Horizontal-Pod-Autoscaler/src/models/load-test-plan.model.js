export class LoadTestPlan {
  constructor({ concurrency, requests, requestPath, expectedBehavior }) {
    this.concurrency = concurrency;
    this.requests = requests;
    this.requestPath = requestPath;
    this.expectedBehavior = expectedBehavior;
  }

  static from(raw) {
    return new LoadTestPlan(raw);
  }
}

export class AccessFlowModel {
  constructor({ entrypoint, localCheck, expectedHttpStatus, browserPath }) {
    this.entrypoint = entrypoint;
    this.localCheck = localCheck;
    this.expectedHttpStatus = expectedHttpStatus;
    this.browserPath = browserPath;
  }
}

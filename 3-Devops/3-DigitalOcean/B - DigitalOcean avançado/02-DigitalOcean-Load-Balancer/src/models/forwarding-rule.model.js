export class ForwardingRuleModel {
  constructor({ entryProtocol, entryPort, targetProtocol, targetPort, certificateId }) {
    this.entryProtocol = entryProtocol;
    this.entryPort = entryPort;
    this.targetProtocol = targetProtocol;
    this.targetPort = targetPort;
    this.certificateId = certificateId;
  }
}

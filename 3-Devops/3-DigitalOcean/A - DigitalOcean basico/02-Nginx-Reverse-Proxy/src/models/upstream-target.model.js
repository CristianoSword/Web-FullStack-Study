export class UpstreamTargetModel {
  constructor({ host, port, weight }) {
    this.host = host;
    this.port = port;
    this.weight = weight ?? 1;
  }
}

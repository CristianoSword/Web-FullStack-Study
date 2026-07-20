export class PeerNode {
  constructor({
    id,
    name,
    port,
    knownPeers = []
  } = {}) {
    this.id = id;
    this.name = name;
    this.port = port;
    this.knownPeers = knownPeers;
  }
}

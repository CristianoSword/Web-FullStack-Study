export class SyncMessage {
  constructor({
    type,
    senderId,
    payload = {}
  } = {}) {
    this.type = type;
    this.senderId = senderId;
    this.payload = payload;
  }
}

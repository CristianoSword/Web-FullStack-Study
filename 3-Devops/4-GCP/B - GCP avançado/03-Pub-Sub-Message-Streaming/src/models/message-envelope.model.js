export class MessageEnvelopeModel {
  constructor({ eventId, eventType, occurredAt, order, attributes }) {
    this.eventId = eventId;
    this.eventType = eventType;
    this.occurredAt = occurredAt;
    this.order = order;
    this.attributes = attributes;
  }
}

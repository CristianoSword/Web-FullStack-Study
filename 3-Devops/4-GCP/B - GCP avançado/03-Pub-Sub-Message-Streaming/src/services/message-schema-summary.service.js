export class MessageSchemaSummaryService {
  constructor({ eventSchema }) {
    this.eventSchema = eventSchema;
  }

  buildSummary() {
    return {
      schemaName: this.eventSchema.schemaName,
      requiredFields: this.eventSchema.required,
      allowedEventTypes: this.eventSchema.properties.eventType.enum,
      orderFields: this.eventSchema.properties.order.required
    };
  }
}

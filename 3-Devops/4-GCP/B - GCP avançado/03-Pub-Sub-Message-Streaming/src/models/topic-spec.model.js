export class TopicSpecModel {
  constructor({ projectId, topicName, deadLetterTopic, schemaName, schemaType, messageRetentionDuration, labels }) {
    this.projectId = projectId;
    this.topicName = topicName;
    this.deadLetterTopic = deadLetterTopic;
    this.schemaName = schemaName;
    this.schemaType = schemaType;
    this.messageRetentionDuration = messageRetentionDuration;
    this.labels = labels;
  }
}

export class SubscriptionSpecModel {
  constructor({ name, ackDeadlineSeconds, filter, maxDeliveryAttempts, deadLetterTopic, retryPolicy, retainAckedMessages }) {
    this.name = name;
    this.ackDeadlineSeconds = ackDeadlineSeconds;
    this.filter = filter;
    this.maxDeliveryAttempts = maxDeliveryAttempts;
    this.deadLetterTopic = deadLetterTopic;
    this.retryPolicy = retryPolicy;
    this.retainAckedMessages = retainAckedMessages ?? false;
  }
}

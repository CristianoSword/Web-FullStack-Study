import { SubscriptionSpecModel } from "../models/subscription-spec.model.js";
import { TopicSpecModel } from "../models/topic-spec.model.js";

export class PubSubPlanService {
  constructor({ topicSpec, subscriptionSpec }) {
    this.topicSpec = new TopicSpecModel(topicSpec);
    this.subscriptions = Object.values(subscriptionSpec).map((subscription) => new SubscriptionSpecModel(subscription));
  }

  buildPlan() {
    return {
      topic: {
        name: this.topicSpec.topicName,
        projectId: this.topicSpec.projectId,
        deadLetterTopic: this.topicSpec.deadLetterTopic,
        schemaName: this.topicSpec.schemaName,
        retention: this.topicSpec.messageRetentionDuration
      },
      subscriptions: this.subscriptions,
      commands: {
        createTopic: `gcloud pubsub topics create ${this.topicSpec.topicName} --project ${this.topicSpec.projectId} --message-retention-duration ${this.topicSpec.messageRetentionDuration}`,
        createDeadLetterTopic: `gcloud pubsub topics create ${this.topicSpec.deadLetterTopic} --project ${this.topicSpec.projectId}`,
        createSchema: `gcloud pubsub schemas create ${this.topicSpec.schemaName} --type=${this.topicSpec.schemaType.toLowerCase()} --definition-file=config/event-schema.json`,
        createPullSubscription: `gcloud pubsub subscriptions create ${this.subscriptions[0].name} --topic ${this.topicSpec.topicName} --ack-deadline ${this.subscriptions[0].ackDeadlineSeconds} --dead-letter-topic ${this.topicSpec.deadLetterTopic} --max-delivery-attempts ${this.subscriptions[0].maxDeliveryAttempts}`,
        publishMessages: "node publisher/publish-order-events.js"
      }
    };
  }
}

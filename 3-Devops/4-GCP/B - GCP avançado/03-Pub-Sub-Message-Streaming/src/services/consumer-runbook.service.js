export class ConsumerRunbookService {
  constructor({ topicSpec, subscriptionSpec }) {
    this.topicSpec = topicSpec;
    this.subscriptionSpec = subscriptionSpec;
  }

  buildRunbook() {
    const { topicSpec, subscriptionSpec } = this;

    return [
      {
        name: "create-topics",
        command: `gcloud pubsub topics create ${topicSpec.topicName} && gcloud pubsub topics create ${topicSpec.deadLetterTopic}`,
        purpose: "Provisiona o topico principal e o dead-letter topic."
      },
      {
        name: "register-schema",
        command: `gcloud pubsub schemas create ${topicSpec.schemaName} --type=${topicSpec.schemaType.toLowerCase()} --definition-file=config/event-schema.json`,
        purpose: "Registra o contrato JSON dos eventos."
      },
      {
        name: "create-subscriptions",
        command: `gcloud pubsub subscriptions create ${subscriptionSpec.pullSubscription.name} --topic ${topicSpec.topicName} --dead-letter-topic ${topicSpec.deadLetterTopic} --max-delivery-attempts ${subscriptionSpec.pullSubscription.maxDeliveryAttempts}`,
        purpose: "Cria a subscription pull principal com politica de dead-letter."
      },
      {
        name: "publish-sample-events",
        command: "node publisher/publish-order-events.js",
        purpose: "Publica os eventos de exemplo no topico."
      },
      {
        name: "monitor-backlog",
        command: `node subscriber/pull-worker.js && gcloud pubsub subscriptions describe ${subscriptionSpec.pullSubscription.name}`,
        purpose: "Consome mensagens, aplica ack/nack e acompanha backlog."
      }
    ];
  }
}

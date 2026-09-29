import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: "kafka-topic-partition-explorer",
    brokers: [config.broker],
    logLevel: logLevel.NOTHING
  });
}


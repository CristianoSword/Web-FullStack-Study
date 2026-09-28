import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: "kafka-producer-consumer-cli",
    brokers: [config.broker],
    logLevel: logLevel.NOTHING
  });
}

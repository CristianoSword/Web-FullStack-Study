import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: config.bridgeName,
    brokers: [config.broker],
    logLevel: logLevel.NOTHING
  });
}

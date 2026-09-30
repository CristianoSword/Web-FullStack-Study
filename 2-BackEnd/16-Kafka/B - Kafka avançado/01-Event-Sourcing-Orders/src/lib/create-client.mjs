import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: config.serviceName,
    brokers: [config.broker],
    logLevel: logLevel.NOTHING
  });
}

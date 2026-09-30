import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: "kafka-consumer-group-balancer",
    brokers: config.brokers,
    logLevel: logLevel.NOTHING
  });
}

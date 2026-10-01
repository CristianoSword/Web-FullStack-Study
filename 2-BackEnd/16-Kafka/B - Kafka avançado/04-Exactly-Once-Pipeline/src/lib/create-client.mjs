import { Kafka, logLevel } from "kafkajs";

export function createKafkaClient(config) {
  return new Kafka({
    clientId: config.serviceName,
    brokers: config.brokers,
    logLevel: logLevel.NOTHING,
    retry: {
      retries: 5
    }
  });
}

export function createTransactionalProducer(kafka, config) {
  return kafka.producer({
    idempotent: true,
    maxInFlightRequests: 1,
    transactionalId: config.transactionalId
  });
}

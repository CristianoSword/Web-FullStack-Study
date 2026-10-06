import amqplib from "amqplib";

export async function createRabbitConnection(config) {
  return amqplib.connect(config.amqpUrl);
}

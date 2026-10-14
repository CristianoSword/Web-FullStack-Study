export const observabilityTopology = {
  exchange: "observability.events.exchange",
  queue: "observability.jobs",
  routingKey: "observability.job"
};

export const assertObservabilityTopology = async (channel) => {
  await channel.assertExchange(observabilityTopology.exchange, "direct", { durable: true });
  await channel.assertQueue(observabilityTopology.queue, { durable: true });
  await channel.bindQueue(
    observabilityTopology.queue,
    observabilityTopology.exchange,
    observabilityTopology.routingKey
  );
};

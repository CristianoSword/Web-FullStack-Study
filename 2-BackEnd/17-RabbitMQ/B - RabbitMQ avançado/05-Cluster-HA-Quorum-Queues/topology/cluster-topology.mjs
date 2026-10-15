export const clusterTopology = {
  exchange: "cluster.events",
  queue: "cluster.orders.quorum",
  deadLetterExchange: "cluster.dlx",
  deadLetterQueue: "cluster.orders.dlq",
  routingKey: "cluster.order",
  deadLetterRoutingKey: "cluster.order.dead"
};

export const assertClusterTopology = async (channel) => {
  await channel.assertExchange(clusterTopology.exchange, "direct", { durable: true });
  await channel.assertExchange(clusterTopology.deadLetterExchange, "direct", { durable: true });

  await channel.assertQueue(clusterTopology.queue, {
    durable: true,
    arguments: {
      "x-queue-type": "quorum",
      "x-delivery-limit": 5,
      "x-dead-letter-exchange": clusterTopology.deadLetterExchange
    }
  });

  await channel.assertQueue(clusterTopology.deadLetterQueue, {
    durable: true
  });

  await channel.bindQueue(clusterTopology.queue, clusterTopology.exchange, clusterTopology.routingKey);
  await channel.bindQueue(
    clusterTopology.deadLetterQueue,
    clusterTopology.deadLetterExchange,
    clusterTopology.deadLetterRoutingKey
  );
};

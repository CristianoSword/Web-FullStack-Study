export const clusterNodes = [
  {
    name: "rabbit@rabbitmq-1",
    hostname: "rabbitmq-1",
    amqpPort: 5672,
    managementPort: 15672,
    role: "seed"
  },
  {
    name: "rabbit@rabbitmq-2",
    hostname: "rabbitmq-2",
    amqpPort: 5673,
    managementPort: 15673,
    role: "replica"
  },
  {
    name: "rabbit@rabbitmq-3",
    hostname: "rabbitmq-3",
    amqpPort: 5674,
    managementPort: 15674,
    role: "replica"
  }
];

export const summarizeNodeHealth = (nodes = []) =>
  nodes.map((node) => ({
    name: node.name,
    hostname: node.hostname,
    role: node.role,
    running: Boolean(node.running),
    partitions: node.partitions ?? []
  }));

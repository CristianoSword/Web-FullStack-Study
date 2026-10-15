export const quorumPolicy = {
  name: "ha-quorum-all",
  pattern: "^cluster\\.",
  definition: {
    "queue-type": "quorum",
    "delivery-limit": 5,
    "dead-letter-exchange": "cluster.dlx"
  },
  applyTo: "queues",
  priority: 50
};

export const failoverChecklist = [
  "Confirm all three nodes share the same Erlang cookie.",
  "Verify quorum queue leader and online members through the management API.",
  "Pause minority partitions to avoid split-brain writes.",
  "Republish through the surviving node if the original AMQP entrypoint is unavailable."
];

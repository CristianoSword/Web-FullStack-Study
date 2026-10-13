export const priorityTopology = {
  exchanges: {
    scheduler: "scheduler.jobs.exchange",
    audit: "scheduler.audit.exchange"
  },
  queues: {
    priority: "scheduler.jobs.priority",
    audit: "scheduler.jobs.audit"
  },
  routingKeys: {
    dispatch: "scheduler.dispatch",
    audit: "scheduler.audit"
  }
};

export const assertPriorityTopology = async (channel, schedulerConfig) => {
  await channel.assertExchange(priorityTopology.exchanges.scheduler, "direct", { durable: true });
  await channel.assertExchange(priorityTopology.exchanges.audit, "fanout", { durable: true });

  await channel.assertQueue(priorityTopology.queues.priority, {
    durable: true,
    maxPriority: schedulerConfig.maxPriority
  });

  await channel.assertQueue(priorityTopology.queues.audit, {
    durable: true
  });

  await channel.bindQueue(
    priorityTopology.queues.priority,
    priorityTopology.exchanges.scheduler,
    priorityTopology.routingKeys.dispatch
  );

  await channel.bindQueue(
    priorityTopology.queues.audit,
    priorityTopology.exchanges.audit,
    priorityTopology.routingKeys.audit
  );
};

export function buildWorkloadMessages(config) {
  return Array.from({ length: config.partitions * 3 }, (_, index) => {
    const partition = index % config.partitions;

    return {
      key: `task-${String(index + 1).padStart(3, "0")}`,
      partition,
      value: JSON.stringify({
        taskId: `task-${String(index + 1).padStart(3, "0")}`,
        partition,
        workload: partition % 2 === 0 ? "inventory-sync" : "billing-close",
        createdAt: new Date().toISOString()
      })
    };
  });
}

export function buildRebalanceEvent({ workerId, eventType, topic, partitions }) {
  return {
    eventId: `${workerId}-${eventType}-${Date.now()}`,
    workerId,
    eventType,
    topic,
    partitions,
    timestamp: new Date().toISOString()
  };
}

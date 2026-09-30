function createEventRecord(payload, defaultPartition) {
  const publishedAt = new Date().toISOString();

  return {
    eventId: `${payload.source}-${payload.eventType}-${Date.now()}`,
    eventType: payload.eventType,
    source: payload.source,
    partition: payload.partition ?? defaultPartition,
    payload: payload.payload,
    publishedAt
  };
}

export function createBridgeService({ config, admin, producer, eventStore }) {
  return {
    async bootstrapTopic() {
      await admin.createTopics({
        waitForLeaders: true,
        topics: [
          {
            topic: config.topic,
            numPartitions: config.partitions,
            replicationFactor: config.replicationFactor
          }
        ]
      });
    },

    async publishEvent(payload) {
      const defaultPartition = 0;
      const resolvedPartition = payload.partition ?? defaultPartition;

      if (resolvedPartition < 0 || resolvedPartition >= config.partitions) {
        const error = new Error(
          `Partition ${resolvedPartition} is out of range for topic ${config.topic}.`
        );
        error.statusCode = 400;
        throw error;
      }

      const eventRecord = createEventRecord(payload, defaultPartition);
      eventRecord.partition = resolvedPartition;

      await producer.send({
        topic: config.topic,
        messages: [
          {
            key: eventRecord.eventId,
            partition: eventRecord.partition,
            value: JSON.stringify(eventRecord)
          }
        ]
      });

      eventStore.add(eventRecord);
      return eventRecord;
    },

    getStatus() {
      return {
        bridgeName: config.bridgeName,
        broker: config.broker,
        topic: config.topic,
        httpPort: config.httpPort,
        publishedEvents: eventStore.count(),
        lastPublishedAt: eventStore.lastPublishedAt(),
        recentEvents: eventStore.all().map((event) => ({
          eventId: event.eventId,
          eventType: event.eventType,
          source: event.source,
          partition: event.partition,
          publishedAt: event.publishedAt
        }))
      };
    }
  };
}

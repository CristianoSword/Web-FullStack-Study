import {
  applySalesEventToAggregate,
  buildAggregateKey,
  getWindowBounds
} from "../domain/windowing.mjs";

function createSalesEvent(payload) {
  return {
    eventId: payload.eventId ?? `sale-${Date.now()}`,
    storeId: payload.storeId,
    amount: Number(payload.amount),
    occurredAt: payload.occurredAt ?? new Date().toISOString()
  };
}

export function createStreamAggregatorService({ config, admin, producer, consumer }) {
  const materializedState = new Map();
  const processedEvents = [];
  let processorStarted = false;

  async function publishAggregate(aggregate) {
    await producer.send({
      topic: config.outputTopic,
      messages: [
        {
          key: `${aggregate.storeId}:${aggregate.windowStart}`,
          value: JSON.stringify(aggregate)
        }
      ]
    });
  }

  function upsertAggregate(salesEvent) {
    const { windowStartMs } = getWindowBounds(salesEvent.occurredAt, config.windowSizeMs);
    const aggregateKey = buildAggregateKey(salesEvent.storeId, windowStartMs);
    const currentAggregate = materializedState.get(aggregateKey) ?? null;
    const nextAggregate = applySalesEventToAggregate(currentAggregate, salesEvent, config);

    materializedState.set(aggregateKey, nextAggregate);
    processedEvents.push(salesEvent);

    return nextAggregate;
  }

  return {
    async bootstrapTopics() {
      await admin.createTopics({
        waitForLeaders: true,
        topics: [
          {
            topic: config.inputTopic,
            numPartitions: config.partitions,
            replicationFactor: config.replicationFactor
          },
          {
            topic: config.outputTopic,
            numPartitions: config.partitions,
            replicationFactor: config.replicationFactor
          }
        ]
      });
    },

    async startStreamProcessor() {
      if (processorStarted) {
        return;
      }

      processorStarted = true;
      await consumer.connect();
      await consumer.subscribe({ topic: config.inputTopic, fromBeginning: true });

      consumer.run({
        eachMessage: async ({ message }) => {
          const salesEvent = JSON.parse(message.value.toString());
          const aggregate = upsertAggregate(salesEvent);
          await publishAggregate(aggregate);
        }
      });
    },

    async ingestSalesEvent(payload) {
      const salesEvent = createSalesEvent(payload);

      await producer.send({
        topic: config.inputTopic,
        messages: [
          {
            key: salesEvent.storeId,
            value: JSON.stringify(salesEvent)
          }
        ]
      });

      return {
        accepted: true,
        salesEvent
      };
    },

    listAggregates() {
      return [...materializedState.values()].sort((left, right) => {
        return left.windowStart.localeCompare(right.windowStart) || left.storeId.localeCompare(right.storeId);
      });
    },

    listStoreAggregates(storeId) {
      return this.listAggregates().filter((aggregate) => aggregate.storeId === storeId);
    },

    getStatus() {
      return {
        serviceName: config.serviceName,
        inputTopic: config.inputTopic,
        outputTopic: config.outputTopic,
        windowSizeMs: config.windowSizeMs,
        gracePeriodMs: config.gracePeriodMs,
        processedEvents: processedEvents.length,
        materializedWindows: materializedState.size
      };
    }
  };
}

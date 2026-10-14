import { runtimeConfig } from "../../config/runtime-config.mjs";
import { createMessageEnvelope, normalizePublishRequest } from "../../models/message-envelope.mjs";
import { MetricsStore } from "../../models/metrics-store.mjs";
import { createTraceContext, formatTraceHeaders } from "../../models/trace-context.mjs";
import { observabilityTopology } from "../../topology/observability-topology.mjs";
import { getRabbitResources, publishObservedMessage } from "../lib/rabbitmq-connection.mjs";

const wait = (durationMs) => new Promise((resolve) => setTimeout(resolve, durationMs));

export class ObservabilityService {
  constructor() {
    this.metricsStore = new MetricsStore(runtimeConfig.app.metricsNamespace);
  }

  async publish(rawPayload, requestHeaders) {
    const message = normalizePublishRequest(rawPayload);
    const traceContext = createTraceContext(requestHeaders);
    const envelope = createMessageEnvelope({ message, traceContext });

    await publishObservedMessage({
      envelope,
      headers: formatTraceHeaders(traceContext)
    });

    this.metricsStore.markPublished(traceContext.traceId);

    return {
      traceContext,
      envelope
    };
  }

  async startConsumer() {
    const { channel } = await getRabbitResources();
    await channel.consume(observabilityTopology.queue, async (message) => {
      if (!message) {
        return;
      }

      const payload = JSON.parse(message.content.toString("utf8"));
      const traceId = message.properties.headers?.["x-trace-id"] ?? payload.metadata.traceId;
      const startedAt = Date.now();

      try {
        await wait(Math.min(payload.metadata.processingDelayMs, 2000));
        this.metricsStore.markConsumed(traceId, Date.now() - startedAt);
        channel.ack(message);
      } catch (error) {
        this.metricsStore.markFailed(traceId);
        channel.nack(message, false, false);
      }

      const queueState = await channel.checkQueue(observabilityTopology.queue);
      this.metricsStore.setQueueDepth(queueState.messageCount);
    });
  }

  snapshot() {
    return this.metricsStore.snapshot();
  }

  renderPrometheusMetrics() {
    const snapshot = this.snapshot();
    const prefix = runtimeConfig.app.metricsNamespace;

    return [
      `# TYPE ${prefix}_published_total counter`,
      `${prefix}_published_total ${snapshot.counters.publishedTotal}`,
      `# TYPE ${prefix}_consumed_total counter`,
      `${prefix}_consumed_total ${snapshot.counters.consumedTotal}`,
      `# TYPE ${prefix}_failed_total counter`,
      `${prefix}_failed_total ${snapshot.counters.failedTotal}`,
      `# TYPE queue_depth gauge`,
      `queue_depth ${snapshot.counters.queueDepth}`,
      `# TYPE ${prefix}_average_latency_ms gauge`,
      `${prefix}_average_latency_ms ${snapshot.counters.averageLatencyMs}`
    ].join("\n");
  }
}

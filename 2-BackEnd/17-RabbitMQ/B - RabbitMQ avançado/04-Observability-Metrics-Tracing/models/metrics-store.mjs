export class MetricsStore {
  constructor(namespace) {
    this.namespace = namespace;
    this.state = {
      publishedTotal: 0,
      consumedTotal: 0,
      failedTotal: 0,
      queueDepth: 0,
      latencyMs: [],
      traces: []
    };
  }

  markPublished(traceId) {
    this.state.publishedTotal += 1;
    this.state.traces.unshift({ traceId, stage: "published", at: new Date().toISOString() });
  }

  markConsumed(traceId, latencyMs) {
    this.state.consumedTotal += 1;
    this.state.latencyMs.push(latencyMs);
    this.state.traces.unshift({ traceId, stage: "consumed", at: new Date().toISOString() });
  }

  markFailed(traceId) {
    this.state.failedTotal += 1;
    this.state.traces.unshift({ traceId, stage: "failed", at: new Date().toISOString() });
  }

  setQueueDepth(queueDepth) {
    this.state.queueDepth = queueDepth;
  }

  snapshot() {
    const latencies = this.state.latencyMs.slice(-100);
    const avgLatency =
      latencies.length === 0 ? 0 : latencies.reduce((sum, value) => sum + value, 0) / latencies.length;

    return {
      counters: {
        publishedTotal: this.state.publishedTotal,
        consumedTotal: this.state.consumedTotal,
        failedTotal: this.state.failedTotal,
        queueDepth: this.state.queueDepth,
        averageLatencyMs: Number(avgLatency.toFixed(2))
      },
      traces: this.state.traces.slice(0, 50)
    };
  }
}

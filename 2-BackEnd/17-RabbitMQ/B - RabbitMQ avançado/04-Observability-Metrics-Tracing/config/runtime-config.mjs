const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const runtimeConfig = {
  app: {
    port: toNumber(process.env.PORT, 3074),
    metricsNamespace: process.env.METRICS_NAMESPACE ?? "rabbitmq_observability"
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672"
  }
};

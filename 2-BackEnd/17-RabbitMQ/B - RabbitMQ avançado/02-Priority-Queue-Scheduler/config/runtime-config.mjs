const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const runtimeConfig = {
  app: {
    port: toNumber(process.env.PORT, 3072)
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672",
    managementUrl: process.env.RABBITMQ_MANAGEMENT_URL ?? "http://localhost:15672/api",
    username: process.env.RABBITMQ_USERNAME ?? "guest",
    password: process.env.RABBITMQ_PASSWORD ?? "guest"
  },
  scheduler: {
    queueName: process.env.QUEUE_NAME ?? "scheduler.jobs.priority",
    maxPriority: toNumber(process.env.MAX_PRIORITY, 10),
    workerPrefetch: toNumber(process.env.WORKER_PREFETCH, 4),
    highWatermark: toNumber(process.env.HIGH_WATERMARK, 25)
  }
};

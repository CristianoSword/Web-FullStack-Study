const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const runtimeConfig = {
  app: {
    port: toNumber(process.env.PORT, 3075)
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? "amqp://admin:admin@localhost:5672",
    managementUrl: process.env.RABBITMQ_MANAGEMENT_URL ?? "http://localhost:15672/api",
    username: process.env.RABBITMQ_USERNAME ?? "admin",
    password: process.env.RABBITMQ_PASSWORD ?? "admin"
  }
};

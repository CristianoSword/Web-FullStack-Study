const toNumber = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const runtimeConfig = {
  app: {
    port: toNumber(process.env.PORT, 3073)
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672",
    username: process.env.RABBITMQ_USERNAME ?? "guest",
    password: process.env.RABBITMQ_PASSWORD ?? "guest"
  }
};

import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/health", async () => ({
  status: "bootstrapping"
}));

const start = async () => {
  const port = Number.parseInt(process.env.PORT ?? "3074", 10);
  await app.listen({ port, host: "0.0.0.0" });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});

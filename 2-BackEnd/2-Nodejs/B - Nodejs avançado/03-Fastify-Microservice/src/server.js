const Fastify = require("fastify");
const registerOrderRoutes = require("./routes/order-routes");

function buildServer() {
  const server = Fastify({ logger: false });

  server.get("/health", async () => ({
    status: "ok",
    service: "fastify-microservice",
  }));

  server.register(registerOrderRoutes);
  return server;
}

if (require.main === module) {
  const server = buildServer();
  server
    .listen({ port: 3002, host: "0.0.0.0" })
    .then(() => {
      console.log("Fastify microservice listening on port 3002");
    })
    .catch((error) => {
      console.error("Failed to start Fastify microservice:", error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  buildServer,
};

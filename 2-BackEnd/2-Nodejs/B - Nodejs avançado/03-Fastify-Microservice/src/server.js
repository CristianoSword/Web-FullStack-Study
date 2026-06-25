const { registerOrderRoutes } = require("./routes/order-routes");

function buildServer() {
  const server = {
    plugins: [],
    register(plugin) {
      this.plugins.push(plugin.name || "anonymous-plugin");
    },
  };

  registerOrderRoutes(server);
  return server;
}

module.exports = {
  buildServer,
};

const { listOrders, createOrder } = require("../services/order-service");

function registerOrderRoutes(server) {
  server.register({
    name: "orders-plugin",
    routes: [
      { method: "GET", url: "/orders", handler: listOrders },
      { method: "POST", url: "/orders", handler: createOrder },
    ],
  });
}

module.exports = {
  registerOrderRoutes,
};

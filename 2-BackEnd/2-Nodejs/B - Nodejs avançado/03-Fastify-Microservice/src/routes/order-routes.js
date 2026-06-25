const { listOrders, createOrder } = require("../services/order-service");
const { validateOrderPayload } = require("../validators/order-validator");

function registerOrderRoutes(server) {
  server.register({
    name: "orders-plugin",
    routes: [
      { method: "GET", url: "/orders", handler: listOrders },
      {
        method: "POST",
        url: "/orders",
        handler: (payload) => createOrder(validateOrderPayload(payload)),
      },
    ],
  });
}

module.exports = {
  registerOrderRoutes,
};

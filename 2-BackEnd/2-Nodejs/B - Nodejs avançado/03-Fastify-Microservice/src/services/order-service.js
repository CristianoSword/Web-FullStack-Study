const { buildOrder } = require("../models/order-model");

const orders = [
  buildOrder(1, "Acme Corp", 320),
  buildOrder(2, "Beta Ltd", 110),
];

function listOrders() {
  return orders;
}

function createOrder(payload) {
  const nextId = orders.at(-1)?.id ? orders.at(-1).id + 1 : 1;
  const order = buildOrder(nextId, payload.customer, payload.total);
  orders.push(order);
  return order;
}

module.exports = {
  listOrders,
  createOrder,
};

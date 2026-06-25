function buildOrder(id, customer, total) {
  return {
    id,
    customer,
    total,
    status: "pending",
  };
}

module.exports = {
  buildOrder,
};

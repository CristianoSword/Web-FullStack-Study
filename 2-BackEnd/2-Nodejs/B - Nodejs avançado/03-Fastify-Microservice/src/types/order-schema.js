const orderSchema = {
  type: "object",
  required: ["customer", "total"],
};

module.exports = {
  orderSchema,
};

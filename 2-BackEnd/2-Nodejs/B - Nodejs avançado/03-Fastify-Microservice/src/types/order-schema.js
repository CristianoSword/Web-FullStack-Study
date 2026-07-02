const orderBodySchema = {
  type: "object",
  required: ["customer", "total"],
  additionalProperties: false,
  properties: {
    customer: { type: "string", minLength: 1 },
    total: { type: "number", exclusiveMinimum: 0 },
  },
};

const orderEntitySchema = {
  type: "object",
  required: ["id", "customer", "total", "status"],
  properties: {
    id: { type: "integer" },
    customer: { type: "string" },
    total: { type: "number" },
    status: { type: "string" },
  },
};

const orderListSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: orderEntitySchema,
    },
  },
};

const errorSchema = {
  type: "object",
  required: ["message"],
  properties: {
    message: { type: "string" },
  },
};

module.exports = {
  orderBodySchema,
  orderEntitySchema,
  orderListSchema,
  errorSchema,
};

const { listOrders, createOrder, findOrder } = require("../services/order-service");
const { validateOrderPayload } = require("../validators/order-validator");
const {
  orderBodySchema,
  orderEntitySchema,
  orderListSchema,
  errorSchema,
} = require("../types/order-schema");

async function registerOrderRoutes(server) {
  server.get(
    "/orders",
    {
      schema: {
        response: {
          200: orderListSchema,
        },
      },
    },
    async () => ({
      data: listOrders(),
    })
  );

  server.get(
    "/orders/:id",
    {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "integer", minimum: 1 },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: orderEntitySchema,
            },
          },
          404: errorSchema,
        },
      },
    },
    async (request, reply) => {
      const order = findOrder(request.params.id);

      if (!order) {
        reply.code(404);
        return { message: "Order not found" };
      }

      return { data: order };
    }
  );

  server.post(
    "/orders",
    {
      schema: {
        body: orderBodySchema,
        response: {
          201: {
            type: "object",
            properties: {
              data: orderEntitySchema,
            },
          },
          400: errorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const order = createOrder(validateOrderPayload(request.body));
        reply.code(201);
        return { data: order };
      } catch (error) {
        reply.code(400);
        return { message: error.message };
      }
    }
  );
}

module.exports = registerOrderRoutes;

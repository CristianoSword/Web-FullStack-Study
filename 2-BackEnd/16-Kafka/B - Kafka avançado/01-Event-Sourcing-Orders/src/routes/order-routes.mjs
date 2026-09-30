const createOrderBodySchema = {
  type: "object",
  required: ["orderId", "customerId", "totalAmount"],
  properties: {
    orderId: { type: "string" },
    customerId: { type: "string" },
    totalAmount: { type: "number" }
  }
};

const payOrderBodySchema = {
  type: "object",
  required: ["paymentId"],
  properties: {
    paymentId: { type: "string" }
  }
};

const cancelOrderBodySchema = {
  type: "object",
  required: ["reason"],
  properties: {
    reason: { type: "string" }
  }
};

const shipOrderBodySchema = {
  type: "object",
  required: ["trackingCode"],
  properties: {
    trackingCode: { type: "string" }
  }
};

export async function registerOrderRoutes(app) {
  app.get("/health", async () => ({
    status: "ok",
    service: app.ordersConfig.serviceName
  }));

  app.get("/status", async () => app.eventStoreService.getStatus());

  app.post(
    "/orders",
    {
      schema: {
        body: createOrderBodySchema
      }
    },
    async (request, reply) => {
      const event = await app.eventStoreService.createOrder({
        orderId: request.body.orderId,
        customerId: request.body.customerId,
        totalAmount: request.body.totalAmount
      });

      reply.status(202).send({
        accepted: true,
        event
      });
    }
  );

  app.post(
    "/orders/:orderId/pay",
    {
      schema: {
        body: payOrderBodySchema
      }
    },
    async (request, reply) => {
      const event = await app.eventStoreService.payOrder({
        orderId: request.params.orderId,
        paymentId: request.body.paymentId
      });

      reply.status(202).send({
        accepted: true,
        event
      });
    }
  );

  app.post(
    "/orders/:orderId/cancel",
    {
      schema: {
        body: cancelOrderBodySchema
      }
    },
    async (request, reply) => {
      const event = await app.eventStoreService.cancelOrder({
        orderId: request.params.orderId,
        reason: request.body.reason
      });

      reply.status(202).send({
        accepted: true,
        event
      });
    }
  );

  app.post(
    "/orders/:orderId/ship",
    {
      schema: {
        body: shipOrderBodySchema
      }
    },
    async (request, reply) => {
      const event = await app.eventStoreService.shipOrder({
        orderId: request.params.orderId,
        trackingCode: request.body.trackingCode
      });

      reply.status(202).send({
        accepted: true,
        event
      });
    }
  );

  app.get("/orders/:orderId", async (request, reply) => {
    const projection = app.eventStoreService.getProjection(request.params.orderId);

    if (!projection) {
      reply.status(404).send({
        error: "OrderNotFound",
        message: `Projection not found for order ${request.params.orderId}.`
      });
      return;
    }

    reply.send(projection);
  });

  app.get("/orders/:orderId/events", async (request) => ({
    orderId: request.params.orderId,
    events: app.eventStoreService.listEvents(request.params.orderId)
  }));

  app.post("/orders/:orderId/replay", async (request, reply) => {
    const projection = app.eventStoreService.replayOrder(request.params.orderId);

    if (!projection) {
      reply.status(404).send({
        error: "OrderNotFound",
        message: `Event stream not found for order ${request.params.orderId}.`
      });
      return;
    }

    reply.send({
      orderId: request.params.orderId,
      projection
    });
  });
}

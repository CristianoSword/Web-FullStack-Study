const publishBodySchema = {
  type: "object",
  required: ["eventType", "source", "payload"],
  properties: {
    eventType: { type: "string" },
    source: { type: "string" },
    partition: { type: "integer", minimum: 0 },
    payload: { type: "object", additionalProperties: true }
  }
};

const statusResponseSchema = {
  type: "object",
  required: ["bridgeName", "broker", "topic", "httpPort", "publishedEvents", "recentEvents"],
  properties: {
    bridgeName: { type: "string" },
    broker: { type: "string" },
    topic: { type: "string" },
    httpPort: { type: "integer" },
    publishedEvents: { type: "integer" },
    lastPublishedAt: { type: ["string", "null"] },
    recentEvents: {
      type: "array",
      items: {
        type: "object",
        required: ["eventId", "eventType", "source", "partition", "publishedAt"],
        properties: {
          eventId: { type: "string" },
          eventType: { type: "string" },
          source: { type: "string" },
          partition: { type: "integer" },
          publishedAt: { type: "string" }
        }
      }
    }
  }
};

export async function registerBridgeRoutes(app) {
  app.get("/health", async () => ({
    status: "ok",
    bridge: app.bridgeConfig.bridgeName
  }));

  app.get(
    "/status",
    {
      schema: {
        response: {
          200: statusResponseSchema
        }
      }
    },
    async () => app.bridgeService.getStatus()
  );

  app.post(
    "/events",
    {
      schema: {
        body: publishBodySchema
      }
    },
    async (request, reply) => {
      const publishedEvent = await app.bridgeService.publishEvent(request.body);

      reply.status(202).send({
        accepted: true,
        topic: app.bridgeConfig.topic,
        eventId: publishedEvent.eventId,
        partition: publishedEvent.partition,
        publishedAt: publishedEvent.publishedAt
      });
    }
  );
}

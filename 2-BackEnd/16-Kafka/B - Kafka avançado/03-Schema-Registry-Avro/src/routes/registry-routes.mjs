const schemaRegistrationBodySchema = {
  type: "object",
  required: ["schemaPath"],
  properties: {
    schemaPath: { type: "string" },
    subject: { type: "string" },
    compatibility: { type: "string" }
  }
};

const compatibilityBodySchema = {
  type: "object",
  required: ["schemaPath"],
  properties: {
    schemaPath: { type: "string" },
    subject: { type: "string" }
  }
};

const publishPayloadBodySchema = {
  type: "object",
  required: ["eventId", "eventType", "customerId", "email", "occurredAt"],
  properties: {
    eventId: { type: "string" },
    eventType: { type: "string" },
    customerId: { type: "string" },
    email: { type: "string" },
    occurredAt: { type: "string" },
    segment: { type: ["string", "null"] }
  }
};

export async function registerRegistryRoutes(app) {
  app.get("/health", async () => ({
    status: "ok",
    service: app.registryConfig.serviceName
  }));

  app.get("/status", async () => app.registryAvroService.getRegistryStatus());

  app.post(
    "/schemas/register",
    {
      schema: {
        body: schemaRegistrationBodySchema
      }
    },
    async (request, reply) => {
      const registration = await app.registryAvroService.registerSchema({
        subject: request.body.subject ?? app.registryConfig.subject,
        schemaPath: request.body.schemaPath,
        compatibility: request.body.compatibility ?? app.registryConfig.compatibility
      });

      reply.status(201).send(registration);
    }
  );

  app.post(
    "/schemas/compatibility",
    {
      schema: {
        body: compatibilityBodySchema
      }
    },
    async (request) => {
      return app.registryAvroService.checkCompatibility({
        subject: request.body.subject ?? app.registryConfig.subject,
        schemaPath: request.body.schemaPath
      });
    }
  );

  app.post(
    "/events/avro",
    {
      schema: {
        body: publishPayloadBodySchema
      }
    },
    async (request, reply) => {
      const publication = await app.registryAvroService.publishAvroEvent(request.body);

      reply.status(202).send({
        accepted: true,
        publication
      });
    }
  );

  app.get("/events/avro/decode-latest", async () => {
    return app.registryAvroService.decodePublishedEvent();
  });
}

import path from "node:path";

function resolveRelativeSchemaPath(schemaPath) {
  return path.relative(process.cwd(), schemaPath).replace(/\\/g, "/");
}

export function createRegistryAvroService({
  config,
  admin,
  producer,
  loadSchemaFile,
  schemaRegistryClient,
  avroCodecService
}) {
  const publishedMessages = [];

  function ensureRelativeSchemaPath(schemaPath) {
    if (!schemaPath || schemaPath.includes("..")) {
      const error = new Error("schemaPath must point to a project-local schema file.");
      error.statusCode = 400;
      throw error;
    }

    return schemaPath;
  }

  return {
    async bootstrapTopic() {
      await admin.createTopics({
        waitForLeaders: true,
        topics: [
          {
            topic: config.topic,
            numPartitions: config.partitions,
            replicationFactor: config.replicationFactor
          }
        ]
      });
    },

    async registerSchema({ subject, schemaPath, compatibility }) {
      const resolvedSchemaPath = ensureRelativeSchemaPath(schemaPath);
      const schema = await loadSchemaFile(resolvedSchemaPath);

      await schemaRegistryClient.setCompatibility(subject, compatibility);
      const registration = await schemaRegistryClient.registerSchema(subject, schema);

      return {
        subject,
        schemaId: registration.id,
        schemaPath: resolveRelativeSchemaPath(resolvedSchemaPath),
        compatibility
      };
    },

    async checkCompatibility({ subject, schemaPath }) {
      const resolvedSchemaPath = ensureRelativeSchemaPath(schemaPath);
      const schema = await loadSchemaFile(resolvedSchemaPath);
      const compatibility = await schemaRegistryClient.testCompatibility(subject, schema);

      return {
        subject,
        schemaPath: resolveRelativeSchemaPath(resolvedSchemaPath),
        isCompatible: compatibility.is_compatible
      };
    },

    async publishAvroEvent(payload) {
      const latestSchema = await schemaRegistryClient.getLatestSchema(config.subject);
      const encodedValue = await avroCodecService.encodePayload({
        schemaId: latestSchema.id,
        schemaString: latestSchema.schema,
        payload
      });

      await producer.send({
        topic: config.topic,
        messages: [
          {
            key: payload.customerId,
            value: encodedValue
          }
        ]
      });

      const publication = {
        schemaId: latestSchema.id,
        subject: config.subject,
        topic: config.topic,
        payload
      };

      publishedMessages.unshift(publication);
      if (publishedMessages.length > 10) {
        publishedMessages.length = 10;
      }

      return publication;
    },

    async decodePublishedEvent() {
      const latestPublication = publishedMessages[0];

      if (!latestPublication) {
        return null;
      }

      const latestSchema = await schemaRegistryClient.getLatestSchema(config.subject);
      const encodedValue = await avroCodecService.encodePayload({
        schemaId: latestSchema.id,
        schemaString: latestSchema.schema,
        payload: latestPublication.payload
      });

      return avroCodecService.decodePayload(encodedValue);
    },

    async getRegistryStatus() {
      const compatibility = await schemaRegistryClient.getCompatibility(config.subject).catch(() => ({
        compatibilityLevel: config.compatibility
      }));

      return {
        serviceName: config.serviceName,
        topic: config.topic,
        subject: config.subject,
        compatibility: compatibility.compatibilityLevel ?? config.compatibility,
        publishedMessages: publishedMessages.length
      };
    }
  };
}

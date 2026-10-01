import { Type } from "avsc";

const MAGIC_BYTE = 0;

function encodeSchemaId(schemaId) {
  const schemaIdBuffer = Buffer.alloc(4);
  schemaIdBuffer.writeUInt32BE(schemaId, 0);
  return schemaIdBuffer;
}

function readSchemaId(buffer) {
  return buffer.readUInt32BE(1);
}

export function createAvroCodecService({ schemaRegistryClient }) {
  const schemaCache = new Map();

  async function loadTypeForSchema(schemaId, schemaString) {
    if (schemaCache.has(schemaId)) {
      return schemaCache.get(schemaId);
    }

    const type = Type.forSchema(JSON.parse(schemaString));
    schemaCache.set(schemaId, type);
    return type;
  }

  return {
    async encodePayload({ schemaId, schemaString, payload }) {
      const type = await loadTypeForSchema(schemaId, schemaString);
      const payloadBuffer = type.toBuffer(payload);

      return Buffer.concat([Buffer.from([MAGIC_BYTE]), encodeSchemaId(schemaId), payloadBuffer]);
    },

    async decodePayload(buffer) {
      if (buffer[0] !== MAGIC_BYTE) {
        throw new Error("Unsupported Avro wire format: invalid magic byte.");
      }

      const schemaId = readSchemaId(buffer);
      const schemaResponse = await schemaRegistryClient.getSchemaById(schemaId);
      const type = await loadTypeForSchema(schemaId, schemaResponse.schema);
      const payloadBuffer = buffer.subarray(5);

      return {
        schemaId,
        payload: type.fromBuffer(payloadBuffer)
      };
    }
  };
}

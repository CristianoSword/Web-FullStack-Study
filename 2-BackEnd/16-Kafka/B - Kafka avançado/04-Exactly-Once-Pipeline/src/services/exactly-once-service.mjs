import { randomUUID } from "node:crypto";

import { normalizePaymentPayload, validatePaymentPayload } from "../domain/payment-validator.mjs";

function createHeaders(record) {
  return {
    messageId: record.messageId,
    idempotencyKey: record.idempotencyKey,
    paymentId: record.paymentId
  };
}

async function sendJsonRecord({ producer, topic, key, value, headers = {} }) {
  await producer.send({
    topic,
    messages: [
      {
        key,
        headers,
        value: JSON.stringify(value)
      }
    ]
  });
}

export function createExactlyOnceService({ config, admin, producer }) {
  const inputReceipts = [];
  const processedRecords = [];
  const deadLetterRecords = [];
  const idempotencyStore = new Map();
  const offsetStore = new Map();

  async function bootstrapTopics() {
    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        { topic: config.inputTopic, numPartitions: 3, replicationFactor: 1 },
        { topic: config.outputTopic, numPartitions: 3, replicationFactor: 1 },
        { topic: config.deadLetterTopic, numPartitions: 1, replicationFactor: 1 }
      ]
    });
  }

  async function ingestPayment(payload) {
    const validationErrors = validatePaymentPayload(payload);

    if (validationErrors.length > 0) {
      return {
        ok: false,
        stage: "ingest",
        errors: validationErrors
      };
    }

    const normalized = normalizePaymentPayload(payload);
    const receipt = {
      receiptId: randomUUID(),
      ...normalized,
      ingestedAt: new Date().toISOString(),
      sourceTopic: config.inputTopic
    };

    await sendJsonRecord({
      producer,
      topic: config.inputTopic,
      key: normalized.paymentId,
      headers: createHeaders(normalized),
      value: receipt
    });

    inputReceipts.push(receipt);

    return {
      ok: true,
      stage: "ingest",
      receipt
    };
  }

  async function recordDeadLetter(payload, errors) {
    const entry = {
      deadLetterId: randomUUID(),
      errors,
      payload,
      createdAt: new Date().toISOString()
    };

    await sendJsonRecord({
      producer,
      topic: config.deadLetterTopic,
      key: payload?.paymentId ?? entry.deadLetterId,
      headers: {
        reason: "validation_failed"
      },
      value: entry
    });

    deadLetterRecords.push(entry);

    return entry;
  }

  async function processPayment(payload) {
    const validationErrors = validatePaymentPayload(payload);

    if (validationErrors.length > 0) {
      const deadLetter = await recordDeadLetter(payload, validationErrors);

      return {
        ok: false,
        stage: "process",
        errors: validationErrors,
        deadLetter
      };
    }

    const normalized = normalizePaymentPayload(payload);
    const existingRecord = idempotencyStore.get(normalized.idempotencyKey);
    const offset = (offsetStore.get(config.inputTopic) ?? 0) + 1;
    offsetStore.set(config.inputTopic, offset);

    const transaction = await producer.transaction();

    try {
      let outputRecord;

      if (existingRecord) {
        outputRecord = {
          messageId: normalized.messageId,
          idempotencyKey: normalized.idempotencyKey,
          paymentId: normalized.paymentId,
          status: "DUPLICATE",
          processedAt: new Date().toISOString(),
          originalMessageId: existingRecord.messageId,
          originalProcessedAt: existingRecord.processedAt,
          amount: normalized.amount,
          currency: normalized.currency
        };
      } else {
        outputRecord = {
          messageId: normalized.messageId,
          idempotencyKey: normalized.idempotencyKey,
          paymentId: normalized.paymentId,
          status: "PROCESSED",
          processedAt: new Date().toISOString(),
          amount: normalized.amount,
          currency: normalized.currency
        };

        idempotencyStore.set(normalized.idempotencyKey, {
          idempotencyKey: normalized.idempotencyKey,
          messageId: normalized.messageId,
          paymentId: normalized.paymentId,
          status: outputRecord.status,
          processedAt: outputRecord.processedAt
        });
      }

      await transaction.send({
        topic: config.outputTopic,
        messages: [
          {
            key: normalized.paymentId,
            headers: {
              ...createHeaders(normalized),
              status: outputRecord.status
            },
            value: JSON.stringify(outputRecord)
          }
        ]
      });

      await transaction.commit();

      const result = {
        partition: 0,
        offset,
        consumerGroup: config.consumerGroup,
        sourceTopic: config.inputTopic,
        outputTopic: config.outputTopic,
        record: outputRecord
      };

      processedRecords.push(result);

      return {
        ok: true,
        stage: "process",
        transaction: {
          transactionalId: config.transactionalId,
          committed: true
        },
        result
      };
    } catch (error) {
      await transaction.abort().catch(() => {});

      const deadLetter = await recordDeadLetter(normalized, [error.message]);

      return {
        ok: false,
        stage: "process",
        errors: [error.message],
        deadLetter
      };
    }
  }

  function getStatus() {
    return {
      serviceName: config.serviceName,
      brokerTargets: config.brokers,
      consumerGroup: config.consumerGroup,
      transactionalId: config.transactionalId,
      topics: {
        inputTopic: config.inputTopic,
        outputTopic: config.outputTopic,
        deadLetterTopic: config.deadLetterTopic
      },
      metrics: {
        ingestedCount: inputReceipts.length,
        processedCount: processedRecords.length,
        deadLetterCount: deadLetterRecords.length,
        uniqueIdempotencyKeys: idempotencyStore.size
      },
      offsets: Object.fromEntries(offsetStore.entries())
    };
  }

  function listProcessed() {
    return processedRecords;
  }

  function listInputReceipts() {
    return inputReceipts;
  }

  function listDeadLetters() {
    return deadLetterRecords;
  }

  function getIdempotencyRecord(idempotencyKey) {
    return idempotencyStore.get(idempotencyKey) ?? null;
  }

  return {
    bootstrapTopics,
    ingestPayment,
    processPayment,
    getStatus,
    listProcessed,
    listInputReceipts,
    listDeadLetters,
    getIdempotencyRecord
  };
}

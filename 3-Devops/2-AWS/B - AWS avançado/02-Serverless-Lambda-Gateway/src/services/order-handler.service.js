function buildResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload, null, 2)
  };
}

export class OrderHandlerService {
  constructor({ tableName }) {
    this.tableName = tableName;
  }

  parseBody(event) {
    if (!event?.body) {
      throw new Error("Request body is required.");
    }

    const parsed = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    if (!parsed.customerId || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      throw new Error("Payload must include customerId and at least one item.");
    }

    for (const item of parsed.items) {
      if (!item.sku || item.quantity <= 0 || item.price <= 0) {
        throw new Error("Every item must include sku, quantity and price greater than zero.");
      }
    }

    return parsed;
  }

  calculateTotal(items) {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  buildCreateRecord(payload) {
    const orderId = `ord-${payload.customerId}-${payload.items.length}`;
    const createdAt = "2026-07-01T00:00:00.000Z";
    const total = Number(this.calculateTotal(payload.items).toFixed(2));

    return {
      pk: `ORDER#${orderId}`,
      sk: `ORDER#${orderId}`,
      gsi1pk: "STATUS#PENDING",
      gsi1sk: createdAt,
      orderId,
      customerId: payload.customerId,
      currency: payload.currency ?? "BRL",
      items: payload.items,
      total,
      status: "PENDING",
      createdAt,
      storageTarget: this.tableName
    };
  }

  buildCreateResponse(event) {
    try {
      const payload = this.parseBody(event);
      const record = this.buildCreateRecord(payload);

      return buildResponse(201, {
        message: "Order validated and ready for DynamoDB PutItem.",
        putItemTarget: this.tableName,
        record
      });
    } catch (error) {
      return buildResponse(400, {
        error: error.message
      });
    }
  }

  buildListResponse(event) {
    const statusFilter = event?.queryStringParameters?.status ?? "PENDING";

    return buildResponse(200, {
      tableName: this.tableName,
      filter: statusFilter,
      items: [
        {
          orderId: "ord-100",
          status: statusFilter,
          total: 304.9
        },
        {
          orderId: "ord-101",
          status: statusFilter,
          total: 159.0
        }
      ],
      queryPlan: {
        indexName: "gsi1-status-createdAt",
        partitionKey: `STATUS#${statusFilter}`
      }
    });
  }
}

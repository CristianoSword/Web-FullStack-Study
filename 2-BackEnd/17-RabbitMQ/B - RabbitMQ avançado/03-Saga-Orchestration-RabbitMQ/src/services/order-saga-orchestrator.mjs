import { normalizeOrderRequest } from "../../models/order-request.mjs";
import { createSagaMessage, sagaEventTypes } from "../../models/saga-events.mjs";
import { sagaTopology } from "../../topology/saga-topology.mjs";
import { getRabbitResources, publishSagaMessage } from "../lib/rabbitmq-connection.mjs";
import { SagaStore } from "./saga-store.mjs";

export class OrderSagaOrchestrator {
  constructor() {
    this.store = new SagaStore();
  }

  async createOrder(rawPayload) {
    const order = normalizeOrderRequest(rawPayload);
    const record = this.store.create(order);

    await publishSagaMessage(
      sagaTopology.routingKeys.inventoryReserve,
      createSagaMessage({
        sagaId: order.sagaId,
        type: sagaEventTypes.reserveInventory,
        payload: order
      })
    );

    return record;
  }

  getSaga(sagaId) {
    return this.store.get(sagaId);
  }

  listSagas() {
    return this.store.list();
  }

  async startEventLoop() {
    const { channel } = await getRabbitResources();

    await channel.consume(sagaTopology.queues.orchestratorEvents, async (message) => {
      if (!message) {
        return;
      }

      const event = JSON.parse(message.content.toString("utf8"));
      if (
        [
          sagaEventTypes.reserveInventory,
          sagaEventTypes.releaseInventory,
          sagaEventTypes.capturePayment,
          sagaEventTypes.refundPayment,
          sagaEventTypes.createShipment
        ].includes(event.type)
      ) {
        channel.ack(message);
        return;
      }

      try {
        await this.handleEvent(event);
        channel.ack(message);
      } catch (error) {
        channel.nack(message, false, false);
      }
    });
  }

  async handleEvent(event) {
    switch (event.type) {
      case sagaEventTypes.inventoryReserved:
        this.store.update(event.sagaId, event.type, "Inventory reserved.", {
          status: "running",
          step: sagaEventTypes.capturePayment
        });
        await publishSagaMessage(
          sagaTopology.routingKeys.paymentCapture,
          createSagaMessage({
            sagaId: event.sagaId,
            type: sagaEventTypes.capturePayment,
            payload: event.payload
          })
        );
        break;
      case sagaEventTypes.paymentCaptured:
        this.store.update(event.sagaId, event.type, "Payment captured.", {
          status: "running",
          step: sagaEventTypes.createShipment
        });
        await publishSagaMessage(
          sagaTopology.routingKeys.shippingCreate,
          createSagaMessage({
            sagaId: event.sagaId,
            type: sagaEventTypes.createShipment,
            payload: event.payload
          })
        );
        break;
      case sagaEventTypes.shipmentCreated:
        this.store.update(event.sagaId, event.type, "Shipment created.", {
          status: "completed",
          step: sagaEventTypes.sagaCompleted
        });
        break;
      case sagaEventTypes.inventoryFailed:
        this.store.update(event.sagaId, event.type, "Inventory reservation failed.", {
          status: "failed",
          step: sagaEventTypes.sagaFailed
        });
        break;
      case sagaEventTypes.paymentFailed:
        this.store.update(event.sagaId, event.type, "Payment failed. Releasing inventory.", {
          status: "compensating",
          step: sagaEventTypes.inventoryReleased,
          compensations: [...(this.store.get(event.sagaId)?.compensations ?? []), sagaEventTypes.inventoryReleased]
        });
        await publishSagaMessage(
          sagaTopology.routingKeys.inventoryRelease,
          createSagaMessage({
            sagaId: event.sagaId,
            type: sagaEventTypes.releaseInventory,
            payload: event.payload
          })
        );
        break;
      case sagaEventTypes.shippingFailed:
        this.store.update(event.sagaId, event.type, "Shipping failed. Refunding payment and releasing inventory.", {
          status: "compensating",
          step: sagaEventTypes.paymentRefunded,
          compensations: [
            ...(this.store.get(event.sagaId)?.compensations ?? []),
            sagaEventTypes.paymentRefunded,
            sagaEventTypes.inventoryReleased
          ]
        });
        await publishSagaMessage(
          sagaTopology.routingKeys.paymentRefund,
          createSagaMessage({
            sagaId: event.sagaId,
            type: sagaEventTypes.refundPayment,
            payload: event.payload
          })
        );
        await publishSagaMessage(
          sagaTopology.routingKeys.inventoryRelease,
          createSagaMessage({
            sagaId: event.sagaId,
            type: sagaEventTypes.releaseInventory,
            payload: event.payload
          })
        );
        break;
      case sagaEventTypes.inventoryReleased:
      case sagaEventTypes.paymentRefunded:
        this.store.update(event.sagaId, event.type, "Compensation applied.", {
          status: "failed",
          step: sagaEventTypes.sagaFailed
        });
        break;
      default:
        this.store.update(event.sagaId, event.type, "Observed event.");
        break;
    }
  }
}

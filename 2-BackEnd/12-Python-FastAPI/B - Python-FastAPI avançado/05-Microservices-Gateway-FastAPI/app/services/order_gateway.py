from decimal import Decimal
from typing import Dict, List

from app.clients.gateway_client import GatewayClient
from app.schemas.gateway import (
    BillingQuote,
    EnrichedOrderItem,
    GatewayHealth,
    GatewayOrderQuote,
    OrderQuoteRequest,
    ProductRead,
    ServiceHealth,
    ShippingQuote,
)


class OrderGatewayService:
    def __init__(self, gateway_client: GatewayClient) -> None:
        self.gateway_client = gateway_client

    async def list_products(self) -> List[ProductRead]:
        payload = await self.gateway_client.request("catalog", "GET", "/products")
        return [ProductRead(**product) for product in payload]

    async def quote_order(self, payload: OrderQuoteRequest) -> GatewayOrderQuote:
        enriched_items: List[EnrichedOrderItem] = []
        billing_items: List[Dict[str, object]] = []
        shipping_items: List[Dict[str, object]] = []

        for item in payload.items:
            product_data = await self.gateway_client.request("catalog", "GET", f"/products/{item.sku}")
            product = ProductRead(**product_data)
            line_total = (product.price * item.quantity).quantize(Decimal("0.01"))
            enriched_items.append(
                EnrichedOrderItem(
                    sku=product.sku,
                    name=product.name,
                    quantity=item.quantity,
                    unit_price=product.price,
                    line_total=line_total,
                )
            )
            billing_items.append(
                {"sku": product.sku, "quantity": item.quantity, "unit_price": str(product.price)}
            )
            shipping_items.append({"sku": product.sku, "quantity": item.quantity})

        billing_data = await self.gateway_client.request("billing", "POST", "/quote", json={"items": billing_items})
        shipping_data = await self.gateway_client.request(
            "shipping",
            "POST",
            "/quote",
            json={"postal_code": payload.postal_code, "items": shipping_items},
        )

        billing = BillingQuote(**billing_data)
        shipping = ShippingQuote(**shipping_data)
        grand_total = (billing.total + shipping.shipping_cost).quantize(Decimal("0.01"))

        return GatewayOrderQuote(
            customer_id=payload.customer_id,
            items=enriched_items,
            billing=billing,
            shipping=shipping,
            grand_total=grand_total,
        )

    async def healthcheck(self) -> GatewayHealth:
        service_checks = []
        for service_name in ("catalog", "billing", "shipping"):
            data = await self.gateway_client.request(service_name, "GET", "/health")
            service_checks.append(ServiceHealth(**data))
        return GatewayHealth(gateway="microservices-gateway", services=service_checks)

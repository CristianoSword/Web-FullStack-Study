from decimal import Decimal
from typing import Dict, List

from fastapi import FastAPI
from pydantic import BaseModel, Field


class ShippingItem(BaseModel):
    sku: str
    quantity: int = Field(..., ge=1)


class ShippingRequest(BaseModel):
    postal_code: str
    items: List[ShippingItem]


def create_shipping_app() -> FastAPI:
    app = FastAPI(title="shipping-service")

    @app.get("/health")
    def health() -> dict:
        return {"service": "shipping", "status": "ok", "version": "1.0.0"}

    @app.post("/quote")
    def build_quote(payload: ShippingRequest) -> Dict[str, object]:
        quantity_total = sum(item.quantity for item in payload.items)
        priority = payload.postal_code.endswith("1")
        base_cost = Decimal("24.90") + Decimal(quantity_total * 4)
        shipping_cost = (base_cost + (Decimal("12.00") if priority else Decimal("0.00"))).quantize(
            Decimal("0.01")
        )
        return {
            "carrier": "Study Express",
            "service_level": "priority" if priority else "standard",
            "shipping_cost": shipping_cost,
            "estimated_days": 2 if priority else 5,
        }

    return app

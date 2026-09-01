from decimal import Decimal
from typing import Dict, List

from fastapi import FastAPI
from pydantic import BaseModel


class BillingItem(BaseModel):
    sku: str
    quantity: int
    unit_price: Decimal


class BillingRequest(BaseModel):
    items: List[BillingItem]


def create_billing_app() -> FastAPI:
    app = FastAPI(title="billing-service")

    @app.get("/health")
    def health() -> dict:
        return {"service": "billing", "status": "ok", "version": "1.0.0"}

    @app.post("/quote")
    def build_quote(payload: BillingRequest) -> Dict[str, object]:
        subtotal = sum(item.unit_price * item.quantity for item in payload.items)
        tax = (subtotal * Decimal("0.12")).quantize(Decimal("0.01"))
        total = (subtotal + tax).quantize(Decimal("0.01"))
        return {
            "subtotal": subtotal.quantize(Decimal("0.01")),
            "tax": tax,
            "total": total,
            "currency": "BRL",
        }

    return app

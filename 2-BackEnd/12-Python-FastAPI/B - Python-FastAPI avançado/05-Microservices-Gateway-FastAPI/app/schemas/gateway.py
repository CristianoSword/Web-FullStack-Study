from decimal import Decimal
from typing import List, Literal

from pydantic import BaseModel, Field, validator


class ProductRead(BaseModel):
    id: str
    sku: str
    name: str
    price: Decimal
    stock: int


class QuoteItemRequest(BaseModel):
    sku: str = Field(..., min_length=3, max_length=30)
    quantity: int = Field(..., ge=1, le=50)

    @validator("sku")
    def normalize_sku(cls, value: str) -> str:
        return value.strip().upper()


class OrderQuoteRequest(BaseModel):
    customer_id: str = Field(..., min_length=4, max_length=40)
    postal_code: str = Field(..., min_length=8, max_length=12)
    items: List[QuoteItemRequest] = Field(..., min_items=1, max_items=10)

    @validator("customer_id", "postal_code")
    def normalize_fields(cls, value: str) -> str:
        cleaned = value.strip().upper()
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned


class BillingQuote(BaseModel):
    subtotal: Decimal
    tax: Decimal
    total: Decimal
    currency: str


class ShippingQuote(BaseModel):
    carrier: str
    service_level: Literal["standard", "priority"]
    shipping_cost: Decimal
    estimated_days: int


class EnrichedOrderItem(BaseModel):
    sku: str
    name: str
    quantity: int
    unit_price: Decimal
    line_total: Decimal


class GatewayOrderQuote(BaseModel):
    customer_id: str
    items: List[EnrichedOrderItem]
    billing: BillingQuote
    shipping: ShippingQuote
    grand_total: Decimal


class ServiceHealth(BaseModel):
    service: str
    status: Literal["ok"]
    version: str


class GatewayHealth(BaseModel):
    gateway: str
    services: List[ServiceHealth]

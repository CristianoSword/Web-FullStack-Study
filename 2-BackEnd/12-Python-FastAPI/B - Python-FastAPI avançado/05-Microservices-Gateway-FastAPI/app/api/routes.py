from typing import List

from fastapi import APIRouter, Depends

from app.api.dependencies import get_order_gateway
from app.schemas.gateway import GatewayHealth, GatewayOrderQuote, OrderQuoteRequest, ProductRead
from app.services.order_gateway import OrderGatewayService

router = APIRouter()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "microservices-gateway"}


@router.get("/gateway/health", response_model=GatewayHealth)
async def gateway_health(
    gateway: OrderGatewayService = Depends(get_order_gateway),
) -> GatewayHealth:
    return await gateway.healthcheck()


@router.get("/gateway/catalog/products", response_model=List[ProductRead])
async def list_catalog_products(
    gateway: OrderGatewayService = Depends(get_order_gateway),
) -> List[ProductRead]:
    return await gateway.list_products()


@router.post("/gateway/orders/quote", response_model=GatewayOrderQuote)
async def quote_order(
    payload: OrderQuoteRequest,
    gateway: OrderGatewayService = Depends(get_order_gateway),
) -> GatewayOrderQuote:
    return await gateway.quote_order(payload)

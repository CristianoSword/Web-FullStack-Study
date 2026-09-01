from fastapi import Request

from app.services.order_gateway import OrderGatewayService


def get_order_gateway(request: Request) -> OrderGatewayService:
    return request.app.state.order_gateway

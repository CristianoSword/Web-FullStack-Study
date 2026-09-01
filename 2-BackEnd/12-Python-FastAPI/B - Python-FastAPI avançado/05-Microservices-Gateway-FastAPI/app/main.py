from typing import Optional

from fastapi import FastAPI

from app.api.routes import router
from app.clients.gateway_client import GatewayClient
from app.core.settings import AppSettings
from app.microservices.billing import create_billing_app
from app.microservices.catalog import create_catalog_app
from app.microservices.shipping import create_shipping_app
from app.services.order_gateway import OrderGatewayService


def create_app(settings: Optional[AppSettings] = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
    )
    app.state.settings = resolved_settings
    app.state.microservices = {
        "catalog": create_catalog_app(),
        "billing": create_billing_app(),
        "shipping": create_shipping_app(),
    }
    app.state.order_gateway = OrderGatewayService(
        GatewayClient(app.state.microservices, resolved_settings)
    )
    app.include_router(router)
    return app


app = create_app()

from typing import Optional

from fastapi import FastAPI

from app.api.routes import router
from app.core.settings import AppSettings
from app.services.catalog_service import CatalogService


def create_app(settings: Optional[AppSettings] = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = resolved_settings
    app.state.catalog_service = CatalogService()
    app.include_router(router)
    return app


app = create_app()

from typing import Optional

from fastapi import FastAPI

from app.api.routes import router
from app.core.errors import register_exception_handlers
from app.core.settings import AppSettings


def create_app(settings: Optional[AppSettings] = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = resolved_settings
    register_exception_handlers(app)
    app.include_router(router)
    return app


app = create_app()

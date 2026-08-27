from pathlib import Path
from typing import Optional

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.routes import router
from app.core.settings import AppSettings


def create_app(settings: Optional[AppSettings] = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    base_dir = Path(__file__).resolve().parent
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = resolved_settings
    app.mount("/static", StaticFiles(directory=base_dir / "static"), name="static")
    app.include_router(router)
    return app


app = create_app()

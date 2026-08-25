from fastapi import FastAPI

from app.api.routes import router
from app.core.settings import AppSettings


def create_app(settings: AppSettings = AppSettings()) -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = settings
    app.include_router(router)
    return app


app = create_app()

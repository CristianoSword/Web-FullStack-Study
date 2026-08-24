from fastapi import FastAPI

from app.core.settings import AppSettings


def create_app(settings: AppSettings | None = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = resolved_settings
    return app


app = create_app()

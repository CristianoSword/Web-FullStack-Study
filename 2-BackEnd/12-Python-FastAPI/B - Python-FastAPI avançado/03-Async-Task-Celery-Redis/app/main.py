from typing import Optional

from fastapi import FastAPI

from app.api.routes import router
from app.core.settings import AppSettings
from app.db.base import Base
from app.db.session import get_engine
from app.models import Job  # noqa: F401


def create_app(settings: Optional[AppSettings] = None) -> FastAPI:
    resolved_settings = settings or AppSettings()
    engine = get_engine(resolved_settings.database_url)
    Base.metadata.create_all(bind=engine)
    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
    )
    app.state.settings = resolved_settings
    app.include_router(router)
    return app


app = create_app()

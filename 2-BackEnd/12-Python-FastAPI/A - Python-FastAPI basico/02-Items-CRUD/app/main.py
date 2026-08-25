from fastapi import FastAPI

from app.api.routes import router
from app.core.settings import AppSettings
from app.repositories.memory_item_repository import MemoryItemRepository
from app.services.item_service import ItemService


def create_app(settings: AppSettings = AppSettings()) -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.state.settings = settings
    app.state.item_service = ItemService(MemoryItemRepository())
    app.include_router(router)
    return app


app = create_app()

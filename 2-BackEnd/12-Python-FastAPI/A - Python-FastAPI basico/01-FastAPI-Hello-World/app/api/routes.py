from fastapi import APIRouter, Depends

from app.core.dependencies import get_settings
from app.core.settings import AppSettings
from app.models.greeting import GreetingPayload
from app.services.greeting_service import build_greeting

router = APIRouter()


@router.get("/", response_model=GreetingPayload)
def hello_world(settings: AppSettings = Depends(get_settings)) -> GreetingPayload:
    return build_greeting(settings)


@router.get("/health")
def healthcheck(settings: AppSettings = Depends(get_settings)) -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}

from fastapi import APIRouter, Depends

from app.core.dependencies import get_greeting_query, get_settings
from app.core.settings import AppSettings
from app.models.greeting import GreetingPayload, GreetingQuery, HealthPayload
from app.services.greeting_service import build_greeting

router = APIRouter()


@router.get("/", response_model=GreetingPayload)
def hello_world(
    query: GreetingQuery = Depends(get_greeting_query),
    settings: AppSettings = Depends(get_settings),
) -> GreetingPayload:
    return build_greeting(settings, query.name or "developer")


@router.get("/health", response_model=HealthPayload)
def healthcheck(settings: AppSettings = Depends(get_settings)) -> HealthPayload:
    return HealthPayload(
        status="ok",
        service=settings.app_name,
        version=settings.app_version,
        environment=settings.environment,
    )

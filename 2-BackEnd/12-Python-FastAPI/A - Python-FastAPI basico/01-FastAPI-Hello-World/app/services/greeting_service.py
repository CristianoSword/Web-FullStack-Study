from app.core.settings import AppSettings
from app.models.greeting import GreetingPayload


def build_greeting(settings: AppSettings) -> GreetingPayload:
    return GreetingPayload(
        project=settings.app_name,
        message="Welcome to the FastAPI study project",
        version=settings.app_version,
    )

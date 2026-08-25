from app.core.settings import AppSettings
from app.models.greeting import GreetingPayload


def build_greeting(settings: AppSettings, name: str = "developer") -> GreetingPayload:
    target = name.strip()
    return GreetingPayload(
        project=settings.app_name,
        message="Welcome to the FastAPI study project",
        version=settings.app_version,
        target=target,
    )

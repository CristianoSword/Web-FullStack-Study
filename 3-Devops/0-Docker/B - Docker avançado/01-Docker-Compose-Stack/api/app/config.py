import os
from dataclasses import dataclass


@dataclass
class Settings:
    app_host: str
    app_port: int
    postgres_dsn: str
    redis_url: str
    cache_ttl_seconds: int


def get_settings() -> Settings:
    return Settings(
        app_host=os.environ.get("APP_HOST", "0.0.0.0"),
        app_port=int(os.environ.get("APP_PORT", "3040")),
        postgres_dsn=os.environ.get("POSTGRES_DSN", "postgresql://study:study@postgres:5432/study_stack"),
        redis_url=os.environ.get("REDIS_URL", "redis://redis:6379/0"),
        cache_ttl_seconds=int(os.environ.get("CACHE_TTL_SECONDS", "45")),
    )

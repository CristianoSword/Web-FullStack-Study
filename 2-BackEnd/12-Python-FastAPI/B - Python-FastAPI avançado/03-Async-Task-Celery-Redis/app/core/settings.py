from pydantic import BaseSettings, Field


class AppSettings(BaseSettings):
    app_name: str = Field("FastAPI Celery Redis Jobs", env="FASTAPI_APP_NAME")
    app_version: str = Field("0.1.0", env="FASTAPI_APP_VERSION")
    database_url: str = Field("sqlite+pysqlite:///./jobs.db", env="DATABASE_URL")
    redis_url: str = Field("redis://127.0.0.1:6379", env="REDIS_URL")
    celery_task_always_eager: bool = Field(False, env="CELERY_TASK_ALWAYS_EAGER")

    @property
    def broker_url(self) -> str:
        if self.celery_task_always_eager:
            return "memory://"
        return f"{self.redis_url}/0"

    @property
    def result_backend(self) -> str:
        if self.celery_task_always_eager:
            return "cache+memory://"
        return f"{self.redis_url}/1"

    class Config:
        env_prefix = ""
        env_file = ".env"

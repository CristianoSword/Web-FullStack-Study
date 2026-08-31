from pydantic import BaseSettings, Field


class AppSettings(BaseSettings):
    app_name: str = Field("FastAPI Microservices Gateway", env="FASTAPI_APP_NAME")
    app_version: str = Field("0.1.0", env="FASTAPI_APP_VERSION")
    gateway_timeout_seconds: float = Field(3.0, env="GATEWAY_TIMEOUT_SECONDS")

    class Config:
        env_prefix = ""
        env_file = ".env"

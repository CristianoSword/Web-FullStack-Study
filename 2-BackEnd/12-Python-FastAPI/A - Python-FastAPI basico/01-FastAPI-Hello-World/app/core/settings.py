from pydantic import BaseSettings, Field


class AppSettings(BaseSettings):
    app_name: str = Field("FastAPI Hello World", env="FASTAPI_APP_NAME")
    app_version: str = Field("0.1.0", env="FASTAPI_APP_VERSION")
    environment: str = Field("development", env="FASTAPI_ENV")

    class Config:
        env_prefix = ""

from pydantic import BaseSettings, Field


class AppSettings(BaseSettings):
    app_name: str = Field("FastAPI OAuth2 JWT Auth", env="FASTAPI_APP_NAME")
    app_version: str = Field("0.1.0", env="FASTAPI_APP_VERSION")
    database_url: str = Field("sqlite+pysqlite:///./auth.db", env="DATABASE_URL")
    jwt_secret_key: str = Field("change-me-in-production", env="JWT_SECRET_KEY")
    jwt_access_token_expire_minutes: int = Field(30, env="JWT_ACCESS_TOKEN_EXPIRE_MINUTES")

    class Config:
        env_prefix = ""
        env_file = ".env"

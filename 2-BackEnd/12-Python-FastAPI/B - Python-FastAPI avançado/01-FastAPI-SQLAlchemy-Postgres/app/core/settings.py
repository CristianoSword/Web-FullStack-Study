from pydantic import BaseSettings, Field


class AppSettings(BaseSettings):
    app_name: str = Field("FastAPI SQLAlchemy Postgres", env="FASTAPI_APP_NAME")
    app_version: str = Field("0.1.0", env="FASTAPI_APP_VERSION")
    database_url: str = Field(
        "postgresql+psycopg2://study:study@127.0.0.1:5432/study_inventory",
        env="DATABASE_URL",
    )
    test_database_url: str = Field(
        "sqlite+pysqlite:///:memory:",
        env="TEST_DATABASE_URL",
    )

    class Config:
        env_prefix = ""
        env_file = ".env"

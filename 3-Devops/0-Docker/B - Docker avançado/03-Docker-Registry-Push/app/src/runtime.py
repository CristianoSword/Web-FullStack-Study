import os
from dataclasses import dataclass


@dataclass
class RuntimeSettings:
    host: str
    port: int
    app_name: str
    app_version: str
    image_repository: str


def get_runtime_settings() -> RuntimeSettings:
    return RuntimeSettings(
        host=os.environ.get("APP_HOST", "0.0.0.0"),
        port=int(os.environ.get("APP_PORT", "3060")),
        app_name=os.environ.get("APP_NAME", "inventory-release-api"),
        app_version=os.environ.get("APP_VERSION", "v1.0.0"),
        image_repository=os.environ.get("IMAGE_REPOSITORY", "localhost:5001/study/inventory-release-api"),
    )

import os
from dataclasses import dataclass


@dataclass
class RuntimeSettings:
    host: str
    port: int
    app_name: str
    app_user: str
    app_uid: str
    app_gid: str
    writable_paths: list[str]


def get_runtime_settings() -> RuntimeSettings:
    writable = os.environ.get("WRITABLE_PATHS", "/tmp")
    return RuntimeSettings(
        host=os.environ.get("APP_HOST", "0.0.0.0"),
        port=int(os.environ.get("APP_PORT", "3070")),
        app_name=os.environ.get("APP_NAME", "secure-nonroot-audit"),
        app_user=os.environ.get("APP_USER", "appuser"),
        app_uid=os.environ.get("APP_UID", "10001"),
        app_gid=os.environ.get("APP_GID", "10001"),
        writable_paths=[part.strip() for part in writable.split(",") if part.strip()],
    )

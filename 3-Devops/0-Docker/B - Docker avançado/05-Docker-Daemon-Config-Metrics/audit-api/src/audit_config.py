import os
from dataclasses import dataclass


@dataclass
class RuntimeSettings:
    host: str
    port: int


def get_runtime_settings() -> RuntimeSettings:
    return RuntimeSettings(
        host=os.environ.get("APP_HOST", "0.0.0.0"),
        port=int(os.environ.get("APP_PORT", "3080")),
    )

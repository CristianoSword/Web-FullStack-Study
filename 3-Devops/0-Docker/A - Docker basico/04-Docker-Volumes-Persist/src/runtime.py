import json
import os
from dataclasses import dataclass
from pathlib import Path


@dataclass
class RuntimeSettings:
    service_name: str
    host: str
    port: int
    data_dir: str
    database_path: str
    seed_file: str


def get_runtime_settings() -> RuntimeSettings:
    root = Path(__file__).resolve().parent.parent
    bootstrap = json.loads((root / "config" / "bootstrap.json").read_text(encoding="utf-8"))
    data_dir = os.environ.get("DATA_DIR", "/data")
    database_path = os.environ.get("DB_PATH", f"{data_dir}/{bootstrap['databaseFile']}")

    return RuntimeSettings(
        service_name=os.environ.get("APP_NAME", bootstrap["serviceName"]),
        host=os.environ.get("APP_HOST", "0.0.0.0"),
        port=int(os.environ.get("APP_PORT", bootstrap["defaultPort"])),
        data_dir=data_dir,
        database_path=database_path,
        seed_file=str(root / "seed" / "default_items.json"),
    )

import json
from pathlib import Path


def load_security_profile() -> dict:
    root = Path(__file__).resolve().parent.parent.parent
    config_path = root / "config" / "security-baseline.json"
    return json.loads(config_path.read_text(encoding="utf-8"))

import json
from pathlib import Path


def load_targets() -> dict:
    root = Path(__file__).resolve().parent.parent
    return json.loads((root / "data" / "targets.json").read_text(encoding="utf-8"))


def load_alerts() -> dict:
    root = Path(__file__).resolve().parent.parent
    return json.loads((root / "data" / "alerts.json").read_text(encoding="utf-8"))

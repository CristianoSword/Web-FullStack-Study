import json
from pathlib import Path


def load_release_notes() -> dict:
    root = Path(__file__).resolve().parent.parent
    return json.loads((root / "data" / "release-notes.json").read_text(encoding="utf-8"))

from pathlib import Path


required_files = [
    "Dockerfile",
    "compose.yaml",
    "config/bootstrap.json",
    "models/db-layout.json",
    "models/inventory-record.schema.json",
    "models/volume-profile.json",
    "src/app.py",
    "src/database.py",
    "src/repository.py",
    "src/runtime.py",
    "src/responses.py",
    "seed/default_items.json",
    "scripts/build-image.ps1",
    "scripts/up-compose.ps1",
    "scripts/down-compose.ps1",
    "scripts/run-bind-volume.ps1",
    "scripts/check-volume-plan.ps1",
    "scripts/smoke-api.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    dockerfile = (root / "Dockerfile").read_text(encoding="utf-8")
    if 'VOLUME ["/data"]' not in dockerfile:
        raise SystemExit("Dockerfile is missing the expected data volume declaration.")

    compose = (root / "compose.yaml").read_text(encoding="utf-8")
    if "inventory_data:/data" not in compose:
        raise SystemExit("compose.yaml is missing the expected named volume mount.")

    app_code = (root / "src" / "app.py").read_text(encoding="utf-8")
    if 'parsed.path == "/volumes"' not in app_code:
        raise SystemExit("App routes are missing the /volumes endpoint.")

    print("Docker volumes persist lab validation passed.")


if __name__ == "__main__":
    main()

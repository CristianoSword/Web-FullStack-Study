from pathlib import Path


required_files = [
    "compose.yaml",
    "api/Dockerfile",
    "api/requirements.txt",
    "api/app/main.py",
    "api/app/config.py",
    "api/app/db.py",
    "api/app/cache.py",
    "api/app/repository.py",
    "api/app/schemas.py",
    "postgres/init/001_schema.sql",
    "models/cache-contract.json",
    "models/postgres-schema.json",
    "models/stack-topology.json",
    "scripts/up-compose.ps1",
    "scripts/down-compose.ps1",
    "scripts/logs-stack.ps1",
    "scripts/check-stack-plan.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    compose = (root / "compose.yaml").read_text(encoding="utf-8")
    for service in ["api:", "postgres:", "redis:"]:
        if service not in compose:
            raise SystemExit(f"compose.yaml is missing required service {service}")

    requirements = (root / "api" / "requirements.txt").read_text(encoding="utf-8")
    for package in ["fastapi", "psycopg", "redis"]:
        if package not in requirements:
            raise SystemExit(f"requirements.txt is missing package {package}")

    api_code = (root / "api" / "app" / "main.py").read_text(encoding="utf-8")
    if "cache.invalidate_products" not in api_code:
        raise SystemExit("API does not invalidate Redis cache after writes.")

    print("Docker compose stack validation passed.")


if __name__ == "__main__":
    main()

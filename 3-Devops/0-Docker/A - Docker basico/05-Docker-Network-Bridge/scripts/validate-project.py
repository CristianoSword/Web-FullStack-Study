from pathlib import Path


required_files = [
    "compose.yaml",
    "config/catalog.json",
    "config/gateway.json",
    "models/message-schema.json",
    "models/network-contract.json",
    "models/service-topology.json",
    "catalog/Dockerfile",
    "catalog/src/app.py",
    "gateway/Dockerfile",
    "gateway/src/app.py",
    "scripts/up-compose.ps1",
    "scripts/down-compose.ps1",
    "scripts/inspect-network.ps1",
    "scripts/check-bridge-plan.ps1",
    "scripts/smoke-gateway.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    compose = (root / "compose.yaml").read_text(encoding="utf-8")
    if "driver: bridge" not in compose:
        raise SystemExit("compose.yaml is missing the custom bridge driver.")
    if "CATALOG_BASE_URL: http://catalog-service:3031" not in compose:
        raise SystemExit("gateway service is not wired to catalog-service DNS.")

    gateway_code = (root / "gateway" / "src" / "app.py").read_text(encoding="utf-8")
    if "catalog-service:3031/products" not in gateway_code:
        raise SystemExit("gateway app is not calling the catalog over the bridge network.")

    print("Docker network bridge lab validation passed.")


if __name__ == "__main__":
    main()

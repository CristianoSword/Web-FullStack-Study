from pathlib import Path


required_files = [
    "Dockerfile",
    "compose.registry.yaml",
    "config/registry/config.yml",
    "models/image-manifest.json",
    "models/publish-flow.json",
    "models/repository-naming.json",
    "app/data/release-notes.json",
    "app/src/server.py",
    "app/src/runtime.py",
    "app/src/release.py",
    "scripts/up-registry.ps1",
    "scripts/down-registry.ps1",
    "scripts/build-image.ps1",
    "scripts/tag-image.ps1",
    "scripts/push-local-registry.ps1",
    "scripts/pull-verify.ps1",
    "scripts/check-registry-plan.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    dockerfile = (root / "Dockerfile").read_text(encoding="utf-8")
    if "IMAGE_REPOSITORY=localhost:5001/study/inventory-release-api" not in dockerfile:
        raise SystemExit("Dockerfile is missing the expected registry repository metadata.")

    compose = (root / "compose.registry.yaml").read_text(encoding="utf-8")
    if "registry:2" not in compose or '"5001:5000"' not in compose:
        raise SystemExit("compose.registry.yaml is missing the local registry service or published port.")

    server_code = (root / "app" / "src" / "server.py").read_text(encoding="utf-8")
    for route in ["/health", "/image", "/release"]:
        if route not in server_code:
            raise SystemExit(f"Server is missing route {route}")

    print("Docker registry push validation passed.")


if __name__ == "__main__":
    main()

from pathlib import Path


required_files = [
    "Dockerfile",
    "go.mod",
    "cmd/server/main.go",
    "internal/catalog/service.go",
    "internal/config/settings.go",
    "internal/httpapi/server.go",
    "internal/httpapi/server_test.go",
    "models/optimization-checklist.json",
    "models/runtime-bill-of-materials.json",
    "models/stage-profile.json",
    "scripts/build-builder-target.ps1",
    "scripts/build-runtime-image.ps1",
    "scripts/inspect-history.ps1",
    "scripts/check-optimizer-plan.ps1",
    "internal/httpapi/web/index.html",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    dockerfile = (root / "Dockerfile").read_text(encoding="utf-8")
    for stage in ["AS deps", "AS test", "AS builder", "AS runtime"]:
        if stage not in dockerfile:
            raise SystemExit(f"Dockerfile is missing stage marker: {stage}")

    if "FROM scratch AS runtime" not in dockerfile:
        raise SystemExit("Dockerfile is missing the minimal scratch runtime stage.")
    if "go build -trimpath -ldflags=\"-s -w\"" not in dockerfile:
        raise SystemExit("Dockerfile is missing the optimized Go build flags.")

    router_code = (root / "internal" / "httpapi" / "server.go").read_text(encoding="utf-8")
    for route in ["/health", "/products", "/artifacts"]:
        if route not in router_code:
            raise SystemExit(f"Server router is missing route {route}")

    print("Multi-stage build optimizer validation passed.")


if __name__ == "__main__":
    main()

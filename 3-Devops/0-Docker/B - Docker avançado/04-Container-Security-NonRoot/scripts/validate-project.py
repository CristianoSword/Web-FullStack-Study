from pathlib import Path


required_files = [
    "Dockerfile",
    "compose.secure.yaml",
    "config/security-baseline.json",
    "models/capability-profile.json",
    "models/filesystem-policy.json",
    "models/user-identity.json",
    "app/src/server.py",
    "app/src/runtime.py",
    "app/src/security_profile.py",
    "scripts/build-image.ps1",
    "scripts/up-compose.ps1",
    "scripts/down-compose.ps1",
    "scripts/inspect-user.ps1",
    "scripts/check-security-plan.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    dockerfile = (root / "Dockerfile").read_text(encoding="utf-8")
    for expected in ["addgroup -g 10001 appgroup", "adduser -D -H -u 10001 -G appgroup appuser", "USER appuser"]:
        if expected not in dockerfile:
            raise SystemExit(f"Dockerfile is missing security directive: {expected}")

    compose = (root / "compose.secure.yaml").read_text(encoding="utf-8")
    for expected in ["read_only: true", "cap_drop:", "no-new-privileges:true", "tmpfs:"]:
        if expected not in compose:
            raise SystemExit(f"compose.secure.yaml is missing hardening field: {expected}")

    server_code = (root / "app" / "src" / "server.py").read_text(encoding="utf-8")
    for route in ["/health", "/security", "/filesystem-check"]:
        if route not in server_code:
            raise SystemExit(f"Server is missing route {route}")

    print("Container security nonroot validation passed.")


if __name__ == "__main__":
    main()

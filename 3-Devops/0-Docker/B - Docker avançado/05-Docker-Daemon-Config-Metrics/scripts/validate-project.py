from pathlib import Path


required_files = [
    "compose.observability.yaml",
    "audit-api/Dockerfile",
    "audit-api/data/alerts.json",
    "audit-api/data/targets.json",
    "audit-api/src/server.py",
    "audit-api/src/audit_config.py",
    "audit-api/src/audit_data.py",
    "prometheus/prometheus.yml",
    "grafana/provisioning/datasources/datasource.yml",
    "grafana/provisioning/dashboards/dashboard.yml",
    "grafana/dashboards/docker-daemon-overview.json",
    "loki/local-config.yaml",
    "promtail/config.yml",
    "models/alert-rules.json",
    "models/log-pipeline.json",
    "models/scrape-topology.json",
    "scripts/up-stack.ps1",
    "scripts/down-stack.ps1",
    "scripts/check-observability-plan.ps1",
    "scripts/query-prometheus.ps1",
    "scripts/query-loki.ps1",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    missing = [target for target in required_files if not (root / target).exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    compose = (root / "compose.observability.yaml").read_text(encoding="utf-8")
    for service in ["cadvisor:", "prometheus:", "grafana:", "loki:", "promtail:", "audit-api:"]:
        if service not in compose:
            raise SystemExit(f"compose.observability.yaml is missing service {service}")

    promtail = (root / "promtail" / "config.yml").read_text(encoding="utf-8")
    if "/var/lib/docker/containers/*/*-json.log" not in promtail:
        raise SystemExit("promtail config is missing docker container log path.")

    server_code = (root / "audit-api" / "src" / "server.py").read_text(encoding="utf-8")
    for route in ["/health", "/targets", "/alerts"]:
        if route not in server_code:
            raise SystemExit(f"audit-api is missing route {route}")

    print("Docker daemon config metrics validation passed.")


if __name__ == "__main__":
    main()

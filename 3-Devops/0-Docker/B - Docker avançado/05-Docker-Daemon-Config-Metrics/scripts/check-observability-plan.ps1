$ErrorActionPreference = "Stop"

[pscustomobject]@{
  ComposeUp = "docker compose -f compose.observability.yaml up -d"
  PrometheusTargets = "curl http://127.0.0.1:9090/api/v1/targets"
  Grafana = "open http://127.0.0.1:3000"
  LokiReady = "curl http://127.0.0.1:3100/ready"
  AuditAlerts = "curl http://127.0.0.1:3080/alerts"
}

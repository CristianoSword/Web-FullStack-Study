# Docker Daemon Config Metrics

Projeto de estudo para observar recursos, logs e metricas do ambiente Docker com uma stack local de Prometheus, Grafana, cAdvisor, Loki e Promtail.

## O que foi implementado

- Stack de observabilidade em `compose.observability.yaml`.
- `cAdvisor` para metricas de containers e host Docker.
- `Prometheus` com scrape de `cAdvisor` e app de auditoria.
- `Grafana` com datasource provisionado e dashboard inicial de recursos.
- `Loki` e `Promtail` para pipeline de logs.
- API de auditoria em Python padrao com rotas `/health`, `/targets` e `/alerts`.
- Modelos JSON para topologia, alertas e fluxo de logs.

## Estrutura

```text
.
|-- audit-api/
|-- grafana/
|-- loki/
|-- models/
|-- prometheus/
|-- promtail/
`-- scripts/
```

## Endpoints

- API de auditoria: `http://127.0.0.1:3080`
- Prometheus: `http://127.0.0.1:9090`
- Grafana: `http://127.0.0.1:3000`
- Loki: `http://127.0.0.1:3100`
- cAdvisor: `http://127.0.0.1:8080`

## Stack observada

- `cadvisor` para CPU, memoria, filesystem e rede dos containers
- `prometheus` para scrape e regras
- `grafana` para visualizacao
- `loki` e `promtail` para coleta de logs

## Scripts

- `scripts/up-stack.ps1`
- `scripts/down-stack.ps1`
- `scripts/check-observability-plan.ps1`
- `scripts/query-prometheus.ps1`
- `scripts/query-loki.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\up-stack.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\query-prometheus.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\query-loki.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\audit-api\src\server.py .\audit-api\src\audit_config.py .\audit-api\src\audit_data.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-observability-plan.ps1
```

## Observacao de ambiente

O daemon Docker nao esta ativo na maquina atual, entao a stack nao foi levantada localmente. Ainda assim, a observabilidade ficou implementada com configs reais de scrape, dashboard, datasource, alertas, pipeline de logs e app de auditoria.

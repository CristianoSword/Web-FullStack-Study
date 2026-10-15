# Observability Metrics Tracing

Projeto Node.js com RabbitMQ, Prometheus e Grafana para estudar metricas de fila, tracing por cabecalhos e alertas operacionais.

## O que foi implementado

- RabbitMQ Management, Prometheus e Grafana no `docker-compose`.
- Regras de alerta do Prometheus para profundidade de fila.
- Publicacao de mensagens com `traceId`, `spanId` e `parentSpanId`.
- Consumidor que mede latencia de processamento e atualiza contadores.
- Endpoint Prometheus em `/metrics`.
- Endpoint `/traces` com counters e historico recente de spans.
- Script de exemplo para publicar mensagem rastreada.

## Rotas

- `GET /health`
- `POST /messages/publish`
- `GET /metrics`
- `GET /traces`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Teste rapido

```powershell
powershell -ExecutionPolicy Bypass -File .\examples\publish-traced-message.ps1
Invoke-WebRequest -Uri "http://localhost:3074/metrics"
powershell -ExecutionPolicy Bypass -File .\scripts\check-metrics.ps1
```

## Validacao

```powershell
node .\scripts\validate-observability.mjs
docker compose config
```

## Stack de observabilidade

- RabbitMQ Management: `http://localhost:15672`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

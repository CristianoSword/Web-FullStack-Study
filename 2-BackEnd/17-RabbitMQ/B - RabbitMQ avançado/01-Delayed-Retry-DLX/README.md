# Delayed Retry DLX

Projeto de estudo de retry com TTL, dead-letter exchange e fila final de erro em RabbitMQ.

## O que foi implementado

- `docker-compose` com RabbitMQ Management em portas dedicadas.
- Exchange principal, exchange de retry e exchange de erro.
- Fila principal de processamento.
- Fila de retry com `x-message-ttl` e dead-letter de volta para a exchange principal.
- Fila final de erro para jobs que estouram o limite de tentativas.
- Worker que:
  - processa jobs normais
  - reenfileira jobs com falha no exchange de retry
  - move para fila de erro ao atingir `maxAttempts`
- API Fastify para publicar jobs, acompanhar tentativas e consultar dead letters.

## Estrutura

```text
.
|-- config/
|-- models/
|-- topology/
|-- src/
|   |-- lib/
|   |-- routes/
|   `-- services/
|-- scripts/
`-- examples/
```

## Rotas

- `GET /health`
- `GET /status`
- `POST /jobs/publish`
- `GET /jobs/published`
- `GET /jobs/attempts`
- `GET /jobs/processed`
- `GET /jobs/dead-letter`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-job.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\publish-failing-job.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-attempts.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-dead-letter.ps1
```

## Validacao

```powershell
node .\scripts\validate-delayed-retry.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. Mesmo assim, a topologia com TTL, DLX e fila de erro foi validada estruturalmente e os scripts falham de forma explicita quando o daemon nao esta disponivel.

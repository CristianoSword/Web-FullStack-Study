# Routing Direct Exchange

Projeto de estudo de roteamento por severidade usando `direct exchange` e binding keys em RabbitMQ.

## O que foi implementado

- `docker-compose` com RabbitMQ Management em portas dedicadas.
- Exchange `direct` duravel para roteamento por `routingKey`.
- Filas dedicadas para `info`, `warning`, `error` e `audit`.
- Publisher Node com `amqplib` para enviar logs por severidade.
- Consumidores separados por fila, cada um recebendo apenas a chave correspondente.
- API Fastify para publicar logs e inspecionar rotas e entregas efetivas.

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
- `POST /logs/publish`
- `GET /logs/published`
- `GET /routes`
- `GET /deliveries`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-error-log.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\publish-warning-log.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-routes.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-deliveries.ps1
```

## Validacao

```powershell
node .\scripts\validate-direct-routing.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. A topologia `direct` e o roteamento por binding key foram validados estruturalmente, e os scripts falham de forma explicita quando o daemon nao esta disponivel.

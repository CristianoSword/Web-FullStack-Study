# PubSub Fanout Exchange

Projeto de estudo de pub/sub com `fanout exchange`, broadcast de eventos e multiplos assinantes consumindo a mesma publicacao em RabbitMQ.

## O que foi implementado

- `docker-compose` com RabbitMQ Management em portas dedicadas.
- Exchange `fanout` duravel para broadcast sem routing key.
- Tres filas assinantes independentes:
  - auditoria
  - notificacoes
  - analytics
- Publisher Node com `amqplib` para enviar eventos broadcast.
- Tres consumidores separados em canais independentes, todos com `ack`.
- API Fastify para publicar eventos e consultar entregas/recibos de assinantes.

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
- `POST /events/publish`
- `GET /events/published`
- `GET /subscribers`
- `GET /subscribers/messages`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-broadcast.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-events.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-subscribers.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-deliveries.ps1
```

## Validacao

```powershell
node .\scripts\validate-fanout.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. A estrutura do compose e da topologia `fanout` foi validada localmente, e os scripts foram ajustados para falhar de forma explicita quando o daemon nao estiver disponivel.

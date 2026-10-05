# RabbitMQ Local Broker

Projeto de estudo de um broker RabbitMQ local com Management UI, exchange principal, fila de consumo e dead-letter queue.

## O que foi implementado

- `docker-compose` com `rabbitmq:3.13-management`.
- Configuracao AMQP e HTTP separada em arquivo JSON.
- Topologia materializada em `definitions.json` com:
  - exchange principal `topic`
  - dead-letter exchange
  - fila principal duravel
  - DLQ dedicada
  - bindings iniciais
- Servico Node com `amqplib` para bootstrap da topologia, publicacao e consumo com `ack`.
- API Fastify para publicar mensagens, enviar exemplo para DLQ e consultar metricas locais do broker.

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
- `POST /messages/publish`
- `POST /messages/dead-letter`
- `GET /messages/published`
- `GET /messages/consumed`
- `GET /messages/dlq`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-message.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-consumed.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\send-to-dlq.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-dlq.ps1
```

## Validacao

```powershell
node .\scripts\validate-broker.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. A topologia e os scripts foram validados estruturalmente, e o compose foi conferido com `docker compose config`.

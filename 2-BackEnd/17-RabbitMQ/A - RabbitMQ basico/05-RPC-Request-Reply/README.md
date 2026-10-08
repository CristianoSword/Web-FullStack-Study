# RPC Request Reply

Projeto de estudo de comunicacao request/reply com `correlationId`, `replyTo` e timeout usando RabbitMQ.

## O que foi implementado

- `docker-compose` com RabbitMQ Management em portas dedicadas.
- Fila de requests e fila de replies duraveis.
- Servidor RPC que consome operacoes `sum` e `multiply`.
- Cliente RPC com:
  - geracao de `correlationId`
  - publicacao com `replyTo`
  - espera assíncrona da resposta
  - timeout configuravel
- API Fastify para disparar chamadas RPC e consultar chamadas/respostas registradas.

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
- `POST /rpc/call`
- `GET /rpc/calls`
- `GET /rpc/responses`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\call-sum.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\call-multiply.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-calls.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-responses.ps1
```

## Validacao

```powershell
node .\scripts\validate-rpc.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. Mesmo assim, a estrutura de `correlationId`, reply queue e timeout foi validada em codigo e o compose foi conferido localmente.

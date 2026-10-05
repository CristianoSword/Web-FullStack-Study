# Work Queue Processor

Projeto de estudo de fila de trabalho com produtores, workers concorrentes, `prefetch`, `ack` e roteamento para DLQ em RabbitMQ.

## O que foi implementado

- `docker-compose` com RabbitMQ Management em portas dedicadas.
- Contratos JSON para tarefa, métrica de worker e entrada de dead letter.
- Topologia com fila principal durável e dead-letter queue.
- Serviço Node com:
  - publicação de jobs
  - múltiplos workers concorrentes
  - `prefetch(1)` por worker
  - `ack` para sucesso
  - `nack(false, false)` para falha definitiva
  - observador de DLQ
- API Fastify para despachar tarefas, inspecionar workers, processadas e DLQ.

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
- `POST /tasks/dispatch`
- `GET /tasks/dispatched`
- `GET /tasks/processed`
- `GET /tasks/dlq`
- `GET /workers`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\dispatch-task.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-workers.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\dispatch-failing-task.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-dlq.ps1
```

## Validacao

```powershell
node .\scripts\validate-work-queue.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. A configuracao do compose e a estrutura do projeto foram validadas localmente, e os scripts agora falham de forma explicita quando o daemon nao esta disponivel.

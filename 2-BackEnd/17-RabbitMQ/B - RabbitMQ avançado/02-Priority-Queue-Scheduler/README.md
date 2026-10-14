# Priority Queue Scheduler

Projeto Node.js com RabbitMQ para agendamento de jobs usando fila com prioridade, `prefetch` configuravel e controle de carga baseado na pressao atual da fila.

## O que foi implementado

- `docker-compose` com RabbitMQ Management.
- Exchange direta para despacho e exchange fanout para auditoria.
- Fila prioritara com `maxPriority`.
- Scheduler em memoria que ordena jobs por prioridade e data de execucao.
- Worker com `prefetch` configuravel.
- Politica de controle de carga que pausa novos despachos quando a fila passa do `highWatermark`.
- API Fastify para agendar jobs, disparar o ciclo manualmente e inspecionar o estado atual.
- Scripts de validacao estrutural e consulta de estado.

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
- `GET /scheduler/state`
- `POST /scheduler/jobs`
- `POST /scheduler/dispatch`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Exemplo de uso

```powershell
powershell -ExecutionPolicy Bypass -File .\examples\create-batch.ps1
Invoke-RestMethod -Method Post -Uri "http://localhost:3072/scheduler/dispatch"
powershell -ExecutionPolicy Bypass -File .\scripts\check-state.ps1
```

## Validacao

```powershell
node .\scripts\validate-priority-scheduler.mjs
docker compose config
```

## Observacoes

- A pressao da fila e lida via API HTTP do RabbitMQ Management.
- O scheduler pausa novos envios quando `queuedMessages + inFlight` atinge o `highWatermark`.
- A prioridade das mensagens e aplicada no publish RabbitMQ, nao apenas ordenada na memoria.

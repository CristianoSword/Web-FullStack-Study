# Background Queue Workers - Laravel

Projeto didatico para estudar batches de jobs, workers dedicados e fila de envio em lote inspirada em Redis + queue workers do Laravel.

## Objetivo

Montar uma base para:

- visualizar throughput de workers
- disparar campanhas em lote
- registrar batches enfileirados
- separar camadas de dashboard e dispatch

## Funcionalidades

- Dashboard com metricas de workers
- Formulario para enfileirar campanha
- Persistencia local de batches em JSON
- Listagem de lotes com status e volume
- Validacao de nome de campanha e quantidade de jobs

## Estrutura

```text
04-Background-Queue-Workers/
├── app/
│   ├── Contracts/
│   │   └── QueueBatchStore.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── QueueLabController.php
│   │   └── Requests/
│   │       └── DispatchBatchRequest.php
│   ├── Models/
│   │   ├── QueueBatch.php
│   │   └── QueueJobMetric.php
│   └── Support/
│       ├── JsonQueueBatchStore.php
│       └── QueueLabWorkspace.php
├── config/queue_lab.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/queue-lab.blade.php
└── routes/web.php
```

## Como evoluir para fila real

1. Trocar `JsonQueueBatchStore` por batches em banco.
2. Disparar jobs reais com `dispatch()` e filas dedicadas.
3. Conectar monitoramento com Horizon ou painel proprio.
4. Registrar falhas e retry policies.
5. Adicionar workers especializados por campanha.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`

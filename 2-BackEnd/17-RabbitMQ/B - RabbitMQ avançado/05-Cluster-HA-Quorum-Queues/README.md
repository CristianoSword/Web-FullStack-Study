# Cluster HA Quorum Queues

Projeto Node.js com RabbitMQ em cluster de 3 nos para estudo de quorum queues, politicas HA, `pause_minority` e inspeção de estado via Management API.

## O que foi implementado

- `docker-compose` com tres nos RabbitMQ Management.
- Configuracao compartilhada de cluster com `classic_config`.
- Politica `ha-quorum-all` aplicada em filas `cluster.*`.
- Fila `cluster.orders.quorum` com `x-queue-type=quorum`.
- DLX e DLQ para mensagens que excederem o limite de entrega.
- API Fastify para publicar mensagens e consultar o snapshot do cluster.
- Servico de probe usando a Management API para listar nos, leader, membros e estado da fila.

## Rotas

- `GET /health`
- `GET /cluster`
- `POST /cluster/messages`
- `GET /cluster/messages`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Teste rapido

```powershell
powershell -ExecutionPolicy Bypass -File .\examples\publish-cluster-message.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\check-cluster.ps1
```

## Validacao

```powershell
node .\scripts\validate-cluster.mjs
docker compose config
```

## Observacoes de HA

- O cluster usa `cluster_partition_handling = pause_minority` para reduzir risco de split-brain.
- A fila principal e quorum queue e pode eleger novo leader em caso de perda de no.
- A API exposta pelo projeto foi feita para revisar leader, membros online e eventos recentes sem depender so da interface web.

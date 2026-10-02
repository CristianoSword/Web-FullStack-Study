# Microservices Outbox Kafka

Projeto de estudo do padrao transactional outbox conectando persistencia relacional em SQLite com publicacao de eventos Kafka.

## O que foi implementado

- API Fastify para criar pedidos, listar pedidos e inspecionar/publicar eventos do outbox.
- Persistencia relacional com `better-sqlite3`, usando tabelas `orders`, `order_items` e `outbox_events`.
- Escrita transacional unica para pedido + itens + evento `OrderCreated`.
- Publisher de outbox que busca eventos `PENDING`, publica no Kafka e atualiza o banco para `PUBLISHED`.
- Polling automatico no servidor para simular o worker desacoplado que drena a tabela outbox.
- Contrato JSON do evento `orders.created.v1` e schemas de comando/registro.

## Estrutura

```text
.
|-- config/
|-- contracts/
|-- database/
|-- models/
|-- src/
|   |-- domain/
|   |-- lib/
|   |-- repositories/
|   |-- routes/
|   `-- services/
|-- scripts/
`-- examples/
```

## Rotas

- `GET /health`
- `GET /status`
- `POST /orders`
- `GET /orders`
- `GET /outbox`
- `POST /outbox/publish`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\create-order.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-outbox.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\publish-outbox.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-orders.ps1
```

## Validacao

```powershell
node .\scripts\validate-outbox.mjs
docker compose config
```

Smoke adicional executado localmente:

- gravacao transacional de pedido + outbox em SQLite
- verificacao de evento inicial com status `PENDING`

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. Mesmo assim, a estrutura do compose foi validada e o lado relacional do projeto foi exercitado localmente com smoke em SQLite.

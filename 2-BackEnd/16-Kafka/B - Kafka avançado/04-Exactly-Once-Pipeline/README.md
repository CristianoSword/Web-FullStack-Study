# Exactly Once Pipeline

Projeto de estudo focado em pipeline Kafka com produtor idempotente, transacao por processamento, deduplicacao por `idempotencyKey` e trilha de DLQ para falhas de validacao.

## O que foi implementado

- API Fastify para ingestao, processamento e consulta de status do pipeline.
- Configuracao KafkaJS com `idempotent: true`, `transactionalId` e `maxInFlightRequests: 1`.
- Topicos reais para entrada, saida processada e dead letter queue.
- Servico de processamento com validacao de payload, controle de idempotencia em memoria, transacao Kafka e resposta `PROCESSED` ou `DUPLICATE`.
- Schemas JSON para payload de entrada, payload de saida e registro de idempotencia.
- Scripts PowerShell para subir/parar broker, iniciar API e testar o fluxo.

## Estrutura

```text
.
|-- config/
|-- models/
|-- src/
|   |-- domain/
|   |-- lib/
|   |-- routes/
|   `-- services/
|-- scripts/
`-- examples/
```

## Rotas

- `GET /health`
- `GET /status`
- `GET /payments/ingested`
- `POST /payments/ingest`
- `POST /payments/process`
- `GET /payments/processed`
- `GET /payments/dlq`
- `GET /payments/idempotency/:idempotencyKey`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-broker.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Fluxo de teste

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\ingest-payment.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\process-payment.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\process-payment.ps1
```

Na segunda execucao de processamento com a mesma `idempotencyKey`, a saida esperada e `DUPLICATE`.

## Validacao

```powershell
node .\scripts\validate-pipeline.mjs
docker compose config
```

## Observacao de ambiente

Nesta maquina, o `docker compose up` continua bloqueado porque o Docker Desktop daemon nao esta ativo. A configuracao foi validada com `docker compose config`, e os scripts foram ajustados para falhar explicitamente quando esse servico nao estiver disponivel.

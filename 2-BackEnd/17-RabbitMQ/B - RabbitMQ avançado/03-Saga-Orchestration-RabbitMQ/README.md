# Saga Orchestration RabbitMQ

Projeto Node.js com RabbitMQ para estudo de saga orquestrada de pedidos distribuindo comandos para inventario, pagamento e envio, com compensacoes quando uma etapa falha.

## O que foi implementado

- Exchange `topic` para comandos e eventos da saga.
- Filas separadas para inventario, pagamento, envio e observacao do orquestrador.
- Orquestrador que cria a saga e decide a proxima etapa a partir dos eventos recebidos.
- Servicos simulados de dominio que publicam sucesso ou falha.
- Compensacao de inventario e reembolso de pagamento quando necessario.
- API Fastify para criar pedidos e consultar sagas.
- Scripts de validacao sintatica e consulta de uma saga especifica.

## Rotas

- `GET /health`
- `GET /sagas`
- `GET /sagas/:sagaId`
- `POST /orders`

## Como rodar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1
```

## Teste de compensacao

```powershell
$response = powershell -ExecutionPolicy Bypass -File .\examples\create-order-with-payment-failure.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\check-saga.ps1 -SagaId "<saga-id>"
```

## Validacao

```powershell
node .\scripts\validate-saga.mjs
docker compose config
```

## Fluxo resumido

1. `POST /orders` cria a saga e envia `inventory.reserve`.
2. Se o inventario confirma, o orquestrador envia `payment.capture`.
3. Se o pagamento confirma, o orquestrador envia `shipping.create`.
4. Se pagamento ou envio falham, a saga dispara compensacoes.
5. O estado final fica disponivel via `GET /sagas/:sagaId`.

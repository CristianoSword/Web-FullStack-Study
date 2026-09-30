# Event Sourcing Orders

Servico de pedidos com `Fastify` e `kafkajs` usando event sourcing: cada mudanca de estado vira evento Kafka e a projecao do pedido pode ser recomposta por replay.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local em KRaft.
- `config/orders-config.json`: broker, porta HTTP, topico e grupo do projetor.
- `models/*.schema.json`: contratos dos eventos e da projecao reconstruida.
- `src/services/event-store-service.mjs`: append de eventos, guards de transicao e replay da stream.
- `src/domain/order-projection.mjs`: aplica eventos e reconstroi o estado do pedido.
- `src/routes/order-routes.mjs`: endpoints para criar, pagar, cancelar, enviar, consultar e replayar pedidos.
- `scripts/*.ps1`: atalhos para broker, API, mutacoes e consultas do fluxo.
- `scripts/validate-orders.mjs`: validacao estrutural do projeto.
- `examples/orders-playbook.md`: roteiro para observar a stream e a projecao.

## Recursos cobertos

- stream Kafka `orders.events.v1` como event store
- versao incremental por pedido
- projecao em memoria atualizada por append
- replay do stream para recompor o estado do pedido
- regras de transicao para pagamento, cancelamento e envio
- endpoints REST para comandos e consultas

## Executar

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\create-order.ps1
.\scripts\pay-order.ps1
.\scripts\ship-order.ps1
.\scripts\get-order.ps1
.\scripts\replay-order.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-orders.mjs
docker compose config
```

## Observacao

Quando o Docker daemon local nao estiver ativo, `run-broker.ps1` falha explicitamente para diferenciar o bloqueio de infraestrutura local de um erro no servico de pedidos.

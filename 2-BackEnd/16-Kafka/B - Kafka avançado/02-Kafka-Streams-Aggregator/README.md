# Kafka Streams Aggregator

Servico de agregacao de vendas por janela com `Fastify` e `kafkajs`, materializando estado em memoria e publicando agregados para um topico de saida.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local em KRaft.
- `config/aggregator-config.json`: topicos de entrada/saida, janela, grace period e porta HTTP.
- `models/*.schema.json`: contratos do evento de venda e do agregado por janela.
- `src/domain/windowing.mjs`: calcula limites da janela e atualiza o agregado incrementalmente.
- `src/services/stream-aggregator-service.mjs`: consumer interno, materializacao de estado e emissao do topico agregado.
- `src/routes/aggregator-routes.mjs`: endpoints para ingestao de eventos e consulta das janelas materializadas.
- `scripts/*.ps1`: atalhos para broker, API, publish sample e consultas do agregado.
- `scripts/validate-aggregator.mjs`: validacao estrutural do projeto.
- `examples/aggregator-playbook.md`: roteiro para observar a agregacao por janela.

## Recursos cobertos

- topico de entrada `sales.events.v1`
- topico de saida `sales.aggregates.v1`
- agregacao incremental por janela de 60 segundos
- contagem, soma e media por loja
- estado materializado consultavel por API
- emissao do agregado atualizado no topico de saida

## Executar

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\publish-sample.ps1
.\scripts\check-status.ps1
.\scripts\list-aggregates.ps1
.\scripts\list-store-aggregates.ps1 STORE-001
```

## Validar estrutura

```powershell
node .\scripts\validate-aggregator.mjs
docker compose config
```

## Observacao

Quando o Docker daemon local nao estiver ativo, `run-broker.ps1` falha explicitamente para separar bloqueio de infraestrutura local de problema no codigo do agregador.

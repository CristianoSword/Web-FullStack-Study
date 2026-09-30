# Consumer Group Balancer

Lab Kafka com dois brokers e varios consumers no mesmo group para demonstrar rebalancing, atribuicao de particoes e leitura concorrente com `kafkajs`.

## Estrutura

- `docker-compose.yml`: sobe dois brokers Kafka 3.9 em KRaft.
- `config/balancer-config.json`: brokers, topico, consumer group e workers do lab.
- `models/*.schema.json`: contratos do worker e dos eventos de rebalance.
- `src/cli/coordinator.mjs`: cria o topico e publica a carga por particao.
- `src/cli/consumer-worker.mjs`: worker Kafka que entra no mesmo group e registra `JOINED`, `REBALANCING`, `ASSIGNED` e `STOPPED`.
- `scripts/run-*.ps1`: atalhos para subir lab, coordenador e workers.
- `scripts/validate-balancer.mjs`: validacao estrutural do projeto.
- `examples/rebalance-playbook.md`: passo a passo para observar o rebalance.

## Recursos cobertos

- consumer group compartilhado entre multiplos workers
- atribuicao round-robin de particoes
- leitura concorrente com `partitionsConsumedConcurrently`
- publicacao de carga com particao definida
- eventos de entrada, rebalance e parada dos consumers
- shutdown limpo dos workers via `SIGINT` e `SIGTERM`

## Executar

```powershell
npm install
.\scripts\run-lab.ps1
.\scripts\run-coordinator.ps1
.\scripts\run-worker-a.ps1
.\scripts\run-worker-b.ps1
.\scripts\run-worker-c.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-balancer.mjs
docker compose config
```

## Observacao

O fluxo completo depende do Docker daemon local estar ativo. Quando ele nao estiver disponivel, `run-lab.ps1` falha explicitamente para deixar claro que o bloqueio eh de infraestrutura local.

# Kafka Local Cluster

Cluster Kafka local em modo KRaft com dois brokers, topicos iniciais versionados e scripts de bootstrap/inspecao.

## Estrutura

- `docker-compose.yml`: sobe dois brokers Kafka 3.9 em modo KRaft.
- `config/cluster-topology.json`: topologia do cluster e lista dos topicos previstos.
- `topics/*.json`: manifests dos topicos iniciais com particoes, replication factor e configs.
- `scripts/run-cluster.ps1`: sobe o cluster local.
- `scripts/bootstrap-topics.ps1`: cria os topicos a partir dos manifests versionados.
- `scripts/describe-topics.ps1`: lista topicos, particoes e replicas.
- `scripts/check-metadata.ps1`: verifica o quorum KRaft e o metadata status.
- `scripts/inspect-cluster.ps1`: resumo rapido do ambiente local.
- `examples/cluster-playbook.md`: passo a passo de uso.

## Topicos iniciais

- `orders.events.v1`
- `payments.events.v1`
- `inventory.snapshots.v1`

## Recursos cobertos

- KRaft sem ZooKeeper
- dois brokers locais
- topicos com retention e compaction
- bootstrap idempotente
- inspecao de metadata quorum

## Executar

```powershell
.\scripts\run-cluster.ps1
.\scripts\bootstrap-topics.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-cluster.mjs
docker compose config
```

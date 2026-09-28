# Cluster Playbook

1. Execute `scripts/run-cluster.ps1`.
2. Aguarde os brokers estabilizarem em `localhost:19092` e `localhost:29092`.
3. Execute `scripts/bootstrap-topics.ps1` para criar os topicos iniciais.
4. Rode `scripts/describe-topics.ps1` para conferir particoes e replication factor.
5. Rode `scripts/check-metadata.ps1` para inspecionar o quorum KRaft.

# Replica Set Playbook

1. Execute `scripts/run-replicaset.ps1`.
2. Execute `scripts/seed-lab.ps1` para iniciar o replica set e carregar o dataset.
3. Rode `scripts/run-transaction.ps1 -Mode commit`.
4. Rode `scripts/run-transaction.ps1 -Mode rollback`.
5. No Compass, conecte no replica set usando `mongodb://localhost:27024,localhost:27025,localhost:27026/?replicaSet=rsStudy`.
6. Abra `bank_ops.accounts`, `bank_ops.transfers` e `bank_ops.audit_logs`.
7. Rode `queries/verification.mongodb.js` para conferir membros, saldos e logs.

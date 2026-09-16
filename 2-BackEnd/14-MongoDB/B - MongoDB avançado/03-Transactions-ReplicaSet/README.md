# Transactions Replica Set

Lab avancado de MongoDB para transacoes ACID entre multiplos documentos usando um Replica Set real.

## Estrutura

- `docker-compose.yml`: sobe tres nos MongoDB em replica set nas portas `27024`, `27025` e `27026`.
- `replica-set/init-replica.js`: inicializa o `rsStudy` com tres membros.
- `seed/01-init.js`: cria `accounts`, `transfers` e `audit_logs`, com validators e dados base.
- `transactions/commit-transfer.mongodb.js`: executa uma transferencia bem-sucedida dentro de uma transacao.
- `transactions/rollback-transfer.mongodb.js`: simula saldo insuficiente, aborta a transacao e registra rollback.
- `queries/verification.mongodb.js`: confere estado do replica set, saldos, transferencias e logs.
- `compass/`: documento exemplo e playbook para conexao via Compass.
- `scripts/`: automacoes para subir, inicializar, semear, executar cenarios, inspecionar e validar.

## Collections

- `bank_ops.accounts`
- `bank_ops.transfers`
- `bank_ops.audit_logs`

## Recursos cobertos

- Replica Set com `rs.initiate`
- transacoes com `startTransaction`
- `commitTransaction`
- `abortTransaction`
- integridade entre debit, credit e audit log

## Executar

```powershell
.\scripts\run-replicaset.ps1
.\scripts\seed-lab.ps1
```

## Rodar cenarios

```powershell
.\scripts\run-transaction.ps1 -Mode commit
.\scripts\run-transaction.ps1 -Mode rollback
```

## Validar estrutura

```powershell
node .\scripts\validate-transactions.mjs
docker compose config
```

## Compass

1. Conecte em `mongodb://localhost:27024,localhost:27025,localhost:27026/?replicaSet=rsStudy`.
2. Abra `bank_ops.accounts`, `bank_ops.transfers` e `bank_ops.audit_logs`.
3. Rode `queries/verification.mongodb.js` para verificar membros, saldos e eventos.

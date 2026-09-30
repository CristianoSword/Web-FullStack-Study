# Rebalance Playbook

## Sequencia sugerida

```powershell
npm install
.\scripts\run-lab.ps1
.\scripts\run-coordinator.ps1
.\scripts\run-worker-a.ps1
.\scripts\run-worker-b.ps1
.\scripts\run-worker-c.ps1
```

## O que observar

- `run-coordinator.ps1`: cria o topico com 4 particoes e publica a carga inicial.
- `run-worker-a.ps1`, `run-worker-b.ps1`, `run-worker-c.ps1`: entram no mesmo consumer group e exibem eventos `JOINED`, `REBALANCING` e `ASSIGNED`.
- conforme novos workers entram, as particoes sao redistribuidas e a saida mostra a nova atribuicao.
- as mensagens publicadas trazem a particao de origem para facilitar a visualizacao da concorrencia.

## Encerramento

```powershell
.\scripts\stop-lab.ps1
```

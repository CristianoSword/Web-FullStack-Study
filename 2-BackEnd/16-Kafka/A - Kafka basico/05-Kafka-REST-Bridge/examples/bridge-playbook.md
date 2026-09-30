# Bridge Playbook

## Sequencia sugerida

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\publish-sample.ps1
.\scripts\check-status.ps1
```

## O que observar

- `check-health.ps1`: confirma se a API esta de pe.
- `publish-sample.ps1`: publica um evento REST no topico Kafka.
- `check-status.ps1`: mostra total publicado e os eventos recentes mantidos pelo bridge.

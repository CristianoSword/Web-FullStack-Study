# Aggregator Playbook

## Sequencia sugerida

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

## O que observar

- `publish-sample.ps1`: publica um evento de venda no topico de entrada.
- o consumer interno processa a stream e atualiza a janela materializada em memoria.
- `list-aggregates.ps1`: mostra as janelas agregadas produzidas pelo servico.

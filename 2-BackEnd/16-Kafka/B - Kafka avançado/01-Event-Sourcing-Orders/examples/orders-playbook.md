# Orders Playbook

## Sequencia sugerida

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\start-api.ps1
.\scripts\create-order.ps1
.\scripts\pay-order.ps1
.\scripts\ship-order.ps1
.\scripts\get-order.ps1
.\scripts\replay-order.ps1
```

## O que observar

- cada comando de mutacao gera um novo evento no topico `orders.events.v1`
- `get-order.ps1` mostra a projecao atual em memoria
- `replay-order.ps1` recompõe a projecao a partir do stream salvo do pedido

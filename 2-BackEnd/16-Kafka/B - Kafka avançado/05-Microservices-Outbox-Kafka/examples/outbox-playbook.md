# Outbox Playbook

1. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1`.
2. Rode `npm install`.
3. Inicie a API com `powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1`.
4. Crie um pedido com `powershell -ExecutionPolicy Bypass -File .\scripts\create-order.ps1`.
5. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-outbox.ps1` para verificar o evento pendente.
6. Dispare `powershell -ExecutionPolicy Bypass -File .\scripts\publish-outbox.ps1` ou aguarde o polling automatico.
7. Confira `powershell -ExecutionPolicy Bypass -File .\scripts\list-orders.ps1` para ver o pedido marcado como `PUBLISHED`.

# Broker Playbook

1. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1`.
2. Rode `npm install`.
3. Inicie a API com `powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1`.
4. Publique uma mensagem com `powershell -ExecutionPolicy Bypass -File .\scripts\publish-message.ps1`.
5. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-consumed.ps1`.
6. Envie um exemplo para DLQ com `powershell -ExecutionPolicy Bypass -File .\scripts\send-to-dlq.ps1`.
7. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-dlq.ps1`.

# Delayed Retry Playbook

1. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1`.
2. Rode `npm install`.
3. Inicie a API com `powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1`.
4. Publique um job normal com `powershell -ExecutionPolicy Bypass -File .\scripts\publish-job.ps1`.
5. Publique um job com falha usando `powershell -ExecutionPolicy Bypass -File .\scripts\publish-failing-job.ps1`.
6. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-attempts.ps1`.
7. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-dead-letter.ps1`.

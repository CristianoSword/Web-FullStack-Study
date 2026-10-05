# Work Queue Playbook

1. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\run-infra.ps1`.
2. Rode `npm install`.
3. Inicie a API com `powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1`.
4. Dispare um job normal com `powershell -ExecutionPolicy Bypass -File .\scripts\dispatch-task.ps1`.
5. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-workers.ps1`.
6. Dispare um job com falha usando `powershell -ExecutionPolicy Bypass -File .\scripts\dispatch-failing-task.ps1`.
7. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-dlq.ps1`.

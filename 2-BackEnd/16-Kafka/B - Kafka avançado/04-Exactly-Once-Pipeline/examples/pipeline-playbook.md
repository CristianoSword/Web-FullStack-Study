# Pipeline Playbook

1. Execute `powershell -ExecutionPolicy Bypass -File .\scripts\run-broker.ps1`.
2. Instale as dependencias com `npm install`.
3. Inicie a API com `powershell -ExecutionPolicy Bypass -File .\scripts\start-api.ps1`.
4. Publique um pagamento com `powershell -ExecutionPolicy Bypass -File .\scripts\ingest-payment.ps1`.
5. Processe o pagamento com `powershell -ExecutionPolicy Bypass -File .\scripts\process-payment.ps1`.
6. Rode o mesmo processamento de novo para observar a saida `DUPLICATE`.
7. Consulte `powershell -ExecutionPolicy Bypass -File .\scripts\list-processed.ps1`.

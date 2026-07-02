# 05-Node-Worker-Threads-Lab

Laboratorio com `worker_threads` reais para dividir faixas de processamento e consolidar resultados.

## Arquivos

- `src/models/job-config.js`: define o tamanho do trabalho e divide em faixas.
- `src/workers/run-chunk.js`: executa cada worker em thread separada.
- `src/services/prime-service.js`: calcula soma e quantidade de primos por faixa.
- `src/validators/job-validator.js`: protege a configuracao.

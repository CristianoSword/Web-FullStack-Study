# 04-Stream-Processor-Large-Files

Processador CSV com `createReadStream` e leitura linha a linha para agregacao de arquivos grandes.

## Arquivos

- `src/services/report-processor.js`: le arquivo por stream e agrega totais por categoria.
- `src/cli/run-report.js`: ponto de chamada do fluxo.
- `src/validators/report-validator.js`: descarta linhas mal formadas.
- `data/sales.csv`: amostra inicial para execucao local.

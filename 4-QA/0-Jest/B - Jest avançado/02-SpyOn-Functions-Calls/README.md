# 02-SpyOn-Functions-Calls

Laboratorio avancado de **Jest** para estudar `jest.spyOn` em chamadas internas de servicos e metodos auxiliares.

## O que este projeto cobre

- espionar metodos de instancia
- verificar ordem e quantidade de chamadas
- observar argumentos passados para funcoes internas
- manter a implementacao real enquanto a chamada e rastreada

## Estrutura

- `src/models/`: modelos de inscricao e auditoria
- `src/services/`: fluxo principal de matricula
- `tests/`: suite que usa `jest.spyOn`

## Como executar

```bash
npm install
npm test
```

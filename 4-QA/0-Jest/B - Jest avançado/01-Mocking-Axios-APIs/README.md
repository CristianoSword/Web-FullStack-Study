# 01-Mocking-Axios-APIs

Laboratorio avancado de **Jest** para estudar mock de chamadas HTTP com `axios`.

## O que este projeto cobre

- service isolado do cliente HTTP
- mock completo de `axios` com `jest.mock`
- testes de sucesso e erro
- transformacao do payload da API em modelo interno

## Estrutura

- `src/api/http-client.js`: cliente axios compartilhado
- `src/services/course-service.js`: regra de negocio
- `tests/course-service.test.js`: mock de sucesso e falha

## Como executar

```bash
npm install
npm test
```

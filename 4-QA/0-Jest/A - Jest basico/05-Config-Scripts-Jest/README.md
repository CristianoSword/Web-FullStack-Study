# 05-Config-Scripts-Jest

Laboratorio de configuracao do **Jest** cobrindo scripts, setup global, aliases simples e thresholds de cobertura.

## O que este projeto cobre

- `package.json` com scripts de `test`, `watch` e `coverage`
- `jest.config.cjs` separado
- arquivo de setup para matchers/globals
- testes unitarios pequenos para validar a configuracao

## Estrutura

- `src/`: funcoes simples para exercitar a suite
- `tests/`: validacao das utilidades
- `test/setup.js`: bootstrap do ambiente de testes
- `jest.config.cjs`: configuracao principal

## Como executar

```bash
npm install
npm test
npm run test:watch
npm run test:coverage
```

# 01 - Playwright Intro CLI

Projeto básico para praticar a instalação do Playwright e a gravação de interações com `codegen`.

## O que tem aqui

- App local com catálogo filtrável de trilhas.
- Teste E2E cobrindo cliques e asserts com seletores acessíveis.
- Modelo `track-catalog.js` para manter os dados esperados do fluxo.

## Como rodar

```bash
npm install
npx playwright test
```

## Como gravar um fluxo com Codegen

```bash
npx playwright codegen file:///.../app/index.html
```

O teste em `tests/intro-cli.spec.js` segue o estilo de seletores gerados pelo Codegen, mas com pequenos ajustes para manter legibilidade.

# 04 - Page Navigation Trace

Projeto para praticar navegação entre páginas e geração de trace com o Playwright.

## O que tem aqui

- Fluxo com três páginas HTML locais.
- Persistência simples com `localStorage` para carregar o resumo final.
- Teste que inicia e encerra `context.tracing` manualmente.

## Como rodar

```bash
npm install
npx playwright test
```

O trace é salvo em `artifacts/navigation-trace.zip`.

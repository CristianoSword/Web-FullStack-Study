# 03 - Visual Regression Snapshots

Projeto para regressão visual usando snapshots nativos do Playwright.

## O que tem aqui

- Layout determinístico preparado para screenshot comparável.
- Teste com `toHaveScreenshot` no cartão principal.
- Tokens centrais em `src/models/layout-tokens.js`.

## Como rodar

```bash
npm install
npx playwright test
```

Na primeira execução com dependências instaladas, o Playwright pode gerar a baseline do snapshot. Nas execuções seguintes, a comparação detecta regressões visuais.

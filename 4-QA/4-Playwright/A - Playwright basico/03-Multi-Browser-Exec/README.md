# 03 - Multi Browser Exec

Projeto básico para executar o mesmo smoke test em Chromium, Firefox e WebKit.

## O que tem aqui

- Configuração de `projects` no `playwright.config.js`.
- App local que exibe o navegador alvo via query string.
- Teste reutilizado para as três engines.

## Como rodar

```bash
npm install
npx playwright test
```

Também é possível filtrar por navegador com `npm run test:chromium`, `npm run test:firefox` e `npm run test:webkit`.

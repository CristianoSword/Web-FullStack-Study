# 02 - Multi Context Session Storage

Projeto avançado para simular usuários diferentes em contextos isolados.

## O que tem aqui

- App local que salva sessão em `sessionStorage`.
- Teste criando dois `browser.newContext()` independentes.
- Garantia de isolamento entre as sessões de Alice e Bruno.

## Como rodar

```bash
npm install
npx playwright test
```

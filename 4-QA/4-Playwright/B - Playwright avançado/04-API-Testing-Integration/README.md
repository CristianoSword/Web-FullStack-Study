# 04 - API Testing Integration

Projeto avançado que mistura `APIRequestContext` com validação de interface no mesmo teste.

## O que tem aqui

- Servidor HTTP local em Node para expor API e arquivos estáticos.
- Endpoint `/api/modules/review` para alterar estado antes de abrir a UI.
- Teste que chama a API diretamente e depois confirma o reflexo na página.

## Como rodar

```bash
npm install
npx playwright test
```

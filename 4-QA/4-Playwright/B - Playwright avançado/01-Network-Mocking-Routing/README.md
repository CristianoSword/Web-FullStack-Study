# 01 - Network Mocking Routing

Projeto avançado para demonstrar `page.route`, mock de API de terceiros e bloqueio de assets pesados.

## O que tem aqui

- Página local com imagem externa e carregamento de módulos via `fetch`.
- Teste que bloqueia imagens e responde a API com payload controlado.
- Modelo `network-plan.js` com os dados esperados do fluxo.

## Como rodar

```bash
npm install
npx playwright test
```

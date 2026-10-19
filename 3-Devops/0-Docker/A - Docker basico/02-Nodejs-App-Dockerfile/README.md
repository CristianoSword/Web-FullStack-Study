# Nodejs App Dockerfile

Projeto de empacotamento de uma aplicacao Node.js pequena com um Dockerfile cache-friendly, lockfile, healthcheck e scripts de operacao local.

## O que foi implementado

- Aplicacao Node HTTP com rotas `/health` e `/metadata`.
- Loader de configuracao de runtime via JSON e variaveis de ambiente.
- Dockerfile baseado em `node:22-alpine`.
- Ordem de `COPY` focada em aproveitar cache de dependencias.
- `npm ci --omit=dev` para instalacao reproduzivel da imagem.
- `HEALTHCHECK` HTTP para verificar a app no container.
- Scripts de `build`, `run`, `inspect`, `check-http` e validacao.

## Estrutura

```text
.
|-- config/
|-- models/
|-- scripts/
`-- src/
```

## Scripts

- `scripts/build-image.ps1`
- `scripts/run-container.ps1`
- `scripts/inspect-image.ps1`
- `scripts/check-http.ps1`
- `scripts/check-command-plan.ps1`
- `scripts/validate-project.mjs`

## Como usar

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\run-container.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\check-http.ps1
```

## Validacao

```powershell
node .\scripts\validate-project.mjs
npm run check
powershell -ExecutionPolicy Bypass -File .\scripts\check-command-plan.ps1
```

## Observacao de ambiente

O daemon Docker continua indisponivel nesta maquina, entao a verificacao local foi feita por sintaxe Node, lockfile, estrutura dos scripts e montagem real dos comandos e do Dockerfile.

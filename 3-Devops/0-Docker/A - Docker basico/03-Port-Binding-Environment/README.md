# Port Binding Environment

Projeto de estudo focado em `docker run -p`, `--env-file` e sobrescrita de variaveis de ambiente para publicar a mesma aplicacao em portas diferentes do host.

## O que foi implementado

- Aplicacao Node HTTP com rotas `/health`, `/environment` e `/binding`.
- Carregamento de configuracao via `bootstrap.json`, variaveis de ambiente e `env-file`.
- Dockerfile baseado em `node:22-alpine` com `EXPOSE 3010`.
- Perfil de publicacao de portas em `models/port-binding-profile.json`.
- Scripts para build, execucao padrao, execucao em porta alternativa e checagem de comandos.
- Validacao estrutural do projeto e verificacao de sintaxe dos arquivos Node.

## Estrutura

```text
.
|-- config/
|-- models/
|-- scripts/
`-- src/
```

## Fluxo do container

- Porta interna da app: `3010`
- Bind padrao: `3010:3010`
- Bind alternativo: `4010:3010`
- Variaveis principais: `PORT`, `HOST`, `APP_NAME`, `APP_MODE`, `MESSAGE`, `FEATURE_FLAG`

## Scripts

- `scripts/build-image.ps1`
- `scripts/run-default.ps1`
- `scripts/run-alt-port.ps1`
- `scripts/check-default.ps1`
- `scripts/check-alt.ps1`
- `scripts/check-command-plan.ps1`
- `scripts/validate-project.mjs`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\run-default.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\run-alt-port.ps1
```

## Validacao

```powershell
node .\scripts\validate-project.mjs
npm run check
powershell -ExecutionPolicy Bypass -File .\scripts\check-command-plan.ps1
```

## Observacao de ambiente

O daemon Docker nao esta disponivel nesta maquina e o sandbox local tambem bloqueou a execucao completa do Node CLI nesta pasta. Por isso a validacao ficou baseada na estrutura real do projeto, sintaxe dos arquivos, consistencia do Dockerfile e nos comandos operacionais documentados.

# Docker CLI Commands

Laboratorio basico de Docker CLI com imagem de exemplo, scripts PowerShell para `build`, `run`, `ps`, `stop`, `logs`, `inspect` e `rm`, alem de validacao estrutural do fluxo.

## O que foi implementado

- Imagem Nginx Alpine servindo uma pagina estatica do laboratorio.
- Dockerfile real com `COPY`, `EXPOSE` e ajuste da porta do Nginx.
- Configuracao do laboratorio em JSON.
- Catalogo de comandos Docker usados nos exercicios.
- Modulo PowerShell que monta e executa os comandos ou cai para modo `plan-only`.
- Scripts operacionais para `build`, `run`, `list`, `inspect`, `logs`, `stop` e `remove`.
- Script de validacao sintatica dos arquivos PowerShell.

## Estrutura

```text
.
|-- app/
|-- config/
|-- images/
|-- models/
|-- scripts/
`-- src/
```

## Scripts principais

- `scripts/build-image.ps1`
- `scripts/run-container.ps1`
- `scripts/list-containers.ps1`
- `scripts/inspect-container.ps1`
- `scripts/show-logs.ps1`
- `scripts/stop-container.ps1`
- `scripts/remove-container.ps1`
- `scripts/show-command-plan.ps1`
- `scripts/check-docker-daemon.ps1`
- `scripts/validate-lab.ps1`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\run-container.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\list-containers.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\stop-container.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\remove-container.ps1
```

## Validacao

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\show-command-plan.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\check-docker-daemon.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\validate-lab.ps1
```

## Observacao de ambiente

Nesta maquina, a CLI Docker esta instalada, mas o daemon do Docker Desktop nao esta ativo. Por isso os scripts entram em `plan-only` quando necessario, e a validacao foi feita por estrutura, sintaxe e montagem real dos comandos.

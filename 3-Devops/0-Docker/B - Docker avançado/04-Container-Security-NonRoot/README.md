# Container Security NonRoot

Projeto de estudo para endurecer a execucao de um container rodando como usuario nao-root, com filesystem somente leitura, `tmpfs`, queda de capacidades Linux e politica `no-new-privileges`.

## O que foi implementado

- API HTTP em Python padrao com rotas `/health`, `/security` e `/filesystem-check`.
- `Dockerfile` que cria usuario e grupo dedicados antes de trocar para `USER appuser`.
- `compose.secure.yaml` com `read_only`, `tmpfs`, `cap_drop` e `security_opt`.
- Modelos JSON documentando identidade do processo, superficie de escrita e politicas aplicadas.
- Scripts para build, subida, inspecao de usuario efetivo e plano de seguranca.

## Estrutura

```text
.
|-- app/
|-- config/
|-- models/
`-- scripts/
```

## Endpoints

- `GET /health`
- `GET /security`
- `GET /filesystem-check`

## Politicas aplicadas

- Usuario final: `appuser` (`UID 10001`)
- Grupo final: `appgroup` (`GID 10001`)
- `read_only: true`
- `tmpfs: /tmp`
- `cap_drop: [ALL]`
- `security_opt: [no-new-privileges:true]`

## Scripts

- `scripts/build-image.ps1`
- `scripts/up-compose.ps1`
- `scripts/down-compose.ps1`
- `scripts/inspect-user.ps1`
- `scripts/check-security-plan.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\up-compose.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\inspect-user.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\app\src\server.py .\app\src\runtime.py .\app\src\security_profile.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-security-plan.ps1
```

## Observacao de ambiente

O daemon Docker nao esta ativo na maquina atual, entao a inspecao do container nao foi executada localmente. Ainda assim, o projeto ficou source-complete com endurecimento real descrito em `Dockerfile`, Compose e no app de auditoria.

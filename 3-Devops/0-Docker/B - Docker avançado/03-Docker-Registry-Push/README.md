# Docker Registry Push

Projeto de estudo para configurar um registro Docker privado local e publicar uma imagem customizada nele usando tags versionadas e fluxo de verificacao por pull.

## O que foi implementado

- Aplicacao HTTP em Python padrao com rotas `/health`, `/image` e `/release`.
- `Dockerfile` da aplicacao customizada `inventory-release-api`.
- `compose.registry.yaml` com servico `registry:2` e configuracao persistente.
- `config/registry/config.yml` para o registry privado local.
- Modelos JSON para naming, manifesto da imagem e fluxo de publicacao.
- Scripts de subida do registry, build local, tag, push e pull de verificacao.

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
- `GET /image`
- `GET /release`

## Fluxo de registry

- Registry local: `localhost:5001`
- Repositorio de exemplo: `localhost:5001/study/inventory-release-api`
- Tags previstas: `v1.0.0`, `latest`

## Scripts

- `scripts/up-registry.ps1`
- `scripts/down-registry.ps1`
- `scripts/build-image.ps1`
- `scripts/tag-image.ps1`
- `scripts/push-local-registry.ps1`
- `scripts/pull-verify.ps1`
- `scripts/check-registry-plan.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\up-registry.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\push-local-registry.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\app\src\server.py .\app\src\runtime.py .\app\src\release.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-registry-plan.ps1
```

## Observacao de ambiente

O daemon Docker nao esta ativo nesta maquina, entao o push real nao foi executado localmente. Mesmo assim, o projeto ficou source-complete com registry configurado, imagem customizada, naming consistente e scripts operacionais reais para build, tag, push e pull.

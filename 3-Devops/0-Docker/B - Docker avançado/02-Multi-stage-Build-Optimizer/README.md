# Multi-stage Build Optimizer

Projeto de estudo focado em `Dockerfile` multi-stage para gerar uma imagem final muito menor, com binario Go estatico rodando em `scratch` e sem toolchain no runtime.

## O que foi implementado

- API HTTP em Go com rotas `/`, `/health`, `/products` e `/artifacts`.
- `Dockerfile` com estagios `deps`, `test`, `builder` e `runtime`.
- Binario Linux estatico gerado com `CGO_ENABLED=0` e flags `-trimpath -ldflags="-s -w"`.
- Runtime final em `scratch`, copiando apenas o binario final.
- Pagina HTML embutida com `go:embed` para mostrar a estrategia de otimizacao.
- Modelos JSON descrevendo stages, artefatos e ganhos esperados.
- Scripts PowerShell para build por target, inspecao de historico e comparacao do fluxo.

## Estrutura

```text
.
|-- cmd/
|-- internal/
|-- models/
|-- scripts/
`-- internal/httpapi/web/
```

## Rotas

- `GET /`
- `GET /health`
- `GET /products`
- `GET /artifacts`

## Estrategia de build

- `deps`: baixa dependencias uma unica vez
- `test`: executa `go test ./...`
- `builder`: gera o binario final otimizado
- `runtime`: imagem `scratch` com apenas o executavel

## Scripts

- `scripts/build-runtime-image.ps1`
- `scripts/build-builder-target.ps1`
- `scripts/inspect-history.ps1`
- `scripts/check-optimizer-plan.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
go test ./...
powershell -ExecutionPolicy Bypass -File .\scripts\build-builder-target.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\build-runtime-image.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
go test ./...
powershell -ExecutionPolicy Bypass -File .\scripts\check-optimizer-plan.ps1
```

## Observacao de ambiente

O host possui `go`, entao os testes e a compilacao logica do projeto foram validados localmente. O daemon Docker continua indisponivel, por isso a construcao real das imagens ficou documentada pelos scripts e pela coerencia do `Dockerfile`.

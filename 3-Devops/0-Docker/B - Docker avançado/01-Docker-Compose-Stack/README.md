# Docker Compose Stack

Projeto de estudo para orquestrar uma stack local com API, Postgres e Redis usando Docker Compose, com cache em leitura e inicializacao de schema no banco.

## O que foi implementado

- API FastAPI com endpoints de saude, leitura e criacao de produtos.
- Postgres com script de inicializacao em `postgres/init/001_schema.sql`.
- Redis para cache de consultas da lista de produtos.
- `compose.yaml` com servicos `api`, `postgres` e `redis`.
- Volumes nomeados para dados de Postgres e Redis.
- Modelos JSON documentando topologia, contrato de cache e schema relacional.

## Estrutura

```text
.
|-- api/
|-- models/
|-- postgres/
`-- scripts/
```

## Endpoints

- `GET /health`
- `GET /products`
- `POST /products`
- `GET /stack`

## Stack

- API: `http://127.0.0.1:3040`
- Postgres: `postgres:5432`
- Redis: `redis:6379`

## Scripts

- `scripts/up-compose.ps1`
- `scripts/down-compose.ps1`
- `scripts/logs-stack.ps1`
- `scripts/check-stack-plan.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\up-compose.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\logs-stack.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\api\app\main.py .\api\app\config.py .\api\app\db.py .\api\app\cache.py .\api\app\repository.py .\api\app\schemas.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-stack-plan.ps1
```

## Observacao de ambiente

O projeto esta source-complete, mas o daemon Docker e as dependencias Python da API nao foram executados localmente nesta maquina. A verificacao foi feita por sintaxe, manifests, wiring do compose e consistencia entre API, Postgres e Redis.

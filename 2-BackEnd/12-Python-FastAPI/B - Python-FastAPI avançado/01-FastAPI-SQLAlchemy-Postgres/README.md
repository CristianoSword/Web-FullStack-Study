# FastAPI SQLAlchemy Postgres

API de inventario com FastAPI, SQLAlchemy ORM, PostgreSQL e migrations via Alembic.

## Features

- Persistencia relacional com `SQLAlchemy 2`
- Configuracao pronta para PostgreSQL com `psycopg`
- Migrations versionadas com `Alembic`
- Entidades `Category` e `Product` com relacionamento `1:N`
- Rotas para criar/listar categorias e criar/listar/editar produtos
- Tratamento de `404` e `409` para recursos ausentes e duplicados
- Testes automatizados da API com SQLite local de teste

## Estrutura

```text
alembic/
  env.py
  versions/
    20260628_0001_create_inventory_tables.py
app/
  api/
    dependencies.py
    routes.py
  core/
    errors.py
    exceptions.py
    settings.py
  db/
    base.py
    session.py
  models/
    category.py
    product.py
  repositories/
    category_repository.py
    product_repository.py
  schemas/
    category.py
    product.py
  services/inventory_service.py
  main.py
tests/test_inventory_api.py
docker-compose.yml
alembic.ini
run.py
requirements.txt
```

## Como executar

```bash
docker compose up -d
python -m pip install -r requirements.txt
alembic upgrade head
python run.py
```

Servidor padrao: `http://127.0.0.1:8010`

## Endpoints

- `GET /health`
- `GET /categories`
- `POST /categories`
- `GET /products`
- `GET /products/{product_id}`
- `POST /products`
- `PUT /products/{product_id}`

## Banco de dados

Variavel padrao:

```env
DATABASE_URL=postgresql+psycopg://study:study@127.0.0.1:5432/study_inventory
```

## Como testar

```bash
python -m pytest tests/test_inventory_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando em SQLite local de teste. O fluxo PostgreSQL ficou entregue em codigo, compose e migrations.

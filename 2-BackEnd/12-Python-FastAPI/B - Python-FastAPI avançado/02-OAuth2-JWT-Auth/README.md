# OAuth2 JWT Auth

API de autenticacao com FastAPI, SQLAlchemy, OAuth2 Password Flow e tokens JWT.

## Features

- Cadastro de usuarios com persistencia relacional em `SQLite` por padrao
- Login via `OAuth2PasswordRequestForm` com emissao de `JWT Bearer Token`
- Perfis com papeis `member` e `admin`
- Rotas protegidas com verificacao de token e escopos
- Migrations versionadas com `Alembic`
- Validacoes para senha confirmada, login invalido e duplicidade de usuario
- Testes automatizados cobrindo cadastro, login, perfil e autorizacao

## Estrutura

```text
alembic/
  env.py
  versions/
    20260628_0002_create_users_table.py
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
    user.py
  repositories/
    user_repository.py
  schemas/
    auth.py
  security/
    passwords.py
    tokens.py
  services/
    auth_service.py
  main.py
tests/test_auth_api.py
alembic.ini
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
alembic upgrade head
python run.py
```

Servidor padrao: `http://127.0.0.1:8011`

## Endpoints

- `GET /health`
- `POST /auth/register`
- `POST /auth/token`
- `GET /auth/me`
- `GET /auth/admin`

## Configuracao

Variaveis principais:

```env
DATABASE_URL=sqlite+pysqlite:///./auth.db
JWT_SECRET_KEY=change-me-in-production
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Como testar

```bash
python -m pytest tests/test_auth_api.py -q
```

Validado localmente em Python `3.9.10` com `5` testes passando. O projeto entrega fluxo real de autenticacao, controle de acesso por papel e migrations de usuarios.

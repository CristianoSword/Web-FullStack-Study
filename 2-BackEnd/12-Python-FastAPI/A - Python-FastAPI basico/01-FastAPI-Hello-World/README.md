# FastAPI Hello World

Projeto introdutorio em FastAPI com organizacao em camadas, configuracao por ambiente, validacao Pydantic e testes de API.

## Features

- Endpoint `GET /` com resposta JSON tipada
- Query param `name` com validacao de tamanho
- Endpoint `GET /health` com metadados da aplicacao
- `AppSettings` carregado por variaveis de ambiente
- Handler customizado para erros de validacao
- Testes automatizados com `pytest` e `TestClient`

## Estrutura

```text
app/
  api/routes.py
  core/
    dependencies.py
    errors.py
    settings.py
  models/greeting.py
  services/greeting_service.py
  main.py
tests/test_app.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8000`

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Variaveis de ambiente

- `FASTAPI_APP_NAME`: nome exibido nas respostas e documentacao
- `FASTAPI_APP_VERSION`: versao da API
- `FASTAPI_ENV`: ambiente atual, retornado no healthcheck

## Como testar

```bash
python -m pytest tests/test_app.py -q
```

Validado localmente em Python `3.9.10` com:

- `fastapi==0.103.2`
- `pydantic==1.10.17`
- `uvicorn==0.30.6`
- `httpx==0.27.2`
- `pytest==8.3.5`

## Exemplo de resposta

`GET /?name=Ada`

```json
{
  "project": "FastAPI Hello World",
  "message": "Welcome to the FastAPI study project",
  "version": "0.1.0",
  "target": "Ada"
}
```
